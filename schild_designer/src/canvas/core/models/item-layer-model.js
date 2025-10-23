import {SceneComponent} from "@/canvas/core/scene-component.js";
import {reactive, toRaw} from "vue";
import {ItemLayer} from "@/canvas/core/items/item-layer.js";
import {getFontPath} from "@/assets/js/font-map.js";
import {AddCommand} from "@/canvas/core/command/add-command.js";
import {DeleteCommand} from "@/canvas/core/command/delete-command.js";

export class ItemLayerModel extends SceneComponent {
    constructor( scene ) {
        super( scene );
        this.layers = reactive([]);
        this.activeLayer = reactive(new ItemLayer( scene, this ));
        this.state = reactive({ key: 0 });
        this.layers.push( this.activeLayer )
    }

    addLayer( ) {
        const layer = new ItemLayer( this.scene, this );
        this.layers.push( layer );
        this.setActiveLayer( layer );
        return layer;
    }

    addItem( item, reorder = true ) {
        this.command.executeCommand( new AddCommand( this.scene, item, this.activeLayer) );
        if ( reorder ) this.reorder();
    }

    clear( ) {
        [...this.layers].forEach( l => {
            this.removeLayer(l)
        } );
        this.setActiveLayer( this.layers[0] );
        this.activeLayer.clear();
        this.reorder();
    }


    removeItemFromActiveLayer( item ) {
        this.command.executeCommand( new DeleteCommand( this.scene, item, this.activeLayer ) );

    }

    removeItems( ) {
        const objects = this.canvas.getActiveObjects();
        if ( objects.length === 0 ) return;
        if ( objects.length === 1 ) this.removeItemFromActiveLayer( objects[0] )
        else objects.forEach( o => this.removeItemFromActiveLayer( o ) );

        this.reorder();
    }

    reorder( ) { this.reorderLayers( this.layers ); }

    reorderLayers( layers ) {

        const newOrder = []
        const objects = this.scene.controller.itemModel.items;

        const bg = toRaw(objects.find( o => o.objectName === 'BackgroundItem'));
        if (bg) newOrder.push(bg);

        layers.forEach( layer => {
            layer.items.forEach( obj => {
                if ( obj && obj.objectName !== 'BackgroundItem' && objects.includes(toRaw( obj )))
                    newOrder.push(toRaw(obj));
            } );
        });

        const ov = objects.find( o => o.objectName === 'Overlay');
        newOrder.push(ov);

        this.canvas.clear();
        newOrder.forEach( obj => this.canvas.add( toRaw(obj) ) );
        this.canvas.requestRenderAll();

    }

    removeActiveLayer( ) {
        this.removeFrom( this.activeLayer, this.layers );
        this.reorder();
    }

    removeLayer( layer ) {
        layer.clear();
        this.removeFrom( layer, this.layers, (idx) => idx === 0 );
        this.reorder();
    }

    setActiveLayer( layer ) {
        if ( this.activeLayer === layer ) return;
        this.activeLayer = layer;
        this.state.key++;
        this.canvas.requestRenderAll();
    }

    swapLayers( startIndex, targetIndex ) {
        const arr = this.layers;
        const moved = arr.splice( startIndex, 1)[0];
        arr.splice( targetIndex, 0, moved );
        this.reorder();
    }

    get usedFonts() {
        const arr = [];
        this.layers.forEach(layer =>
            layer.items.forEach(obj => {
                if (!obj.fontFamily) return;
                const family = obj.fontFamily;
                const weight = obj.fontWeight || 400;
                if (!arr.find(f => f.family === family && f.weight === weight)) {
                    arr.push({
                        family,
                        weight,
                        path: getFontPath(family, weight),
                    });
                }
            })
        );

        return arr
    }

    isItemOnActiveLayer( item ) {
        if ( !this.activeLayer ) return false;
        return this.activeLayer.items.includes( item )
    }

    itemsOnActiveLayer( selected ) {
        return selected.filter( obj =>  this.activeLayer?.items?.includes( obj ));
    }

}



























