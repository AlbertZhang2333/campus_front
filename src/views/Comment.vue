<script>

import CommentArea from "@/components/comments/commentArea.vue";
export default{
  name:'comment',
  components:{
    CommentArea
  }
}
</script>

<template>
  <comment-area :department="0"/>
</template>

<style scoped>

</style>