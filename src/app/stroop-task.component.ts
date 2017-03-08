import {
  OnInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

import {
  SafeHtml,
  DomSanitizer
} from '@angular/platform-browser';

import { Word } from './word/word.type';
import { Color } from './color/color.type';
import { WordComponent } from './word/word.component';
import { ColorComponent } from './color/color.component';
import { RandomService } from './service/random.service';
import { TrackerService } from './service/tracker.service';
import { CountDownComponent } from './count-down/count-down.component';

/**
 * Custom type for result item.
 * @typedef {Object}
 */
type Result = {
  time: number,
  word: string,
  type: string,
  chosen_color: string,
  actual_color: string
};

/**
 * Custom type for config item.
 *
 * @typedef {Object}
 */
type Config = {
  rounds: number,
  countDown: number,
  randomMean: number,
  finishHTML: string,
  words: Array<Word>,
  colors: Array<Color>,
  randomStdDev: number,
  hiddenInputName: string
};

/**
 * Custom type for result item.
 * @typedef {Object}
 */
enum STATE {
  COUNTDOWN,
  RUNNING,
  FINISHED
};

/**
 * STROOP TASK COMPONENT
 *
 * This component implements the modified stroop
 * task, which presents 24 words (8 related, 16
 * unrelated) to user in two colors (blue, red).
 * The user has then to choose the current color
 * of the given word by pressing the key strokes,
 * which will be described in advance. Purpose of
 * the component is to measure the user's reaction
 * time for choosing the color via pressing a key.
 *
 * For more information please refer to:
 * https://en.wikipedia.org/wiki/Stroop_effect
 *
 * @class
 */
@Component({
  selector: 'stroop-task',
  providers: [ TrackerService ],
  styleUrls: [ './stroop-task.component.css'],
  templateUrl: './stroop-task.component.html',
})
export class StroopTaskComponent implements OnInit {

  /**
   * Custom configuration for stroop task.
   *
   * @public
   * @type {Config}
   */
  public config: Config = {
    rounds: 2,
    countDown: 10,
    randomMean: 1000,
    randomStdDev: 250,
    hiddenInputName: 'results',
    finishHTML: '<strong>Finished!</strong>',
    colors: [
      { value: 'BLUE', keyCode: 74 }, // = j
      { value: 'RED', keyCode: 75 },  // = k
    ],
    words: [
      { value: 'Google', type: 'RELATED' },
      { value: 'Yahoo', type: 'RELATED' },
      { value: 'screen', type: 'RELATED' },
      { value: 'browser', type: 'RELATED' },
      { value: 'modem', type: 'RELATED' },
      { value: 'keys', type: 'RELATED' },
      { value: 'internet', type: 'RELATED' },
      { value: 'computer', type: 'RELATED' },

      { value: 'Target', type: 'UNRELATED' },
      { value: 'Nike', type: 'UNRELATED' },
      { value: 'Coca Cola', type: 'UNRELATED' },
      { value: 'Yoplait', type: 'UNRELATED' },
      { value: 'table', type: 'UNRELATED' },
      { value: 'telephone', type: 'UNRELATED' },
      { value: 'book', type: 'UNRELATED' },
      { value: 'hammer', type: 'UNRELATED' },
      { value: 'nails', type: 'UNRELATED' },
      { value: 'chair', type: 'UNRELATED' },
      { value: 'piano', type: 'UNRELATED' },
      { value: 'pencil', type: 'UNRELATED' },
      { value: 'paper', type: 'UNRELATED' },
      { value: 'eraser', type: 'UNRELATED' },
      { value: 'laser', type: 'UNRELATED' },
      { value: 'television', type: 'UNRELATED' },
    ]
  };

  /**
   * Collection of randomized words.
   *
   * @public
   * @type {Array<Word>}
   */
  public words: Array<Word> = [];

  /**
   * Collection of the result items.
   *
   * @public
   * @type {Array<Result>}
   */
  public results: Array<Result> = [];

  /**
   * Current word if task is running.
   *
   * @public
   * @type {Word}
   */
  public currentWord: Word = null;

  /**
   * Current color if task is running.
   *
   * @public
   * @type {Color}
   */
  public currentColor: Color = null;

  /**
   * Static CSS class name of component.
   *
   * @public
   * @type {String}
   */
  @HostBinding('class')
  public className: string = 'stroop-task';

  /**
   * Flag indicating the current status.
   *
   * @public
   * @type {string}
   */
  public get currentState(): string {
    return STATE[this._currentState];
  }

  /**
   * JSON string of result collection.
   *
   * @public
   * @type {string}
   */
  public get resultAsString(): string {
    return JSON.stringify(this.results);
  }

  /**
   * Trusted HTML for `FINISHED` state.
   *
   * @public
   * @type {SafeHtml}
   */
  public get safeFinishHTML(): SafeHtml {
    const sanitizer = this.domSanitizer;
    const html = this.config.finishHTML || '';

    return sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * Internal timeout ID for iterations.
   *
   * @private
   * @type {Number}
   */
  private _timeoutId: number;

  /**
   * Reference to the current state enum.
   *
   * @private
   * @type {STATE}
   */
  private _currentState: STATE;

  /**
   * Constructor saves injected dependencies
   * and prepares task properties for start.
   *
   * @public
   * @param {RandomService} randomService
   * @param {TrackerService} trackerService
   * @return {Void}
   */
  constructor(
    private elementRef: ElementRef,
    private domSanitizer: DomSanitizer,
    private randomService: RandomService,
    private trackerService: TrackerService ) {

    // https://github.com/angular/angular/issues/1858
    try {
      const element = this.elementRef.nativeElement;
      const config = element.getAttribute('config');
      const json = JSON.parse(config) || {};

      for (let key in json) {
        this.config[key] = json[key];
      }
    } catch(e){
      console.error('Attribute `config` seems to be no valid JSON string.');
    }

    for (let i=0; i<this.config.rounds; i++) {
      const shuffled = this.randomService.shuffle(this.config.words);
      this.words = this.words.concat(shuffled);
    }
  }

  /**
   * Sets the current state depending on
   * `intro` property setting of consumer.
   */
  public ngOnInit() {
    this._currentState = STATE.COUNTDOWN;
  }

  /**
   * Initializes task after count down finished.
   *
   * @public
   * @return {Void}
   */
  public onCountDown() {
    this._currentState = STATE.RUNNING;
    this._nextRound(false);
  }

  /**
   * Starts time tracker after current word
   * has been rendered on screen with color.
   *
   * @public
   * @param {Word} word
   * @return {Void}
   */
  public onRenderWord(word: Word) {
    this.trackerService.start();
  }

  /**
   * Stops time tracker and connects color
   * instance to the current resultset item.
   *
   * @public
   * @param {Color} color
   * @return {Void}
   */
  public onSelectColor(color: Color) {
    this.trackerService.end();

    this._addResult(color);
    this._nextRound();
  }

  /**
   * Adds current result to collection.
   *
   * @private
   * @param {Color} selectedColor
   * @return {Void}
   */
  private _addResult(selectedColor: Color) {
    const result: Result = {
      time: this.trackerService.getDuration(),
      actual_color: this.currentColor.value,
      chosen_color: selectedColor.value,
      word: this.currentWord.value,
      type: this.currentWord.type
    };

    this.results.push(result);
  }

  /**
   * Gets next random word from stack.
   *
   * @private
   * @param {Boolean} [random=true]
   * @return {Void}
   */
  private _nextRound(random: boolean = true) {

    this.currentWord = null;
    this.currentColor = null;

    if (this.words.length === 0) {
      this._currentState = STATE.FINISHED;
      return;
    }

    if (typeof this._timeoutId !== 'undefined') {
      window.clearTimeout(this._timeoutId);
    }

    this._timeoutId = window.setTimeout(() => {
      this.currentColor = this._getRandomColor();
      this.currentWord = this._getRandomWord();
    }, random ? this._getRandomTimeout() : 0);
  }

  /**
   * Gets next random word from stack.
   *
   * @private
   * @return {Word}
   */
  private _getRandomWord(): Word {
    return this.words.pop();
  }

  /**
   * Gets random color from collection.
   *
   * @private
   * @return {Color}
   */
  private _getRandomColor(): Color {
    return this.randomService.pick(this.config.colors);
  }

  /**
   * Generates normally distributed random number
   * with mean:= 100 and standard deviation:= 250.
   *
   * @private
   * @return {Number}
   */
  private _getRandomTimeout(): number {
    return this.randomService.gaussian(
      this.config.randomMean,
      this.config.randomStdDev
    ) | 0;
  }

}
