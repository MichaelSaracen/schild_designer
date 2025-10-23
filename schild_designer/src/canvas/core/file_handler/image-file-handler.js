import {FileHandler} from "@/canvas/core/file_handler/file-handler.js";
import {ImageItem} from "@/canvas/core/items/image-item.js";
import * as fabric from "fabric";

export class ImageFileHandler extends FileHandler {
    constructor( scene ) {
        super( scene );
    }

    load() { }

    save(projectName,  format = 'png' ) {
        const bgRect        = this.scene.backgroundRect;
        const zoom          = this.canvas.getZoom();
        const vpt           = [ ...this.canvas.viewportTransform ];

        this.canvas.setZoom( 1 );
        this.canvas.viewportTransform   = [ 1, 0, 0, 1, 0, 0];

        const dataUrl = this.canvas.toDataURL( {
            format,
            left: bgRect.x, top: bgRect.y, width: bgRect.width, height: bgRect.height,
            multiplier: 1, enableRetinaScaling: false, withoutTransform: true
        } );

        this.canvas.viewportTransform = vpt;
        this.canvas.setZoom( zoom );
        this.canvas.requestRenderAll();

        const link          = document.createElement( 'a' );
        link.href           = dataUrl;
        link.download       = `${projectName}.${format}`;
        link.click();
        return dataUrl;
    }

    handleFiles( e, cb ) {
        const file          = e.target.files[0];
        if ( !file ) return;

        const reader = new FileReader();
        reader.onload       = ( ev ) => cb( ev.target.result );
        reader.readAsDataURL( file );
    }

    async loadImage ( result, options = { } ) {
        const img           = await fabric.Image.fromURL(result);
        return new ImageItem(img.getElement(), options, this.scene );
    }

    async loadSVGImage( src = '/images/test/star.png', name = 'SVG - Bild', color = '#000' ) {
        const svg               =  await this.loadImage(src)
        if ( svg ) {
            svg.name            = name;
            svg.objectName      = 'SVGImageItem';
            this.scene.controller.imageFilterModel.setBlendColor( svg, color );
            this.scene.controller.itemLayerModel.addItem( svg );

        }
    }

    async loadBackgroundImage( src ) {
        const img           = await this.loadImage( src );
        if ( img ) {
            const { width: bgW, height: bgH} = this.scene.backgroundRect;
            const sc = Math.max( bgW / img.width, bgH / img.height )
            img.scaleX = sc;
            img.scaleY = sc;

            img.top =   (bgH / 2 ) - ((img.height * sc) / 2)

            this.scene.controller.itemLayerModel.addItem( img )
        }


    }


}


/*
const { width: bgW, height: bgH} = scene.backgroundRect;
if ( img.width > bgW || img.height > bgH ) {
    const sc = Math.min( bgW /img.width  , bgH / img.height  )
    const defaults = {
        scaleX: sc,
        scaleY: sc
    }
*/





























