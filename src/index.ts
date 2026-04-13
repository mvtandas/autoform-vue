import AutoForm from './components/AutoForm.vue'

export { AutoForm }
export { useAutoForm } from './composables/useAutoForm'
export type {
  AutoFormFieldProps,
  AutoFormUIComponents,
  AutoFormFieldComponents,
  AutoFormProps,
} from './types'
export type {
  ParsedField,
  ParsedSchema,
  FieldConfig,
  SchemaProvider,
} from '@autoform/core'
export { getLabel, sortFieldsByOrder, removeEmptyValues } from '@autoform/core'
