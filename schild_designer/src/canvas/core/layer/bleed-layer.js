import {Layer} from "@/canvas/core/layer/layer.js";
import {Colors} from "@/canvas/utils/theme.js";


export class BleedLayer extends Layer {
    constructor( scene ) {
        super( scene );
    }

    draw() {
        this.clear();
        if ( !this.scene.appSettings.viewOptions.bleedVisible ) return;
        const bgRect = this.scene.backgroundRect;
        const bleedRect = { x: this.bleed, y: this.bleed, width: bgRect.width - this.bleed * 2, height: bgRect.height - this.bleed * 2}


        this.paintEngine.drawTransformedCtx( this.ctx, ( scale ) => {

            if ( this.scene.setup.imageSource ) {
                const bg = this.scene.backgroundItem;
                if (!bg || !bg._element) return;

                this.paintEngine.drawTransformedCtx(this.ctx, (scale) => {
                    const bg = this.scene.backgroundItem;
                    if (!bg || !bg._element) return;

                    const img = bg._element;

                    this.paintEngine.drawComposite(this.ctx, "source-over", () => {
                        this.ctx.drawImage( img, bleedRect.x, bleedRect.y, bleedRect.width, bleedRect.height );
                        this.ctx.globalCompositeOperation = "source-in";
                        this.ctx.fillStyle = "#ff00ff";
                        this.ctx.fillRect( bleedRect.x, bleedRect.y, bleedRect.width, bleedRect.height );
                    });

                    this.paintEngine.drawComposite(this.ctx, "destination-out", () => {
                        const offset = 3 / scale;
                        this.ctx.drawImage(
                            img, bleedRect.x + offset, bleedRect.y + offset, bleedRect.width - offset * 2,
                            bleedRect.height - offset * 2 );
                    });
                });


            }

            else {
                this.paintEngine.drawComposite( this.ctx, 'destination-out', () => {
                    this.paintEngine.fillRect( this.ctx, bleedRect, 'red' );
                });
                this.paintEngine.strokeDashRect( this.ctx, bleedRect, 1 / scale, [10 /scale , 5 / scale], "rgba(255,0,255,0.25)" );
            }

        });

    }
}