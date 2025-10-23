import {SceneComponent} from "@/canvas/core/scene-component.js";

export class SnapController extends SceneComponent {
    constructor( scene ) {
        super( scene );

        if ( new.target === SnapController ) {
            throw new Error("Die Klasse SnapController kann nicht instanziiert werden.")
        }

        this.snapDistance = 3;
        this.releaseFactor = 1;
        this.snapPos = { x: null, y: null }
    }

    inDistance( pos ) {
        return Math.abs( pos ) < this.snapDistance;
    }

    outDistance( pos ) {
        return Math.abs( pos ) > this.snapDistance * this.releaseFactor;
    }

    /**
     * ## Versucht, ein Objekt entlang der X-Achse an einer Zielposition einzurasten.
     *
     * > Wenn das Objekt nahe genug an der Zielposition ist (|dx| < this.distance), wird es an diese Geometry gesetzt
     *   und `this.snapped.x` gespeichert.
     *
     * > Solange `this.snapped.x` gesetzt ist, bleibt das Objekt an dieser Geometry fixiert.
     *
     * > Sobald das Objekt weit genug vom Snap-Punkt weggezogen wird (|dx| > this.distance * this.releaseFactor),
     *   wird der Snap wieder aufgehoben (`this.snapped.x = null`) und das Objekt bewegt sich frei.
     * ---
     * @param {Object} target - Das aktuell bewegte Fabric-Objekt, dessen X-Geometry angepasst wird.
     * @param {number} dx - Differenz zwischen aktueller Objektposition und der gewünschten Snap-Geometry.
     *                      Wird typischerweise berechnet als (targetRect.left - reference.left) oder ähnlich.
     * @param {number} pos - Die Zielposition (linke Kante), an die das Objekt einrasten soll.
     * @param {any} guide - Guide als String (left, right, top, bottom, centerX, centerY).
     */
    snapX(target, dx, pos, guide = null, useCornerOffset = false, cornerX = null) {
        if (this.snapPos.x === null && Math.abs(dx) < this.snapDistance) {
            this.snapPos.x = pos;
        } else if (this.snapPos.x !== null && Math.abs(dx) > this.snapDistance * this.releaseFactor) {
            this.snapPos.x = null;
        }

        if (this.snapPos.x !== null) {
            if (guide && typeof guide === "string" && !target.guideLines.includes(guide))
                target.guideLines.push(guide);

            // 🟣 FIX: stabile Kantenbremse gegen Flicker bei voller Breite
            if (useCornerOffset && cornerX !== null) {
                const offset = pos - cornerX;

                // Wenn beide Seiten im Snap-Bereich sind, keine Bewegung!
                const bothEdgesSnapped =
                    target.guideLines.includes("left") && target.guideLines.includes("right");

                if (!bothEdgesSnapped && Math.abs(offset) > 0.001) {
                    target.left += offset;
                }
            } else {
                target.left = this.snapPos.x;
            }
        }
    }

    /**
     * ## Versucht, ein Objekt entlang der Y-Achse an einer Zielposition einzurasten.
     *
     * > Wenn das Objekt nahe genug an der Zielposition ist (|dy| < this.distance), wird es an diese Geometry gesetzt
     *   und `this.snapped.y` gespeichert.
     *
     * > Solange `this.snapped.y` gesetzt ist, bleibt das Objekt an dieser Geometry fixiert.
     *
     * > Sobald das Objekt weit genug vom Snap-Punkt weggezogen wird (|dy| > this.distance * this.releaseFactor),
     *   wird der Snap wieder aufgehoben (`this.snapped.y = null`) und das Objekt bewegt sich frei.
     * ---
     * @param {Object} target - Das aktuell bewegte Fabric-Objekt, dessen Y-Geometry angepasst wird.
     * @param {number} dy - Differenz zwischen aktueller Objektposition und der gewünschten Snap-Geometry.
     *                      Wird typischerweise berechnet als (targetRect.top - reference.top) oder ähnlich.
     * @param {number} pos - Die Zielposition (obere Kante), an die das Objekt einrasten soll.
     * @param {any} guide - Guide als String (left, right, top, bottom, centerX, centerY).
     */
    snapY(target, dy, pos, guide = null, useCornerOffset = false, cornerY = null) {
        if (this.snapPos.y === null && Math.abs(dy) < this.snapDistance)
            this.snapPos.y = pos;
        else if (this.snapPos.y !== null && Math.abs(dy) > this.snapDistance * this.releaseFactor)
            this.snapPos.y = null;

        if (this.snapPos.y !== null) {
            if (guide && typeof guide === "string" && !target.guideLines.includes(guide))
                target.guideLines.push(guide);

            // 🟣 FIX: stabile Kantenbremse gegen Flicker bei voller Höhe
            if (useCornerOffset && cornerY !== null) {
                const offset = pos - cornerY;

                const bothEdgesSnapped =
                    target.guideLines.includes("top") && target.guideLines.includes("bottom");

                if (!bothEdgesSnapped && Math.abs(offset) > 0.001) {
                    target.top += offset;
                }
            } else {
                target.top = this.snapPos.y;
            }
        }
    }

    snapScaleX( target, dx, pos, scaleX,  guide = null ) {
        if ( this.snapPos.x === null && this.inDistance( dx ) ) {
            this.snapPos.x = pos;
        }
        else if ( this.snapPos.x !== null && this.outDistance( dx )) {
            this.snapPos.x = null;
        }
        if ( this.snapPos.x !== null ) {
            if( guide && typeof guide === "string" && !target.guideLines.includes( guide ))
                target.guideLines.push(guide);
            target.left = this.snapPos.x;
            target.scaleX = scaleX;
            return true;
        }
        return false;
    }

    snapScaleY( target, dy, pos, scaleY,  guide = null ) {
        if ( this.snapPos.y === null && this.inDistance( dy ) ) {
            this.snapPos.y = pos;
        }
        else if ( this.snapPos.y !== null && this.outDistance( dy )) {
            this.snapPos.y = null;
        }
        if ( this.snapPos.y !== null ) {
            if( guide && typeof guide === "string" && !target.guideLines.includes( guide ))
                target.guideLines.push(guide);
            target.top = this.snapPos.y;
            target.scaleY = scaleY;
            return true;
        }
        return false;
    }

}