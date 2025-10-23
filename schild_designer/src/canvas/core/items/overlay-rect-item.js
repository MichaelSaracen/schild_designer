import {Rect} from "fabric";


export class OverlayRectItem extends Rect {
    constructor(options, scene) {
        super(options);

        const setup = scene.setup;
        const defaultOptions = {
            width: setup.backgroundWidth,
            height: setup.backgroundHeight,
            fill: 'black', excludeFromExport: true, selectable: false,
            evented: false, hoverCursor: "default", strokeWidth: 0,
            moveCursor: 'default',
            globalCompositeOperation: 'destination-in'
        }

        this.set(defaultOptions);
        this.set(options);

        this.objectName = 'Overlay';
        this.name = "+#$_#@Overlay_@²-_##2";
    }
}