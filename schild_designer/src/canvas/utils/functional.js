export function mixinClass(Base, FabricClass) {
    return class extends FabricClass {
        constructor(scene, options = {}) {
            super(options);             // Fabric-Init
            Object.setPrototypeOf(this, Base.prototype);
            this.scene = scene;
        }
    }
}