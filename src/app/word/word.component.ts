import {
  Input,
  Output,
  Component,
  HostBinding,
  EventEmitter,
  AfterViewInit
} from '@angular/core';

import { Word } from './word.type';
import { Color } from '../color/color.type';

/**
 * Component for word class providing
 * rendering information for tracking.
 *
 * @class
 */

@Component({
  selector: 'word',
  styleUrls: [ './word.component.css'],
  templateUrl: './word.component.html'
})
export class WordComponent implements AfterViewInit {

  /**
   * Word instance.
   *
   * @public
   * @type {Word}
   */
  @Input()
  public word: Word;

  /**
   * Color instance.
   *
   * @public
   * @type {Color}
   */
  @Input()
  public color: Color;

  /**
   * Subscribable event if a color has been chosen
   * either by clicking or pressing dependent key.
   *
   * @public
   * @type {Event}
   */
  @Output()
  public onRender = new EventEmitter<Color>();

  /**
   * Static CSS class name of component.
   *
   * @public
   * @type {String}
   */
  @HostBinding('class')
  public className: String = 'word';

  /**
   * Primitive method for selecting color.
   *
   * @private
   * @return {Void}
   * @fires Word#onRender
   */
  ngAfterViewInit() {
    /**
     * @event Word#onRender
     */
    this.onRender.emit();
  }

  /**
   * Returns color's enum as html color string.
   *
   * @public
   * @type {String}
   */
  @HostBinding('style.color')
  public get colorValue(): string {
    return this.color.value;
  }

  /**
   * Internal animation state to be toggled.
   *
   * @private
   * @type {Boolean}
   */
  private _animationState: boolean = false;
}
