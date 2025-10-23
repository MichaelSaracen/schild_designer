<script setup>

import Popup from "@/components/controls/menus/Popup.vue";
import {computed, inject, ref} from "vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import MenuButton from "@/components/controls/buttons/MenuButton.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";

const popupRef          = ref( null );
const zoomController    = inject('zoomController');
const scene             = inject('scene');

function toggle( e ) {

  if ( popupRef.value.showPopup ) {

    popupRef.value.closePopup();
  }
  else popupRef.value.open( e );
}

defineExpose( { toggle } );

</script>

<template>
  <Popup
    ref="popupRef"
    :direction="'bottom'"
    :offset-y="8"
    :overflow-y="'hidden'"
    :expand-content="true"
    @opened="$emit('opened')"
    @closed="$emit('closed')"
  >
  <TextLabel :text="'Zoom'" :font-weight="'bold'"/>
    <MenuButton :text="'Zoom 50%'" @click="zoomController.zoomTo(0.5)"/>
    <MenuButton :text="'Zoom 100%'" @click="zoomController.zoomTo(1)"/>
    <MenuButton :text="'Zoom 200%'" @click="zoomController.zoomTo(2)"/>
    <MenuButton :text="'Zoom 500%'" @click="zoomController.zoomTo(5)"/>
    <MenuButton :text="'Zoom 1000%'" @click="zoomController.zoomTo(10)"/>
    <MenuButton :text="'Zoom 2000%'" @click="zoomController.zoomTo(20)"/>
    <MenuButton :text="'Zoom 3000%'" @click="zoomController.zoomTo(30)"/>
    <MenuButton :text="'Zurücksetzen'" @click="zoomController.resetZoom()"/>
  </Popup>
</template>

<style scoped>

</style>