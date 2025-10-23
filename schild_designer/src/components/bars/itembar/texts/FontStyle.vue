<script setup>
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconLabelText from "@/components/controls/labels/IconLabelText.vue";
import Popup from "@/components/controls/menus/Popup.vue";
import { computed, ref, inject, watch } from "vue";
import MenuButton from "@/components/controls/buttons/MenuButton.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";

const scene = inject("scene");

const props = defineProps({
  fontWeights: { type: Array, default: [] }
});

const popupRef = ref(null);


const fontWeight = computed({
  get: () => scene.value?.states.fontWeight || 400,
  set: (val) => {
    scene.value.setActiveObjectValue("fontWeight", val);
    scene.value.canvas.requestRenderAll();
  },
});

const fontSize           = computed( {
  get: () => scene.value?.states.fontSize || 0,
  set: (v) => { scene.value.setActiveObjectValue( 'fontSize', v ); }
} );

const charSpacing           = computed( {
  get: () => scene.value?.states.charSpacing || 0,
  set: (v) => { scene.value.setActiveObjectValue( 'charSpacing', v ); }
} );

const lineHeight           = computed( {
  get: () => scene.value?.states.lineHeight || 0,
  set: (v) => { scene.value.setActiveObjectValue( 'lineHeight', v ); }
} );


function setFont(weight) {
  fontWeight.value = weight;
}

watch(
    () => props.fontWeights,
    (newWeights) => {
      if (!newWeights?.length) return;

      if (!newWeights.includes(fontWeight.value)) {
        fontWeight.value = newWeights.includes(400)
            ? 400
            : newWeights[0];
      }
    },
    { immediate: true }
);
// ------------------------

const weights = (v) =>
    v === 100 ? "Thin" : v === 200 ? "ExtraLight" : v === 300 ? "Light" : v === 400 ? "Regular" : v === 500 ?
        "Medium" : v === 600 ? "DemiBold"  : v === 700 ? "Bold" : v === 800 ? "Black" : "ExtraBlack";
</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :margin-top="8">
    <RowLayout :style="{ padding: 0 }" :gap="8">
      <IconLabelText
          :header-text="'Weight'"
          :prefix="'W'"
          :text="weights(fontWeight)"
          :icon-display="'left'"
          :hover-enabled="true"
          :icon-source="'/icons/x.png'"
          @click="(e) => popupRef.open(e)"
      />

      <IconTextField
          :header-text="'Größe'"
          :min-value="6"
          :max-value="256"
          :icon-source="'/icons/r_left.png'"
          :prefix="'X'" v-model="fontSize" />

    </RowLayout>
    <RowLayout :style="{ padding: 0 }" :gap="8">
      <IconTextField
          :header-text="'Abstand'"
          :min-value="0"
          :max-value="9999"
          :icon-source="'/icons/r_left.png'"
          :prefix="'X'" v-model="charSpacing" />

      <IconTextField
          :header-text="'Zeilenabstand'"
          :min-value="0.25"
          :max-value="10"
          :drag-step="0.01"
          :input-type="'decimal'"
          :icon-source="'/icons/r_left.png'"
          :prefix="'X'" v-model="lineHeight" />

    </RowLayout>
  </ColumnLayout>

  <Popup
      ref="popupRef"
      :header-visible="true"
      :header-title="'Weight'"
      :expand-content="false"
  >
    <MenuButton
        v-for="(weight, index) in props.fontWeights"
        :key="index"
        :height="32"
        :text="weights(weight)"
        :checked="fontWeight === weight"
        :icon-source="'/icons/text.png'"
        :background-color="'var(--black-soft)'"
        v-model="fontWeight"
        @click="() => setFont(weight)"
    />
  </Popup>
</template>

<style scoped></style>
