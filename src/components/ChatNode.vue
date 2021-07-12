<template>
  <div>
    <div>
      <a href="#" @click.prevent="getChildren">X</a>
      <span>{{ message.content }}</span>
    </div>

    <div class="children">
      <ChatNode v-for="child in children" v-bind:key="child.id" :message="child" />
    </div>
  </div>
</template>

<script>
import messageHttpService from '../services/messageHttpService.js'

export default {
  name: 'ChatNode',
  props: {
    message: {
      type: Object,
      default() {
        return {
          content: "Nothing here yet"
        }
      }
    }
  },
  data() {
    return {
      children: []
    }
  },
  methods: {
    async getChildren() {
      const { data } = await messageHttpService.getMessages(this.message.id);
      this.children = data;
      console.log(this.children)
    }
  }
}
</script>

<style scoped>
a {
  padding-right: 16px;
}

.children {
  padding-left: 64px;
}
</style>
