import {SceneComponent} from "@/canvas/core/scene-component.js";
import {SelectionModel} from "@/canvas/core/models/selection-model.js";
import {SelectionController} from "@/canvas/core/controller/selection-controller.js";
import {ItemLayerModel} from "@/canvas/core/models/item-layer-model.js";
import {ItemLayerController} from "@/canvas/core/controller/item-layer-controller.js";
import {ItemModel} from "@/canvas/core/models/item-model.js";
import {ItemController} from "@/canvas/core/controller/item-controller.js";
import {PanController} from "@/canvas/core/controller/pan-controller.js";
import {ZoomController} from "@/canvas/core/controller/zoom-controller.js";
import {reactive, ref} from "vue";
import {SnapBackgroundController} from "@/canvas/core/controller/snap/snap-background-controller.js";
import {SnapToGridController} from "@/canvas/core/controller/snap/snap-to-grid-controller.js";
import {PositionController} from "@/canvas/core/controller/position-controller.js";
import {SizeController} from "@/canvas/core/controller/size-controller.js";
import {KeyController} from "@/canvas/core/controller/key-controller.js";
import {ImageFilterModel} from "@/canvas/core/models/image-filter-model.js";


export class ControllerManager extends SceneComponent {
    constructor( scene ) {
        super( scene );

        this.panController              = new PanController( scene );
        this.zoomController             = new ZoomController( scene );

        this.snapBackgroundController   = new SnapBackgroundController( scene );
        this.snapToGridController       = new SnapToGridController( scene );

        this.selectionModel             = new SelectionModel( scene );
        this.selectionController        = new SelectionController( scene, this.selectionModel );
        this.positionController         = new PositionController( scene, this.selectionModel );
        this.sizeController             = new SizeController( scene, this.selectionModel );

        this.itemModel                  = new ItemModel( scene );
        this.itemController             = new ItemController( scene, this.itemModel );

        this.itemLayerModel             = new ItemLayerModel( scene );
        this.itemLayerController        = new ItemLayerController( scene, this.itemLayerModel );

        this.keyController              = new KeyController( scene );

        this.imageFilterModel           = new ImageFilterModel( scene );
    }

    registerEvents() {
        window.addEventListener( 'keydown', (e) =>  this.keyController.handleEvent(e) );
        this.canvas.on( 'mouse:down',           (e) => {
            this.selectionController.handleContextMenu( e );
            this.panController.handleMouseDownEvent(e);
        } );

        this.canvas.on( 'mouse:move',           (e) => {
            this.panController.handleMouseMoveEvent(e);
            this.snapBackgroundController.handleEvent( e );

        });

        this.canvas.on( 'mouse:up',           (e) => {
            this.itemModel.clearGuideLines();
        });

        this.canvas.on( 'mouse:up',             ( ) => this.panController.handleMouseUpEvent( ) );

        this.canvas.on( 'mouse:wheel',          (e) => {
            this.zoomController.handelWheelEvent(e);
        } );

        this.canvas.on( "selection:created",    (e) => {
            this.selectionController.handleEvent(e)
        } );

        this.canvas.on( "selection:updated",    (e) => this.selectionController.handleEvent( e ) );

        this.canvas.on( "selection:cleared",    (e) => this.selectionController.handleClearEvent() );

        this.canvas.on( "object:moving",        (e) => {
            if ( this.panController.dragged ) return;

            this.selectionController.handleTransformEvent(e);
            this.snapToGridController.handleGridSnap( e.target, e.pointer );
            this.snapToGridController.handleItemSnap( e.target, e.pointer );
            this.positionController.handleMoveMent( e );
        } );

        this.canvas.on('object:scaling', (e) => {
            this.sizeController.handleScaling( e );
            this.snapToGridController.handleScaleSnap( e.target, e.transform.corner, e.pointer);
            //this.snapToGridController.handleItemSnap( e.target, e.pointer );
        });

        this.canvas.on( "object:skewing",       (e) => this.selectionController.handleTransformEvent( e ) );

        this.canvas.on( "object:rotating",      (e) => {
            this.selectionController.handleTransformEvent(e);
        }) ;

        this.canvas.on( 'object:added',         (e) => {
        });

        this.canvas.on( 'object:removed',       (e) => {
            this.itemController.handleEvent(e)
        });

    }
}