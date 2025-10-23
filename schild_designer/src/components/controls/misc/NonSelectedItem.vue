<script setup>
import MultiLineText from "@/components/controls/labels/MultiLineText.vue";
import Icon from "@/components/controls/misc/Icon.vue";
</script>

<template>
  <div class="non-selected-item">
    <div class="non-selected-container">
      <Icon :icon-size="64" :icon-source="'/icons/shapes.png'" />
      <MultiLineText
          :text="'Keine Auswahl'"
          :font-size="16"
          :align="'center'"
      />
    </div>
  </div>
</template>

<style scoped>
.non-selected-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* 🔹 entfernt absolute Positionierung */
  flex: 1; /* <<< NEU: füllt Sidebar-Inhalt */
  width: 100%; /* <<< NEU: Sidebar-Breite */
  height: 100%;

  pointer-events: none;
}

.non-selected-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 8px;
}
</style>
