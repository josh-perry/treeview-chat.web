<template>
  <div>
    <div>
      <a class="expando-button" href="#" @click.prevent="toggleExpanded">
        <span v-if="!expanded">➤</span>
        <span v-if="expanded">▼</span>
      </a>

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
      children: [],
      expanded: false
    }
  },
  methods: {
    async toggleExpanded() {
      this.expanded = !this.expanded;

      if (!this.expanded) {
        this.children = [];
        return;
      }

      const { data } = await messageHttpService.getMessages(this.message.id);
      this.children = data;
    }
  }
}
</script>

<style scoped>
a {
  padding-right: 16px;
}

.expando-button {
  width: 16px;
  display: inline-block;
}

.children {
  padding-left: 32px;
}
</style>
