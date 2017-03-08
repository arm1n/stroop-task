import {
  state,
  style,
  Input,
  Output,
  trigger,
  animate,
  Component,
  transition,
  HostBinding,
  HostListener,
  EventEmitter
} from '@angular/core';

import { Color } from './color.type';

/**
 * Component for color class providing
 * clickable color (or choosable via
 * `key` property of color instance).
 *
 * @class
 */
@Component({
  selector: 'color',
  styleUrls: [ './color.component.css'],
  templateUrl: './color.component.html',
  animations: [
    trigger('host', [
      transition('active <=> inactive', [
       style({
         transform: 'scale(1.1)',
       }),
       animate('0.4s ease-out', style({
         transform: 'scale(1)',
       }))
     ]),
    ])
  ]
})
export class ColorComponent {

  /**
   * Color instance.
   *
   * @public
   * @type {Color}
   */
  @Input()
  public color: Color;

  /**
   * Disabled state.
   *
   * @public
   * @type {Boolean}
   */
  @Input()
  @HostBinding('class.disabled')
  public disabled: boolean = false;

  /**
   * Subscribable event if a color has been chosen
   * either by clicking or pressing dependent key.
   *
   * @public
   * @type {Event}
   */
  @Output()
  public onSelect = new EventEmitter<Color>();

  /**
   * Static CSS class name of component.
   *
   * @public
   * @type {String}
   */
  @HostBinding('class')
  public className: String = 'color';

  /**
   * Actual trigger for component's animations.
   *
   * @public
   * @type {String}
   */
  @HostBinding('@host')
  public get animationState(): string {
    return !this._animationState ?
      'inactive' :
      'active';
  }

  /**
   * Returns color's value as RGB color string.
   *
   * @public
   * @type {String}
   */
  @HostBinding('style.backgroundColor')
  public get colorValue(): string {
    return this.color.value;
  }

  /**
   * Returns color's key code as char.
   *
   * @public
   * @type {String}
   */
  public get colorKeyChar(): string {
    return String.fromCharCode(
      this.color.keyCode
    );
  }

  /**
   * Internal animation state to be toggled.
   *
   * @private
   * @type {Boolean}
   */
  private _animationState: boolean = false;

  /**
   * Listens for `keyup` event on document
   * and checks if it corresponds to color
   * key definition. In this case it will
   * fire the `onSelect` event for parent.
   *
   * @private
   * @return {Void}
   * @event Color#keyup
   */
  @HostListener('document:keyup', ['$event'])
  private _onKeyPress(event): void {
    const keyCode = event.which || event.keyCode;
    if (this.color.keyCode !== keyCode) {
      return;
    }

    this._onSelect();
  }

  /**
   * Listens for `click` of host and fires
   * the `onSelect` event for parent.
   *
   * @private
   * @event Color#click
   */
  /*
  @HostListener('click', ['$event'])
  private _onClick(event): void {
    this._onSelect();
  }
  */

  /**
   * Primitive method for selecting color.
   *
   * @private
   * @return {Void}
   * @fires Color#onSelect
   */
  private _onSelect() {
    if (this.disabled) {
      return;
    }

    /**
     * @event Color#onSelect
     */
    this.onSelect.emit(this.color);
    this._animationState = !this._animationState;
  }
}
