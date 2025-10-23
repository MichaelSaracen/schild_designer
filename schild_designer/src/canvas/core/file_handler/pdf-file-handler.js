import { FileHandler } from "@/canvas/core/file_handler/file-handler.js";
import {PDFDocument, rgb, degrees, pushGraphicsState, popGraphicsState, translate, rotateRadians} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { toRaw } from "vue";
import { getFontPath } from "@/assets/js/font-map.js";
import {Color} from "fabric";
import {Colors} from "@/canvas/utils/theme.js";

export class PdfFileHandler extends FileHandler {
    constructor(scene) {
        super(scene);
    }

    load() {}

    async save(projectName, format = "pdf") {
        this.isSaving.value = true;

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        const canvas = this.canvas;
        const itemLayerModel = this.scene.controller.itemLayerModel;
        const layers = itemLayerModel.layers;

        if (!layers || layers.length === 0) {
            console.warn("Keine Layer gefunden.");
            return;
        }

        // === Fonts sammeln ===
        const usedFonts = itemLayerModel.usedFonts;
        const fontMap = {};
        for (const f of usedFonts) {
            const path = getFontPath(f.family, f.weight);
            if (!path) continue;

            const response = await fetch(path);
            if (!response.ok) continue;

            const bytes = await response.arrayBuffer();
            fontMap[`${f.family}-${f.weight}`] = await pdfDoc.embedFont(bytes);
        }

        // === Canvas sichern ===
        const originalZoom = canvas.getZoom();
        const originalTransform = [...canvas.viewportTransform];
        const originalObjects = canvas.getObjects();

        try {
            for (const layer of layers) {
                canvas.clear();
                const rawItems = toRaw(layer.items);
                const bounds = this.scene.backgroundRect;
                const width = bounds.width;
                const height = bounds.height;

                canvas.setZoom(1);
                canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
                canvas.requestRenderAll();

                const page = pdfDoc.addPage([width, height]);

                for (const item of rawItems) {

                    if (item.objectName === "TextItem" || item.objectName === "TextBoxItem") {
                        const text = item.text || "";
                        const fontFamily = item.fontFamily || "Vegur";
                        const fontWeight = item.fontWeight || 400;
                        const fontKey = `${fontFamily}-${fontWeight}`;
                        const font = fontMap[fontKey] || fontMap["Vegur-400"];
                        if (!font) continue;

                        // === Farbe ===
                        const fabricColor = new Color(item.fill);
                        const [r, g, b] = fabricColor.getSource();
                        let color = rgb(r / 255, g / 255, b / 255);

                        if ( item.globalCompositeOperation === 'destination-out' ) {
                            const magentaColor = new Color( Colors.magenta );
                            const [r, g, b] = magentaColor.getSource();
                            color = rgb(r / 255, g / 255, b / 255);
                        }

                        // === Grundwerte ===
                        const fontSize = item.fontSize || 14;
                        const angle = -(item.angle || 0) * Math.PI / 180;
                        const x = item.left || 0;
                        const y = height - (item.top || 0);

                        // === Textmaße mit pdf-lib API ===
                        const textWidth = font.widthOfTextAtSize(text, fontSize);
                        const textHeight = font.heightAtSize(fontSize); // reale Boxhöhe
                        const ascent = textHeight * 0.725;                // grobe Oberlänge

                        // === Pivot berechnen wie in Fabric ===
                        let pivotX = 0, pivotY = 0;
                        switch (item.originX) {
                            case "center": pivotX = textWidth / 2; break;
                            case "right":  pivotX = textWidth; break;
                        }
                        switch (item.originY) {
                            case "center": pivotY = textHeight / 2; break;
                            case "bottom": pivotY = textHeight; break;
                        }

                        // === Transformation: gleiches Verhalten wie Fabric ===
                        page.pushOperators(pushGraphicsState());
                        page.pushOperators(translate(x + pivotX, y - pivotY));
                        page.pushOperators(rotateRadians(angle));
                        page.pushOperators(translate(-pivotX, pivotY));

                        // === Text zeichnen (Baseline = Ascent-Versatz) ===
                        page.drawText(text, {
                            x: 0,
                            y: -ascent,
                            size: fontSize,
                            font,
                            color,
                            lineHeight: item.lineHeight,
                            opacity: item.opacity,
                        });

                        page.pushOperators(popGraphicsState());
                    } else {
                        canvas.clear();
                        for (const o of rawItems) {
                            if (o.objectName !== "TextItem" && o.objectName !== "TextBoxItem") {
                                canvas.add(o);
                            }
                        }
                        canvas.requestRenderAll();

                        const dataURL = canvas.toDataURL({
                            format: "png",
                            left: bounds.left,
                            top: bounds.top,
                            width,
                            height,
                            multiplier: 1,
                            enableRetinaScaling: false,
                        });

                        const pngBytes = await fetch(dataURL).then(r => r.arrayBuffer());
                        const pngImage = await pdfDoc.embedPng(pngBytes);
                        const x = item.left || 0;
                        const y = height - (item.top || 0) ;

                        page.drawImage(pngImage, {
                            x: 0,
                            y: 0,
                            width,
                            height,
                        });

                        canvas.clear();
                    }
                }
                canvas.clear();
            }
        } finally {
            canvas.clear();
            canvas.add(...originalObjects);
            canvas.viewportTransform = originalTransform;
            canvas.setZoom(originalZoom);
            canvas.requestRenderAll();
        }

        // === PDF speichern ===
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${projectName}.pdf`;
        link.click();

        this.isSaving.value = false;
    }

}
