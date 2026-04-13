<script setup lang="ts">
import type { AutoFormFieldProps } from '../../types'

const props = defineProps<AutoFormFieldProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <select
    :value="modelValue ?? ''"
    v-bind="inputProps"
    class="autoform-select"
    @change="onChange"
  >
    <option value="" disabled>Select...</option>
    <option
      v-for="[value, label] in field.options ?? []"
      :key="value"
      :value="value"
    >
      {{ label }}
    </option>
  </select>
</template>
