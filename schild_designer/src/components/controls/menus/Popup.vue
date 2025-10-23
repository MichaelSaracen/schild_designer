<script setup>

import ScrollView from "@/components/controls/views/ScrollView.vue";
import IconButton from "@/components/controls/buttons/IconButton.vue";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

import {EventBus} from "@/canvas/utils/event-bus.js";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";

const props = defineProps({
  autoHeight: { type: Boolean, default: false },
  height: { type: Number, default: 300 },
  width: { type: Number, default: 200 },
  headerVisible: { type: Boolean, default: false },
  headerTitle: { type: String, default: "Header"},
  footerVisible: { type: Boolean, default: false },
  footerTitle: { type: String, default: "Footer"},
  direction: { type: String, default: "left" },
  offsetY: { type: Number, default: 0 },
  gap:  { type:  [String, Number], default: 4 },
  expandContent: { type: Boolean, default: false },
  overflowY: { type: String, default: 'auto'}
})

const showPopup = ref( false );
const popupRect = ref( {x: 0, y: 0, width: 200, height: props.height } );
const popupTarget = ref( null );


onMounted(() => {
  document.addEventListener("click", onOutsideClicked);
  EventBus.on("popup-opened", onPopupOpened);
  EventBus.on("popup-close", closePopup);
});

// beim Unmount sauber entfernen
onBeforeUnmount(() => {
  document.removeEventListener("click", onOutsideClicked);
  EventBus.off(onPopupOpened);
  EventBus.off("popup-close", closePopup);
});

function onPopupOpened(e) {
  // falls wir selbst offen sind und das Event nicht von uns kommt → schließen
  if (showPopup.value && e.detail.source !== popupTarget.value) {
    closePopup();
  }
}

function updatePostion() {
  if ( !popupTarget.value ) return;
  const rect = popupTarget.value.getBoundingClientRect();
  const sideBar = popupTarget.value.closest('.side-bar');
  if ( !sideBar ) return;
  const sideBarRect = sideBar.getBoundingClientRect();

  const D1 = 16;
  const D2 = D1 / 2;
  switch (props.direction) {
    case "left":
      popupRect.value.width = sideBarRect.width - D1;
      popupRect.value.x = Math.min( rect.x - rect.width - 24, window.innerWidth - rect.width - D2   );
      popupRect.value.y = Math.min( rect.y, window.innerHeight - popupRect.value.height - D2  );
      break;
    case "right":
      popupRect.value.width = sideBarRect.width - D1;
      popupRect.value.x = Math.min( sideBarRect.right + 8, window.innerWidth - rect.width - D2   );
      popupRect.value.y = Math.min( rect.y + props.offsetY, window.innerHeight - popupRect.value.height - D2  );
      break;
    case "contains":
      popupRect.value.width = rect.width
      popupRect.value.x = Math.min( rect.x , window.innerWidth - rect.width - D2   );
      popupRect.value.y = Math.min( rect.y + props.offsetY, window.innerHeight - popupRect.value.height - D2  );
      break;
    case "bottom":
      popupRect.value.width = sideBarRect.width - D1
      popupRect.value.x = Math.min( sideBarRect.right - sideBarRect.width + D2, window.innerWidth - rect.width - D2   );
      popupRect.value.y = Math.min( rect.y + rect.height + props.offsetY, window.innerHeight - popupRect.value.height - D2  );
      break;
  }

  popupRect.value = { x: popupRect.value.x , y: popupRect.value.y, width: popupRect.value.width, height: popupRect.value.height };
}

function closePopup() {
  showPopup.value = false;
  popupTarget.value = null;
  emit('closed', false);
  window.removeEventListener('resize', updatePostion);
}

function onOutsideClicked( e ) {
  if ( !e.target.closest('.popup')) {
    closePopup();
  }
}

function openAt(x, y) {
  popupRect.value = {
    x,
    y,
    width: 180,
    height: props.height,
  };
  showPopup.value = true;
  emit("opened", true);
}

function open( e ) {
  e.stopPropagation();
  EventBus.emit("popup-opened", { source: popupTarget.value });

  popupTarget.value = e.target;
  updatePostion();
  window.addEventListener('resize', updatePostion);
  showPopup.value = true;
  emit('opened', true);
}

function togglePopup( e ) {
  if ( showPopup.value ) {
    closePopup();
  } else {
    open(e);
  }
}


defineExpose( { open, openAt, closePopup, togglePopup, showPopup } )
const emit = defineEmits(['closed', 'opened'])

</script>

<template>
  <Transition :name="`popup-slide-${props.direction}`">
  <div
      v-if="showPopup"
      class="popup"
      :style="{
        height: props.expandContent ? 'auto' : popupRect.height + 'px',
        maxHeight: props.expandContent ? '90vh' : 'none',
        left: popupRect.x + 'px',
        top: popupRect.y + 'px', width: popupRect.width + 'px',
        offsetY

       }"

  >
    <ColumnLayout :style="{padding: 0}" :gap="4"  :fill-height="true">

      <RowLayout v-if="headerVisible" :gap="4" :style="{padding: 0, marginTop: '4px'}"  :min-height="24">
        <TextLabel
            :text="headerTitle" :font-size="12" :font-weight="600" :opacity="0.8" :stretch="true"
            :style="{ height: '24px', minHeight: '24px'}"
        />
        <IconButton
          :icon-source="'/icons/close.png'"
          :width="24"
          :height="24"
          :icon-size="16"
          @click="closePopup"
        />
      </RowLayout>
      <HorizontalSpacer v-if="headerVisible" :opacity="0.15" :marginTop="0"/>
      <ScrollView  :overflow-y="overflowY" :padding="8" :gap='gap' :style="props.expandContent ? { flex: 1 } : {}">
        <slot/>
<!--        <span  v-for="n in 30" :key="n"> Zeile {{n }} </span>-->
      </ScrollView>
      <RowLayout v-if="footerVisible" :padding="0" :margin-top="8">
        <TextLabel
            :text="footerTitle" :font-size="10" :font-weight="600" :opacity="0.8" :stretch="true"
            :style="{ height: '24', backgroundColor: 'blue'}"
        />
      </RowLayout>
    </ColumnLayout>
  </div>
  </Transition>
</template>

<style scoped>

.popup{
  display: flex;
  flex-direction: column;
  position: absolute;

  background-color: var(--black200);
  border-radius: 4px;
  border: 1px solid var(--border);
  user-select: none;
  z-index: 9999;
  min-height: 0;
  overflow: hidden;
  transition: left 0.2s ease, top 0.2s ease;
}

.popup-slide-left-enter-from,
.popup-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.popup-slide-left-enter-active,
.popup-slide-left-leave-active {
  transition: all 0.2s ease;
}

.popup-slide-right-enter-from,
.popup-slide-right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.popup-slide-right-enter-active,
.popup-slide-right-leave-active {
  transition: all 0.2s ease;
}

.popup-slide-contains-enter-from,
.popup-slide-contains-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.popup-slide-contains-enter-active,
.popup-slide-contains-leave-active {
  transition: all 0.2s ease;
}

.popup-slide-bottom-enter-from,
.popup-slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.popup-slide-bottom-enter-active,
.popup-slide-bottom-leave-active {
  transition: all 0.2s ease;
}



</style>