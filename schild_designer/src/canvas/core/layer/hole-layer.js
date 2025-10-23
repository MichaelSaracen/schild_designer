import {Layer} from "@/canvas/core/layer/layer.js";
import {bench} from "@/canvas/utils/benchmark.js";

export class HoleLayer extends Layer {
    constructor(scene) {
        super(scene);


    }

    draw() {
        this.clear();
        if ( !this.scene.appSettings.viewOptions.holesVisible ) return;

        const bgRect = this.scene.backgroundRect;
        const { count, diameter, position, distance } = this.scene.setup.holes;

        let holesPos = null;
        switch ( position ) {
            case 'ecken':
                holesPos = this.corners( bgRect, diameter, count, distance );
                break;
        }

        if ( !holesPos ) return;

        this.paintEngine.drawTransformedCtx(this.ctx, (scale) => {
            const lineWidth = 2 / scale;

            for (const p of holesPos) {
                this.paintEngine.roundRect(
                    this.ctx,
                    { x: p.x, y: p.y, width: diameter, height: diameter },
                    diameter / 2, lineWidth
                );
            }
        });
    }

    corners( bgRect, holeSize, count, margin = 10) {
        if (  (count !== 2 && count !== 4 ) || count === 0 ) return [];
        const positions = [];
        for (let i = 0; i < count; i++) {
            const isTop = count === 2 ? true : i < (count / 2)  ;
            const isLeft = count === 2 ? i % count  === 0 : i % (count / 2)  === 0
            positions.push( {
                x: isLeft ? margin : bgRect.width - margin - holeSize,
                y: isTop ? margin : bgRect.height - margin - holeSize
            } );
        }
        return positions;
    }
}



























