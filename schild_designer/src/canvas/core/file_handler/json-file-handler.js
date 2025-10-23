import {FileHandler} from "@/canvas/core/file_handler/file-handler.js";

export class JsonFileHandler extends FileHandler{
    constructor( scene ) {
        super( scene );
    }

    save( projectName ) {
        this.isSaving.value = true;

        const dataUrl       = this.scene.files.imageFileHandler.save( projectName );
        const json          = this.canvas.toJSON();
        json.bild           = dataUrl;
        const jsonString    = JSON.stringify( json, null, 2);
        const jsonBlob      = new Blob([jsonString], { type: "application/json" });
        const jsonUrl       = URL.createObjectURL(jsonBlob);

        const a1 = document.createElement("a");
        a1.href = jsonUrl;
        a1.download = `${projectName}.json`;
        a1.click();

        URL.revokeObjectURL( jsonUrl );

        this.isSaving.value = false;
    }
}