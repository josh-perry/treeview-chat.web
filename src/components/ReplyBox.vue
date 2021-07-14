<template>
  <div>
    <input v-model="message" placeholder="Be nice!" type="text" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import messageHttpService from '../services/messageHttpService.js'

export default {
  props: {
    parentId: {
      type: Number,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      message: ""
    }
  },
  methods: {
    async sendMessage() {
      await messageHttpService.postMessage(this.parentId, { content: this.message })

      this.message = ""
      this.$emit("newMessage")
    }
  }
}
</script>
