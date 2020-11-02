<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <div class="error-list">
            <ul class="error-messages">
              <div class="ng-scope" 
                v-for="(messages, name) in errs"
                :key="name"
                >
                <li class="ng-binding ng-scope" 
                  v-for="message in messages"
                  :key="message"
                >
                  {{ name }} {{ message }}
                </li>
              </div>
            </ul>
          </div>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="quit">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { updateUser } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "SettingsIndex",
  data () {
    return {
      errs: {}
    }
  },
  computed: {
    ...mapState({ oldUser: "user" }),
    user() {
      return Object.assign(
        {
          password: "",
        },
        this.oldUser
      );
    },
  },
  methods: {
    ...mapMutations(["setUser"]),
    async onSubmit() {
      const user = Object.assign({}, this.user)
      if (!user.password) {
          delete user.password
      }
      try {
        const { data } = await updateUser({
          user: user,
        });
        this.setUser(data.user);
        Cookie.set("user", data.user);
        this.$router.push(`profile/${data.user.username}`);
      } catch (err) {
        console.dir(err);
        this.errs = err.response.data.errors
      }
    },
    quit() {
      this.setUser(null);
      Cookie.remove("user");
      this.$router.push("/");
    },
  },
  head () {
    return {
      // 页面标签内容
      title: `Setting`,
    }
  }
};
</script>

<style>
</style>