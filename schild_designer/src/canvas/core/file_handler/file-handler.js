import {SceneComponent} from "@/canvas/core/scene-component.js";
import {reactive, ref} from "vue";


export class FileHandler extends SceneComponent {
    constructor( scene ) {
        super( scene );
        if ( new.target === FileHandler ) throw new Error( 'FileHandler kann nicht instanziiert werden' );

        this.path       = null;
        this.format     = null;
        this.isSaving   = reactive({ value: false } );
    }

    save( ) {

    }
    load( ) { }
}