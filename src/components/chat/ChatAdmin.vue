<template>
  <div>
    <!--    :messages-loaded="messagesLoaded"-->
    <!--    @fetch-messages="fetchMessages($event.detail[0])"-->
    <vue-advanced-chat
        :current-user-id="currentUserId"
        :rooms="JSON.stringify(rooms)"
        :rooms-loaded="true"
        :messages="JSON.stringify(messages)"
        @send-message="sendMessage($event.detail[0])"
        @fetch-messages="fetchMessages($event.detail[0].room)"
        show-emojis="false"
        show-audio="false"
        show-files="false"
    />
  </div>
</template>

<script>
import {register} from 'vue-advanced-chat'
// import { register } from '../../vue-advanced-chat/dist/vue-advanced-chat.es.js'
register()

export default {
  data() {
    return {
      socketAdmin: null,
      passToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTWFpbCI6IjMwNzcxNjExNTBAcXEuY29tIiwidXNlcm5hbWUiOiJ3YWxsdGFsbCIsImlkZW50aXR5IjoyLCJ1c2VySWNvbiI6MCwiZXhwIjoxNzA0MTg5MDM3LCJpYXQiOjE3MDQxMDI2Mzd9.1bNt8okYCFK6G2wD3Tu2QGV8g1Lm1Ob9FrLcjMEfGbQ',

      currentUserId: 'Staff',
      selectedRoomIndex: 0,

      rooms: [
        // {
        //   roomId: 1,
        //   roomName: 'Room 1',
        //   avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
        //   users: [
        //     {_id: 'Staff', username: 'Staff'},
        //     {_id: 'User 1', username: 'User 1'}
        //   ],
        //   userMail: '3344767250@qq.com',
        // }
      ],
      allMessages: [],
      messages: [],
      messagesLoaded: false
    }
  },

  methods: {
    fetchMessages(roomInfo) {
      // console.log(roomInfo)
      this.handleRoomChange(roomInfo)
    },
    loadMessage() {
      this.messages = this.allMessages[this.selectedRoomIndex]
    },
    handleRoomChange(roomInfo) {
      const foundRoom = this.rooms.find(room => room.userMail === roomInfo.userMail);
      this.selectedRoomIndex = this.rooms.indexOf(foundRoom);

      this.loadMessage()
    },
    sendMessage(message) {
      // console.log(message)
      // console.log(this.selectedRoomIndex)
      // console.log(foundRoom)

      // console.log(this.rooms[this.selectedRoomIndex].userMail)

      const packageMessage = {
        toUserMail: this.rooms[this.selectedRoomIndex].userMail,
        content: message.content
      }

      this.allMessages[this.selectedRoomIndex] = [
        ...this.allMessages[this.selectedRoomIndex],
        {
          _id: this.messages.length,
          content: message.content,
          senderId: this.currentUserId,
          username: 'Staff',
          timestamp: new Date().toString().substring(16, 21),
          date: new Date().toDateString()
        }
      ]

      this.socketAdmin.send(JSON.stringify(packageMessage))
      this.loadMessage()
    },
    addRoom(newRoom) {
      this.rooms.push(newRoom)
    },
    handleWebSocketMessage(event) {
      const receiveMessage = JSON.parse(event.data);

      // console.log(receiveMessage)

      const foundRoom = this.rooms.find(room => room.userMail === receiveMessage.fromUserMail);
      const foundRoomIndex = this.rooms.indexOf(foundRoom);

      // console.log(foundRoomIndex)
      // console.log(foundRoom)

      if (foundRoomIndex === -1) {
        const index = this.rooms.length + 1
        const newRoom = {
          roomId: index,
          roomName: receiveMessage.fromUserMail,
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            {_id: 'Staff', username: 'Staff'},
            {_id: 'User ' + index.toString(), username: 'User ' + index.toString()}
          ],
          userMail: receiveMessage.fromUserMail,
        }
        this.addRoom(newRoom)

        this.allMessages.push([
          {
            _id: 0,
            content: receiveMessage.content,
            senderId: newRoom.users[1]._id,
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString()
          }
        ])
      } else {
        this.allMessages[foundRoomIndex] = [
          ...this.allMessages[foundRoomIndex],
          {
            _id: this.allMessages[foundRoomIndex].length,
            content: receiveMessage.content,
            senderId: foundRoom.users[1]._id,
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString()
          }
        ]
      }
      this.loadMessage()
    },
  },
  beforeMount() {
    this.socketAdmin = new WebSocket(`ws://localhost:8081/ws/${this.passToken}?passToken=${this.passToken}`);
    this.socketAdmin.addEventListener('message', this.handleWebSocketMessage);
  }
}
</script>