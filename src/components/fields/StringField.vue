<script setup lang="ts">
import type { AutoFormFieldProps } from '../../types'

const props = defineProps<AutoFormFieldProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    type="text"
    :value="modelValue ?? ''"
    v-bind="inputProps"
    class="autoform-input"
    @input="onInput"
  />
</template>
