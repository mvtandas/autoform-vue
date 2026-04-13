<script setup lang="ts">
import type { AutoFormFieldProps } from '../../types'

const props = defineProps<AutoFormFieldProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: number | undefined): void }>()

function onInput(event: Event) {
  const val = (event.target as HTMLInputElement).value
  emit('update:modelValue', val === '' ? undefined : Number(val))
}
</script>

<template>
  <input
    type="number"
    :value="modelValue ?? ''"
    v-bind="inputProps"
    class="autoform-input"
    @input="onInput"
  />
</template>
