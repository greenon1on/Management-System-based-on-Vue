<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary " @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @delete="delUser"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import { getUser, deleteUser } from "../../src/api/";
export default {
  name: "user",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false

      },
    }
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
          console.log(res);
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "新增用户";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    },
    editUser(row) {
      this.operateType = 'edit';
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButton: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id;
        console.log('row.id = ' + id);
        // this.$http.get("user/del", {
        //   params: { id }
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功'
        //   })
        //     this.getList()
        // })
        deleteUser({
          id
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.getList();
        })
      })
    },
  },
  mounted() {
    getUser().then(({ data }) => {
      this.tableData = data.list.map((item) => {
        item["sexLabel"] = item["sex"] === 1 ? "男" : "女";
        return item;
      });
      console.log(data);
    });
  },
};
</script>
<style lang="less" scoped>
.manage {
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    form {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>