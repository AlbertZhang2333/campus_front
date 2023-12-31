<template>
  <el-container>
    <el-button type="primary" @click="toggleEmojiPopover">
      <i class="el-icon-smile"></i> Emoji
    </el-button>

    <el-popover
        placement="bottom"
        width="300"
        trigger="click"
        v-if="visible"
    >
      <el-container style="text-align: center; display: flex; flex-wrap: wrap; justify-content: center;">
        <el-image
            v-for="(emoji, index) in emojiList"
            :key="emoji.id"
            :src="require(`@/assets/emoji/512_24x24/${index}.png`)"
            :alt="emoji.id"
            @click="selectEmoji(emoji.id)"
            style="cursor: pointer; margin: 5px; width: 24px; height: 24px;"
        />
      </el-container>
    </el-popover>
  </el-container>
</template>

<script>

export default {
  name: 'emoji-popover',
  data() {
    return {
      visible: false,
      emojiList: Array.from({length: 48}, (_, index) => ({
        id: (index + 1).toString(),
        url: (index + 1).toString() + ".png"
      })),
    }
  },
  methods: {
    selectEmoji(id) {
      // TODO: 向评论中间插入emoji
      this.commentForm.comment += '[' + id + ']';
      console.log("emoji" + id)
      this.$emit('emojiSelected', id)
      this.visible = false
    },
    toggleEmojiPopover() {
      this.visible = !this.visible
    }
  },
}
</script>