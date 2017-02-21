import { Injectable } from '@angular/core';

/**
 * Service providing misc random utils
 * like number range generator, array
 * shuffling and array selections.
 *
 * @class
 */
@Injectable()
export class RandomService {
  /**
   * Cache variable for `getRandomNormal()` method.
   *
   * @private
   * @type {number}
   */
  private _spareRandomCache: number | null = null

  /**
   * Makes random number between `min` and `max`.
   *
   * @public
   * @param {Number} min
   * @param {Number} max
   * @return {Number}
   */
  public between(min: number = 0, max: number = 1): number {
    const fact: number = (max - min + 1);
    const rand: number = Math.random();

    return Math.floor(rand * fact + min);
  }

  /**
   * Generates a random number normally distributed
   * with mean and standard deviation following the
   * Marsaglia-Polar-Method.
   *
   * @public
   * @param {Number} [mean=0]
   * @param {Number} [stdDev=1]
   * @return {Number}
   */
  public gaussian(mean: number = 0, stdDev: number = 1): number {
    const spare = this._spareRandomCache;
    if (this._spareRandomCache !== null) {
      this._spareRandomCache = null;
      return mean + stdDev * spare;
    }

    let u: number;
    let v: number;
    let s: number;

    do {
      u = 2 * Math.random() - 1;
      v = 2 * Math.random() - 1;
      s = u*u + v*v;
    } while (s >= 1 || s===0)

    const m:number = Math.sqrt(-2 * Math.log(s) / s);
    this._spareRandomCache = v * m;
    return mean + stdDev * u * m;
  }

  /**
   * Implements Inside-Out shuffle algorithm.
   *
   * @public
   * @param {Array.<any>} array
   * @param {any} value
   * @return {Number}
   */
  public push(array: Array<any>, value: any): number {
    const rand: number = this.between(0, array.length - 1);
    array.push(array[rand]);
    array[rand] = value;

    return array.length;
  }

  /**
   * Implements Fisher-Yates shuffle algorithm.
   *
   * @public
   * @param {Array.<any>} array
   * @return {Array.<any>}
   */
  public shuffle = function(array: Array<any>): Array<any> {
    for( let i=array.length-1; i>0; i-- ) {
      const rand = this.between(0,i);
      const temp = array[i];

      array[i] = array[rand];
      array[rand] = temp;
    }

    return array;
  }

  /**
   * Picks random item from an array.
   *
   * @public
   * @param {Array.<any>} array
   * @return {any}
   */
  public pick(array) {
    return array[this.between(0, array.length - 1)];
  }
}
