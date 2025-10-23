<script setup>

import SideBar from "@/components/controls/bars/SideBar.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import ScrollView from "@/components/controls/views/ScrollView.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ViewOptions from "@/components/bars/itembar/ViewOptions.vue";
import Geometry from "@/components/bars/itembar/Geometry.vue";

import Appearance from "@/components/bars/itembar/Appearance.vue";
import Layout from "@/components/bars/itembar/Layout.vue";
import Texts from "@/components/bars/itembar/Texts.vue";
import {computed, inject} from "vue";
import ImageFilter from "@/components/bars/itembar/images/ImageFilter.vue";
import {ImageItem} from "@/canvas/core/items/image-item.js";
import {TextItem} from "@/canvas/core/items/text-item.js";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import MultiLineText from "@/components/controls/labels/MultiLineText.vue";
import Icon from "@/components/controls/misc/Icon.vue";
import NonSelectedItem from "@/components/controls/misc/NonSelectedItem.vue";
import Images from "@/components/bars/itembar/Images.vue";
import {FabricImage} from "fabric";

const scene = inject( 'scene' );
const selectedItem = computed( () => scene.value?.activeObject() ?? null );


</script>

<template>
  <SideBar :border-left-visible="true">
    <ViewOptions/>
    <HorizontalSpacer/>
    <ScrollView>
      <ColumnLayout :style="{padding: 0}">
        <Geometry v-if="selectedItem && selectedItem.objectName !== 'BackgroundItem' "/>
        <Layout v-if="selectedItem && selectedItem.objectName !== 'BackgroundItem' "/>
        <Appearance v-if="selectedItem && !(selectedItem instanceof FabricImage)"/>
        <Texts v-if="selectedItem && selectedItem instanceof  TextItem"/>
        <Images v-if="selectedItem && selectedItem instanceof ImageItem"/>
      </ColumnLayout>
    </ScrollView>

    <NonSelectedItem v-if="!selectedItem"/>

  </SideBar>
</template>

<style scoped>



</style>