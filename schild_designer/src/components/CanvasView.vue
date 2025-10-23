
<script setup>

import {ref, inject} from "vue";

import SchapesController from "@/components/SchapesController.vue";


const imageFileHandler    = inject("imageFileHandler");

const canvasRef = ref( null );
const backgroundImage = inject('backgroundImage');


function onDragOver(e) {
  if ( e.dataTransfer.types.includes('application/x-arrow') ||e.dataTransfer.types.includes('application/x-symbols') ) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }
}

function onDrop(e) {
  e.preventDefault();
  const source = e.dataTransfer.getData("text/plain");
  if (!source) return;
  imageFileHandler.value.loadSVGImage(source);
}

defineExpose( { canvasRef } );

</script>

<template>
  <div
      class="canvas-view"
      @dragover="onDragOver"
      @drop="onDrop"
      :style="{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <canvas class="canvas3d" ref="canvasRef"></canvas>
<!--    <SchapesController />-->
  </div>

</template>

<style scoped>
.canvas-view {
  width: 100%;
  height: 100%;
  min-height: 0;
  perspective: 800px;
  display: flex;
  transition: opacity 0.4s ease;
}


.canvas-view canvas {
  position: absolute; /* 👈 ALLE Layer inkl. Fabric */
  top: 0;
  left: 0;
  display: block;
  backface-visibility: hidden; /* verhindert Flackern */
}

canvas {
  display: block;
}


.canvas-view {
  opacity: 1;
}


.canvas-view.fade {
  opacity: 0;
}




</style>


<!--
style="background-image: url('/images/urban-door.jpg');
background-size: cover;
background-position: center;"-->
