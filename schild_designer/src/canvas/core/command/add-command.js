import {Command} from "@/canvas/core/command/command.js";

export class AddCommand extends Command {
    constructor( scene, target, activeLayer ) {
        super( scene );

        this.target = target;
        this.activeLayer = activeLayer;

    }

    execute() {
        if ( !this.activeLayer ) return;
        this.activeLayer.addItem( this.target );
        this.canvas.setActiveObject( this.target );
    }

    undo() {
        if ( !this.activeLayer ) return;
        this.activeLayer.removeItem( this.target );
        this.scene.controller.itemLayerModel.reorder();
    }

}