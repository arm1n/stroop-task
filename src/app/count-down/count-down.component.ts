import {
  Input,
  Output,
  OnChanges,
  OnInit,
  Component,
  HostBinding,
  EventEmitter
} from '@angular/core';

/**
 * Component for displaying a countdown.
 * Use `startTime`, `autoInit` as well as
 * `onFinish` I/O to interact with it.
 *
 * @class
 */
@Component({
  selector: 'count-down',
  styleUrls: ['./count-down.component.css'],
  templateUrl: './count-down.component.html'
})
export class CountDownComponent implements OnInit {

  /**
   * Start value of count down in seconds.
   *
   * @public
   * @type {Number}
   */
  @Input()
  public startTime: number = 10;

  /**
   * Flag for auto initialization.
   *
   * @public
   * @type {Boolean}
   */
  @Input()
  public autoInit: boolean = true;

  /**
   * Current value of count down.
   *
   * @public
   * @type {Number}
   */
  public currentTime: number = null;

  /**
   * Subscribable event on count-down finish.
   *
   * @public
   * @type {Event}
   */
  @Output()
  public onFinish = new EventEmitter();

  /**
   * Static CSS class name of component.
   *
   * @public
   * @type {String}
   */
  @HostBinding('class')
  public className: string = 'count-down';

  /**
   * Internal interval ID for count-down.
   *
   * @private
   * @type {Number}
   */
  private _intervalId: number = undefined;

  /**
   * Timeout between ticks in milliseconds.
   *
   * @private
   * @type {Number}
   */
  private _tickTimeout: number = 1000;

  /**
   * Checks for `autoInit` flag and invokes
   * `init()` in case its not set to false.
   *
   * @public
   * @return {Void}
   */
  public ngOnInit() {
    if (!this.autoInit) {
      return;
    }

    this.start();
  }

  /**
   * Sets up count-down interval and time.
   *
   * @public
   * @return {Void}
   */
  public start() {
    this._intervalId = window.setInterval(
      this._onInterval.bind(this),
      this._tickTimeout
    );

    this.currentTime = this.startTime;
  }

  /**
   * Decrements `currentTime` and resets
   * internals after finish and emits the
   * `onFinish` event for consumers.
   *
   * @private
   * @return {Void}
   * @fires CountDown#onFinish
   */
  private _onInterval() {
    --this.currentTime;
    if (this.currentTime > 0) {
      return;
    }

    window.clearInterval(this._intervalId);
    this.currentTime = null;

    /**
     * @event CountDown#onFinish
     */
    this.onFinish.emit();
  }

  /**
   * Actual trigger for component's animations.
   *
   * @public
   * @type {String}
   */
  /*@HostBinding('@host')
  public get animationState(): string {
    return !this._animationState ?
      'inactive' :
      'active';
  }*/

  /**
   * Returns color's enum as html color string.
   *
   * @public
   * @type {String}
   */
  /*@HostBinding('style.color')
  public get colorString(): string {
    return this.color.getValueString();
  }

  /**
   * Internal animation state to be toggled.
   *
   * @private
   * @type {Boolean}
   */
  //private _animationState: boolean = false;
}
