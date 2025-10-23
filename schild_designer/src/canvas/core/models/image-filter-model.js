import {SceneComponent} from "@/canvas/core/scene-component.js";
import {filters} from "fabric";
import * as fabric from "fabric";


export class ImageFilterModel extends SceneComponent {
    constructor(scene) {
        super(scene);
        this.lastInsertIndex = -1;
    }


    setBlur( item, blur ) {
        this.removeFilter( item, 'Blur');
        const filter = new filters.Blur({
            blur
        });
        item.filters.push( filter );
        item.applyFilters();
        this.canvas.requestRenderAll();
    }

    setBrightness( item, brightness ) {
        this.removeFilter( item, 'Brightness');
        const filter = new filters.Brightness({
            brightness
        });
        item.filters.push( filter );
        item.applyFilters();
        this.canvas.requestRenderAll();
    }


    setBlendColor( img, color, alpha = 1, mode = 'tint' ) {
        this.removeFilter( img, 'BlendColor');
        const colorFilter = new filters.BlendColor({
            color: color, mode: mode, alpha: alpha
        });
        img.filters.push( colorFilter );
        img.applyFilters();
        this.canvas.requestRenderAll();
    }

    removeFilter( item, filterName ) {
        if ( item.filters )
            item.filters = item.filters.filter( f => f.type !== filterName );
    }

    addFilter( item, filterName ) {
        let filter = null;
        switch ( filterName ) {
            case "Blur":
                filter = new filters.Blur( { blur: 0 } );
                break;
            case "Brightness":
                filter = new filters.Brightness( { brightness: 0 } );
                break;
            case "Contrast":
                filter = new filters.Contrast( { contrast: 0} );
                break;
            case "Saturation":
                filter = new filters.Saturation( { saturation: 0} );
                break;
            case "Vibrance":
                filter = new filters.Vibrance( { vibrance: 0} );
                break;
        }

        if ( filter ) {
            item.filters.push( filter );
        }
    }

    _itemFromFilter( filterName,  key, value ) {
        const item = this.canvas.getActiveObject();
        if ( !item
            || item.objectName === "BackgroundItem"
            || item.objectName === "Overlay"
            || !(item instanceof fabric.Image) )
            return null;

        let contrastFilter = item.filters.find(f => f && f.type === filterName);
        if( !contrastFilter ) {
            this.addFilter( item, filterName );
        } else if ( value === 0 ) {
            this.removeFilter( item, filterName );
        } else {
            contrastFilter[key] = value;
        }

        return item;
    }
}