import {SceneComponent} from "@/canvas/core/scene-component.js";
import {reactive} from "vue";

export class ZoomController extends SceneComponent {
    constructor( scene ) {
        super( scene );
        this.minZoom                = 0.1;
        this.maxZoom                = 30.0;
        this.zoomStep               = 0.1;
        this.lastPoint              = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.zoomState              = reactive( { zoom: this.currentZoom });
    }

    handelWheelEvent( e ) {
        const ev                    = e.e;
        let zoom                    = this.currentZoom;
        this.zoomStep               =  zoom >= 10 ? 1.0 : zoom >= 3 ? 0.5 : 0.1

        if( ev.deltaY < 0 ) zoom    = this.roundSteps( zoom, this.zoomStep ) + this.zoomStep;
        else zoom                   = this.roundSteps( zoom, this.zoomStep ) - this.zoomStep;

        zoom                        = Math.max( this.minZoom, Math.min( this.maxZoom, zoom ) );
        this.lastPoint              = { x: ev.offsetX, y: ev.offsetY };
        this.zoomState.zoom         = zoom;

        this.canvas.zoomToPoint( this.lastPoint, zoom );
        ev.preventDefault();
        ev.stopPropagation();
    }

    zoomIn() {
        let zoom = this.roundSteps( this.currentZoom, this.zoomStep ) + this.zoomStep;
        zoom = Math.min(this.maxZoom, zoom);
        this.canvas.zoomToPoint(this.lastPoint, zoom);
        this.zoomState.zoom = zoom;
    }

    zoomOut() {
        let zoom = this.roundSteps( this.currentZoom, this.zoomStep ) - this.zoomStep;
        zoom = Math.max(this.minZoom, zoom);
        this.canvas.zoomToPoint(this.lastPoint, zoom);
        this.zoomState.zoom = zoom;
    }

    zoomTo( val ) {
        this.resetZoom()
        const center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.canvas.zoomToPoint(center, val);
        this.zoomState.zoom = val;
    }


    resetZoom() {
        this.scene.backgroundItem.fitToScreen();
        this.zoomState.zoom = this.currentZoom;
    }
    get currentZoom() { return this.canvas.getZoom(); }

}