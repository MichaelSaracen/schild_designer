import {Rect, Control} from "fabric";

export class RectangleItem extends Rect {
    constructor(options = {}, scene) {
        super(options);

        const defaultOptions = {
            fill: "rgb(246,195,241)",
            width: scene ? scene.dpiUnit.mmToPx(30) : 300,
            height: scene ? scene.dpiUnit.mmToPx(20) : 200,
            strokeWidth: 1,
            stroke: 'black'
        };

        this.set(defaultOptions);
        this.set(options);

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "RectangleItem";
        this.name               = "Rechteck";
        this.baseSize           = { width: defaultOptions.width, height: defaultOptions.height };
        this.index              = 0;
        this.guideLines         = [];

    }



}
