# apiConfig
Learning create library 


# My API Fetch Library

A Nuxt 3-compatible library for fetching data using `useAsyncData`.

## Installation

```bash
npm install nuxt-api-config



#config .env
API_URL="https://example.com/api"
Version="v1"



<template>
  <div>
    <h1>Users</h1>
    <div v-if="error">{{ error.message }}</div>
    <div v-else-if="pending">Loading...</div>
    <ul v-else>
      <li v-for="(user, i) in data" :key="i">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { apiFetch } from 'nuxt-api-config';

const { data, pending, error } = await apiFetch('/users', 'usersList', 'GET');
</script>




<template>
  <div>
    <h1>Create User</h1>
    <div v-if="error">{{ error.message }}</div>
    <div v-else-if="pending">Creating user...</div>
    <div v-else>
      <p>User created: {{ data?.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { apiFetch } from 'nuxt-api-config';

const { data, pending, error } = await apiFetch(
  '/users',
  'createUser',
  'POST',
  {},
  { name: 'John Doe', age: 25 }
);
</script>
