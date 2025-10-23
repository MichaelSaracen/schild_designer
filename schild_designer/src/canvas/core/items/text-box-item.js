import {FabricText, IText, Textbox} from "fabric";


export class TextBoxItem extends Textbox  {
    constructor( text, options = {}, scene ) {
        super( text, options );
        const defaultOptions = {
            fill:               "rgb(113,89,113)",
            fontSize:           32,
            fontFamily:         'Vegur',
            fontWeight:         400,
            strokeWidth:        0,
            stroke:             null,
            lockUniScaling :    true
        };

        this.set(defaultOptions);
        this.set(options);

        this.scene              = scene || null;
        this.canvas             = scene?.canvas || null;
        this.objectName         = "TextBoxItem";
        this.name               = "TextBox";
        this.baseSize           = { fontSize: defaultOptions.fontSize };
        this.index              = 0;
        this.guideLines         = [];
    }
}

