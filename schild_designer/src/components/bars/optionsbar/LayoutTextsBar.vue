<script setup>
import {computed, inject, ref} from "vue";
import { LayoutImages } from "@/assets/js/layout-images.js";
import SpinLoader from "@/components/controls/loader/SpinLoader.vue";
import GridLayout from "@/components/controls/layouts/GridLayout.vue";

// Track geladene Bilder
const loaded = ref({});
const isLoading = ref(false);
const imageFileHandler = inject("imageFileHandler");


function onImageLoad(index) {
  loaded.value[index] = true;
}

/*
function addSVGImage( source ) {
  isLoading.value = true;
  imageFileHandler.value.loadSVGImage( source );
  isLoading.value = false;
}
*/


</script>

<template>
  <GridLayout   :columns="'repeat(2, 1fr)'"
                :alignItems="'flex-start'"
                :justifyItems="'start'"
                :padding="8"
                :column-gap="8" :row-gap="6"
  >
    <div
        v-for="(item, index) in LayoutImages"
        :key="index"
        class="image-wrapper"
        :class="{ loaded: loaded[index] }"
        draggable="false"

    >
      <img
          :src="item"
          alt=""
          @load="onImageLoad(index)"
          loading="lazy"

      />
    </div>
  </GridLayout>
  <SpinLoader :text="'Lade Pfeil...'" :show="isLoading"/>
</template>

<style scoped>

</style>
