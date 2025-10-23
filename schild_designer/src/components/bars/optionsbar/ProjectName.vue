<script setup>

import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextField from "@/components/controls/inputs/TextField.vue";
import {computed, inject, ref} from "vue";
import IconButton from "@/components/controls/buttons/IconButton.vue";
import ProjectMenu from "@/components/bars/optionsbar/ProjectMenu.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import MultiLineText from "@/components/controls/labels/MultiLineText.vue";

const title = inject( 'projectName')
const menuRef = ref( null );
function setText( t ) {
  if (t.trim().length <= 1) {
    title.value = "Unbenannt";
  } else {
    title.value = t.replace(/[^a-zA-Z]+$/g, "").trim();
  }
}

const menuOpen = computed( () => menuRef.value?.popupRef?.value?.showPopup.value || false)


</script>

<template>
  <ColumnLayout :min-height="64" :style="{ padding: 0, flexShrink: 0 }" :gap="0">
    <RowLayout :min-height="40">
      <TextField :text="title" v-model="title" @update:text="setText"/>
      <IconButton
        :checkable="true"
        :icon-size="12"
        :icon-source="'/icons/more.png'"
        :checked="menuOpen"
        @click="(e) => menuRef.popupRef.togglePopup(e)"
      />
    </RowLayout>
    <MultiLineText
        :style="{ marginTop: '-6px'}"
        :text="'<b>Projektname</b>. Dokumente werden mit diesem Namen gespeichert.'" />
  </ColumnLayout>
  <ProjectMenu ref="menuRef"/>
</template>

<style scoped>

</style>