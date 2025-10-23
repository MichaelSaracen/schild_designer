// HeartItem.js
import { Path } from "fabric";

export class PathItem extends Path {
    constructor(pathData, options = {}, scene, name = 'Path') {
        const defaultOptions = {
            left: 100,
            top: 100,
            scaleX: 1,
            scaleY: 1,
            fill: "#F44336",
            stroke: "black",
            strokeWidth: 1,
        };

        const opts = { ...defaultOptions, ...options };

        // ⚙️ Super mit Pathdaten aufrufen
        super(pathData, opts);

        // 🔹 Deine Szeneninfos beibehalten
        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "PathItem";
        this.name               = name;
        this.baseSize           = {};
        this.index              = 0;
        this.guideLines         = [];
    }
}
