import {RectangleItem} from "@/canvas/core/items/rectangle-item.js";
import {ImageItem} from "@/canvas/core/items/image-item.js";
import {FabricImage} from "fabric";


export class BackgroundImageItem extends FabricImage {
    constructor( img, options, scene ) {
        const imgEl = document.createElement('img');
        imgEl.crossOrigin = 'anonymous';
        imgEl.src = img;
        super( imgEl, options );

        const defaultOptions    = {
            strokeWidth        : 0,
            stroke             : null,
            selectable         : false,
            hoverCursor        : 'default',
            moveCursor         : 'default',
        }

        this.set( defaultOptions );
        this.set( options );


        this.scene              = scene;
        this.canvas             = scene.canvas;


        imgEl.onload = () => {
            // Nur Skalierung – kein Zuschneiden!
            const scaleX = this.scene.setup.backgroundWidth  / imgEl.naturalWidth;
            const scaleY = this.scene.setup.backgroundHeight / imgEl.naturalHeight;

            this.scaleX = scaleX;
            this.scaleY = scaleY;

            this.canvas?.requestRenderAll();
            this.fitToScreen();
        }

        this.fill = 'red'

        this.objectName         = 'BackgroundItem';
        this.name               = "@-#Hintergrund_#@";
        this.guideLines         = []
        this.img                = imgEl;
        this.src                = imgEl.src || null;
        this.overlayer          = this._overlay;
    }

    get baseScale() { return Math.min( this.canvas.width / this.getScaledWidth(), this.canvas.height / this.height ) * 0.75 }

    fitToScreen() {
        const offsetX = ( this.canvas.width - this.getScaledWidth() * this.baseScale ) / 2;
        const offsetY = ( this.canvas.height - this.getScaledHeight() * this.baseScale ) / 2;
        this.canvas.setViewportTransform( [this.baseScale, 0, 0, this.baseScale, offsetX, offsetY ] );
        this.canvas.bringObjectToFront( this.overlayer );
    }

    get _overlay() {
        // 🔹 Neues FabricImage mit derselben Quelle erstellen
        const imgEl = document.createElement('img');
        imgEl.crossOrigin = 'anonymous';
        imgEl.src = this.src; // gleiche Bildquelle wie Hintergrund

        const overlay = new FabricImage(imgEl, {
            scaleX: this.scene.setup.backgroundWidth  / this.img.naturalWidth,
            scaleY: this.scene.setup.backgroundHeight / this.img.naturalHeight,
            selectable: false,
            evented: false,
            hoverCursor: "default",
            globalCompositeOperation: 'destination-in', // gleiche Maskenwirkung
            excludeFromExport: true,
        });

        overlay.objectName = "Overlay";
        overlay.name = "+#$_#@Overlay_@²-_##2";

        return overlay;
    }

/*    toViewportCoords() {
        if ( this.scene.files.isSaving() ) return;
        const vpt = this.canvas?.viewportTransform;
        const scale = vpt[0], offsetX = vpt[4], offsetY = vpt[5];
        const bgW = this.width * scale;
        const bgH = this.height * scale;

        return {
            left: offsetX,
            top: offsetY,
            right: offsetX + bgW,
            bottom: offsetY + bgH,
            centerX: offsetX + bgW / 2,
            centerY: offsetY + bgH / 2,
            width: bgW,
            height: bgH
        };
    }*/

}