import {SceneComponent} from "@/canvas/core/scene-component.js";


export class PaintEngine extends SceneComponent{
    constructor( scene ) {
        super( scene );

    }

    clear( ctx, rect ) {
        ctx.setTransform( 1, 0, 0, 1, 0, 0 );
        ctx.clearRect( rect.x, rect.y, rect.width, rect.height );
    }

    drawText( ctx, text, x, y, fontSize = 12, fillStyle = "#5d73bf",
              bgColor = "rgba(35,34,34,0.34)", borderColor = "rgba(208,208,208,0.25)", padding = 4
    ) {
        ctx.save()
        ctx.font = `${fontSize}px Arial`;
        ctx.textBaseline = "alphabetic";
        ctx.textAlign = "left";
        ctx.setLineDash([]);

        const {textWidth, textHeight} = this.measureText(ctx, text, fontSize );


        const bgRect = { x: x - padding * 2, y: y - padding, width: textWidth + padding * 4, height: textHeight + padding * 2};

        ctx.fillStyle = bgColor;
        ctx.fillRect( bgRect.x, bgRect.y, bgRect.width, bgRect.height);

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect( bgRect.x, bgRect.y, bgRect.width, bgRect.height )

        // const textX = bgRect.x + bgRect.width / 2;
        const textY = bgRect.y + (bgRect.height + textHeight) / 2;

        ctx.fillStyle = fillStyle;
        ctx.fillText( text, x, textY -2 );
        ctx.restore();
    }


    drawTransformedCtx(ctx, cb) {
        ctx.save();
        const vpt = [...this.scene.canvas.viewportTransform];
        ctx.setTransform(vpt[0], vpt[1], vpt[2], vpt[3], vpt[4], vpt[5]);
        const scale = vpt[0];
        cb(scale);
        ctx.restore();
    }

    drawComposite( ctx, globalCompositeOperation, cb ) {
        ctx.save();
        ctx.globalCompositeOperation = globalCompositeOperation;
        cb();
        ctx.restore();
    }

    fillRect( ctx, rect, color = '#111' ) {
        ctx.fillStyle = color;
        ctx.fillRect( rect.x, rect.y, rect.width, rect.height );
    }

    measureText( ctx, text, fontSize = 12 ) {
        ctx.save();
        ctx.font = `${fontSize}px Arial`;
        const metrics = ctx.measureText( text );
        const textWidth = metrics.width;
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        ctx.restore();
        return { textWidth , textHeight };
    }


    strokeRect( ctx, rect, lineWidth = 1, color = '#ff48d2' ) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect( rect.x, rect.y, rect.width, rect.height );
    }

    strokeDashRect( ctx, rect, lineWidth = 1, lineDash = [10, 5],  color = '#ff48d2' ) {
        ctx.save();
        ctx.setLineDash(lineDash);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect( rect.x , rect.y, rect.width, rect.height );
        ctx.restore();
    }

    roundRect(ctx, rect, radius, lineWidth = 1, fillStyle = '#1e2227', strokeStyle = '#ff48d2') {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.roundRect( rect.x , rect.y, rect.width, rect.height, [radius] );
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }


    drawVerticalLine( ctx, x, y, height, lineWidth = 1, strokeStyle = "#5d73bf" ) {
        this.strokeLine( ctx, x, y, x, height, lineWidth, strokeStyle );
    }

    drawHorizontalLine( ctx, y, x, width, lineWidth = 1, strokeStyle = "#5d73bf" ) {
        this.strokeLine( ctx, x, y, width, y, lineWidth, strokeStyle );
    }

    strokeLine(ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "#111111") {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}