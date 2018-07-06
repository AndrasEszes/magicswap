<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" flat>Home</v-btn>
        <v-btn to="/about" flat>About</v-btn>
        <v-btn to="/cards" flat>Cards</v-btn>
        <v-btn to="/login" flat>Login</v-btn>
      </v-toolbar-items>
      </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
