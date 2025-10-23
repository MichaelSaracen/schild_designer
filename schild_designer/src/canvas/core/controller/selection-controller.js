import {SceneComponent} from "@/canvas/core/scene-component.js";
import {toRaw} from "vue";
import {EventBus} from "@/canvas/utils/event-bus.js";

export class SelectionController extends SceneComponent {
    constructor(scene, model) {
        super(scene);
        this.model = model;
    }

    handleEvent ( e ) {
        const selected = e.selected;
        // console.log(selected[0].aCoords)
        if ( selected.length === 1 ) {
            this.model.select( e.selected[0] );
        } else if ( selected.length > 1 ) {
            this.model.selectMultiple( selected );
        }
    }

    handleTransformEvent( e ) { this.model.updateStates( e.target ) }
    handleClearEvent( ) { this.model.clear() }


    handleContextMenu( opt ) {
        EventBus.emit("popup-close");
        const ev = opt.e;
        if ( ev.button === 2){
            const target = this.canvas.findTarget(ev, false);

            if (target && target.objectName !== "BackgroundItem" ) {
                this.model.select(target);
            } else {
                this.canvas.discardActiveObject();
                this.model.resetStates();
            }
            this.canvas.requestRenderAll();
        }
    }

}