<template>
  <div>
    <!-- beautiful-chat 组件 -->
    <beautiful-chat
        :participants="participants"
        :onMessageWasSent="sendMessage"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEdition="true"
        :showDeletion="true"
        :showTypingIndicator="showTypingIndicator"
        :showLauncher="true"
        :showCloseButton="false"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :disableUserListToggle="false"
        :messageStyling="messageStyling"
        @onType="handleOnType"
        @edit="editMessage"
    />

    <!-- 侧边栏 -->
  </div>
</template>

<script>
import axiosInstance from "@/main";
import Chat from "@/views/Chat.vue";

const AdminUserMail = '3077161150@qq.com';

export default {
  components: {Chat},
  data() {
    return {
      userMail: null,
      socket: null,
      passToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTWFpbCI6IjMzNDQ3NjcyNTBAcXEuY29tIiwidXNlcm5hbWUiOiJjc3dfY2NjIiwiaWRlbnRpdHkiOjEsInVzZXJJY29uIjowLCJleHAiOjE3MDQxODg5OTQsImlhdCI6MTcwNDEwMjU5NH0.35WrlO2lD_9RJGn6arNeAj4nEs3mkZ369qP_-WlhP0k',

      selectedUser: null, // 用于存储用户选择的用户 ID

      participants: [
        {
          id: 'staff1',
          name: '客服',
          toUserMail: AdminUserMail,
          imageUrl: 'https://img.ixintu.com/download/jpg/202304/2583018a4fddf7fd5a4889fd304ef122_260_260.jpg!con'
        }
      ], // 对话的所有参与者的列表。' name '是用户名，' id '用于建立消息的作者，' imageUrl '应该是用户头像。
      messageList: [], // // 要显示的消息列表可以动态地分页和调整
      newMessagesCount: 0,
      isChatOpen: false, // 确定聊天窗口应该打开还是关闭
      showTypingIndicator: '',  // 当设置为匹配参与者的值时。它显示特定用户的输入指示
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // 当设置为true时，当有新事件发生时(新消息，用户开始输入…)，总是将聊天滚动到底部。
      messageStyling: true // 启用*bold* /emph/ _underline_等(更多信息请访问github.com/mattezza/msgdown)
    }
  },
  methods: {
    handleWebSocketMessage(event) {
      const message = JSON.parse(event.data);
      const newMessage = {
        type: 'text',
        author: 'staff1',
        data: {text: message.content},
      };
      this.onMessageWasSent(newMessage);
    },
    onMessageWasSent(message) {
      // 当用户发送消息时调用
      this.messageList = [...this.messageList, message]
    },
    sendMessage(message) {
      if (message.data.text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1

        const packMessage = {
          toUserMail: AdminUserMail,
          content: message.data.text,
        }
        // 发送消息到后端
        this.socket.send(JSON.stringify(packMessage))

        this.onMessageWasSent(message);
      }
    },
    openChat() {
      // 当用户单击fab按钮打开聊天时调用
      this.isChatOpen = true
      this.newMessagesCount = 0

      this.initSocket()
    },
    closeChat() {
      // // 当用户单击按钮关闭聊天时调用
      this.isChatOpen = false

      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    },
    handleScrollToTop() {

      // 当用户将消息列表滚动到顶部时调用
// 利用分页来加载另一个消息页面

    },
    handleOnType() {
      console.log('Emit typing event')
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    getUserMail() {
      return axiosInstance.get(this.$httpUrl + 'TheLoginUserInfo/getLoginUserMail')
          .then(res => res.data)
          .then(res => {
            if (res.code === 200) {
              this.userMail = res.data;
              return res.data; // 返回用户邮件
            }
          });
    },
    initSocket() {
      this.getUserMail().then(() => {
        // 在获取用户邮件后创建 WebSocket 连接
        this.socket = new WebSocket(`ws://localhost:8081/ws/${this.passToken}?passToken=${this.passToken}`);
        this.socket.addEventListener('message', this.handleWebSocketMessage);
      });
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
}

/* 调整beautiful-chat的宽度和样式 */
beautiful-chat {
  flex: 1;
}

.sidebar {
  width: 300px; /* 调整侧边栏的宽度 */
  background-color: #f0f0f0; /* 设置侧边栏的背景颜色 */
  /* 可以添加其他样式，根据需要调整 */
}
</style>