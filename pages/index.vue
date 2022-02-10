<template>
  <div>
    <v-toolbar flat>
      <v-btn color="primary" @click="openBasic()"> Basic </v-btn>

      <v-btn class="ml-2" color="success" @click="openClearable()">
        Clearable
      </v-btn>

      <v-btn class="ml-2" color="error" @click="openProgress()">
        Progress
      </v-btn>
    </v-toolbar>

    <v-toolbar class="mt-2" flat>
      <v-btn color="primary" @click="openDialog()"> Open Dialog </v-btn>

      <v-btn class="ml-2" color="primary" @click="openFullscreen()">
        Open Fullscreen
      </v-btn>
    </v-toolbar>

    <v-toolbar class="mt-2" flat>
      <v-btn color="error" @click="fetchUsers()"> Fetch Users</v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item v-if="userList.value.length === 0">
        <v-list-item-content>
          <v-list-item-title class="error--text">
            No Users Available
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <template v-else>
        <v-list-item
          v-for="(user, index) in userList.value"
          :key="`user-${index}`"
        >
          <v-list-item-avatar size="48" r>
            <v-avatar :color="user.color" size="48">
              <v-icon>{{ user.avatar }}</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ user.username }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { reactive } from '#imports'

const { $notify, $dialog, $supabase } = useNuxtApp()

function openBasic() {
  $notify('Basic message!')
}

function openClearable() {
  $notify('Clearable message', { color: 'success' }, null, true)
}

function openProgress() {
  $notify('Awaiting response...', { color: 'error' }, async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return 'Success!'
  })
}

function openDialog() {
  $dialog({
    attributes: {
      persistent: true,
    },
    title: 'Delete 1 record',
    message: 'Are you sure you want to delete this record?',
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      return 'Successfully deleted 1 record'
    },
    pendingMessage: 'Deleting 1 record...',
  })
}

function openFullscreen() {
  $dialog({
    attributes: {
      persistent: true,
      fullscreen: true,
    },
    title: 'Big Form',
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      return 'Successfully created 1 record'
    },
    pendingMessage: 'Submitting form...',
  })
}

const userList = reactive({ value: [] })

async function fetchUsers() {
  const { data: users, error } = await $supabase.from('profiles').select('*')

  console.log(users)

  if (error) {
    $notify('There was an issue fetching users', { color: 'error' })
  }

  userList.value = users
}
</script>

<script lang="ts">
export default {
  auth: false,
  layout: 'public',
}
</script>
