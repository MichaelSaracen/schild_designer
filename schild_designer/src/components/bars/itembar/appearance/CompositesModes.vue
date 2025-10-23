<script setup>


import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconLabelText from "@/components/controls/labels/IconLabelText.vue";
import Popup from "@/components/controls/menus/Popup.vue";
import {computed, ref, inject} from "vue";
import MenuButton from "@/components/controls/buttons/MenuButton.vue";

const scene = inject("scene");

const modes = [
  { name: "source-over"},
  { name: "source-atop"},
  { name: "destination-over"},
  { name: "destination-out"},
  { name: "destination-in"},
  { name: "lighter"},
  { name: "xor"},
  { name: "multiply"},
  { name: "screen"},
  { name: "overlay"},
  { name: "darken"},
  { name: "lighten"},
  { name: "color-dodge"},
  { name: "color-burn"},
  { name: "hard-light"},
  { name: "soft-light"},
  { name: "difference"},
  { name: "exclusion"},
  { name: "hue"},
  { name: "saturation"},
  { name: "color"},
  { name: "luminosity"}
];


const popupRef = ref( null );

const globalCompositeOperation = computed({
  get: () => scene.value?.states.globalCompositeOperation || "source-in",
  set: (val) => {
    scene.value.setActiveObjectValue('globalCompositeOperation', val);
  },
});


</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :margin-top="8">
    <RowLayout :style="{ padding: 0 }" :gap="8">
      <IconLabelText
          :header-text="'Zusammensetzung'"
          :prefix="'W'"
          :text="globalCompositeOperation"
          :icon-display="'left'"
          :hover-enabled="true"

          :icon-source="'/icons/x.png'"
          @click="(e) => popupRef.open(e)"
      />
    </RowLayout>
  </ColumnLayout>

  <Popup  ref="popupRef" :header-visible="true" :header-title="'Zusammensetzung'" :expand-content="false">
    <MenuButton
        v-for=" (item, index) in modes"
        :key="index"
        :header-text="''"
        :text="item.name"

        :checked="globalCompositeOperation === item.name"
        :icon-source="'/icons/x.png'"
        :background-color="'var(--black-soft)'"
        v-model="globalCompositeOperation"
        @click="globalCompositeOperation = item.name"
    />
  </Popup>

</template>

<style scoped>

</style>