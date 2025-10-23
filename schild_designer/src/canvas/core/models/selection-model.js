import {SceneComponent} from "@/canvas/core/scene-component.js";
import {reactive, toRaw} from "vue";
import {ActiveSelection} from "fabric";
import {EventBus} from "@/canvas/utils/event-bus.js";

export class SelectionModel extends SceneComponent {
    constructor( scene ) {
        super( scene );

        this._isSyncingSelection    = false;
        this._clipboard             = null;
    }

    applyToTarget( cb ) {
        const target                = toRaw(this.scene.states.active);
        if ( !target ) return;
        cb(target);
        target.setCoords();
        this.canvas.requestRenderAll();
        this.updateStates( target );
    }

    clear() {
        this.scene.states.selected  = [];
        this.scene.states.active    = null;
        this.resetStates();
    }

    async copy( item ) {
        if ( !item || item.objectName === 'BackgroundItem' ) return;
        console.log( item )
        this._clipboard             = await item.clone();
    }

    async paste( ) {
        if ( !this._clipboard ) return;

        const cloned                = await this._clipboard.clone();
        this.canvas.discardActiveObject();

        cloned.set( { left: cloned.left + 20, top: cloned.top + 20, evented: true } );

        if ( cloned instanceof ActiveSelection ) {
            cloned.canvas           = this.canvas;
            cloned.forEachObject( ( obj ) => this.scene.controller.itemLayerModel.addItem( obj, false ) );
            cloned.setCoords();
        } else this.scene.controller.itemLayerModel.addItem( cloned, false ) ;

        this._clipboard.top         += 20;
        this._clipboard.left        += 20;
        this.scene.controller.itemLayerModel.reorder();
        this.canvas.setActiveObject( cloned );
    }

    async duplicateItem( item ) {
        if ( !item ) return;
        await this.copy( item );
        await this.paste();
    }


    createActiveSelection( items ) {
        return new ActiveSelection( items, {
            canvas: this.canvas, hasControls: false, hasBorders: false, perPixelTargetFind: true
        })
    }


    resetStates( ) {
        Object.keys(this.scene.states).forEach( k => {
            if ( k === 'active' || k === 'selected' ) this.scene.states[k] = null;
            else if ( typeof this.scene.states[k] === 'number' ) this.scene.states[k] = 0;
            else if ( typeof this.scene.states[k] === 'string' ) this.scene.states[k] = '';
            else this.scene.states[k] = null;
        } );
        Object.assign(this.scene.states, {});
    }

    selectedObject() { return this.scene.states.active; }

    select( object ) {
        if ( !this.scene.controller.itemLayerModel.isItemOnActiveLayer( object ) ) {
            this.canvas.discardActiveObject( );
            this.canvas.requestRenderAll();
            this.scene.states.selected = null;
            return;
        }

        this.scene.states.selected  = [toRaw(object)];
        this.scene.states.active    = toRaw(object);
        this.updateStates( toRaw(object) );
        this.canvas.setActiveObject( toRaw(object) );
        this.canvas.requestRenderAll();
    }

    selectMultiple( objects ) {
        if ( this._isSyncingSelection ) return;
        this._isSyncingSelection    = true;
        try {
            const items = this.scene.controller.itemLayerModel.itemsOnActiveLayer( objects );
            if ( !items ) {
                this.canvas.discardActiveObject( );
                this.canvas.requestRenderAll();
                this.scene.states.selected = null;
                return;
            }
            this.scene.states.selected  = items;
            this.scene.states.active    = null;
            const group = this.createActiveSelection( items );
            this.canvas.setActiveObject( group )
        }
        finally {
            this._isSyncingSelection    = false;
        }
    }

    setValue(key, value) {
        this.applyToTarget(target => {

            if (key === "angle") {
                target.rotate(value);
            }
            else if ( key === 'fontSize' ) {
                const textWidth = (target.__lineWidths?.length ? Math.max(...target.__lineWidths) : target.width) + target.padding * 2;
                const fixedWidth = target.width;
                target.set({ fontSize: value });
                target.set({ width: textWidth > fixedWidth ? textWidth : fixedWidth });
            }

            else if (key === "strokeWidth") {
                this.scene.controller.itemModel.setStrokeWidth( target, value );
            }
            else {
                target.set({ [key]: value });
            }
        });
    }

    updateStates( object ) {
        const r = object.getBoundingRect(true, true);
        Object.assign(this.scene.states, { ...this.canvas.getActiveObject(), width: r.width, height: r.height } );
        this.scene.states.active = object;
        this.scene.update( false );
        object.setCoords();
    }
}