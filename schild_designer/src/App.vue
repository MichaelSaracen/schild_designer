<script setup>

import SideBar from "@/components/controls/bars/SideBar.vue";
import GridLayout from "@/components/controls/layouts/GridLayout.vue";
import CanvasView from "@/components/CanvasView.vue";
import settings from '/public/settings.json';
import {onMounted, provide, reactive, ref} from "vue";
import {SceneGraph} from "@/canvas/scene-graph.js";
import OptionsBar from "@/components/bars/OptionsBar.vue";
import ItemBar from "@/components/bars/ItemBar.vue";
import Navbar from "@/components/Navbar.vue";
import CanvasContextMenu from "@/components/CanvasContextMenu.vue";

const canvasViewRef         = ref( null );
const scene                 = ref( null );
const zoomController        = ref( null );
const appSettings           = ref( null );
const dpiUnit               = ref( null );
const positionController    = ref( null );
const imageFileHandler      = ref( null );
const pdfFileHandler        = ref( null );
const jsonFileHandler       = ref( null );
const projectName           = ref( 'Unbenannt' );
const navbarRef             = ref( null );
const backgroundImage       = ref( null );
const imageFilterModel      = ref( null );
const canvasContextMenuRef  = ref ( null );

provide("scene", scene);
provide('zoomController', zoomController);
provide('appSettings', appSettings);
provide('dpiUnit', dpiUnit);
provide('positionController', positionController);
provide('imageFileHandler', imageFileHandler);
provide('pdfFileHandler', pdfFileHandler);
provide('jsonFileHandler', jsonFileHandler);
provide('projectName', projectName);
provide('navbarRef', navbarRef);
provide('backgroundImage', backgroundImage);
provide('imageFilterModel', imageFilterModel);

onMounted(  () => {
  const canvasElement       = canvasViewRef.value.canvasRef
  scene.value               = new SceneGraph( settings, canvasElement);
  zoomController.value      = scene.value.controller.zoomController;
  appSettings.value         = scene.value.appSettings;
  dpiUnit.value             = scene.value.dpiUnit;
  positionController.value  = scene.value.controller.positionController;
  imageFilterModel.value    = scene.value.controller.imageFilterModel;
  imageFileHandler.value    = scene.value.files.imageFileHandler;
  pdfFileHandler.value      = scene.value.files.pdfFileHandler;
  jsonFileHandler.value     = scene.value.files.jsonFileHandler;
} );

window.addEventListener( 'contextmenu', (e) => e.preventDefault() )
window.addEventListener("wheel", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=")) {
    e.preventDefault();
  }
});


function openCanvasContextMenu(e) {
  canvasContextMenuRef.value.openContextMenu( e )
}

</script>

<template>
  <div class="app-container">
    <GridLayout
        :columns="'70px 250px minmax(0, 1fr) 250px'"
        :rows="'auto auto 1fr auto'"
        :gap="0"
    >
      <Navbar ref="navbarRef"/>
      <OptionsBar/>
      <CanvasView ref="canvasViewRef" @contextmenu="openCanvasContextMenu"/>
      <ItemBar/>

    </GridLayout>
  </div>

  <CanvasContextMenu ref="canvasContextMenuRef" />
</template>

<style scoped>
.app-container {

  position: relative;
  width: 100%;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: hidden; /* darf bleiben */
}
</style>
