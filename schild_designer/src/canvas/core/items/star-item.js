// StarItem.js
import { Polygon } from "fabric";
import { PolygonItem } from "./polygon-item.js";

export class StarItem extends Polygon {
    constructor(options = {}, scene) {
        // 🟡 Standardwerte (bleiben anpassbar)
        const defaultOptions = {
            left: 100,
            top: 100,
            fill: "#F6C3F1",
            stroke: "black",
            strokeWidth: 1,
            numPoints: 5,
            innerRadius: 30,
            outerRadius: 60,
        };

        const opts = { ...defaultOptions, ...options };

        // 🔹 Stern-Punkte generieren
        const points = StarItem._generateStarPoints(
            opts.numPoints,
            opts.innerRadius,
            opts.outerRadius
        );

        // ⚠️ HIER: super() mit deinen Attributen beibehalten!
        super(points, { ...opts  });

        // ✅ deine Originalattribute beibehalten!
        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "StarItem";
        this.name               = "Stern";
        this.baseSize           = {};
        this.index              = 0;
        this.guideLines         = [];
    }

    // 🔹 Hilfsmethode: berechnet Punkte für Polygonstern
    static _generateStarPoints(numPoints, innerRadius, outerRadius) {
        const points = [];
        const step = Math.PI / numPoints;
        for (let i = 0; i < 2 * numPoints; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = i * step - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            points.push({ x, y });
        }
        return points;
    }
}
