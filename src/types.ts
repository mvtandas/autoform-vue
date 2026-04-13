import type { Component } from 'vue'
import type { ParsedField, SchemaProvider } from '@autoform/core'

export interface AutoFormFieldProps {
  field: ParsedField
  modelValue: any
  error?: string
  inputProps?: Record<string, any>
}

export interface AutoFormUIComponents {
  form?: Component
  fieldWrapper?: Component
  errorMessage?: Component
  submitButton?: Component
  objectWrapper?: Component
  arrayWrapper?: Component
  arrayElementWrapper?: Component
}

export type AutoFormFieldComponents = Record<string, Component>

export interface AutoFormProps {
  schema: SchemaProvider
  onSubmit?: (data: any) => void | Promise<void>
  uiComponents?: AutoFormUIComponents
  formComponents?: AutoFormFieldComponents
  withSubmit?: boolean
  submitText?: string
  defaultValues?: Record<string, any>
  formProps?: Record<string, any>
}
