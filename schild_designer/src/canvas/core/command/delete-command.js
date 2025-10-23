import {Command} from "@/canvas/core/command/command.js";
import {toRaw} from "vue";

export class DeleteCommand extends Command {
    constructor( scene, target, activeLayer ) {
        super( scene );

        this.target = target;
        this.activeLayer = activeLayer;
        this.index = null;
    }

    execute() {
        if ( !this.activeLayer ) return;

        this.index = this.activeLayer.indexOf( this.target );
        this.activeLayer.removeItem( this.target );
        this.scene.controller.itemLayerModel.reorder();
    }

    undo() {
        if ( !this.activeLayer || this.index === -1 ) return;
        this.activeLayer.insertItem( this.index, this.target );

        this.canvas.setActiveObject( this.target );
    }

}