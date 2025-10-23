import {SnapController} from "@/canvas/core/controller/snap/snap-controller.js";
import {toRaw} from "vue";
import * as fabric from "fabric";


export class SnapToGridController extends SnapController{
    constructor( scene ) {
        super( scene );

    }

    handleGridSnap(target, pointer ) {
        if ( !target || !this.scene.appSettings.viewOptions.snapEnabled ||  this.scene.files.isSaving() ) return;
        this.snapDistance           = 3;
        target.guideLines           = [];
        const bgRect                = this.scene.backgroundSceneRect;

        const { bl, br, tl, tr }    = target.aCoords;

        this._snapAtTopLeft( target, bgRect, tl );
        this._snapAtBottomLeft( target, bgRect, bl );
        this._snapAtTopRight( target, bgRect, tr );
        this._snapAtBottomRight( target, bgRect, br );
        this._snapAtCenter( target, bgRect );
    }

    _snapAtCenter( target, bgRect ) {
        const tMatrix = target.calcTransformMatrix();
        const center = fabric.util.transformPoint(new fabric.Point(0, 0), tMatrix);

        let distX = center.x - bgRect.centerX;
        if ( !target.guideLines.includes('centerX'))
            this.snapX(target, distX, bgRect.centerX, "centerX", true, center.x);

        let distY = center.y - bgRect.centerY;
        if ( !target.guideLines.includes('centerY'))
            this.snapY(target, distY, bgRect.centerY, "centerY", true, center.y);
    }

    _snapAtTopLeft( target, bgRect, tl ) {
        if ( !target.guideLines.includes('left'))
            this.snapX( target, tl.x - bgRect.left  , bgRect.left, "left", true, tl.x );

        if ( !target.guideLines.includes('top'))
            this.snapY( target, tl.y - bgRect.top, bgRect.top, "top", true, tl.y );

        if ( !target.guideLines.includes('left-bleed'))
            this.snapX( target, tl.x - bgRect.left - this.bleed, bgRect.left + this.bleed, "left-bleed" );

        if ( !target.guideLines.includes('top-bleed'))
            this.snapY( target, tl.y - bgRect.top - this.bleed, bgRect.top + this.bleed, "top-bleed" );

        if ( !target.guideLines.includes('centerX'))
            this.snapX( target, tl.x - bgRect.centerX  , bgRect.centerX , "centerX" );

        if ( !target.guideLines.includes('centerY'))
            this.snapY( target, tl.y - bgRect.centerY, bgRect.centerY , "centerY" );
    }

    _snapAtBottomLeft( target, bgRect, bl ) {
        let distX = bl.x - bgRect.left;
        if ( !target.guideLines.includes('left'))
            this.snapX(target, distX, bgRect.left, "left", true, bl.x);

        let distY = bl.y - bgRect.bottom;
        if ( !target.guideLines.includes('bottom'))
            this.snapY( target, distY, bgRect.bottom , "bottom", true, bl.y );

        distX = bl.x - bgRect.left - this.bleed;
        if ( !target.guideLines.includes('left-bleed'))
            this.snapX(target, distX, bgRect.left + this.bleed, "left-bleed", true, bl.x);

        distY = bl.y - bgRect.bottom + this.bleed;
        if ( !target.guideLines.includes('bottom-bleed'))
            this.snapY( target, distY, bgRect.bottom - this.bleed, "bottom-bleed", true, bl.y );

        distX = bl.x - bgRect.centerX;
        if ( !target.guideLines.includes('centerX'))
            this.snapX( target,  distX , bgRect.centerX , "centerX", true, bl.x );

        distY = bl.y - bgRect.centerY;
        if ( !target.guideLines.includes('centerY'))
            this.snapY( target, distY, bgRect.centerY , "centerY", true, bl.y );
    }

