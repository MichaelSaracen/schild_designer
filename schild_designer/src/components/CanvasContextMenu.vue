<script setup>

import {onMounted, onBeforeUnmount, ref, watch, inject, computed, toRaw} from "vue";

import Popup from "@/components/controls/menus/Popup.vue";
import MenuButton from "@/components/controls/buttons/MenuButton.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";


const scene = inject("scene");
const menuRef = ref(null);
const menuOpen = ref( false );
const contextMenu = ref(null);

const currentItem = computed( () => scene.value?.activeObject() ?? null );
const activeObjects = computed( () => scene.value?.selectedItems ?? null );
const itemLayerModel = computed(  () => scene.value?.controller?.itemLayerModel ?? null );
const selectionModel = computed(  () => scene.value?.controller?.selectionModel ?? null );
const itemModel = computed( () => scene.value?.controller?.itemModel ?? null );

function onToggleAction( value, cb ) {
  cb();
  if ( value )  scene.value.unselect();
   else scene.value.update();
  contextMenu.value.closePopup();
}

const locked = computed({
      get: () => currentItem.value?.lockMovementX || false,
      set: ( v ) => { onToggleAction( v, () => itemModel.value?.lockItem( v ) ); }
    }
);


const props = defineProps({
  items: { type: Array, default: () => [] },
  position: { type: Object, default: () => ({x:0,y:0}) },
  visible: { type: Boolean, default: false }
});
const emit = defineEmits(["close"]);

function handleClickOutside(e) {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    contextMenu.value.closePopup();
    emit("close");
  }
}

onMounted(() => document.addEventListener("mousedown", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("mousedown", handleClickOutside));


watch( () => scene.value?.selectionController?.states.target ,
    ( v ) => { if ( v && menuOpen.value ) contextMenu.value.closePopup(); } )

function openContextMenu(e) {
  if (!currentItem.value) {
    if ( menuOpen.value ) contextMenu.value.closePopup();
    return;
  }
  contextMenu.value?.openAt(e.clientX, e.clientY);
}

function deleteItem() {
  if (activeObjects.value) {
    activeObjects.value.forEach( o => itemLayerModel.value.removeOne( toRaw(o) ) ) ;
  } else {
    itemLayerModel.value.removeItemFromActiveLayer( toRaw(currentItem.value) );
  }
  contextMenu.value.closePopup();
}


function duplicateItem() {
  if (!currentItem.value) return;
  selectionModel.value.duplicateItem( currentItem.value );
  contextMenu.value.closePopup();
}

function setOpen( v ) {
  menuOpen.value = v;
}

defineExpose({ openContextMenu });

</script>

<template>
  <Popup
      :expand-content="true"
      ref="contextMenu"
       direction="bottom"
      :header-visible="false"
      :gap="4"
      @closed="setOpen( false )"
      @opened="setOpen( true )"
  >
    <MenuButton
        :text="`${locked ? 'freigeben' : 'sperren'}`"

        :background-color="'var(--black-soft)'"
        checkable
        v-model:checked="locked"


    />
    <MenuButton
        :text="'duplizieren'"
        :background-color="'var(--black-soft)'"
        @click="duplicateItem"
    />

    <MenuButton
        :text="'scheiden (TODO)'"
        :background-color="'var(--black-soft)'"

    />

    <MenuButton
        :text="'zurücksetzen (TODO) '"
        :background-color="'var(--black-soft)'"

    />

    <MenuButton
        :text="'gruppieren (TODO) '"
        :background-color="'var(--black-soft)'"
    />
    <HorizontalSpacer/>
    <MenuButton
        :text="'entfernen'"
        :background-color="'var(--black-soft)'"
        @click="deleteItem"
    />
  </Popup>
</template>

<style scoped>
/* Keine Änderung */
</style>
