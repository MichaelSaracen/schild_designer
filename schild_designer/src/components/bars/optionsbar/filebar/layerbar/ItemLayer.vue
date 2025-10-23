<script setup >

import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextField from "@/components/controls/inputs/TextField.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import IconButton from "@/components/controls/buttons/IconButton.vue";
import {computed, inject, ref} from "vue";
import Icon from "@/components/controls/misc/Icon.vue";

const scene = inject('scene');
const props = defineProps({ items: { type: Array, default: [], required: true }, })
const layerModel = computed( () => scene.value?.controller?.itemLayerModel ?? null );
const dragIndex = ref( null );
const currentIndex = ref(0);

const emit = defineEmits(["itemDropToLayer"]);
const activeLayer = computed(() => {
  return layerModel.value?.activeLayer
});

function onDragStart( startIndex ) {
  if ( startIndex === 0 ) return
  dragIndex.value = startIndex;
}

function onDrop( targetIndex ) {
  if ( targetIndex === 0 ) return;
  const startIndex = dragIndex.value;
  if ( startIndex === null || targetIndex === startIndex ) return;
  layerModel.value.swapLayers( startIndex, targetIndex );
  dragIndex.value = null;
}

function setLayerName( layer, name ) {
  layer.name = name;
  scene.value.canvas.requestRenderAll();
}


</script>

<template>
  <ColumnLayout
      class="item-layer"
      :style="{ padding: 8 }"
      v-for="(layer, index) in props.items" :key="index"
      :min-height="32"
      :fill-width="true"
      @dragover.prevent
      @drop="emit('itemDropToLayer', index)"

  >
    <RowLayout
        :style="{ flexShrink: 0}"
        @mousedown="layerModel.setActiveLayer( layer )"
        @click="currentIndex = index; "
        :class="{ activeLayer: activeLayer === layer }"
        :key="layerModel.state.key"
        :min-height="24"
        :gap="8"
        :fill-width="true"
        :padding-bottom="0"
        :padding-top="0"
        :padding-left="8"
        :padding-right="0"
        :draggable="index !== 0"
        @dragstart="onDragStart(index)"
        @dragover.prevent
        @drop="onDrop(index)"
    >
      <Icon :icon-source="'/icons/layer.png'" :icon-size="16"/>
      <TextField :text="layer.name" @update:text="args => setLayerName( layer, args )" />
      <RowLayout :style="{ padding: 0 }" :fill-width="false">
        <IconButton
            v-if="index !== 0"
            :hover-color="'var(--black-hover-lighter)'"
            :icon-source="'/icons/remove.png'"
            @click="layerModel.removeLayer( layer )"
        />
        <IconButton
            :icon-source="layer.visible ? '/icons/v_off.png' :  '/icons/v_on.png'"
            :icon-size="16"
            :hover-color="'var(--black-hover-lighter)'"
            @click="layer.setVisibility(!layer.visible)"
        />
      </RowLayout>
    </RowLayout>
    <slot
        v-if="layer.visible"
        name="items-layer"
        :layer="layer"
        :layerIndex="index"
        :items="layer.items"
    />
  </ColumnLayout>


</template>

<style scoped>
.item-layer:not(.activeLayer):hover {
  background-color: var(--black300);
  transition: background-color 0.3s ease ;
}

.activeLayer {
  transition: background-color 0.3s ease ;
  background-color: var(--accent-op);
}

</style>

