    _snapAtTopRight( target, bgRect, tr ) {
        if ( !target.guideLines.includes('right'))
            this.snapX( target, tr.x - bgRect.right  , bgRect.right, "right", true, tr.x );

        if ( !target.guideLines.includes('top'))
            this.snapY( target, tr.y - bgRect.top, bgRect.top, "top", true, tr.y );

        // Bleed rechts
        if ( !target.guideLines.includes('right-bleed'))
            this.snapX( target, tr.x - bgRect.right + this.bleed, bgRect.right - this.bleed, "right-bleed", true, tr.x  );

        if ( !target.guideLines.includes('top-bleed'))
            this.snapY( target, tr.y - bgRect.top - this.bleed, bgRect.top + this.bleed, "top-bleed", true, tr.y );

        // Oben Links center
        if ( !target.guideLines.includes('centerX'))
            this.snapX( target, tr.x - bgRect.centerX  , bgRect.centerX , "centerX", true, tr.x  );

        if ( !target.guideLines.includes('centerY'))
            this.snapY( target, tr.y - bgRect.centerY, bgRect.centerY , "centerY", true, tr.y );
    }

    _snapAtBottomRight( target, bgRect, br ) {
        let distX = br.x - bgRect.right;
        if ( !target.guideLines.includes('right'))
            this.snapX(target, distX, bgRect.right, "right", true, br.x);
        let distY = br.y - bgRect.bottom;
        if ( !target.guideLines.includes('bottom'))
            this.snapY( target, distY, bgRect.bottom , "bottom", true, br.y );

        distX = br.x - bgRect.right + this.bleed;
        if ( !target.guideLines.includes('right-bleed'))
            this.snapX(target, distX, bgRect.right - this.bleed, "right-bleed", true, br.x);

        distY = br.y - bgRect.bottom + this.bleed;
        if ( !target.guideLines.includes('bottom-bleed'))
            this.snapY( target, distY, bgRect.bottom - this.bleed, "bottom-bleed", true, br.y );

        distX = br.x - bgRect.centerX;
        if ( !target.guideLines.includes('centerX'))
            this.snapX( target,  distX , bgRect.centerX , "centerX", true, br.x );

        distY = br.y - bgRect.centerY;
        if ( !target.guideLines.includes('centerY'))
            this.snapY( target, distY, bgRect.centerY , "centerY", true, br.y );
    }




    handleItemSnap(target, pointer ) {
        if ( !target || !this.scene.appSettings.viewOptions.snapEnabled   ) return;
        //target.guideLines = [];
        this.snapDistance           = 5;

        const activeLayer = this.scene.controller.itemLayerModel.activeLayer;
        if ( !activeLayer ) return;

        const items = activeLayer.items.filter( o => toRaw(o) !== target );
        if ( items.length === 0 ) return;

        const tRect = this.stableRect( target );
        items.forEach( o => {
            const oRect = this.stableRect( toRaw(o) );

            this.snapX( target, tRect.right - oRect.left, oRect.left - tRect.width, "t-right" );
            this.snapX( target, tRect.right - oRect.right, oRect.right - tRect.width, "t-right" );

            this.snapY( target, tRect.bottom - oRect.top, oRect.top - tRect.height, "t-bottom" );
            this.snapY( target, tRect.bottom - oRect.bottom, oRect.bottom - tRect.height , "t-bottom" );

            this.snapX( target, tRect.left - oRect.left, oRect.left, "t-left" );
            this.snapX( target, tRect.left - oRect.right, oRect.right , "t-left" );

            this.snapY( target, tRect.top - oRect.top, oRect.top, "t-top" );
            this.snapY( target, tRect.top - oRect.bottom, oRect.bottom , "t-top" );

            this.snapX( target, tRect.centerX - oRect.centerX, oRect.centerX - tRect.width / 2, "t-centerX" );
            this.snapY( target, tRect.centerY - oRect.centerY, oRect.centerY - tRect.height / 2 , "t-centerY" );

        } )

        target.setCoords();
        this.canvas.requestRenderAll();
    }

