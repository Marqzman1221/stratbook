<template>
  <v-form v-model="valid" @submit.prevent="submit()">
    <v-text-field
      v-model="form.name"
      class="mt-4"
      label="Name *"
      :rules="rules.name"
      persistent-placeholder
      autofocus
      outlined
      required
    />

    <v-select
      v-model="form.map_id"
      class="mt-4"
      label="Map *"
      item-value="id"
      item-text="name"
      :items="mapItems"
      :rules="rules.map_id"
      :disabled="mapItems.length === 0"
      menu-props="{ offset-y: true }"
      persistent-placeholder
      outlined
      required
    >
    </v-select>

    <v-select
      v-model="form.operators"
      class="mt-4"
      label="Operators *"
      item-value="id"
      item-text="name"
      :items="operatorItems"
      :rules="rules.operators"
      :disabled="operatorItems.length === 0"
      :item-disabled="operatorDisabled"
      menu-props="{ offset-y: true }"
      multiple
      chips
      persistent-placeholder
      outlined
      required
      @input="handleOperatorInput($event)"
    >
    </v-select>

    <v-textarea
      v-model="form.description"
      class="mt-4"
      label="Description"
      persistent-placeholder
      outlined
    />

    <div class="d-flex flex-row mt-4 align-text-center">
      Public Strategy

      <v-spacer />

      <v-switch v-model="form.public" class="mt-0" inset />
    </div>

    <v-btn
      class="mt-4"
      color="primary"
      type="submit"
      :disabled="!valid"
      depressed
      block
    >
      Create
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-dom'
import { useDialog } from '~/stores/dialog'
import { useDirectory } from '~/stores/directory'

const { $supabase } = useNuxtApp()

const dialog = useDialog()
const directory = useDirectory()

const valid = ref(false)
const form = reactive({
  name: '',
  map_id: null,
  operators: [],
  description: '',
  public: false,
})

const rules = {
  name: [(v: string) => !!v || 'Strategy name is required'],
  map_id: [(v: string) => !!v || 'Please select a map'],
  operators: [
    (v: string[]) => v.length > 0 || 'Please select your team composition',
    (v: string[]) => v.length === 5 || 'Please select 5 operators',
  ],
}

const mapItems = ref([])
const operatorItems = ref([])

async function fetchMaps() {
  const { data, error } = await $supabase.from('maps').select('id, name')

  if (!error) mapItems.value = data
}

async function fetchOperators() {
  const { data, error } = await $supabase.from('operators').select('id, name')

  if (!error) operatorItems.value = data
}

onMounted(async () => {
  await Promise.all([fetchMaps(), fetchOperators()])
})

function operatorDisabled(operator: any) {
  return form.operators.length === 5 && !form.operators.includes(operator.id)
}

function handleOperatorInput(value: any) {
  if (form.operators.length === 5) return

  form.operators = value
}

function submit() {
  dialog.submit(async () => directory.createStrategy(form))
}
</script>
