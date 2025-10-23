<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import ItemBarHeader from "@/components/controls/labels/ItemBarHeader.vue";
import MultiLineText from "@/components/controls/labels/MultiLineText.vue";
import GridLayout from "@/components/controls/layouts/GridLayout.vue";
import {computed, inject, ref} from "vue";
import ImageButton from "@/components/controls/buttons/ImageButton.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import TextButton from "@/components/controls/buttons/TextButton.vue";

const scene             = inject('scene' );
const imageFileHandler  = inject('imageFileHandler' );
const layerModel        = computed( () => scene.value?.controller?.itemLayerModel ?? null );

const fileInputRef = ref( null );

const images            = [
  "/images/bg/01.jpg", "/images/bg/02.jpg", "/images/bg/03.jpg", "/images/bg/04.jpg", "/images/bg/05.jpg",
  "/images/bg/06.jpg", "/images/bg/07.jpg", "/images/bg/08.jpg", "/images/bg/09.jpg", "/images/bg/10.jpg",
  "/images/bg/11.jpg","/images/bg/12.jpg", "/images/bg/13.jpg", "/images/bg/14.jpg", "/images/bg/15.jpg",
  "/images/bg/16.jpg", "/images/bg/17.jpg", "/images/bg/18.jpg", "/images/bg/19.jpg", "/images/bg/20.jpg",
  "/images/bg/21.jpg", "/images/bg/22.jpg",
]

async function handleFiles(e) {
  imageFileHandler.value.handleFiles(e, async (result) => {
    const imageItem = await imageFileHandler.value.loadImage( result );
    layerModel.value.addItem(imageItem);
  });
}


async function loadBackgroundImage( src ) {
  await imageFileHandler.value.loadBackgroundImage(src);
}

</script>

<template>
  <ColumnLayout :style="{padding: 0}" :fill-height="true" :gap="4">
    <ColumnLayout :style="{padding: 8, flexShrink: 0}">
      <ItemBarHeader :text="'Bilder'"/>
      <MultiLineText
          :padding-left="0" :padding-right="0"
          :text="'<b>Bilder</b> auswählen und hochladen'"
      />
    </ColumnLayout>

    <HorizontalSpacer/>
    <ColumnLayout  :style="{padding: 8, flexShrink: 0}">


      <ColumnLayout :style="{padding: 0, flexShrink: 0}" :gap="8">
        <TextButton
            :text="'Bild hochladen'"
            @click="fileInputRef.click()"
        />
        <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleFiles"
        >


        <ItemBarHeader :style="{marginTop: '16px'}" :text="'Hintergrund auswählen'"/>
        <GridLayout
            :columns="'1fr 1fr'"
            :column-gap="8" :row-gap="8"
        >
          <ImageButton v-for="(image, index) in images"
                       :image-source="image"
          @click="loadBackgroundImage( image )"
          />
        </GridLayout>
      </ColumnLayout>

    </ColumnLayout>


  </ColumnLayout>
</template>

<style scoped>

</style>