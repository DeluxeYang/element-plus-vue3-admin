<template>
  <div
    class="login-container"
    @keyup="enterSubmit">
    <div class="login-waper animated bounceInDown">
      <div class="login-left">
        <div class="login-time" />
        <img
          class="img"
          src="../../assets/logo.png"
          width="50"
          height="50"
          alt>
        <p class="title">
          {{ title }}
        </p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            登录
          </h4>
          <el-form
            ref="loginForm"
            class="login-form"
            status-icon
            :rules="loginRules"
            :model="loginFormData"
            label-position="right">
            <el-form-item prop="username">
              <el-input
                v-model="loginFormData.username"
                size="small"
                type="text"
                prefix-icon="el-icon-user"
                placeholder="用户名" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginFormData.password"
                size="small"
                name="password"
                :type="state.isShowPassword"
                autocomplete="off"
                prefix-icon="el-icon-unlock"
                placeholder="密码"
                @keyup.enter="onLogin">
                <template #suffix>
                  <span
                    class="show-pwd"
                    @click="showPassword">
                    <i :class="state.isShowPassword === 'password' ? 'el-icon-turn-off' : 'el-icon-open'" />
                  </span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                class="login-submit"
                @click.prevent="onLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { store } from '/@/store'
import { ElNotification } from 'element-plus'
import { validate, resetFields } from '/@/utils/formExtend'

const loginModule = () => {
  let loginFormData = reactive({
    username: '',
    password: ''
  })
  let title = ref('title')

  const state = reactive({
    isShowPassword: ref('password')
  })
  const loginForm = ref(null)
  const enterSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onLogin()
    }
  }
  const onLogin = async () => {
    let { username, password } = loginFormData
    if (!await validate(loginForm)) return
    await store.dispatch(
      'user/index',
      { username: username, password: password }
    ).then(() => {
      ElNotification({
        title: '欢迎',
        message: '欢迎回来',
        type: 'success'
      })
    }).catch(() => [])
  }
  const showPassword = () => {
    state.isShowPassword = state.isShowPassword === 'password' ? '' : 'password'
  }
  const loginRules = reactive({
    username: [
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            return callback(new Error('用户名不能为空'))
          }
          callback()
        }, trigger: 'blur'
      }
    ],
    password: [
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            return callback(new Error('密码不能为空'))
          }
          callback()
        }, trigger: 'blur'
      }
    ]
  })

  return {
    loginFormData,
    onLogin,
    enterSubmit,
    loginRules,
    resetFields,
    loginForm,
    state,
    showPassword,
    title
  }
}
export default defineComponent({
  name: 'Login',
  setup() {

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ...loginModule()
    }
  }
})
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import "./src/styles/login.scss";
@import "./src/styles/variables.scss";

.show-pwd {
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

$bg: rgba(240, 242, 245, 1);
$dark_gray: #889aa4;

</style>
