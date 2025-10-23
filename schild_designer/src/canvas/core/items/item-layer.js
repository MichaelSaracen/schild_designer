import {SceneComponent} from "@/canvas/core/scene-component.js";
import {reactive, toRaw} from "vue";
import {Colors} from "@/canvas/utils/theme.js";


export class ItemLayer extends SceneComponent{
    constructor( scene, parent, name = 'Layer') {
        super( scene );
        this.parent = parent;
        this.items = reactive([] ) ;
        this.objectName = 'Layer';
        this._name = this.getName( this, name, this.parent.layers );
        this.visible = true;
        this._canDraw = true;
        this.registerEvents();
    }

    clear() {

        this.items.forEach( o => {
            const object = toRaw( o );
            if ( object.objectName !== 'BackgroundItem') {
                this.scene.controller.itemModel.removeItem(object)
            }

        })
        this.items = this.items.filter( o => o.objectName === 'BackgroundItem')

        console.log(this.items)
        console.log(this.scene.controller.itemModel.items)
    }

    addItem( item ) {
        item.layer = this._name;
        this.items.push( item );
        this.scene.controller.itemModel.addItem( item );
    }

    insertItem( index, item ) {
        item.layer = this._name;
        this.items.splice(index, 0, item);
        const model = this.scene.controller.itemModel;
        model.insertItem( model.lastInsertIndex, item );
    }

    indexOf( item ) {
        return this.items.indexOf( item );
    }


    removeItem( item ) {
        this.removeFrom( item, this.items );
        this.scene.controller.itemModel.removeItem( item )
    }

    setVisibility( visible ) {
        this.visible = visible;
        [...this.items].forEach( i => {
            if ( i.objectName === 'BackgroundItem') i.visible = true;
            else i.visible = visible
        } );
        this.scene.unselect();
    }

    get name() { return this._name; }
    set name(value) {
        this._name = this.getName( this, value, this.parent.layers );
    }

    registerEvents() {
        this.canvas.on("before:render", () => {
            const ctx = this.canvas.contextContainer;
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this._canDraw = true;
        });
        this.canvas.on("after:render", () => {
            if ( !this._canDraw ) return;
            this._canDraw = false;
            const ctx = this.canvas.contextContainer;
            this.drawOutLines(ctx);
        });
    }

    drawOutLines( ctx ) {
        this.scene.paintEngine.drawTransformedCtx( ctx, ( scale ) => {

            ctx.lineWidth = 2;
            this.items.forEach(obj => {
                const rect = obj.getBoundingRect(true, true);
                const tRect = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };

                ctx.strokeStyle = !obj.visible ?  "rgba(0, 153, 255, 0.9)" : Colors.redOp;
                ctx.setLineDash(!obj.visible ? [4 /scale, 3/scale] : [0,0]);

                if ( !obj.visible && obj.objectName !== 'BackgroundItem') {
                    this.scene.paintEngine.fillRect(ctx, tRect, Colors.blueOp );
                    this.scene.paintEngine.strokeRect(ctx, tRect, 1 / scale, Colors.blue );
                }
                else if ( obj.lockMovementX && obj.objectName !== 'BackgroundItem') {
                    ctx.save();
                    //this.scene.paintEngine.fillRect(ctx, tRect, Colors.redOp );
                    this.scene.paintEngine.strokeRect(ctx, tRect, 1 / scale, Colors.red );
                    ctx.restore();
                }
            });
        });

    }

}