import {SceneComponent} from "@/canvas/core/scene-component.js";

export class SizeController extends SceneComponent {
    constructor( scene, model ) {
        super( scene );

        this.model = model;
    }

    handleScaling( e ) {
        this.onResize( e )
        this.onResize2( e );
        this.model.updateStates( e.target );
    }

    onResize(e) {
        const target = e.target;
        if (!target) return;

        if (target.objectName === "TextItem" || target.objectName === "TextBoxItem") {
            // Alte Werte sichern
            const oldFontSize = target.fontSize || 32;
            const oldWidth = target.width;
            const oldHeight = target.height;

            const newFontSize = oldFontSize * target.scaleY;
            if (target.scaleY !== 1) {
                target.set({
                    fontSize: newFontSize,
                });
            }

            // 2️⃣ Wenn Breite verändert → Textbox-Breite ändern, ohne Stretch
            if (target.scaleX !== 1) {
                const newWidth = oldWidth * target.scaleX;

                const textWidth = (target.__lineWidths?.length ? Math.max(...target.__lineWidths) : target.width) + target.padding * 2;

                const finalWidth = Math.max(newWidth, textWidth);
                target.set({ width: finalWidth });
            }

            // 3️⃣ Skalierungen zurücksetzen → kein Stretch!
            target.set({
                scaleX: 1,
                scaleY: 1,
            });

            // 4️⃣ BoundingBox neu berechnen
            target.setCoords();
        }

    }
    onResize2(e) {
        const target = e.target;
        if ( !target ) return;
        if (target.objectName === "TextItem" || target.objectName === "TextBoxItem") return;


        const pointer = e.pointer;
        const corner = e.transform.corner;

        const step = 1;
        const baseW = Number(target.width)  || 1;
        const baseH = Number(target.height) || 1;
        const bgRect = this.scene.backgroundSceneRect;
        const tRect  = this.stableRect(target);

        const curW = target.getScaledWidth() - target.strokeWidth;
        const curH = target.getScaledHeight() - target.strokeWidth;

        let snapW = Math.max(step, this.roundSteps(curW, step));
        let snapH = Math.max(step, this.roundSteps(curH, step));

        const snapL = this.roundSteps(pointer.x - bgRect.left, step);
        const snapT = this.roundSteps(pointer.y - bgRect.top, step);

        const minSize = step + Math.round(target.strokeWidth, step);


        // 1️⃣ links scaling
        if (corner.includes("l")) {
            const newLeft = Math.min(snapL, tRect.right - minSize);
            const newWidth = tRect.right - newLeft - target.strokeWidth;
            const newScaleX = newWidth / baseW;
            if (!isFinite(newScaleX) || newScaleX <= 0) return;
            target.set({ left: newLeft, scaleX: newScaleX });
        }

        if (corner.includes("t")) {
            const newTop = Math.min(snapT, tRect.bottom - minSize);
            const newHeight = tRect.bottom - newTop - target.strokeWidth;
            const newScaleY = newHeight / baseH;
            if (!isFinite(newScaleY) || newScaleY <= 0) return;
            target.set({ top: newTop, scaleY: newScaleY });
        }

        if ( corner.includes('r') ) {
            const newScaleX = snapW / (baseW );
            if (isFinite(newScaleX) && newScaleX > 0) {
                target.set({ scaleX: newScaleX });
            }
        }

        if (corner.includes('b') ) {
            const newScaleY = snapH / baseH;
            if (isFinite(newScaleY) && newScaleY > 0) {
                target.set({ scaleY: newScaleY });
            }
        }
    }

}



