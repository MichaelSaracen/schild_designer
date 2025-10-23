<script setup >

import SideBar from "@/components/controls/bars/SideBar.vue";
import {computed, inject, ref, watch} from "vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import FileBar from "@/components/bars/optionsbar/FileBar.vue";
import ProjectName from "@/components/bars/optionsbar/ProjectName.vue";
import SymbolsBar from "@/components/bars/optionsbar/SymbolsBar.vue";
import ArrowsBar from "@/components/bars/optionsbar/ArrowsBar.vue";
import LayoutTextsBar from "@/components/bars/optionsbar/LayoutTextsBar.vue";
import WorkspaceBar from "@/components/bars/optionsbar/WorkspaceBar.vue";
import ShapesBar from "@/components/bars/optionsbar/ShapesBar.vue";
import TextBar from "@/components/bars/optionsbar/TextBar.vue";
import ScrollView from "@/components/controls/views/ScrollView.vue";
import SettingsBar from "@/components/bars/optionsbar/SettingsBar.vue";
import ImagesBar from "@/components/bars/optionsbar/ImagesBar.vue";



const navbarRef = inject("navbarRef");
const currentIndex = ref(0);
watch( () => navbarRef.value?.currentIndex, (v) => { currentIndex.value = v; } )


</script>

<template>
  <SideBar :border-right-visible="true" >
    <ProjectName/>
    <HorizontalSpacer/>
    <ScrollView :style="{ padding: 0}">
      <WorkspaceBar v-if="currentIndex === 0"/>
      <FileBar v-if="currentIndex === 1"/>
      <ImagesBar v-if="currentIndex === 2"/>
      <ShapesBar v-if="currentIndex === 3"/>
      <TextBar v-if="currentIndex === 4"/>
      <ArrowsBar v-if="currentIndex === 5" />
      <SymbolsBar v-if="currentIndex === 6"/>
      <LayoutTextsBar v-if="currentIndex === 7"/>

      <SettingsBar v-if="currentIndex === 9"/>
    </ScrollView>


  </SideBar>
</template>

<style scoped>


</style>