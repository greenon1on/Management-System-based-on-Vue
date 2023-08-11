<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          class="header-breadcrumb"
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item
          ><a href="/">promotion management</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal-hub">个人中心</el-dropdown-item>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.l-content {
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      font-size: 14px;
      margin-left: 10px;
      &.is-link {
        color: #666;
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
}
</style>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logout() {
      console.log("quit")
      this.$store.commit("clearMenuAndRoutes");
      this.$store.commit("clearToken");
      this.$router.push({ name: "login" })
    },
    handleClick(command) {
      if(command === 'quit'){
        
        this.logout()
      }
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>
