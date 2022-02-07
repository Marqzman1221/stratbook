<template>
  <v-app-bar color="#121212" app dark dense outlined flat>
    <v-toolbar-title> Stratbook </v-toolbar-title>

    <v-spacer />

    <template v-if="$auth.loggedIn">
      <create-menu />

      <notification-menu />

      <account-menu key="account-menu" />
    </template>
    <v-btn v-else key="log-in-button" color="primary" :to="{ name: 'login' }">
      Login
    </v-btn>
  </v-app-bar>
</template>
