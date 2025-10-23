import {SceneComponent} from "@/canvas/core/scene-component.js";


export class Setup extends SceneComponent {
    constructor( scene, settings ) {
        super( scene );

        this.config = settings.schild_konfiguration;
        const _dpi = this.config.druckspezifikation.dpi_aufloesung;
        this.scene.dpiUnit.dpi = _dpi;
        const unit = this.scene.dpiUnit;

        this.sizes = {
            width: unit.mmToPx(this.config.abmessungen.breite_mm),
            height: unit.mmToPx(this.config.abmessungen.hoehe_mm),
        }

        this.holes = {
            count: this.config.bohrloecher.anzahl,
            diameter: unit.mmToPx(this.config.bohrloecher.durchmesser_mm),
            position: this.config.bohrloecher.position,
            distance: unit.mmToPx(this.config.bohrloecher.randabstand_mm),
        }

        this.design = {
            backgroundColor: this.config.design.hintergrund_farbe,
            borderColor: this.config.design.rahmen_farbe,
            borderWidth: unit.mmToPx(this.config.design.rahmen_staerke_mm),
            cornerRadius: unit.mmToPx(this.config.design.ecken_radius_mm),
            surface: this.config.design.oberflaeche,
            image: this.config.design.bild
        }

        this.paintSpec = {
            bleed: unit.mmToPx(this.config.druckspezifikation.beschnitt_mm),
            dpi: _dpi,
            opaque: this.config.druckspezifikation.druckfarben_deckend,
            profile: this.config.druckspezifikation.farbprofil,
        }


        this.material = {
            strength: unit.mmToPx(this.config.material.staerke_mm),
            type: this.config.material.typ,
        }

        this.secure = {
            minTextHeight: unit.mmToPx(this.config.sicherheit.mindest_textgroesse_mm),
            distance: unit.mmToPx(this.config.sicherheit.sicherheitsabstand_rand_mm),
        }
        this.imageSource        = this.design.image || null;
        this.backgroundWidth = this.sizes.width + ( this.paintSpec.bleed * 2 );
        this.backgroundHeight = this.sizes.height + ( this.paintSpec.bleed * 2 );

    }
}



























