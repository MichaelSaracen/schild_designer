<script setup>

import Popup from "@/components/controls/menus/Popup.vue";
import {inject, ref, watch} from "vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import MenuButton from "@/components/controls/buttons/MenuButton.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import SpinLoader from "@/components/controls/loader/SpinLoader.vue";

const projectName       = inject('projectName');
const imageFileHandler  = inject('imageFileHandler');
const pdfFileHandler    = inject('pdfFileHandler');
const jsonFileHandler    = inject('jsonFileHandler');
const popupRef          = ref( null );
const isLoading         = ref( false );


watch(() => pdfFileHandler.value?.isSaving.value || jsonFileHandler.value?.isSaving.value, ( v ) => {
  isLoading.value       = v;
})

function exportPNG() {
  isLoading.value       = true;
  imageFileHandler.value.save(projectName.value);
  isLoading.value       = false;
}

function exportPDF() {
  popupRef.value.closePopup();
  setTimeout( () => {
    pdfFileHandler.value.save(projectName.value);
  }, 1000)
}

function exportJSON() {
  popupRef.value.closePopup();
  setTimeout( () => {
    jsonFileHandler.value.save(projectName.value);
  }, 1000)
}



defineExpose( {popupRef} )

</script>

<template>
<Popup
    ref="popupRef"
    :direction="'right'"
    :offset-y="-8"
    :expand-content="true"
>
  <TextLabel :text="'Ansicht'" :padding-left="0"/>
    <MenuButton
        :height="32" :text="'Vorschau'" :icon-source="'/icons/box.png'"
    />
  <HorizontalSpacer :margin-top="4"/>
  <TextLabel :text="'Export'" :padding-left="0"/>
  <MenuButton
      :height="32" :text="'PNG exportieren'" :icon-source="'/icons/png.png'"
      @click="exportPNG"
  />
  <MenuButton
      :height="32" :text="'PDF exportieren'" :icon-source="'/icons/pdf.png'"
      @click="exportPDF"
  />
  <MenuButton
      :height="32" :text="'JSON exportieren'" :icon-source="'/icons/json.png'"
      @click="exportJSON"
  />

</Popup>

  <SpinLoader :show="isLoading"/>

</template>

<style scoped>

</style>