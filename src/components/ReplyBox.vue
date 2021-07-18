<template>
  <div>
    <input v-model="message" placeholder="Be nice!" type="text" v-on:keydown="validateText" />
    <a href="#" @click="sendMessage">Send</a>
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
      if (this.validateText()) {
        return
      }

      let result = await messageHttpService.postMessage(this.parentId, { content: this.message })

      if (result.status === 200) {
        this.message = ""
        this.$emit("newMessage")
      }
    },
    validateText() {
      const maxLength = 140
      let tooLong = this.message.length > maxLength

      if (tooLong) {
        this.message = this.message.substring(0, maxLength)
      }

      return tooLong
    }
  }
}
</script>

<style scoped>
input {
  background-color: rgb(30, 30, 30);
  margin-right: 16px;
}
</style>
