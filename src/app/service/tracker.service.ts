import { Injectable } from '@angular/core';

/**
 * Service facilitating methods to track
 * time taken by various tasks like user
 * reaction time etc.
 *
 * @class
 */
@Injectable()
export class TrackerService {

  /**
   * Elapsed time in milliseconds.
   *
   * @private
   * @type {Number}
   */
  private _duration: number = 0

  /**
   * Start time in milliseconds.
   *
   * @private
   * @type {Number}
   */
  private _start: number = 0

  /**
   * End time in milliseconds.
   *
   * @private
   * @type {Number}
   */
  private _end: number = 0

  /**
   * Starts time tracking.
   *
   * @public
   * @return {Void}
   */
  start(): void{
    this._start = this._getTime();
  }

  /**
   * Finishes time tracking
   *
   * @public
   * @return {Void}
   */
  end(): void{
    this._end = this._getTime();
  }

  /**
   * Returns elapsed time.
   *
   * @public
   * @return {Number}
   */
  getDuration(): number {
    return this._end - this._start;
  }

  /**
   * Returns current time.
   *
   * @private
   * @return {Number}
   */
  _getTime(): number {
    return new Date().getTime();
  }
}
