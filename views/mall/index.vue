<template>
  <div class="manage">
    <el-dialog
      :title="operateType"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">Continue</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addProduct">+ ADD</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary " @click="getList(searchFrom.keyword)"
          >Search</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editProduct"
      @delete="delProduct"
    ></common-table>
  </div>
</template>
<script>
import { getProduct, deleteProduct } from "../../src/api/";
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
export default {
  name: "mall",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: 'ADD',
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "Name",
          type: "input",
        },
        {
          model: "price",
          label: "Price",
          type: "input",
        },
        {
          model: "quantity",
          label: "Quantity",
          type: "select",
          opts: [
            {
              label: "1",
              value: 1,
            },
            {
              label: "2",
              value: 2,
            },
            {
              label: "3",
              value: 3,
            },
          ],
        },
      ],
      operateForm: {
        name: "",
        price: "",
        quantity: "",
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
          label: "Name",
        },
        {
          prop: "price",
          label: "Price",
        },
        {
          prop: "quantity",
          label: "Quantity",
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "EDIT") {
        this.$http.post("/mall/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
          console.log(res);
        });
      } else {
        this.$http.post("/mall/add", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
        });
      }
    },
    addProduct() {
      this.isShow = true;
      this.operateType = "ADD"
      this.operateForm = {
        name: "",
        price: "",
        quantity: "",
      };
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getProduct({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        this.tableData = res.list
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editProduct(row) {
      this.operateType = "EDIT";
      this.isShow = true;
      this.operateForm = row;
    },
    delProduct(row) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButton: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        console.log("row.id = " + id);
        deleteProduct({
          id,
        }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getList();
        });
      });
    },
  },
  mounted() {
    getProduct().then(({ data }) => {
      this.tableData = data.list
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