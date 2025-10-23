import {Layer} from "@/canvas/core/layer/layer.js";
import {bench} from "@/canvas/utils/benchmark.js";


export class GridLayer extends Layer {
    constructor( scene ) {
        super( scene );

        const bgColor = this.scene.backgroundItem.fill;
        this._gridLineLight = this.getGridColorFromBg( bgColor, "rgba(255,255,255,0.05)", "rgba(17,17,17,0.05)"  );
        this._gridLineDark = this.getGridColorFromBg( bgColor, "rgba(255,255,255,0.15)", "rgba(17,17,17,0.15)" );

    }

    draw() {
        this.clear();

        const zoom = this.scene.controller.zoomController.currentZoom;
        if ( zoom < 10 ) return;

        if ( !this.scene.appSettings.viewOptions.gridVisible ) return;
        const steps = 1//this.scene.movingSteps.small;
        const bgRect = this.scene.backgroundRect;

        const viewport = this.scene.viewport

        this.paintEngine.drawTransformedCtx( this.ctx, ( scale ) => {
            const lineWidth = 1/scale;
            for (let  x = viewport.left  ; x < viewport.width  ;  x+=steps) {
                this.paintEngine.drawVerticalLine( this.ctx, x, bgRect.y, bgRect.height, lineWidth,
                     this._gridLineLight  )
            }

            for (let y = viewport.top; y < viewport.height ;  y+=steps) {
                this.paintEngine.drawHorizontalLine( this.ctx, y, bgRect.x, bgRect.width, lineWidth,
                    this._gridLineLight  )
            }
        });
    }
}