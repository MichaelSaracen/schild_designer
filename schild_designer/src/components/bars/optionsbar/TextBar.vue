<script setup>

import GridLayout from "@/components/controls/layouts/GridLayout.vue";
import {RectangleItem} from "@/canvas/core/items/rectangle-item.js";
import {computed, inject, ref} from "vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import ColorButton from "@/components/controls/buttons/ColorButton.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import TextShapeButton from "@/components/controls/buttons/TextShapeButton.vue";
import {getAvailableFonts} from "@/assets/js/font-map.js";
import IconLabelText from "@/components/controls/labels/IconLabelText.vue";
import Popup from "@/components/controls/menus/Popup.vue";
import MenuButton from "@/components/controls/buttons/MenuButton.vue";
import {TextItem} from "@/canvas/core/items/text-item.js";


const scene           = inject('scene');

const layerModel      = computed( () => scene.value?.controller?.itemLayerModel ?? null );

const appSettings       = inject('appSettings');

const fill           = computed( {
  get: () => appSettings.value?.colors.text || '#000',
  set:( clr ) => { appSettings.value.colors.text = clr }
});



const availableFonts  = getAvailableFonts();
const popupRef        = ref( null );
const currentFont     = ref( availableFonts.find( f => f.family === 'Vegur') );


function addItem ( item ) {
  layerModel.value.addItem( item );

  scene.value.canvas.setActiveObject( item )
}

function setFont( f ) {
  currentFont.value = f;

}

function addText( text, fontSize, fill ) {
  layerModel.value.addItem( new TextItem(  text, { fill, fontSize, fontFamily: currentFont.value.family } , scene.value ))
}

function addTextTemplate( headerText, headerFamily, headerSize, headerAlign, text, textFamily, textSize, textAlign) {
   const headerItem         =  new TextItem(  headerText, {
     fill: fill.value, fontSize: headerSize, fontFamily: headerFamily, textAlign: headerAlign
   } , scene.value );
    const textItem          =  new TextItem(  text, {
      fill: fill.value, fontSize: textSize, fontFamily: textFamily, textAlign: textAlign
    } , scene.value );

    headerItem.left         = 60;
    headerItem.top          = 60;
    headerItem.width        = 500;
    textItem.left           = headerItem.left;
    textItem.top            = headerItem.top + headerItem.height + 16;
    textItem.width          = headerItem.width;
    layerModel.value.addItem( headerItem, false );
    layerModel.value.addItem( textItem, true );
}

const items = [
  { name: 'Rechteck', icon: '/icons/rect.png', cb: () => addItem(new RectangleItem( { fill: fill.value } , scene.value ))},
]

</script>

<template>
  <ColumnLayout :fill-height="false" :style="{ padding: 0 }" :gap="0">

    <RowLayout :style="{flexShrink: 0}" :padding-top="0" :padding-bottom="0"  :min-height="32">
      <TextLabel :padding-left="0" :text="'Textfarbe'"/>
      <ColorButton :width="32" :height="32" v-model="fill"/>
    </RowLayout>

    <ColumnLayout :style="{ flexShrink: 0 }" :gap="-4" :padding-left="8" :padding-right="8"  :margin-top="8">
      <RowLayout :style="{ padding: 0 }" :gap="8">
        <IconLabelText
            :header-text="'Schriftart'"
            :prefix="'W'"
            :text="currentFont.family"
            :icon-display="'left'"
            :hover-enabled="true"
            :icon-source="'/icons/text.png'"
            @click="(e) => popupRef.open(e)"
        />
      </RowLayout>
    </ColumnLayout>

    <Popup  ref="popupRef" :header-visible="true" :header-title="'Schriftart'" :direction="'right'" :expand-content="false">
      <MenuButton
          v-for=" (font, index) in availableFonts"
          :key="index"
          :height="32"
          :text="font.family"
          :font-family="font.family"
          :checked="currentFont.family === font.family"
          :icon-source="'/icons/text.png'"
          :background-color="'var(--black-soft)'"
          v-model="currentFont.family"
          @click="() => setFont(font)"
      />
    </Popup>


    <HorizontalSpacer/>

    <ColumnLayout :style="{flexShrink: 0}">
      <TextShapeButton
          :style="{ height: '48px'}"
          :header-text="'Überschrift'" :header-size="24"  :header-align="'left'"
          @click="(e) => addText('Überschrift', 72, fill )"

      />
      <TextShapeButton
          :style="{ height: '48px'}"
          :header-text="'Das ist ein Text'" :header-size="20"  :header-align="'left'"
          @click="(e) => addText('das ist ein Text', 46, fill )"
      />
      <TextShapeButton
          :style="{ height: '48px'}"
          :header-text="'hier eine Beschreibung'" :header-size="16"  :header-align="'left'"
          @click="(e) => addText('hier eine Beschreibung', 32, fill )"
      />
      <TextShapeButton
          :style="{ height: '48px'}"
          :header-text="'in der Fußnote, könnte das hier stehen...'" :header-size="12"  :header-align="'left'"
          @click="(e) => addText('in der Fußnote, könnte das hier stehen...', 24, fill )"
      />

    </ColumnLayout>

    <HorizontalSpacer/>

    <GridLayout
        :columns="'1fr'"
        :rows="'120px'"
        :padding="8"
        :column-gap="8" :row-gap="8"

    >
      <TextShapeButton
        :header-text="'Das Leben ist ein'" :header-size="16" :header-family="'Queensides'" :header-align="'left'"
        :text="'Abenteuer'" :text-size="32" :text-family="'Great Day Personal Use'"
        @click="() => addTextTemplate(
            'Das Leben ist ein', 'Queensides', 32, 'left',
            'Abenteuer', 'Great Day Personal Use', 72, 'left'
            )"
      />
      <TextShapeButton
          :header-text="'alles muss raus'" :header-size="16" :header-family="'Matrixtype'" :header-align="'center'"
          :text="'50% reduziert!'" :text-size="24" :text-family="'HomeVideo'" :text-align="'center'"
          @click="() => addTextTemplate(
            'alles muss raus', 'Matrixtype', 32, 'center',
            '50% reduziert!', 'HomeVideo', 48, 'center'
            )"
      />
      <TextShapeButton
          :header-text="'Glückwunsch'" :header-size="32" :header-family="'California Signature'" :header-align="'right'"
          :text="'Sie haben gewonnen!'" :text-size="18" :text-family="'Vegur'" :text-align="'left'"
          @click="() => addTextTemplate(
            'Glückwunsch', 'California Signature', 72, 'right',
            'Sie haben gewonnen!', 'Vegur', 36, 'left'
            )"
      />
    </GridLayout>
  </ColumnLayout>
</template>

<style scoped>

</style>