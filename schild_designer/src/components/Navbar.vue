<script setup>

import NavbarButton from "@/components/controls/buttons/NavbarButton.vue";
import {ref} from "vue";

const currentIndex = ref( 0 );

const options = [
  { text: 'Workspace', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/workspace.png'  },
  { text: 'Ebenen', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/layer.png'  },
  { text: 'Bilder', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/image2.png'  },
  { text: 'Formen', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/shapes.png'  },
  { text: 'Text', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/text.png'  },
  { text: 'Pfeile', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/arrows.png' },
  { text: 'Symbole', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/symbols.png' },
  { text: 'Layouts', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/layout.png' },
  { text: 'Vorlagen', checked: (idx) => idx === currentIndex.value, iconSource: '/icons/template.png' },
];


function setCurrentIndex( idx ) {
  currentIndex.value = idx;
}

defineExpose( { currentIndex } )


</script>

<template>
<div class="navbar">
  <div v-for="(opt, idx) in options">
    <NavbarButton :text="opt.text" :icons-source="opt.iconSource" :checked="opt.checked(idx)" @click="setCurrentIndex(idx)" />
  </div>
  <div :style="{height: '100%'}"></div>
  <NavbarButton :text="'Einstellungen'" :icons-source="'/icons/settings.png'" :checked="currentIndex === 9" @click="setCurrentIndex(9)" />

</div>


</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 70px;
  height: 100%;
  border-right: 1px solid var(--border-color);
  background-color: var(--black100);
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 1px;
  scrollbar-width: thin;
  scrollbar-color: var(--border-color);
}

.navbar > * {
  min-height: fit-content !important;
}
</style>