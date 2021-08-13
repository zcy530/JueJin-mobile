<template>
    <div>
        <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          placeholder="请输入用户名"
          left-icon="manager-o"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          autocomplete="new-password"
          placeholder="请输入密码"
          left-icon="lock"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password2"
          type="password"
          name="确认密码"
          placeholder="请确认密码"
          left-icon="lock"
          :rules="[
            { required: true, validator: validator, message: '请确认密码' },
          ]"
        />
        <div class="f-button">
          <van-button round block plain type="danger"  native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
</template>

<script>
export default {
    data() {
        return { username: "", password: "", password2: "" };
    },
    methods: {
        onSubmit(values) {
            let users = [];
            // 取值
            let userList = window.localStorage.getItem("userList");
            if (userList && userList !== "undefined" && userList !== "") {
                users = JSON.parse(userList);
                users.push({
                usname: this.username,
                pwd: this.password,
                });
            } else {
                users.push({
                usname: this.username,
                pwd: this.password,
                });
            }
            // 存值
            window.localStorage.setItem("userList", JSON.stringify(users));
             this.$toast({
                message: "注册成功, 请登录",
                duration: 3000,
              });
            // 切换登录页面
            this.$emit('handleLogin')
        },
        // 确认密码校验
        validator(val) {
            if (val !== this.password) {
                return false;
            }
            return;
        }
    }
}
</script>

<style lang="scss" >
</style>
