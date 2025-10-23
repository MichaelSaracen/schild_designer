<script setup>
import {computed, inject, ref} from "vue";
import { Arrows } from "@/assets/js/arrow-images.js";
import SpinLoader from "@/components/controls/loader/SpinLoader.vue";
import GridLayout from "@/components/controls/layouts/GridLayout.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import ColorButton from "@/components/controls/buttons/ColorButton.vue";

// Track geladene Bilder
const loaded            = ref({});
const isLoading         = ref(false);
const imageFileHandler  = inject("imageFileHandler");
const appSettings       = inject('appSettings');
const fill           = computed( {
  get: () => appSettings.value?.colors.arrows || '#000',
  set:( clr ) => { appSettings.value.colors.arrows = clr }
});

function onImageLoad(index) {
  loaded.value[index] = true;
}

function addSVGImage( source ) {
  isLoading.value = true;
  imageFileHandler.value.loadSVGImage( source, 'Pfeil', fill.value );
  isLoading.value = false;
}


function onDragStart( e, item ) {
  e.dataTransfer.setData('application/x-arrow', item);
  e.dataTransfer.effectAllowed = 'copy';
}

</script>

<template>
  <RowLayout :style="{flexShrink: 0}" :padding-top="0" :padding-bottom="0"  :min-height="32">
    <TextLabel :padding-left="0" :text="'Füllfarbe'"/>
    <ColorButton :width="32" :height="32" v-model="fill"/>
  </RowLayout>
  <GridLayout   :columns="'repeat(5, 1fr)'"
                :alignItems="'flex-start'"
                :justifyItems="'start'"
                :padding="8"
                :column-gap="8" :row-gap="6"
  >
    <div
        v-for="(item, index) in Arrows"
        :key="index"
        class="image-wrapper"
        :class="{ loaded: loaded[index] }"
        draggable="true"
        @dragstart="onDragStart($event, item)"
    >
      <img
          :src="item"
          alt=""
          @load="onImageLoad(index)"
          loading="lazy"
          @click="addSVGImage(item)"
      />
    </div>
  </GridLayout>
  <SpinLoader :text="'Lade Pfeil...'" :show="isLoading"/>
</template>

<style scoped>

</style>
