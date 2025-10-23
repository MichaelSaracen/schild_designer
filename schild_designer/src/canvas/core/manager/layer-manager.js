import {SceneComponent} from "@/canvas/core/scene-component.js";
import {BleedLayer} from "@/canvas/core/layer/bleed-layer.js";
import {SnapLineLayer} from "@/canvas/core/layer/snap-line-layer.js";
import {GridLayer} from "@/canvas/core/layer/grid-layer.js";
import {HoleLayer} from "@/canvas/core/layer/hole-layer.js";
import {BackgroundLayer} from "@/canvas/core/layer/background-layer.js";


export class LayerManager extends SceneComponent {
    constructor( scene ) {
        super( scene );

        this.backgroundLayer    = new BackgroundLayer( scene );
        this.gridLayer          = new GridLayer( scene );
        this.bleedLayer         = new BleedLayer( scene );
        this.holeLayer          = new HoleLayer( scene );
        this.snapLineLayer      = new SnapLineLayer( scene );
    }

    registerEvents() {
        this.canvas.on('after:render', () => {
            this.requestRedraw();
        } );
    }

    requestRedraw() {
        this.backgroundLayer.requestRedraw();
        this.gridLayer.requestRedraw();
        this.bleedLayer.requestRedraw();
        this.holeLayer.requestRedraw();
        this.snapLineLayer.requestRedraw();
    }

    resize() {
        this.backgroundLayer.resize();
        this.gridLayer.resize();
        this.bleedLayer.resize();
        this.holeLayer.resize();
        this.snapLineLayer.resize();
    }
}