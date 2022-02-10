<template>
  <v-app-bar color="#121212" app dark dense outlined flat>
    <v-toolbar-title> Stratbook </v-toolbar-title>

    <v-spacer />

    <v-btn v-if="$auth.loggedIn" color="primary" :to="{ name: 'library' }">
      My Library
    </v-btn>
    <v-btn v-else color="primary" :to="{ name: 'login' }"> Login </v-btn>
  </v-app-bar>
</template>
