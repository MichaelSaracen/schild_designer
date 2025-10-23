import {Triangle} from "fabric";


export class TriangleItem extends Triangle  {
    constructor( options, scene ) {
        super( options );
        const defaultOptions = {
            fill: "rgb(246,195,241)",
            width: 300,
            height: 200,
            strokeWidth: 1,
            stroke: 'black'
        };
        this.set(defaultOptions);
        this.set( options );

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "TriangleItem"
        this.name               = "Dreieck"
        this.baseSize           = {};
        this.index              = 0;
        this.guideLines         = []
    }
}

