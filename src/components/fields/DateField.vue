<script setup lang="ts">
import type { AutoFormFieldProps } from '../../types'

const props = defineProps<AutoFormFieldProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: Date | undefined): void }>()

function onInput(event: Event) {
  const val = (event.target as HTMLInputElement).value
  emit('update:modelValue', val ? new Date(val) : undefined)
}

const dateValue = computed(() => {
  if (!props.modelValue) return ''
  const d = props.modelValue instanceof Date ? props.modelValue : new Date(props.modelValue)
  return d.toISOString().split('T')[0]
})

import { computed } from 'vue'
</script>

<template>
  <input
    type="date"
    :value="dateValue"
    v-bind="inputProps"
    class="autoform-input"
    @input="onInput"
  />
</template>
