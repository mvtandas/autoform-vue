<script setup lang="ts">
import type { AutoFormFieldProps } from '../../types'

const props = defineProps<AutoFormFieldProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <input
    type="checkbox"
    :checked="!!modelValue"
    v-bind="inputProps"
    class="autoform-checkbox"
    @change="onChange"
  />
</template>
