import {Layer} from "@/canvas/core/layer/layer.js";
import {reactive} from "vue";
import {Colors} from "@/canvas/utils/theme.js";


export class BackgroundLayer extends Layer {
    constructor( scene ) {
        super( scene );

        this.states = reactive( {
            fill: 'transparent',
            stroke: Colors.magenta
        } )
    }

    draw() {
        this.clear();
        const bgRect        = this.scene.backgroundRect;
        const sceneRect     = this.scene.backgroundSceneRect;

        this.paintEngine.drawTransformedCtx( this.ctx, ( scale ) => {
            const text              = this.scene?.controller?.itemLayerModel?.activeLayer?.name ?? 'Null';
            const fontSize          = 24 ;
            const padding           = 12 ;

            const { textWidth, textHeight } = this.paintEngine.measureText(this.ctx, text, fontSize );
            this.paintEngine.drawText(
                this.ctx,
                text,
                sceneRect.right - textWidth  - (padding * 2) - 0.5 ,
                sceneRect.top - textHeight - padding - 16,
                fontSize,
                Colors.white,
                '#23222256',
                '#D0D0D03F',
                padding

            );
            this.paintEngine.strokeRect( this.ctx, bgRect, 1 / scale, this.states.stroke )
            this.paintEngine.fillRect( this.ctx, bgRect, this.states.fill );
        } );
    }
}