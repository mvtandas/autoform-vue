<script setup lang="ts">
import { provide } from 'vue'
import type { SchemaProvider } from '@autoform/core'
import type { AutoFormFieldComponents, AutoFormUIComponents } from '../types'
import { useAutoForm } from '../composables/useAutoForm'
import AutoFormField from './AutoFormField.vue'

const props = withDefaults(
  defineProps<{
    schema: SchemaProvider
    uiComponents?: AutoFormUIComponents
    formComponents?: AutoFormFieldComponents
    withSubmit?: boolean
    submitText?: string
    formProps?: Record<string, any>
  }>(),
  {
    withSubmit: true,
    submitText: 'Submit',
  },
)

const emit = defineEmits<{
  (e: 'submit', data: any): void
}>()

const {
  values,
  errors,
  fields,
  isSubmitting,
  setFieldValue,
  getFieldValue,
  getFieldError,
  handleSubmit,
  reset,
} = useAutoForm(props.schema)

async function onSubmit() {
  await handleSubmit((data) => emit('submit', data))
}

provide('autoform', { values, errors, setFieldValue, getFieldValue, getFieldError })

defineExpose({ values, errors, isSubmitting, reset })
</script>

<template>
  <form
    v-bind="formProps"
    class="autoform"
    @submit.prevent="onSubmit"
  >
    <AutoFormField
      v-for="field in fields"
      :key="field.key"
      :field="field"
      :path="field.key"
      :model-value="getFieldValue(field.key)"
      :error="getFieldError(field.key)"
      :form-components="formComponents"
      :ui-components="uiComponents"
      :get-field-value="getFieldValue"
      :set-field-value="setFieldValue"
      :get-field-error="getFieldError"
      @update:model-value="setFieldValue(field.key, $event)"
    />

    <slot />

    <button
      v-if="withSubmit"
      type="submit"
      class="autoform-submit"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? 'Submitting...' : submitText }}
    </button>
  </form>
</template>

<style>
.autoform {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.autoform-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.autoform-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.autoform-required {
  color: #ef4444;
  margin-left: 2px;
}

.autoform-description {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.autoform-input,
.autoform-select,
.autoform-textarea {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}

.autoform-input:focus,
.autoform-select:focus,
.autoform-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.autoform-textarea {
  min-height: 80px;
  resize: vertical;
}

.autoform-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

.autoform-error {
  font-size: 13px;
  color: #ef4444;
  margin: 0;
}

.autoform-submit {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  align-self: flex-start;
}

.autoform-submit:hover {
  background: #2563eb;
}

.autoform-submit:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.autoform-object {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.autoform-object legend {
  font-weight: 600;
  padding: 0 8px;
}
</style>
