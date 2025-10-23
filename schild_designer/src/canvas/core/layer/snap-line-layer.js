import {Layer} from "@/canvas/core/layer/layer.js";
import {Colors} from "@/canvas/utils/theme.js";

export class SnapLineLayer extends Layer{
    constructor( scene ) {
        super( scene );

        this.snapBackgroundTimeout  = null;
        this.backgroundLineColor    = Colors.accent;
        this.snapLineColor          = Colors.accent;
    }

    draw() {
        this.clear();
        this.drawSnapLines( this.canvas.getActiveObject(), this.scene.appSettings.viewOptions.snapEnabled );
        this.drawBackgroundSnapLines( this.scene.appSettings.viewOptions.backgroundSnap );
    }

    drawBackgroundSnapLines( visible = true ) {
        if ( !visible ) return;
        if ( !this.scene.controller.panController.dragged ) return;
        const cRect             = this.scene.canvasToSceneCoords();
        const clr               = this.backgroundLineColor;
        const pe                = this.scene.paintEngine;
        const ctx               = this.ctx;

        const guideLines        = this.scene.backgroundItem.guideLines;
        if ( guideLines.length === 0  ) return;

        const lineWidth = 2;
        guideLines.forEach( (g) => {
            switch (g) {
                case "centerX":
                    pe.drawVerticalLine(ctx, cRect.centerX, cRect.top, cRect.bottom, lineWidth , clr );
                    break;
                case "centerY":
                    pe.drawHorizontalLine(ctx, cRect.centerY, cRect.left, cRect.right, lineWidth , clr );
                    break;
            }
        });
    }

    drawSnapLines( target, visible = true ) {
        if ( !target || !visible ) return;
        if (!target.guideLines || target.guideLines.length === 0) return;

        const pe                = this.scene.paintEngine;
        const ctx               = this.ctx;

        const bgRect            = this.scene.backgroundSceneRect;
        const tRect             = this.stableRect(target);

        if ( target.objectName === 'BackgroundItem') return;

        pe.drawTransformedCtx( ctx, (scale) => {
            const lineWidth     = 1 / scale;
            ctx.setLineDash( [10 / scale, 3/ scale] );
            target.guideLines.forEach( (g) => {
                switch (g) {
                    case "left":
                        pe.drawVerticalLine( ctx, bgRect.left, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "t-left":
                        pe.drawVerticalLine( ctx, tRect.left, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "left-bleed":
                        pe.drawVerticalLine( ctx, bgRect.left + this.bleed, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "right":
                        pe.drawVerticalLine( ctx, bgRect.right, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "t-right":
                        pe.drawVerticalLine( ctx, tRect.right, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "right-bleed":
                        pe.drawVerticalLine( ctx, bgRect.right -this.bleed, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "centerX":
                        pe.drawVerticalLine( ctx, bgRect.centerX, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "t-centerX":
                        pe.drawVerticalLine( ctx, tRect.centerX, bgRect.top - 100, bgRect.height + 100, lineWidth , this.snapLineColor );
                        break;
                    case "top":
                        pe.drawHorizontalLine( ctx, bgRect.top, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;
                    case "t-top":
                        pe.drawHorizontalLine( ctx, tRect.top, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;
                    case "top-bleed":
                        pe.drawHorizontalLine( ctx, bgRect.top + this.bleed, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;
                    case "bottom":
                        pe.drawHorizontalLine( ctx, bgRect.bottom, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;
                    case "t-bottom":
                        pe.drawHorizontalLine( ctx, tRect.bottom, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;
                    case "bottom-bleed":
                        pe.drawHorizontalLine( ctx, bgRect.bottom - this.bleed, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;
                    case "centerY":
                        pe.drawHorizontalLine( ctx, bgRect.centerY, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;
                    case "t-centerY":
                        pe.drawHorizontalLine( ctx, tRect.centerY, bgRect.left - 100, bgRect.width + 100, lineWidth , this.snapLineColor );
                        break;

                }
            } );
        } );
    }


}