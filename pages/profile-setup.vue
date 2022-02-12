<template>
  <v-row justify="center" align="center">
    <v-card class="pa-4" width="600">
      <v-card-title class="pa-0"> Let's setup your profile </v-card-title>

      <v-row justify="center" align="center" class="my-8">
        <v-avatar :color="form.color" size="128">
          <!-- <v-img :src="form.avatar" /> -->
          <v-icon size="96">{{ form.avatar }}</v-icon>
        </v-avatar>
      </v-row>

      <div style="height: 290px; overflow-y: auto">
        <v-window v-model="window">
          <v-window-item :value="0">
            <v-form v-model="valid">
              <v-text-field
                v-model="form.username"
                label="Username"
                hint="This can be changed at anytime"
                :rules="rules.username"
                persistent-placeholder
                persistent-hint
                required
              />

              <v-list class="py-4" flat>
                <v-list-item @click="changeWindow('avatar')">
                  <v-list-item-avatar size="56">
                    <v-avatar class="avatar-highlight" size="56">
                      <v-icon large>{{ form.avatar }}</v-icon>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title> Select avatar </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item class="mt-2" @click="changeWindow('color')">
                  <v-list-item-avatar size="56">
                    <v-avatar :color="form.color" size="56" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title> Select color </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-btn
                color="primary"
                :disabled="loading"
                block
                @click="submit()"
              >
                Save
              </v-btn>
            </v-form>
          </v-window-item>

          <v-window-item :value="1">
            <v-toolbar dense flat>
              <v-btn text @click="back()">
                <v-icon left>mdi-chevron-left</v-icon>
                Back
              </v-btn>
            </v-toolbar>

            <div style="height: 242px; overflow-y: auto">
              <avatar-picker
                v-if="selectMode === 'avatar'"
                :value="form.avatar"
                @input="update($event)"
                @preview="update($event, true)"
              />
              <color-picker
                v-if="selectMode === 'color'"
                :value="form.color"
                @input="update($event)"
                @preview="update($event, true)"
              />
            </div>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-row>
</template>

<script lang="ts">
export default {
  layout: 'auth',
  async middleware(context: any) {
    if (!context.$auth.loggedIn) await context.$auth.fetchUser()

    if (context.$auth.profile && context.$auth.profile.initialized)
      context.redirect('/library')
    else return
  },
}
</script>

<script setup lang="ts">
import { ref, reactive } from '#imports'
import { useAuth } from '~/stores/auth'
// import { useDialog } from '~/stores/dialog'
import colors from 'vuetify/es5/util/colors'

const { $auth, $supabase, $notify, $router } = useNuxtApp()

// const dialog = useDialog()
const auth = useAuth()

const window = ref(0)
const selectMode = ref(null)
const loading = ref(false)

const valid = ref(false)
const form = reactive({
  username: '',
  avatar: 'mdi-flower-tulip',
  color: colors.red.darken3,
})

const rules = {
  username: [
    (v: string) => !!v || 'Required',
    (v: string) => v.length >= 3 || 'Username must be at least 3 characters',
    (v: string) =>
      /^[A-Za-z0-9_]+$/g.test(v) ||
      'Username can only include valid characters: A-Z, a-z, 0-9, _',
  ],
}

function changeWindow(value: string) {
  selectMode.value = value
  window.value = 1
}

function back() {
  window.value = 0
  selectMode.value = ''
}

function update(value: string, preview?: boolean) {
  form[selectMode.value] = value
  if (!preview) {
    setTimeout(() => {
      window.value = 0
      selectMode.value = ''
    }, 250)
  }
}

async function submit() {
  loading.value = true

  await $notify(null, { color: 'primary' }, async () => {
    const { data: profile, error } = await $supabase
      .from('profiles')
      .update({ ...form, initialized: true })
      .eq('id', $auth.user.id)
      .limit(1)
      .single()

    if (error) return 'An issue occurred while updating your profile'

    auth.setProfile(profile)

    return 'Successfully updated your profile'
  })

  // console.log('Profile:', $auth.profile)

  if ($auth.profile && $auth.profile.initialized) {
    $router.push({ name: 'library' })
    return
  }

  loading.value = false
}
</script>
