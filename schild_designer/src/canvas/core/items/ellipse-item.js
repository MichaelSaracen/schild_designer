import {Circle} from "fabric";


export class EllipseItem extends Circle  {
    constructor( options, scene ) {
        super( options );
        const defaultOptions = {
            fill: "rgb(246,195,241)",
            radius: scene ? scene.dpiUnit.mmToPx(10) : 150,
            strokeWidth: 1,
            stroke: 'black'
        };
        this.set(defaultOptions);
        this.set( options );

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "EllipseItem"
        this.name               = "Ellipse"
        this.baseSize           = {};
        this.index              = 0;
        this.guideLines         = []
    }
}

