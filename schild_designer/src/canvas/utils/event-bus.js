import {reactive} from "vue";


export const EventBus = reactive( {
    listeners: new Map(),

    on( event, callback ) {
        this.listeners.set( callback, event );
        window.addEventListener( event, callback );
    },

    off( callback ) {
        const event = this.listeners.get( callback );
        if ( event ) window.removeEventListener( event, callback );
        this.listeners.delete( callback );
    },

    emit( event, detail = {} ) {
        window.dispatchEvent( new CustomEvent( event, { detail } ) );
    }
} );