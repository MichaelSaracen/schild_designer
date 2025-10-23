<script setup>
import {computed, inject, nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import GridLayout from "@/components/controls/layouts/GridLayout.vue";
import IconTextButton from "@/components/controls/buttons/IconTextButton.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import {RectangleItem} from "@/canvas/core/items/rectangle-item.js";
import {EllipseItem} from "@/canvas/core/items/ellipse-item.js";
import {TriangleItem} from "@/canvas/core/items/triangle-item.js";
import {PolygonItem} from "@/canvas/core/items/polygon-item.js";
import {TextBoxItem} from "@/canvas/core/items/text-box-item.js";
import {TextItem} from "@/canvas/core/items/text-item.js";


const scene = inject('scene');

const layers = computed( () => scene.value?.controller?.itemLayerModel?.layers ?? null );
const layerModel = computed( () => scene.value?.controller?.itemLayerModel ?? null );

const mode = ref('shapes')
const menuOpen = ref(false);
const menuTarget = ref(null);
const menuRect = ref({ x: 0, y: 0 });
const menuRef = ref(null);
const emit = defineEmits(["opened", "closed"]);

function updatePos( ) {
  if ( !menuTarget.value ) return;
  const controller = menuTarget.value.closest('.shapes-controller');
  if ( !controller ) return;
  const cRect = controller.getBoundingClientRect()
  menuRect.value = { x: cRect.left - 250, y: cRect.top - 84};
}

async function open(e) {

  menuTarget.value = e.target;
  menuOpen.value = true;
  emit("opened", true);
  window.addEventListener( 'resize', updatePos )
  e.stopPropagation();

  await nextTick()
  const rect = e.target.getBoundingClientRect();
  const controller = menuTarget.value.closest('.shapes-controller');
  if ( !controller ) return;
  updatePos();
}

function close() {
  menuOpen.value = false;
  menuTarget.value = null;
  emit("closed", false);
  window.removeEventListener( 'resize', updatePos )
}

function onOutsideClicked( e ) {
  if ( !e.target.closest( '.shapes-menu' ) ) {
    close();
  }
}

onMounted( () => {
  window.addEventListener( 'click', onOutsideClicked );
} );


onBeforeUnmount( () => {
  window.removeEventListener( 'click', onOutsideClicked );
} );

function setMode( v ) {
  mode.value = v;
}


defineExpose({ open, close, setMode });
</script>

<template>
  <Transition :name="'menu-slice'">
    <div
        v-if="menuOpen"
        ref="menuRef"
        class="shapes-menu"
        :style="{ left: menuRect.x + 'px', top: menuRect.y + 'px' }"
    >
      <RowLayout v-if="mode === 'shapes'">
        <IconTextButton  :width="56" :height="56" text="Rechteck"
                         :icon-source="'/icons/rect.png'"
                         @click="(e) => layerModel.addItem( new RectangleItem( { } , scene ))"
        />
        <IconTextButton  :width="56" :height="56" text="Ellipse"
                         :icon-source="'/icons/circle.png'"
                         @click="(e) => layerModel.addItem( new EllipseItem( { } , scene ))"
        />
        <IconTextButton :width="56" :height="56"  text="Dreieck"
                        :icon-source="'/icons/triangle.png'"
                        @click="(e) => layerModel.addItem( new TriangleItem( { } , scene ))"
        />
        <IconTextButton :width="56" :height="56" text="Polygon"
                        :icon-source="'/icons/polyon.png'"
                        @click="(e) => layerModel.addItem( new PolygonItem( { } , scene ))"
        />
      </RowLayout>
      <RowLayout v-if="mode === 'text'">
        <IconTextButton :width="56" :height="56" text="Text"
                        :icon-source="'/icons/text.png'"
                        @click="(e) => layerModel.addItem( new TextItem(  'Neuer Text', {} , scene ))"
        />
        <IconTextButton :width="56" :height="56" text="TextBox"
                        :icon-source="'/icons/text_box.png'"
                        @click="(e) => layerModel.addItem( new TextBoxItem(  'Neuer Text', {} , scene ))"
        />
      </RowLayout>
    </div>
  </Transition>
</template>

<style scoped>
.shapes-menu {
  position: fixed;
  z-index: 9999;
  padding: 0;
  background-color: var(--black200);
  border-radius: var(--border-radius-small);
  opacity: 1;
  box-shadow: var(--shadow-black);
}

.menu-slice-enter-from,
.menu-slice-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.menu-slice-enter-active,
.menu-slice-leave-active {
  transition: all 0.2s ease;
}


</style>
