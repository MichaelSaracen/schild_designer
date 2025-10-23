import {SceneComponent} from "@/canvas/core/scene-component.js";

export class Command extends SceneComponent {
    constructor( scene ) {
        super( scene );

        if ( new.target === Command ) throw new Error( 'Command kann nicht instanziiert werden.' );
    }

    execute( ) {
        throw new Error("execute muss implementiert werden.");
    }

    undo( ) {
        throw new Error("undo muss implementiert werden.");
    }
}