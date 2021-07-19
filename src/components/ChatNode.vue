<template>
  <div>
    <div class="message-line">
      <a v-if="!message.sticky && !expanded" class="expando-button" href="#" @click.prevent="toggleExpanded">
        ➤
        <span v-if="expanded">▼</span>
      </a>

      <a v-if="!message.sticky && expanded" class="expando-button" href="#" @click.prevent="toggleExpanded">
        ▼
      </a>

      <span v-if="message.sticky" class="emoji">📌</span>
      <span v-if="message.sticky" class="content" v-html="message.content"></span>
      <span v-if="!message.sticky" @click.prevent="toggleExpanded" class="content">{{ message.content }}</span>

      <a v-if="expanded" href="#" class="reply-button" @click.prevent="replyBoxShowing = !replyBoxShowing">✉️</a>
    </div>

    <div v-if="replyBoxShowing && expanded" class="reply-box">
      <ReplyBox :parentId="message.id" 
                v-on:newMessage="newMessage" />
    </div>

    <div class="children">
      <div v-if="children.length > 0">
        <ChatNode v-for="child in children"
                  v-bind:key="child.id"
                  :message="child" />
      </div>

      <div class="empty-node-message"
           v-if="children.length === 0 && expanded">
        <span><i>Nothing here yet. <a href="#" @click.prevent="replyBoxShowing = !replyBoxShowing">Write something?</a></i></span>
      </div>
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
    },
    expandedByDefault: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  created() {
    this.expanded = this.expandedByDefault
  },
  watch: {
    message() {
      if (this.expanded) {
        this.refetchData()
      }
    }
  },
  data() {
    return {
      children: [],
      replyBoxShowing: false,
      expanded: false
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
      this.children = data.sort((x, y) => {
        return y.sticky - x.sticky
      });
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
  padding-left: 16px;
  text-decoration: none;
}

.expando-button {
  width: 16px;
  display: inline-block;
  text-decoration: none;
}

.reply-box {
  padding-left: 64px;
}

.children {
  padding-left: 32px;
}

.empty-node-message {
  padding-left: 32px;
}

.emoji {
  padding-right: 16px;
  width: 16px;
}
</style>
