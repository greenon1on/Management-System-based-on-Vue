<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">Login</h3>
    <el-form-item
      label="Username"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="Username"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="Password"
      label-width="80px"
      prop="password"
      class="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="Password"
      ></el-input>
    </el-form-item>
    <el-form-item class="login" style="margin: left = 0px">
      <el-button type="primary" @click="login" class="login-button"
        >Login</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { getMenu } from "../../src/api/index";
export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: "Please input username",
            trigger: "blur",
          },
          {
            min: 3,
            message: "That username is too short",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data }) => {
        if (data.code == 20000) {
          this.$store.commit("setMenu", data.data.menu);
          this.$store.commit("setToken", data.data.token);
          this.$store.commit("addRoutesByMenu", this.$router);
          this.$store.commit("setUserInfo", this.form.username);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(data.data.message);
        }
      });
    },
  },

  mounted() {
    console.log(this.$router,'router')
  }
};
</script>
<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login {
  margin: 10px auto 10px auto;
  .login-button {
    margin-left: 40px;
  }
}
</style>
