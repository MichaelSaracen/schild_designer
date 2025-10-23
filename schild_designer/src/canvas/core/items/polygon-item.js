import {Polygon} from "fabric";


export class PolygonItem extends Polygon  {
    constructor( options = {}, scene ) {
        const defaultOptions = {
            left: 100,
            top: 100,
            fill: "#F6C3F1",
            strokeWidth: 1,
            stroke: 'black',
            numPoints: 5,
            radius: 100
        };

        const opts = { ...defaultOptions, ...options };

        const points = PolygonItem._generatePolygonPoint( opts.numPoints, opts.radius );

        super(points, { ...opts });

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "PolygonItem";
        this.name               = "Polygon";
        this.baseSize           = {};
        this.index              = 0;
        this.guideLines         = []
    }

    static _generatePolygonPoint( numPoints, radius ) {
        const points = []
        const step = (Math.PI * 2) / numPoints;

        for ( let i = 0; i < numPoints; i++ ) {
            const angle = i * step - Math.PI / 2;
            const x = Math.cos( angle ) * radius;
            const y = Math.sin( angle ) * radius;
            points.push( { x, y });
        }

        return points;
    }
}


































