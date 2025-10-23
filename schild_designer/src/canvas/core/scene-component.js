import {isReactive, toRaw} from "vue";


export class SceneComponent {
    constructor( scene ) {
        this.scene = scene;
        this.canvas = scene.canvas;
        this.command = scene.command;
    }

    get bleed() {
        return this.scene.setup.paintSpec.bleed;
    }

    gridSnapDeltas( ev, lastX, lastY, steps ) {
        const dx = ev.clientX - lastX;
        const dy = ev.clientY - lastY;

        const snapX = this.roundSteps( dx, steps );
        const snapY = this.roundSteps( dy, steps );

        return { snapX, snapY }
    }

    roundSteps( pos, steps ) { return Math.round( pos / steps ) * steps; }

    getName(item, name, container) {
        if (!item) return name;
        let objects = isReactive(container) ? toRaw(container) : container;
        objects = objects.filter(o => o.objectName === item.objectName);
        const lowerNames = objects.filter(o => o !== toRaw(item)).map(o => o.name.toLowerCase());

        const match = name.match(/^(.*?)(\d+)?$/);
        const baseName = match ? match[1] : name;
        let num = match && match[2] ? Number(match[2]) : null;

        if (!lowerNames.includes(name.toLowerCase())) { return name; }

        if (num === null) num = 1;
        let newName;
        do {
            newName = `${baseName}${num}`;
            num++;
        } while (lowerNames.includes(newName.toLowerCase()));

        return newName;
    }

    removeFrom( item, container, condition = null ) {
        if ( !item ) return;
        const idx = container.indexOf( item );
        if ( condition && condition( idx, item ) ) return;
        if ( idx !== -1 ) container.splice( idx, 1 );
    }

    registerEvents() { }
    handleEvent( e ) { }

    stableRect(obj) {
        // sicherstellen, dass aCoords aktuell sind
        obj.setCoords?.();
        const { tl, tr, br, bl } = obj.aCoords;

        const width = Math.hypot(tr.x - tl.x, tr.y - tl.y);
        const height = Math.hypot(bl.x - tl.x, bl.y - tl.y);
        const left = obj.left;
        const right = left + width;
        const top = obj.top;
        const bottom = top + height;

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        return { left, right, top, bottom, width, height, centerX, centerY };
    }


}