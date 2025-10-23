import {SceneComponent} from "@/canvas/core/scene-component.js";

export class ItemLayerController extends SceneComponent {
    constructor( scene, model ) {
        super( scene );
        this.model = model;
        this._sync = false;
    }



    handleEvent( e ) {
        if ( this._sync ) return;

        this._sync = true;
        try { this.model.reorder(); }
        finally { this._sync = false; }

    }


}