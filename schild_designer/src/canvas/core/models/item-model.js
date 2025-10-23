import {SceneComponent} from "@/canvas/core/scene-component.js";
import {toRaw} from "vue";

export class ItemModel extends SceneComponent {
    constructor( scene ) {
        super( scene );
        this.lastInsertIndex = -1;
    }


    get activeObject() { return this.canvas.getActiveObject() }
    set activeObject( value ) {
        this.canvas.setActiveObject( toRaw(value) );
        value.setCoords();
        this.canvas.requestRenderAll();
    }

    addItem( item ) {
        item.name = this.getName( item, item.name, this.items )
        item.setCoords();
        this.lastInsertIndex = this.canvas.add( toRaw(item) );
    }

    insertItem( index, item ) {
        item.name = this.getName( item, item.name, this.items )
        item.setCoords();
        this.canvas.insertAt(index, toRaw(item) );
    }

    indexOf( item ) {
        return this.canvas.getObjects().indexOf( toRaw(item) );
    }

    clear( ) { this.items.forEach( o => this.removeItem( o ) ); }

    clearGuideLines() {
        this.items.forEach( o => o.guideLines = [] );
    }

    get items() { return this.canvas.getObjects() }

    isLocked( item ) { return item && item.lockMovementX && item.lockMovementY; }

    lockItem( lock ) {
        if ( !this.activeObject ) return;

        this.activeObject.lockMovementX = lock;
        this.activeObject.lockMovementY = lock;
        this.activeObject.hasControls = !lock;
        //this.activeObject.evented       = !lock;
        this.activeObject.selectable    = !lock;
        this.scene.update( false )
        if ( !this.isLocked( this.activeObject ) ) {
            this.scene.unselect();
        }
    }

    removeItem( item ) {
        if ( !item ) return;
        this.canvas.setActiveObject( toRaw(item) );
        this.canvas.remove( toRaw(item) );
        this.canvas.discardActiveObject();
    }

    setStrokeWidth( target, stroke ) {
        const { width, height, scaleX, scaleY } = target;

        const oldStroke     = target.strokeWidth;

        let newStroke       = Math.max(0, stroke );
        const smallest      = Math.min(width * scaleX, height * scaleY);
        if (newStroke > smallest) newStroke = smallest;

        const diff          = newStroke - oldStroke;
        if (diff === 0) return;

        const visibleW      = width     * scaleX    - diff;
        const visibleH      = height    * scaleY    - diff;
        const newWidth      = Math.max(0, visibleW / scaleX);
        const newHeight     = Math.max(0, visibleH / scaleY);
        target.set({ width: newWidth, height: newHeight, strokeWidth: newStroke });
    }

}