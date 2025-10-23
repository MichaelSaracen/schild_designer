import {RectangleItem} from "@/canvas/core/items/rectangle-item.js";
import {Rect} from "fabric";


export class BackgroundItem extends Rect {
    constructor( options = {}, scene ) {
        super( options );

        if ( scene ) {
            const setup             = scene.setup;
            const defaultOptions    = {
                fill               : setup.design.backgroundColor,
                width              : setup.backgroundWidth,
                height             : setup.backgroundHeight,
                strokeWidth        : 0,
                stroke             : null,
                hoverCursor        : 'default',
                moveCursor         : 'default',
                lockMovementX       : true,
                lockMovementY       : true,
                selectable          : false,
                evented             : false,
                hasControls         : false,
                hasBorders          : false
            }
            this.set( defaultOptions );
        }

        this.set( options );

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;

        this.objectName         = 'BackgroundItem';
        this.name               = "Hintergrund";
        this.guideLines         = [];
        this.setControlsVisibility( {
            mt: false, mb: false
        } );
    }

    get baseScale() { return Math.min( this.canvas.width / this.width, this.canvas.height / this.height ) * 0.75 }

    fitToScreen() {
        const offsetX = ( this.canvas.width - this.width * this.baseScale ) / 2;
        const offsetY = ( this.canvas.height - this.height * this.baseScale ) / 2;
        this.canvas.setViewportTransform( [this.baseScale, 0, 0, this.baseScale, offsetX, offsetY ] );
        this.canvas.bringObjectToFront( this.scene.overlayer );
    }



}