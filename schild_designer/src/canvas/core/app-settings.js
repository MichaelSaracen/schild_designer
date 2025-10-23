import {SceneComponent} from "@/canvas/core/scene-component.js";
import {reactive} from "vue";

export class AppSettings extends SceneComponent {
    constructor( scene ) {
        super( scene );

        this.viewOptions = reactive( {
            bleedVisible    : true,
            backgroundSnap  : true,
            snapEnabled     : true,
            gridVisible     : true,
            holesVisible    : true
        });

        this.colors     = reactive( {
            arrows          : '#000',
            shapeFill       : '#b7c3f0',
            shapeStroke     : '#50609c',
            symbols         : '#000',
            text            : '#161515CE',
        } );
    }


    setBleedVisible( v ) { this._visible( 'bleedLayer', 'bleedVisible', v ); }

    setBackgroundSnap( v ) { this.viewOptions.backgroundSnap = v; }

    setSnapEnabled( v ) { this._visible( 'snapLineLayer', 'snapEnabled', v ); }

    setGridVisible( v ) { this._visible( 'gridLayer', 'gridVisible', v ); }

    setHolesVisible( v ) { this._visible( 'holeLayer', 'holesVisible', v ); }

    _visible( layer, k, v ) {
        this.viewOptions[k] = v;
        this.scene.layers[layer].canvasElement.style.display = v ? 'block' : 'none';
        this.canvas.requestRenderAll();
    }
}






















