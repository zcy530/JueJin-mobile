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
                placeholder="请输入密码"
                left-icon="lock"
                autocomplete="new-password"
                :rules="[{ required: true, message: '请填写密码' }]"
                class="pwd-input"
            />

            <div class="f-button">
                <van-button round block plain type="danger" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        // 登录提交
        onSubmit(values) {
            // 查询用户是否注册
            let userList = window.localStorage.getItem("userList");
            if (userList && userList !== "undefined" && userList !== "") {
                JSON.parse(userList).forEach((item) => {
                if (this.username === item.usname) {
                    if (this.password === item.pwd) {
                    this.isLogin = true;
                    window.localStorage.setItem("isLogin", true);
                    window.localStorage.setItem('userName', this.username)
                    this.$router.push("/");
                    } else {
                    this.$toast({
                        message: "密码不正确",
                        duration: 3000,
                    });
                    }
                } else {
                    this.$toast({
                    message: "账号未注册",
                    duration: 3000,
                    });
                }
                });
            } else {
                this.$toast({
                message: "账号未注册",
                duration: 3000,
                });
            }
        },
    }
}
</script>

<style>
</style>
