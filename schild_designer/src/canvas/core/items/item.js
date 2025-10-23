import {FabricObject} from "fabric";
import {SceneComponent} from "@/canvas/core/scene-component.js";
import {markRaw, reactive} from "vue";

export class Item extends SceneComponent{
    constructor( scene, parent ) {
        super( scene )
        this.objectName = "";
        this.name = "";

        for ( let [k, v] of Object.entries(this) ){
            parent[k] = v;
        }


    }

}