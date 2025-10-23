import {FabricImage} from "fabric";


export class ImageItem extends FabricImage {
    constructor( img, options, scene ) {
        super( img, options );

        if ( scene?.backgroundRect) {
            const { width: bgW, height: bgH} = scene.backgroundRect;
            if ( img.width > bgW || img.height > bgH ) {
                const sc = Math.min( bgW /img.width  , bgH / img.height  )
                const defaults = {
                    scaleX: sc,
                    scaleY: sc
                }
                this.set(defaults)
            }
        }


        this.set( options );

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "ImageItem"
        this.name               = "Bild"
        this.baseSize           = {};
        this.index              = 0;
        this.guideLines         = []

    }
}