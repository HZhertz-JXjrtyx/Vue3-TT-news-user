import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import storeNames from '../storeNames'
import { getNotifyListApi, getChatListApi, getTotalUnreadCountApi } from '@/api'

export const useMessageStore = defineStore(storeNames.MESSAGE, () => {
  // 用户通知列表
  const notifyList = ref(null)
  // const commentNotify = ref('')
  // const likeNotify = ref('')
  // const followNotify = ref('')
  // 用户对话列表
  const chatList = ref([])
  // 未读消息总数
  const unreadCountTotal = ref(-1)
  const temporaryChatInfo = ref(null)

  // 获取用户通知列表
  const getNotifyList = async () => {
    const res = await getNotifyListApi()
    console.log(res)
    notifyList.value = res.data
    // commentNotify.value =
    //   res.data.comment.last_message?.sender.user_nickname + res.data.comment.last_message?.content || ''
    // likeNotify.value =
    //   res.data.like.last_message?.sender.user_nickname + res.data.like.last_message?.content || ''
    // followNotify.value =
    //   res.data.follow.last_message?.sender.user_nickname + res.data.follow.last_message?.content || ''
  }
  const commentNotify = computed(() => {
    if (notifyList.value) {
      return (
        notifyList.value.comment.last_message?.sender.user_nickname +
        notifyList.value.comment.last_message?.content
      )
    } else {
      return ''
    }
  })
  const likeNotify = computed(() => {
    if (notifyList.value) {
      return (
        notifyList.value.like.last_message?.sender.user_nickname + notifyList.value.like.last_message?.content
      )
    } else {
      return ''
    }
  })
  const followNotify = computed(() => {
    if (notifyList.value) {
      return (
        notifyList.value.follow.last_message?.sender.user_nickname +
        notifyList.value.follow.last_message?.content
      )
    } else {
      return ''
    }
  })

  // 获取用户对话列表
  const getChatList = async () => {
    const res = await getChatListApi()
    console.log(res)
    chatList.value = res.data
  }
  // 获取未读消息总数
  const getTotalUnreadCount = async () => {
    const res = await getTotalUnreadCountApi()
    console.log(res)
    unreadCountTotal.value = res.unreadTotalCount
  }
  // 清除对话未读
  const clearChatUnread = (conversationId) => {
    const index = chatList.value.findIndex((chat) => chat._id === conversationId)
    console.log(index)
    if (index !== -1) {
      unreadCountTotal.value -= chatList.value[index].unread_count
      chatList.value[index].unread_count = 0
    }
  }

  const initialize = () => {
    notifyList.value = {}
    commentNotify.value = ''
    likeNotify.value = ''
    followNotify.value = ''
    chatList.value = []
    unreadCountTotal.value = 0
  }

  return {
    notifyList,
    commentNotify,
    likeNotify,
    followNotify,
    chatList,
    unreadCountTotal,
    temporaryChatInfo,
    getNotifyList,
    getChatList,
    getTotalUnreadCount,
    clearChatUnread,
    initialize,
  }
})
