<script setup>

import GridLayout from "@/components/controls/layouts/GridLayout.vue";
import {RectangleItem} from "@/canvas/core/items/rectangle-item.js";
import {EllipseItem} from "@/canvas/core/items/ellipse-item.js";
import {TriangleItem} from "@/canvas/core/items/triangle-item.js";
import {PolygonItem} from "@/canvas/core/items/polygon-item.js";
import IconTextButton from "@/components/controls/buttons/IconTextButton.vue";
import {computed, inject, ref} from "vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import ColorButton from "@/components/controls/buttons/ColorButton.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import {StarItem} from "@/canvas/core/items/star-item.js";

import {PathItem} from "@/canvas/core/items/path-item.js";
import {SvgPaths} from "@/assets/js/svg-paths.js";

const scene = inject('scene');

const layerModel      = computed( () => scene.value?.controller?.itemLayerModel ?? null );
const appSettings     = inject('appSettings');

const fill           = computed( {
  get: () => appSettings.value?.colors.shapeFill || '#000',
  set:( clr ) => { appSettings.value.colors.shapeFill = clr }
});

const stroke        = computed( {
  get: () => appSettings.value?.colors.shapeStroke || '#000',
  set:( clr ) => { appSettings.value.colors.shapeStroke = clr }
});


function addItem ( item ) {
  layerModel.value.addItem( item );

  scene.value.canvas.setActiveObject( item )
}


const items = [
  { icon: '/icons/rect.png', cb: () => addItem(new RectangleItem( { fill: fill.value, stroke: stroke.value } , scene.value ))},
  { icon: '/icons/circle.png', cb: () => addItem(new EllipseItem( { fill: fill.value, stroke: stroke.value } , scene.value ))},
  { icon: '/icons/triangle.png', cb: () => addItem(new TriangleItem( { fill: fill.value, stroke: stroke.value } , scene.value ))},
  { icon: '/icons/polygon.png', cb: () => addItem(new PolygonItem( { fill: fill.value, stroke: stroke.value} , scene.value ))},
  { icon: '/icons/star.png', cb: () => addItem(new StarItem( { fill: fill.value, stroke: stroke.value } , scene.value ))},
  { icon: '/icons/heart.png', cb: () => addItem(new PathItem(  SvgPaths.heart, { fill: fill.value, stroke: stroke.value } , scene.value, 'Hertz' ))},
  { icon: '/icons/diamond.png', cb: () => addItem( new PathItem(  SvgPaths.diamond, { fill: fill.value, stroke: stroke.value } , scene.value, 'Kristall' ))},
  { icon: '/icons/sung.png', cb: () => addItem( new PathItem(  SvgPaths.sun, { fill: fill.value, stroke: stroke.value } , scene.value, 'Sonne' ))},
]

</script>

<template>
  <ColumnLayout :fill-height="false" :style="{ padding: 0 }" :gap="0">

    <RowLayout :padding-top="0" :padding-bottom="0"  :min-height="32">
      <TextLabel :padding-left="0" :text="'Füllfarbe'"/>
      <ColorButton :width="32" :height="32" v-model="fill"/>
    </RowLayout>

    <RowLayout  :padding-top="0" :padding-bottom="0" :min-height="32">
      <TextLabel :padding-left="0" :text="'Rahmenfarbe'"/>
      <ColorButton :width="32" :height="32" v-model="stroke"/>
    </RowLayout>

    <HorizontalSpacer/>

    <GridLayout
        :padding="8"
      :column-gap="8" :row-gap="8"

    >
      <IconTextButton
          v-for="(item, index) in items"
          :icon-size="42"
          :height="56"
                      :text="item.name"
                      :icon-source="item.icon"
                      @click="(e) => item.cb()"
      />
    </GridLayout>
  </ColumnLayout>
</template>

<style scoped>

</style>