<template>
  <div>
    <h1>🌲 Chat</h1>
    <ChatNode :message="rootMessage" :expandedByDefault="true" />
  </div>
</template>

<script>
import ChatNode from './ChatNode'
import messageHttpService from '../services/messageHttpService.js'

export default {
  name: 'TreeChat',
  components: {
    ChatNode
  },
  data() {
    return {
      rootMessage: {}
    }
  },
  async created() {
    const { data } = await messageHttpService.getRootMessage();
    this.rootMessage = data;
  }
}
</script>

<style scoped>
</style>
