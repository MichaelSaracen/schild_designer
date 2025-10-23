<script setup>

import IconButton from "@/components/controls/buttons/IconButton.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import {computed, inject, ref} from "vue";
import ViewMenu from "@/components/bars/itembar/view_options/ViewMenu.vue";

const scene = inject('scene');
const zoomController = inject('zoomController');
const zoom = computed(() => Math.round(scene.value?.controller?.zoomController?.zoomState?.zoom * 100 ?? 100));

const viewMenuRef = ref( null );

</script>

<template>
  <RowLayout :style="{ padding: 0, flexShrink: 0 }">
    <RowLayout :fill-width="true">
      <IconButton
          :width="24" :height="24" :icon-size="18" :icon-source="'/icons/zoom_in.png'"
          @click="zoomController.zoomIn()"
      />
      <IconButton
          :width="24" :height="24" :icon-size="18" :icon-source="'/icons/zoom_out.png'"
          @click="zoomController.zoomOut()"
      />
      <IconButton
          :width="24" :height="24" :icon-size="18" :icon-source="'/icons/fit_screen.png'"
          :checkable="true"
          @click="zoomController.resetZoom()"
      />

      <TextLabel
          :text="`${zoom}%`" :font-size="11" :font-weight="'bold'" :opacity="0.8" :stretch="true"
      />

      <IconButton
          :width="24" :height="24" :icon-size="18" :icon-source="'/icons/settings.png'"
          :checkable="true"
          :margin-right="8"
          @click="e =>  viewMenuRef.toggle(e)"
      />
    </RowLayout>
  </RowLayout>
  <ViewMenu
    ref="viewMenuRef"
  />
<!--  <ZoomMenu
      ref="zoomMenuRef"
      @popupOpened="popupOpen = true"
      @popupClosed="popupOpen = false"
  />-->
</template>

