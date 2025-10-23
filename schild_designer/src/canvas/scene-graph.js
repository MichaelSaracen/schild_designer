import {PrivateSceneGraph} from "@/canvas/private-scene-graph.js";
import {ControllerManager} from "@/canvas/core/manager/controller-manager.js";
import {markRaw, reactive} from "vue";
import {PaintEngine} from "@/canvas/core/paint-engine.js";
import {LayerManager} from "@/canvas/core/manager/layer-manager.js";
import {FileHandlerManager} from "@/canvas/core/manager/file-handler-manager.js";
import {AppSettings} from "@/canvas/core/app-settings.js";
import {DpiUnit} from "@/canvas/utils/dpi-unit.js";
import {Setup} from "@/canvas/core/setup.js";
import {Canvas, InteractiveFabricObject} from "fabric";
import {BackgroundItem} from "@/canvas/core/items/background-item.js";
import * as fabric from "fabric";
import {BackgroundImageItem} from "@/canvas/core/items/background-image-item.js";
import {CommandManager} from "@/canvas/core/command/command-manager.js";
import {OverlayRectItem} from "@/canvas/core/items/overlay-rect-item.js";

export class SceneGraph extends PrivateSceneGraph {
    constructor( settings, canvasElement ) {
        super(settings, canvasElement)
        this._updateKey         = reactive( { value : 0 } );
        this.states             = reactive( { selected: null, active: null } );

        this.canvasElement      = canvasElement;
        this.canvas             = markRaw(new Canvas( this.canvasElement, {
            selection: true, preserveObjectStacking: true, fireRightClick: true, selectionKey: "ctrlKey",
            uniformScaling: true, hoverCursor: 'default', moveCursor: 'default'
        }));

        this.command            = new CommandManager( );

        this.dpiUnit            = new DpiUnit( );
        this.setup              = new Setup( this, settings );

        this.appSettings        = new AppSettings( this );
        this.paintEngine        = new PaintEngine( this );

        this.backgroundItem     = null;
        this.overlayer          = null;

        if ( this.setup.imageSource ) {
            this.backgroundItem = new BackgroundImageItem( this.setup.imageSource,{}, this );
            this.canvas.add(this.backgroundItem );
            this.canvas.add(this.backgroundItem.overlayer)

        }
        else {
            this.backgroundItem  = new BackgroundItem( {}, this );
            this.overlayer       = new OverlayRectItem( {}, this );
            //this.canvas.add(this.backgroundItem );
            //this.canvas.add(this.backgroundItem .overlayer)
        }

        this.files              = new FileHandlerManager( this );

        this.layers             = new LayerManager( this );
        this.layers.registerEvents();

        this.controller         = new ControllerManager( this );
        this.controller.registerEvents();


        this.controller.itemLayerModel.addItem( this.backgroundItem, false );
        this.canvas.discardActiveObject();

        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    activeObject( ) {  return this.states.active ; }

    setActiveObject( v ) { this.controller.selectionModel.select( v ) }
    setActiveObjectValue( key, value ) { this.controller.selectionModel.setValue( key, value ); }
    setActiveObjectValueOnGrid( key, value ) {
        const px = this.dpiUnit.mmToPx(value);
        this.setActiveObjectValue( key, px );
    }

    get backgroundRect( ) {
        return { x: 0, y: 0, width: this.setup.backgroundWidth, height: this.setup.backgroundHeight }
    }

    get backgroundSceneRect( ) {
        const left = 0;
        const top = 0;
        const width = this.setup.backgroundWidth;
        const height = this.setup.backgroundHeight;
        return {
            left, top, width, height,
            right: left + width,
            bottom: top + height,
            centerX: left + width / 2,
            centerY: top + height / 2
        }
    }

    /**
     *
     * @returns {{width: number, height: number}}
     */
    get canvasElementSize() {
        const parent            = this.canvasElement.closest( '.canvas-view' );
        return { width: parent.clientWidth, height: parent.clientHeight };
    }

    canvasToSceneCoords() {
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        return {
            left: 0, right: cw, top: 0, bottom: ch, centerX: cw / 2, centerY: ch / 2
        };
    }

    get movingSteps() { return { small: this.dpiUnit.mmToPx(1), large: this.dpiUnit.mmToPx(10) } }

    /**
     *
     */
    resize() {
        const { width, height } = this.canvasElementSize;
        if (width === 0 || height === 0) return;
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        this.canvas.calcOffset();
        this.backgroundItem.fitToScreen();
        this.update();
        this.layers.resize();
    }

    /**
     *
     */
    update( renderAll = true ) {
        this._updateKey.value = this._updateKey.value % 10;
        this._updateKey.value += 1;

        if ( renderAll )
            this.canvas.requestRenderAll();
    }

    unselect() {
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
    }


    roundOnMovingSteps( pos, large = false ) {
        const steps = 1;
        return Math.round( pos / steps ) * steps;
    }

    toViewportCoords() {
        if ( this.files.isSaving() ) return;
        const vpt       = this.canvas.viewportTransform;
        const scale     = vpt[0], offsetX = vpt[4], offsetY = vpt[5];
        const bgW       = this.setup.backgroundWidth * scale;
        const bgH       = this.setup.backgroundHeight * scale;

        return {
            left:       offsetX,
            top:        offsetY,
            right:      offsetX + bgW,
            bottom:     offsetY + bgH,
            centerX:    offsetX + bgW / 2,
            centerY:    offsetY + bgH / 2,
            width:      bgW,
            height:     bgH
        };
    }

    get viewport() {
        const roundSteps = ( pos, steps ) => { return Math.round( pos / steps ) * steps; }

        const bgRect = this.backgroundRect;
        const ce = this.canvasElement;

        const vpt = this.canvas.viewportTransform;
        const [zoom, offsetX, offsetY ] = [vpt[0], vpt[4],vpt[5]];

        let left = offsetX > 0 ? 0 : Math.round(Math.abs(offsetX) / zoom)
        let top = offsetY > 0 ? 0 :  Math.round(Math.abs(offsetY) / zoom)

        left = this.roundOnMovingSteps( left );
        top = this.roundOnMovingSteps( top );

        const width = bgRect.width * zoom;
        const height = bgRect.height * zoom;
        const right = width + offsetX;
        const bottom = height + offsetY;

        const visibleWidth = right < ce.width ? 0 : (ce.width - right) / zoom;
        const visibleHeight = bottom < ce.height ? 0 : (ce.height - bottom) / zoom;

        return { left, top, width : bgRect.width + visibleWidth, height: bgRect.height + visibleHeight }
    }

}