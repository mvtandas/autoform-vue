import { computed, reactive, ref } from 'vue'
import type { SchemaProvider, SchemaValidationError } from '@autoform/core'

export function useAutoForm(schema: SchemaProvider) {
  const parsed = schema.parseSchema()
  const defaultValues = schema.getDefaultValues()

  const values = reactive<Record<string, any>>({ ...defaultValues })
  const errors = ref<Record<string, string>>({})
  const isSubmitting = ref(false)

  const fields = computed(() => {
    const sorted = [...parsed.fields]
    sorted.sort((a, b) => {
      const orderA = a.fieldConfig?.order ?? 0
      const orderB = b.fieldConfig?.order ?? 0
      return orderA - orderB
    })
    return sorted
  })

  function setFieldValue(path: string, value: any) {
    const keys = path.split('.')
    let current: any = values
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]!
      if (current[key] === undefined) {
        current[key] = {}
      }
      current = current[key]
    }
    current[keys[keys.length - 1]!] = value
  }

  function getFieldValue(path: string): any {
    const keys = path.split('.')
    let current: any = values
    for (const key of keys) {
      if (current === undefined || current === null) return undefined
      current = current[key]
    }
    return current
  }

  function getFieldError(path: string): string | undefined {
    return errors.value[path]
  }

  function clearErrors() {
    errors.value = {}
  }

  function validate(): boolean {
    clearErrors()
    const result = schema.validateSchema(values)
    if (result.success) return true

    for (const error of (result as { success: false; errors: SchemaValidationError[] }).errors) {
      const path = error.path.join('.')
      errors.value[path] = error.message
    }
    return false
  }

  async function handleSubmit(onSubmit?: (data: any) => void | Promise<void>) {
    isSubmitting.value = true
    try {
      const isValid = validate()
      if (!isValid) return

      const result = schema.validateSchema(values)
      if (result.success) {
        await onSubmit?.((result as { success: true; data: any }).data)
      }
    } finally {
      isSubmitting.value = false
    }
  }

  function reset() {
    Object.keys(values).forEach((key) => delete values[key])
    Object.assign(values, { ...defaultValues })
    clearErrors()
  }

  return {
    values,
    errors,
    fields,
    isSubmitting,
    setFieldValue,
    getFieldValue,
    getFieldError,
    validate,
    handleSubmit,
    reset,
    clearErrors,
  }
}
