<script setup>

import ScrollView from "@/components/controls/views/ScrollView.vue";
import CanvasItem from "@/components/bars/optionsbar/filebar/layerbar/CanvasItem.vue";
import ItemLayer from "@/components/bars/optionsbar/filebar/layerbar/ItemLayer.vue";
import {computed, inject, ref} from "vue";

const scene = inject('scene');

const layerModel = computed( () => scene.value?.controller?.itemLayerModel ?? null );
const layers = computed( () => { return scene.value?.controller?.itemLayerModel?.layers ?? null } );

const dragItemInfo = ref({ layerIndex: null, itemIndex: null });

function onItemDropToLayer(targetLayerIndex) {
  const { layerIndex, itemIndex } = dragItemInfo.value;
  if (layerIndex === null || itemIndex === null) return;

  const layersArr = scene.value.controller.itemLayerModel.layers;
  const sourceLayer = layersArr[layerIndex];
  const targetLayer = layersArr[targetLayerIndex];
  if (!sourceLayer || !targetLayer) return;

  const moved = sourceLayer.items.splice(itemIndex, 1)[0];
  if (!moved) return;

  targetLayer.items.push(moved);
  moved.layer = targetLayer;

  layerModel.value.setActiveLayer( targetLayer )
  scene.value.controller.itemLayerModel.scene.update();
  scene.value.controller.itemLayerModel.reorder();
  dragItemInfo.value = { layerIndex: null, itemIndex: null };
}

</script>

<template>
  <ScrollView>
    <ItemLayer :items="layers ? layers : []" @item-drop-to-layer="onItemDropToLayer" >
      <template #items-layer="{  layer, items, layerIndex }">
        <CanvasItem :items="items" :layer-index="layerIndex" :dragItemInfo="dragItemInfo">
        </CanvasItem>
      </template>

    </ItemLayer>
  </ScrollView>
</template>

<style scoped>

</style>