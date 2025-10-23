import {FabricText, IText} from "fabric";


export class TextItem extends IText  {
    constructor( text, options = {}, scene ) {
        super( text, options );
        const defaultOptions = {
            fill: "#715971FF",
            fontSize: 32,
            fontFamily: 'Vegur',
            fontWeight: 400,
            strokeWidth: 0,
            stroke: null,
            lockUniScaling : true,
            textAlign: 'left'
        };

        this.set(defaultOptions);
        this.set(options);

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "TextItem";
        this.name               = "Text";
        this.baseSize           = { fontSize: defaultOptions.fontSize };
        this.index              = 0;
        this.guideLines         = [];

        this.setControlsVisibility( {
            mt: false, mb: false
        } );

    }
}

