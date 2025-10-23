import {SceneComponent} from "@/canvas/core/scene-component.js";

export class ItemController extends SceneComponent {
    constructor( scene, model ) {
        super( scene );
        this.model = model;
    }

    handleEvent(e) {
        setTimeout( () => this.scene.unselect(), 100);
    }

}