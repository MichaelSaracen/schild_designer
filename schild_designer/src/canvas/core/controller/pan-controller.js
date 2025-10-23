import {SceneComponent} from "@/canvas/core/scene-component.js";


export class PanController extends SceneComponent {
    constructor( scene ) {
        super( scene );

        this.gridSteps              = 1;
        this.lastX                  = 0;
        this.lastY                  = 0;
        this.dragged                = false;
        this.backgroundCanSnap      = false;
        this.vpt                    = [];

    }

    registerEvents() {

    }

    handleMouseDownEvent(opt) {
        const ev                    = opt.e;
        if ( ev && ev.ctrlKey ) {
            this.dragged            = true;
            this.lastX              = ev.clientX;
            this.lastY              = ev.clientY;
            this.vpt                = [ ...this.canvas.viewportTransform ];

            this.canvas.selection = false;
            this.canvas.discardActiveObject();

            this.canvas.forEachObject((obj) => {
                obj._wasSelectable = obj.selectable;
                obj._wasEvented = obj.evented;
                obj.selectable = false;
                obj.evented = false;
            });

        }
    }

    handleMouseMoveEvent(opt) {
        const ev                    = opt.e;
        if ( ev && this.dragged ) {
            this.canvas.discardActiveObject();

            const { snapX, snapY }  = this.gridSnapDeltas( ev, this.lastX, this.lastY, this.gridSteps );
            const vpt               = [ ...this.vpt ];
            vpt[4]                  += snapX;
            vpt[5]                  += snapY;

            this.canvas.setViewportTransform( vpt );
            this.backgroundCanSnap  = true;
        }
    }

    handleMouseUpEvent() {
        if (!this.dragged) return;
        this.dragged                = false;
        this.backgroundCanSnap      = false;

        this.canvas.forEachObject((obj) => {
            obj.selectable = obj._wasSelectable ?? true;
            obj.evented = obj._wasEvented ?? true;
        });

        this.canvas.selection = true;

    }




}