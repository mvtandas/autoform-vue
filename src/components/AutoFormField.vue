<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import type { ParsedField } from '@autoform/core'
import { getLabel } from '@autoform/core'
import type { AutoFormFieldComponents, AutoFormUIComponents } from '../types'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'
import BooleanField from './fields/BooleanField.vue'
import DateField from './fields/DateField.vue'
import SelectField from './fields/SelectField.vue'
import TextareaField from './fields/TextareaField.vue'

const props = defineProps<{
  field: ParsedField
  modelValue: any
  error?: string
  path: string
  formComponents?: AutoFormFieldComponents
  uiComponents?: AutoFormUIComponents
  getFieldValue: (path: string) => any
  setFieldValue: (path: string, value: any) => void
  getFieldError: (path: string) => string | undefined
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const DEFAULT_FIELDS: Record<string, Component> = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
  textarea: TextareaField,
}

const fieldComponent = computed<Component>(() => {
  const fieldType = props.field.fieldConfig?.fieldType ?? props.field.type
  return props.formComponents?.[fieldType] ?? DEFAULT_FIELDS[fieldType] ?? StringField
})

const label = computed(() => {
  const configLabel = props.field.fieldConfig?.label
  if (typeof configLabel === 'string') return configLabel
  return getLabel(props.field)
})

const description = computed(() => {
  const desc = props.field.fieldConfig?.description ?? props.field.description
  if (typeof desc !== 'string') return undefined
  // Don't show description if it's the same as the label
  if (desc === label.value) return undefined
  return desc
})

const isObject = computed(() => props.field.type === 'object' && props.field.schema)
const isArray = computed(() => props.field.type === 'array' && props.field.schema)
</script>

<template>
  <!-- Object fields -->
  <fieldset v-if="isObject" class="autoform-object">
    <legend class="autoform-label">{{ label }}</legend>
    <p v-if="description" class="autoform-description">{{ description }}</p>
    <AutoFormField
      v-for="subField in field.schema"
      :key="subField.key"
      :field="subField"
      :path="`${path}.${subField.key}`"
      :model-value="getFieldValue(`${path}.${subField.key}`)"
      :error="getFieldError(`${path}.${subField.key}`)"
      :form-components="formComponents"
      :ui-components="uiComponents"
      :get-field-value="getFieldValue"
      :set-field-value="setFieldValue"
      :get-field-error="getFieldError"
      @update:model-value="setFieldValue(`${path}.${subField.key}`, $event)"
    />
  </fieldset>

  <!-- Regular fields -->
  <div v-else class="autoform-field">
    <label class="autoform-label">
      {{ label }}
      <span v-if="field.required" class="autoform-required">*</span>
    </label>
    <p v-if="description" class="autoform-description">{{ description }}</p>
    <component
      :is="fieldComponent"
      :field="field"
      :model-value="modelValue"
      :error="error"
      :input-props="field.fieldConfig?.inputProps"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <p v-if="error" class="autoform-error">{{ error }}</p>
  </div>
</template>
