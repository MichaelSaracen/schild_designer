<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import ItemBarHeader from "@/components/controls/labels/ItemBarHeader.vue";
import MultiLineText from "@/components/controls/labels/MultiLineText.vue";
import GridLayout from "@/components/controls/layouts/GridLayout.vue";
import {computed, inject, ref} from "vue";
import ImageButton from "@/components/controls/buttons/ImageButton.vue";
import ColorButton from "@/components/controls/buttons/ColorButton.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import TextButton from "@/components/controls/buttons/TextButton.vue";

const scene             = inject('scene' );

const backgroundImage   = inject('backgroundImage');


const emit              = defineEmits(['selectBackground', 'reset'])
const images            = [
    "/images/backgrounds/bg1.jpg", "/images/backgrounds/bg2.jpg","/images/backgrounds/bg3.jpg",
  "/images/backgrounds/bg4.jpg", "/images/backgrounds/bg5.jpg","/images/backgrounds/bg6.jpg",   ]


const fill              = computed( {
  get: () => scene.value?.layers?.backgroundLayer.states.fill || '#fff',
  set: ( clr ) => {
    scene.value.layers.backgroundLayer.states.fill = clr;
    scene.value.canvas.requestRenderAll();
  }
} );

const stroke            = computed( {
  get: () => scene.value?.layers?.backgroundLayer.states.stroke || '#000',
  set: ( clr ) => {
    scene.value.layers.backgroundLayer.states.stroke = clr;
    scene.value.canvas.requestRenderAll();
  }
} );

const onSelectBackground = ( image ) => {
  backgroundImage.value = `url(${image})`;
}

function resetBackground() {
  backgroundImage.value = `url(none)`;
}

</script>

<template>
  <ColumnLayout :style="{padding: 0}" :fill-height="true" :gap="4">
    <ColumnLayout :style="{padding: 8, flexShrink: 0}">
      <ItemBarHeader :text="'Arbeitsbereich'"/>
      <MultiLineText
          :padding-left="0" :padding-right="0"
          :text="'<b>Einstellungen</b> für den Arbeitsbereich. U.a. <b>Hintergrundfarbe</b>, <b>Bild</b>'"
      />
    </ColumnLayout>
    <HorizontalSpacer/>

      <RowLayout :style="{ flexShrink: 0 }"  :padding-top="8" :padding-bottom="0"  :min-height="32">
        <ItemBarHeader :text="'Hintergrundfarbe'" :stretch="true"/>
        <ColorButton :width="32" :height="32" v-model="fill"/>
      </RowLayout>

      <RowLayout :style="{ flexShrink: 0 }"  :padding-top="0" :padding-bottom="0" :min-height="32">
        <ItemBarHeader :text="'Rahmen'" :stretch="true"/>
        <ColorButton :width="32" :height="32" v-model="stroke"/>
      </RowLayout>


    <HorizontalSpacer/>
    <ColumnLayout  :style="{padding: 8, flexShrink: 0}">


    <ColumnLayout :style="{padding: 0, flexShrink: 0}" :gap="8">
      <TextButton :text="'Bild zurücksetzen'" @click="resetBackground" :enabled="backgroundImage !== 'url(none)'"/>
      <ItemBarHeader :text="'Bild'"/>
      <GridLayout
          :columns="'1fr 1fr'"
          :column-gap="8" :row-gap="8"
      >
        <ImageButton v-for="(image, index) in images"
                     :image-source="image"
                     @click="() => onSelectBackground( image )"
        />
      </GridLayout>
    </ColumnLayout>

    </ColumnLayout>


  </ColumnLayout>
</template>

<style scoped>

</style>