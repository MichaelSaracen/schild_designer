import {markRaw, reactive, ref, toRaw} from "vue";
import {Canvas, InteractiveFabricObject, Object} from "fabric";
import {BackgroundItem} from "@/canvas/core/items/background-item.js";
import {Setup} from "@/canvas/core/setup.js";
import {DpiUnit} from "@/canvas/utils/dpi-unit.js";

export class PrivateSceneGraph {
    constructor(settings, canvasElement) {
        if ( new.target === PrivateSceneGraph ) throw new Error( 'PrivateSceneGraph kann nicht instanziiert werden.' );

        InteractiveFabricObject.ownDefaults = {
            ...InteractiveFabricObject.ownDefaults,
            perPixelTargetFind: false,
            transparentCorners: false,
            selectable: true,
            strokeUniform: true,
            lockScalingFlip: true,
            objectCaching: false,
            centeredRotation: true,
            strokeWidth: 0,
            snapAngle: 1,
            noScaleCache: true

            /*controls: defaultControls*/
        }

        Object.prototype.toObject = (function(toObject) {
            return function(propertiesToInclude) {
                return toObject.call(this, (propertiesToInclude || []).concat([
                    'objectName',
                    'name',
                    'layer',
                    'baseSize'
                ]));
            };
        })(Object.prototype.toObject);

    }











}