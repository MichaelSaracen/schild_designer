import {SceneComponent} from "@/canvas/core/scene-component.js";


export class PositionController extends SceneComponent {
    constructor( scene, model ) {
        super( scene );

        this.model = model;
    }

    moveItemOnGrid( e ) {
        const target = e;
        if ( !target ) return;
        const step = this.scene.movingSteps;
        target.left = this.roundSteps( target.left, 1);
        target.top = this.roundSteps( target.top, 1);
    }

    handleMoveMent( e ) {
        this.moveItemOnGrid( e.target );
        this.model.updateStates( e.target );
    }

    align( pos ) {
        const target = this.canvas.getActiveObject();
        if (!target) return;
        const bgRect =  this.scene.backgroundSceneRect ;
        const tRect = this.stableRect( target );

        const map = {
            left: () => target.left = 0,
            leftRight: () => target.left = bgRect.centerX - tRect.width,
            centerX: () => target.left = bgRect.centerX - tRect.width / 2,
            rightLeft: () => target.left = bgRect.centerX,
            right: () => target.left = bgRect.right - tRect.width,
            top: () => target.top = 0,
            topBottom: () => target.top = bgRect.centerY - tRect.height,
            centerY: () => target.top = bgRect.centerY - tRect.height / 2,
            bottomTop: () => target.top = bgRect.centerY,
            bottom: () => target.top = bgRect.bottom - tRect.height
        }

        if ( map[pos] ) this.model.applyToTarget( () => map[pos]() );
    }

}