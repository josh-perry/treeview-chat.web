<template>
  <div>
    <div class="message-line">
      <a class="expando-button" href="#" @click.prevent="toggleExpanded">
        <span v-if="!expanded">➤</span>
        <span v-if="expanded">▼</span>
      </a>

      <span>{{ message.content }}</span>

      <a v-if="expanded" href="#" class="reply-button" @click.prevent="replyBoxShowing = !replyBoxShowing">✉</a>
    </div>

    <div v-if="replyBoxShowing && expanded" class="reply-box">
      <ReplyBox :parentId="message.id" 
                v-on:newMessage="newMessage" />
    </div>

    <div class="children">
      <ChatNode v-for="child in children"
                v-bind:key="child.id"
                :message="child" />
    </div>
  </div>
</template>

<script>
import messageHttpService from '../services/messageHttpService.js'
import ReplyBox from './ReplyBox.vue'

export default {
  name: 'ChatNode',
  components: {
    ReplyBox
  },
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
      children: [],
      expanded: false,
      replyBoxShowing: false
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      this.refetchData();
    },
    async refetchData() {
      if (!this.expanded) {
        this.children = [];
        return;
      }

      const { data } = await messageHttpService.getMessages(this.message.id);
      this.children = data;
    },
    newMessage() {
      this.replyBoxShowing = false;
      this.refetchData();
    }
  }
}
</script>

<style scoped>
a {
  padding-right: 16px;
}

.reply-button {
  width: 16px;
  padding: 16px;
}

.expando-button {
  width: 16px;
  display: inline-block;
}

.reply-box {
  padding-left: 64px;
}

.children {
  padding-left: 32px;
}
</style>
