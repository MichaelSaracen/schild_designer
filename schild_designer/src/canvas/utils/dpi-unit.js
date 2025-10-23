

export class DpiUnit {
    constructor( dpi = 300 ) {
        this._dpi        = dpi;
        this.factor     = this._dpi / 2.54;
    }

    cmToPx( v ) { return  v * this.factor; }
    pxToCm( v ) { return  v / this.factor; }
    mmToPx( v ) {  return Math.round( ( v / 10 ) * this.factor) ; }
    pxToMM( v ) { return (v / this.factor ) * 10 ; }

    get dpi() { return this._dpi }
    set dpi(v) { this._dpi = v; this.factor = this._dpi / 2.54; }


}