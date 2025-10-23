<script setup >

import IconButton from "@/components/controls/buttons/IconButton.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import {computed, inject} from "vue";


const scene = inject('scene');

const layers = computed( () => scene.value?.controller?.itemLayerModel?.layers ?? null );
const layerModel = computed( () => scene.value?.controller?.itemLayerModel ?? null );




</script>

<template>
  <RowLayout :fill-width="true" :min-height="40">
    <TextLabel :text="'Ebenen'"/>
    <IconButton
        v-if="layers && layers.length > 0"
        :icon-source="'/icons/del_sweep.png'"
        :tooltip="'<b>Alle Layer entfernen.</b><br>Es werden alle Layer, bis auf der Erste entfernt.'"
        @click="(e) => layerModel.clear()"
    />
    <IconButton
        :tooltip="'<b>Neuen Layer hinzufügen</b><br>Auf diesem Layer kannst du Objekte platzieren und bearbeiten.'"
      @click="(e) => scene.controller.itemLayerModel.addLayer()"
    />

  </RowLayout>
</template>

<style scoped>

</style>