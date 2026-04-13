# @autoform/vue

[![npm version](https://img.shields.io/npm/v/@autoform/vue.svg?style=flat-square)](https://www.npmjs.com/package/@autoform/vue)
[![license](https://img.shields.io/npm/l/@autoform/vue.svg?style=flat-square)](https://github.com/mvtandas/autoform-vue/blob/main/LICENSE)

**Automatically render forms from your Zod schema in Vue 3** — the official Vue integration for [AutoForm](https://github.com/vantezzen/autoform).

> Define your schema once. Get a complete, validated form instantly.

```vue
<script setup>
import { AutoForm } from '@autoform/vue'
import '@autoform/vue/style.css'
import { ZodProvider } from '@autoform/zod'
import { z } from 'zod'

const schema = new ZodProvider(
  z.object({
    name: z.string().min(2).describe('Full Name'),
    email: z.string().email(),
    age: z.number().min(18).max(120),
    role: z.enum(['developer', 'designer', 'manager']),
    bio: z.string().optional().describe('Tell us about yourself'),
    newsletter: z.boolean().default(false),
  })
)

function onSubmit(data) {
  console.log('Validated data:', data)
}
</script>

<template>
  <AutoForm :schema="schema" @submit="onSubmit" />
</template>
```

**That's it.** No manual field binding. No `v-model` wiring. No error handling boilerplate.

## Features

- **Zero boilerplate** — Schema in, form out
- **Zod & Yup support** — via `@autoform/zod` and `@autoform/yup`
- **Full validation** — Automatic error messages from your schema
- **TypeScript** — Full type safety with inferred types
- **Customizable** — Override any field component or wrapper
- **Tiny** — ~2.8 kB gzipped, depends only on `@autoform/core`
- **Vue 3** — Composition API, reactive state, `defineExpose` for form control

## Installation

```bash
pnpm add @autoform/vue @autoform/zod zod
# or
npm install @autoform/vue @autoform/zod zod
```

## Field Type Inference

AutoForm automatically maps Zod types to form fields:

| Zod Type | Rendered As |
|----------|-------------|
| `z.string()` | Text input |
| `z.number()` | Number input |
| `z.boolean()` | Checkbox |
| `z.date()` | Date picker |
| `z.enum([...])` | Select dropdown |
| `z.object({...})` | Nested fieldset |

## Customizing Fields

Override the default field type with `fieldConfig`:

```ts
import { fieldConfig } from '@autoform/zod'

const schema = z.object({
  bio: z.string().superRefine(fieldConfig({
    fieldType: 'textarea',
    inputProps: { placeholder: 'Write something...' },
    label: 'Biography',
    description: 'Max 500 characters',
  })),
})
```

## Custom Field Components

Replace built-in fields with your own:

```vue
<template>
  <AutoForm
    :schema="schema"
    :form-components="{
      string: MyCustomInput,
      select: MyCustomSelect,
    }"
    @submit="onSubmit"
  />
</template>
```

Your custom component receives these props:

```ts
interface AutoFormFieldProps {
  field: ParsedField      // Schema field info
  modelValue: any         // Current value
  error?: string          // Validation error
  inputProps?: Record<string, any>  // Extra HTML attributes
}
```

## Accessing Form State

Use template ref to access form internals:

```vue
<script setup>
import { ref } from 'vue'

const formRef = ref()

function resetForm() {
  formRef.value?.reset()
}
</script>

<template>
  <AutoForm ref="formRef" :schema="schema" @submit="onSubmit" />
  <button @click="resetForm">Reset</button>
</template>
```

Exposed: `values`, `errors`, `isSubmitting`, `reset()`

## Using the Composable Directly

For full control, use `useAutoForm`:

```vue
<script setup>
import { useAutoForm } from '@autoform/vue'

const { values, errors, fields, handleSubmit, setFieldValue } = useAutoForm(provider)
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `schema` | `SchemaProvider` | required | Schema provider (ZodProvider, etc.) |
| `withSubmit` | `boolean` | `true` | Show submit button |
| `submitText` | `string` | `'Submit'` | Submit button text |
| `formComponents` | `Record<string, Component>` | — | Custom field components |
| `uiComponents` | `AutoFormUIComponents` | — | Custom wrapper components |
| `formProps` | `Record<string, any>` | — | Extra form HTML attributes |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `@submit` | Validated data object | Emitted on successful validation and submit |

## Part of the AutoForm Ecosystem

This package is the Vue 3 integration for [AutoForm](https://github.com/vantezzen/autoform) (3,400+ stars). It works alongside:

- `@autoform/core` — Schema-agnostic core
- `@autoform/zod` — Zod schema adapter
- `@autoform/yup` — Yup schema adapter
- `@autoform/react` — React integration
- **`@autoform/vue`** — **Vue 3 integration (this package)**

## License

[MIT](./LICENSE) — Made with ❤️ by [Mustafa Vatandas](https://github.com/mvtandas)
