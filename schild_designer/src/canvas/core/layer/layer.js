import {SceneComponent} from "@/canvas/core/scene-component.js";
import {PaintEngine} from "@/canvas/core/paint-engine.js";
import {Color} from "fabric";


export class Layer extends SceneComponent {
    constructor( scene ) {
        super( scene );
        if ( new.target === Layer ) throw new Error( 'Layer kann nicht instanziiert werden.' );

        this.canvasElement                      = document.createElement( 'canvas' );
        this.canvasElement.width                = this.canvas.width;
        this.canvasElement.height               = this.canvas.height;
        this.canvasElement.style.position       = 'absolute';
        this.canvasElement.style.top            = '0';
        this.canvasElement.style.left           = '0';
        this.canvasElement.style.pointerEvents  = 'none';

        this.ctx                                = this.canvasElement.getContext( '2d' );
        this._needsRedraw                       = false;
        this.paintEngine                        = this.scene.paintEngine;

        if ( this.constructor.name === 'BackgroundLayer' )
            this.scene.canvasElement.parentNode.prepend( this.canvasElement );
        else
            this.scene.canvasElement.parentNode.appendChild( this.canvasElement );

        window.addEventListener( 'resize', () => this.resize() );
        requestAnimationFrame( () => this.renderLoop() );
    }

    draw() {  }

    clear( ) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect( 0, 0, this.canvasElement.width, this.canvasElement.height );
    }

    getLuminance(r, g, b) {
        const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    getGridColorFromBg(
        colorStr,
        lightColor = "rgba(255,255,255,0.05)",
        darkColor = "rgba(17,17,17,0.05)"
    ) {
        try {
            const color = new Color(colorStr);
            const [r, g, b] = color.getSource();
            const lum = this.getLuminance(r, g, b);

            return lum > 0.5 ? darkColor : lightColor;
        } catch (e) {
            return darkColor;
        }
    }

    renderLoop( ) {
        if ( this._needsRedraw ) {
            this.draw();
            this._needsRedraw = false;
        }
        requestAnimationFrame( () => this.renderLoop() );
    }

    requestRedraw( ) { this._needsRedraw = true; }

    resize() {
        this.canvasElement.width                 = this.canvas.width;
        this.canvasElement.height                = this.canvas.height;
        this.requestRedraw();
    }


}