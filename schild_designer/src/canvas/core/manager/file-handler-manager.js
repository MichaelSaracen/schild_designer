import {SceneComponent} from "@/canvas/core/scene-component.js";
import {ImageFileHandler} from "@/canvas/core/file_handler/image-file-handler.js";
import {PdfFileHandler} from "@/canvas/core/file_handler/pdf-file-handler.js";
import {JsonFileHandler} from "@/canvas/core/file_handler/json-file-handler.js";

export class FileHandlerManager extends SceneComponent {
     constructor( scene ) {
         super( scene );

         this.imageFileHandler      = new ImageFileHandler( scene );
         this.pdfFileHandler        = new PdfFileHandler( scene );
         this.jsonFileHandler       = new JsonFileHandler( scene );
     }

     isSaving() {
         return this.pdfFileHandler.isSaving.value || this.jsonFileHandler.isSaving.value
     }
 }