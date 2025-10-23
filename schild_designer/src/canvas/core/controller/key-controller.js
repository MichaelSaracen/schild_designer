import {SceneComponent} from "@/canvas/core/scene-component.js";
import {DeleteCommand} from "@/canvas/core/command/delete-command.js";

export class KeyController extends SceneComponent {
    constructor( scene ) {
        super( scene );

    }

    handleEvent(e) {
        const target = e.target;
        if ( target.tagName === 'INPUT' || target.isContentEditable ) return;
        const activeObject = this.canvas.getActiveObject();

        // Wenn der Text im EditMode ist, herausgehen.
        if ( activeObject && activeObject.isEditing ) return;

        const KEY           = e.key.toLowerCase();
        const CTRL_KEY      = e.ctrlKey;


        if ( CTRL_KEY ) {
            switch ( KEY ) {
                case 'c': this.scene.controller.selectionModel.copy( this.scene.activeObject() );  return;
                case 'v': this.scene.controller.selectionModel.paste(  ); return;
                case 'z': this.command.undo(); return;
                case 'y': this.command.redo(); return;
            }
        }

        switch ( KEY ) {
            case 'delete':
                this.scene.controller.itemLayerModel.removeItems();
                break;
        }
    }



}