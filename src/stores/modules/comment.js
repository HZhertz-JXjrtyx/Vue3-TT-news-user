import { defineStore } from 'pinia'
import { ref } from 'vue'
import storeNames from '../storeNames'
import { addCommentApi } from '@/api'

export const useCommentStore = defineStore(storeNames.COMMENT, () => {
  const isShowTextarea = ref(false)
  const textareaPlaceholder = ref('请输入评论')

  const commentCount = ref(0)
  const commentList = ref([])

  const replyCount = ref(0)
  const commentReplyList = ref([])
  const isShowCommentDetail = ref(false)
  const commentDetailId = ref('')

  const commentType = ref(0)
  const replyUser = ref(null)
  const parentComment = ref(null)
  const relatedId = ref('')
  const relatedWork = ref('')
  const workModel = ref('')

  const submitComment = async (Content) => {
    return await addCommentApi(
      commentType.value,
      replyUser.value,
      Content,
      undefined,
      parentComment.value,
      relatedId.value,
      relatedWork.value,
      workModel.value
    )
  }

  return {
    isShowTextarea,
    textareaPlaceholder,

    commentCount,
    commentList,

    replyCount,
    commentReplyList,
    isShowCommentDetail,
    commentDetailId,

    commentType,
    replyUser,
    parentComment,
    relatedId,
    relatedWork,
    workModel,
    submitComment,
  }
})
