<template>
  <div>
    <p>node</p>

    <ChatNode v-for="child in children" v-bind:key="child.id" />
  </div>
</template>

<script>
export default {
  name: 'ChatNode',
  data() {
    return {
      children: []
    }
  },
  async created() {
  }
}
</script>

<style scoped>
</style>
