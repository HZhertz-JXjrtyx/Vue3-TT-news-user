<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { uploadUserAvatarApi, updateUserProfileApi } from '@/api'
import NavBar from '@/components/NavBar.vue'

const userStore = useUserStore()

const userAvatar = ref(userStore.userInfo.user_avatar)
const profileInfo = ref({
  nickname: userStore.userInfo.user_nickname,
  gender: userStore.userInfo.user_gender,
  intro: userStore.userInfo.user_intro,
})

const afterRead = async (file) => {
  console.log(file)
  const formData = new FormData()
  formData.append('folder', 'user_avatar')
  formData.append('avatar', file.file)
  const res = await uploadUserAvatarApi(formData)
  console.log(res)
  userAvatar.value = res.newUrl
  userStore.userInfo.user_avatar = res.newUrl
}

const isBtnDisabled = ref(true)
watch(
  profileInfo,
  () => {
    isBtnDisabled.value = false
  },
  { deep: true }
)

const onSubmit = async () => {
  const res = await updateUserProfileApi(profileInfo.value)
  console.log(res)
  isBtnDisabled.value = true
  await userStore.fetchUserInfo()
}
</script>

<template>
  <div class="user-profile">
    <NavBar title="编辑资料" />
    <div class="avatar">
      <van-uploader :after-read="afterRead">
        <img :src="userAvatar" alt="userAvatar" />
        <div class="icon"><span class="iconfont icon-modify"></span></div>
      </van-uploader>
    </div>
    <div class="info">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="profileInfo.nickname"
            name="昵称"
            label="昵称"
            placeholder="请输入昵称"
            :rules="[
              { required: true, message: '请填写昵称', trigger: 'onChange' },
              { pattern: /^.{1,20}$/, message: '请输入1-20位的昵称', trigger: 'onChange' },
            ]"
          />
          <van-field name="gender" label="性别">
            <template #input>
              <van-radio-group v-model="profileInfo.gender" direction="horizontal">
                <van-radio :name="1" icon-size="14px"><span class="iconfont icon-man"></span></van-radio>
                <van-radio :name="0" icon-size="14px"><span class="iconfont icon-woman"></span></van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="profileInfo.intro"
            name="简介"
            label="简介"
            rows="2"
            type="textarea"
            maxlength="50"
            show-word-limit
            placeholder="请输入简介"
          />
        </van-cell-group>
        <div class="sub-btn">
          <van-button :disabled="isBtnDisabled" round block size="small" type="primary" native-type="submit">
            保存
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-profile {
  .avatar {
    text-align: center;
    margin: 40px 0;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border: 1px solid #bababa;
      border-radius: 50%;
    }
    .icon {
      width: 40px;
      height: 40px;
      border: 1px solid #bababa;
      border-radius: 12px;
      background-color: #ffffffb8;
      position: absolute;
      right: 6%;
      bottom: 6%;
    }
  }
  .info {
    .iconfont {
      font-size: 36px;
    }
    .sub-btn {
      margin: 20px 280px;
    }
    :deep(.van-field__control) {
      padding-left: 20px !important;
    }
    :deep(textarea) {
      background-color: rgb(236, 236, 236) !important;
      border-radius: 10px;
      height: 300px;
    }
    :deep(.van-cell__title) {
      width: 60px;
    }
  }
}
</style>
