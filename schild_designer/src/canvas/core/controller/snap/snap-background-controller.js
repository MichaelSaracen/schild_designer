import {SnapController} from "@/canvas/core/controller/snap/snap-controller.js";


export class SnapBackgroundController extends SnapController {
    constructor(scene) {
        super(scene);
        this.guideLines = [];

    }

    handleEvent( _ ) {
        if ( !this.scene.appSettings.viewOptions.backgroundSnap ||  this.scene.files.isSaving() ) return;

        this.scene.backgroundItem.guideLines = []

        const vpt = this.canvas.viewportTransform;
        // BG Rect
        const bgRect = this.scene.toViewportCoords();

        // Canvas Rect
        const cRect = this.scene.canvasToSceneCoords();

        // --- X - Achse --- LINKS, RECHTS, MITTE
        if ( this.inDistance( bgRect.left - cRect.left )) {
            //this.guideLines.push("left");
            vpt[4] = cRect.left;
        }
        else if ( this.inDistance( bgRect.right - cRect.right )) {
            //this.guideLines.push("right");
            vpt[4] = cRect.right - bgRect.width;
        }
        else if ( this.inDistance( bgRect.centerX - cRect.centerX )) {
            this.scene.backgroundItem.guideLines.push("centerX");
            vpt[4] = cRect.centerX - bgRect.width / 2;
        }

        // --- Y - Achse --- OBEN, UNTEN, MITTE
        if ( this.inDistance( bgRect.top - cRect.top )) vpt[5] = cRect.top;
        if ( this.inDistance( bgRect.bottom - cRect.bottom )) vpt[5] = cRect.bottom - bgRect.height;
        if ( this.inDistance( bgRect.centerY - cRect.centerY )) {
            this.scene.backgroundItem.guideLines.push("centerY");
            vpt[5] = cRect.centerY - bgRect.height / 2;
        }
    }
}
