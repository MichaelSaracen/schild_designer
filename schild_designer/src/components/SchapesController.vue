<script setup>

import IconButton from "@/components/controls/buttons/IconButton.vue";
import {computed, inject, ref} from "vue";
import ShapesMenu from "@/components/shapes_controller/ShapesMenu.vue";

const scene = inject('scene');

const imageFileHandler = computed( () => scene.value?.files?.imageFileHandler ?? null );
const layerModel = computed( () => scene.value?.controller?.itemLayerModel ?? null );

const shapesMenuRef = ref( null );
const emit = defineEmits(['left-clicked', 'reset-clicked', 'add-image-clicked'])

const fileInputRef = ref( null );

function openShapes( e, mode = 'shapes' ) {
  shapesMenuRef.value.setMode(mode);
  shapesMenuRef.value.open( e );
}

async function handleFiles(e) {
  imageFileHandler.value.handleFiles(e, async (result) => {
    const imageItem = await imageFileHandler.value.loadImage( result );
    layerModel.value.addItem(imageItem);
  });
}


</script>

<template>
  <div class="shapes-controller">
    <IconButton
        :width="32" :height="32" :icon-source="'/icons/shapes.png'"
        @click="(e) => openShapes(e, 'shapes')"
        :tool-tipdirection="'right'"
        :tooltip="'Formen hinzufügen.'"
    />
    <IconButton
        :width="32" :height="32" :icon-source="'/icons/text.png'"
        @click="(e) => openShapes(e, 'text')"
        :tooltip="'Text hinzufügen.'"

    />
    <IconButton
        :width="32" :height="32" :icon-source="'/icons/image.png'"
        @click="fileInputRef.click()"
        :tooltip="'Bild hochladen.'"
    />
    <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleFiles"
    >
  </div>
  <ShapesMenu ref="shapesMenuRef"/>
</template>

<style scoped>
.shapes-controller {
  padding: 8px;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 8px;
  left: 50%;
  translate: -50% 0;
  background-color: var(--black200);
  border-radius: var(--border-radius-small);
  gap: 4px;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-black);
}

.shapes-controller > * {
  width: 100%;
  height: 100%;
}

</style>