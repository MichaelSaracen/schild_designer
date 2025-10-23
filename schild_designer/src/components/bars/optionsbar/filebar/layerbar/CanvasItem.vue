<script setup>
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextField from "@/components/controls/inputs/TextField.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import IconButton from "@/components/controls/buttons/IconButton.vue";
import Icon from "@/components/controls/misc/Icon.vue";
import { computed, inject, ref, toRaw } from "vue";

const scene = inject("scene");

const props = defineProps({
  items: { type: Array, default: [], required: true },
  layerIndex: { type: Number, required: true },
  dragItemInfo: { type: Object, required: true },
});

const emit = defineEmits(['itemDropToLayer']);

const layerModel = computed(() => scene.value?.controller?.itemLayerModel ?? null);
const itemModel = computed(() => scene.value?.controller?.itemModel ?? null);
const activeObject = computed(() => scene.value?.activeObject() || null);



function onDragStart(itemIndex) {
  props.dragItemInfo.layerIndex = props.layerIndex;
  props.dragItemInfo.itemIndex = itemIndex;
  layerModel.value.setActiveLayer( layerModel.value.layers[props.layerIndex] );
}

// === Drop innerhalb / zwischen Layers ===
function onItemDrop(targetItemIndex) {
  if ( targetItemIndex === 0 ) return;

  const { layerIndex, itemIndex } = props.dragItemInfo;
  if (layerIndex === null || itemIndex === null) return;

  const layers = layerModel.value.layers;
  const sourceLayer = layers[layerIndex];
  const targetLayer = layers[props.layerIndex];
  if (!sourceLayer || !targetLayer) return;

  const sourceItems = sourceLayer.items;
  const targetItems = targetLayer.items;

  const moved = sourceItems.splice(itemIndex, 1)[0];
  if (!moved) return;

  targetItems.splice(targetItemIndex, 0, moved);
  if (moved.layer && moved.layer !== targetLayer) moved.layer = targetLayer;

  layerModel.value.scene.update();
  layerModel.value.reorder();

  props.dragItemInfo.layerIndex = null;
  props.dragItemInfo.itemIndex = null;
}


</script>

<template>
  <ColumnLayout
      class="canvas-item-wrapper"
      :style="{ padding: 0 }"
      @dragover.prevent
      @drop="emit('itemDropToLayer', props.layerIndex)"
  >
    <ColumnLayout
        v-for="(item, index) in props.items"
        :key="index"
        :draggable="item.objectName !== 'BackgroundItem'"
        @dragstart="onDragStart(index)"
        @dragover.prevent
        @drop="onItemDrop(index)"
        class="canvas-item"
        :style="{ padding: 0 }"
        :fill-width="true"
        @mousedown="
        layerModel.setActiveLayer( layerModel.layers[layerIndex] );
        "
    >
      <RowLayout
          :style="{ flexShrink: 0 }"
          @click="
          scene.setActiveObject(item);
"
          :fill-width="true"
          :padding-left="24"
          :padding-right="0"
          :gap="8"
          :class="{
          locked: itemModel.isLocked(item),
          activeObject:
            activeObject && activeObject.name === item.name,
        }"
      >
        <Icon
            :icon-source="
            item.objectName === 'BackgroundItem' ? '/icons/workspace.png' :
             item.objectName === 'ImageItem' ? '/icons/image2.png' :
             item.objectName === 'TextItem' ? '/icons/text.png' : '/icons/shapes.png'
"

            :icon-size="16" />
        <TextField :text="item.name" @update:text="args => (item.name = args)" />
        <RowLayout :style="{ padding: 0 }" :fill-width="false" :align-items="'center'">
          <IconButton
              :hover-color="itemModel.isLocked(item)
              ? 'var(--magenta)'
              : 'var(--black-hover-lighter200)'"
              :icon-source="'/icons/close.png'"
              @click="

              scene.setActiveObject(item);
              layerModel.removeItemFromActiveLayer(item);
            "
          />
          <IconButton
              v-if="item.objectName !== 'BackgroundItem'"
              :hover-color="itemModel.isLocked(item)
              ? 'var(--magenta)'
              : 'var(--black-hover-lighter200)'"
              :icon-source="itemModel.isLocked(item)
              ? '/icons/unlocked.png'
              : '/icons/locked.png'"
              @click="

              scene.setActiveObject(item);
              itemModel.lockItem(!itemModel.isLocked(item));
            "
          />
        </RowLayout>
      </RowLayout>
    </ColumnLayout>
  </ColumnLayout>
</template>

<style scoped>
.canvas-item-wrapper {
  width: 100%;
  padding: 0;
}
.canvas-item {
  transition: background-color 0.3s ease;
}
.canvas-item:hover {
  background-color: var(--black-hover-lighter);
}
.locked {
  opacity: 0.7;
  background-color: var(--magenta-op);
}
.activeObject:not(.locked) {
  background-color: var(--black-checked-lighter);
}
.activeObject.locked {
  opacity: 0.9;
  background-color: var(--magenta-op);
}
</style>
