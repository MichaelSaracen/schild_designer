<script setup>


import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconLabelText from "@/components/controls/labels/IconLabelText.vue";
import Popup from "@/components/controls/menus/Popup.vue";
import {computed, ref, inject} from "vue";
import MenuButton from "@/components/controls/buttons/MenuButton.vue";
import {getAvailableFonts} from "@/assets/js/font-map.js";

const scene = inject("scene");

// https://www.fontspace.com/
const availableFonts = getAvailableFonts()


const popupRef = ref( null );
const currentFont = ref( availableFonts.find( f => f.family === 'Vegur') );

const fontFamily = computed({
  get: () => scene.value?.states.fontFamily || "Vegur",
  set: (val) => {
    scene.value.setActiveObjectValue('fontFamily', val);
    scene.value.canvas.requestRenderAll();
  },
});

function setFont( f ) {
  currentFont.value = f;
  fontFamily.value = f.family
}

defineExpose( { currentFont } );


</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :margin-top="8">
    <RowLayout :style="{ padding: 0 }" :gap="8">
      <IconLabelText
          :header-text="'Schriftart'"
          :prefix="'W'"
          :text="fontFamily"
          :icon-display="'left'"
          :hover-enabled="true"
          :icon-source="'/icons/x.png'"
          @click="(e) => popupRef.open(e)"
      />
    </RowLayout>
  </ColumnLayout>

  <Popup  ref="popupRef" :header-visible="true" :header-title="'Schriftart'" :expand-content="false">
    <MenuButton
        v-for=" (font, index) in availableFonts"
        :key="index"
        :height="32"
        :text="font.family"
        :font-family="font.family"
        :checked="fontFamily === font.family"
        :icon-source="'/icons/text.png'"
        :background-color="'var(--black-soft)'"
        v-model="fontFamily"
        @click="() => setFont(font)"
    />
  </Popup>

</template>

<style scoped>

</style>