    handleScaleSnap(target, corner, pointer) {
        const wrongCorners = corner === 'br' || corner === 'bl' || corner === 'tl' || corner === 'tr';
        if (!target || !this.scene.appSettings.viewOptions.snapEnabled || wrongCorners ) return;

        if ( target.angle > 0 || target.angle < 0 ) return;


        const tRect =  this.stableRect(target);
        const bgRect = this.scene.backgroundSceneRect;
        const strokeWidth = target.strokeWidth || 0;
        target.guideLines = []

        // ----------------------------------------
        // 🔂 Berechnungen
        // ----------------------------------------

        // 1️ linke Seite
        const distToLeft = pointer.x - bgRect.left;
        const leftWidth = tRect.right - bgRect.left - strokeWidth;

        // ️ 2️ rechte Seite
        const distToRight =  bgRect.right - pointer.x ;
        const rightWidth = bgRect.right - tRect.left  - strokeWidth;

        // 3️⃣ rechte Seite - Center
        const distToCenterXR = pointer.x - bgRect.centerX  ;
        const centerXRWidth = bgRect.centerX - tRect.left  - strokeWidth;

        // 4️⃣ linke Seite Center
        const distToCenterXL = bgRect.centerX - pointer.x ;
        const centerXLWidth = tRect.right - bgRect.centerX  - strokeWidth;

        // 5️⃣ obere Seite
        const distToTop = pointer.y - bgRect.top;
        const topHeight =  tRect.bottom - bgRect.top  - strokeWidth;

        // 6️⃣ untere Seite
        const distToBottom = bgRect.bottom - pointer.y  ;
        const bottomHeight =  bgRect.bottom - tRect.top  - strokeWidth;

        // 7️⃣ untere Seite - Center
        const distToCenterYB = pointer.y - bgRect.centerY  ;
        const centerYBHeight = bgRect.centerY - tRect.top  - strokeWidth;

        // 8️⃣ obere Seite - Center
        const distToCenterXT = bgRect.centerY - pointer.y ;
        const centerYTHeight = tRect.bottom - bgRect.centerY  - strokeWidth;


        // ----------------------------------------
        // 🔂 Snap
        // ----------------------------------------

        // 1️ linke Seite
        this.snapScaleX(target, distToLeft, bgRect.left, leftWidth / target.width,'left');

        // ️ 2️ rechte Seite
        this.snapScaleX(target, distToRight, tRect.left, rightWidth / target.width,'right');

        // 3️⃣ rechte Seite - Center
        if ( corner.includes('r')) {
            this.snapScaleX(target, distToCenterXR, tRect.left, centerXRWidth / target.width, 'centerX');
        }
        // 4️⃣ linke Seite Center
        else if ( corner.includes('l') ) {
            this.snapScaleX(target, distToCenterXL, bgRect.centerX, centerXLWidth / target.width, 'centerX');
        }
        // 5️⃣ obere Seite
        this.snapScaleY(target, distToTop, bgRect.top, topHeight / target.height,'top');

        // 6️⃣ untere Seite
        this.snapScaleY(target, distToBottom, tRect.top, bottomHeight / target.height,'bottom');

        // 7️⃣ untere Seite - Center
        if ( corner.includes('b')) {
            this.snapScaleY(target, distToCenterYB, tRect.top, centerYBHeight / target.height, 'centerY');
        }
        // 8️⃣ obere Seite - Center
        else if ( corner.includes('t') ) {
            this.snapScaleY(target, distToCenterXT, bgRect.centerY, centerYTHeight / target.height, 'centerY');
        }

        const b = this.bleed;
        // 1️⃣0️⃣ Nur links, rechts, oben und unten
        if ( corner === 'ml') {
            this.snapScaleX(target, distToLeft - b, bgRect.left + b, (leftWidth -b) / target.width, 'left-bleed');
        }

        if ( corner === 'mr') {
            this.snapScaleX(target, distToRight - b, tRect.left, (rightWidth - b) / target.width,'right-bleed');
        }

        if ( corner === 'mt' ) {
            this.snapScaleY(target, distToTop - b, bgRect.top + b, (topHeight - b) / target.height, 'top-bleed');
        }

        if ( corner === 'mb' ) {
            this.snapScaleY(target, distToBottom - b, tRect.top, (bottomHeight - b) / target.height,'bottom-bleed');
        }
    }





}






















