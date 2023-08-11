<template>
  <div class="home">
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="user">
            <img src="../../src/assets/images/user.jpg" alt="" />
            <div class="userinfo">
              <!-- <p class="name">Admin</p>
              <p class="access">超级管理员</p> -->
              <p class="name"> {{ this.$store.state.user.userInfo.name }}</p>
              <p class="access">{{ this.$store.state.user.userInfo.role }}</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2023-6-14</span></p>
            <p>上次登录地点：<span>东莞</span></p>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px; height: 460px">
          <div>
            <el-table :data="tableData" style="width: 100%">
              <!-- <el-table-column prop="name" label="课程">
              </el-table-column>
              <el-table-column prop="todayBuy" label="今日购买">
              </el-table-column>
              <el-table-column prop="monthBuy" label="本月购买">
              </el-table-column>
              <el-table-column prop="totalBuy" label="总购买">
              </el-table-column> -->
              <el-table-column
                v-for="(val, key) in tableLabel"
                :prop="key"
                :label="val"
                :key="key"
              ></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="'el-icon-' + item.icon"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <div class="graph1">
          <el-card style="height: 280px">
            <!-- 折线图 -->
            <div ref="echarts1" style="height: 280px"></div>
          </el-card>
        </div>
        <div class="graph2">
          <el-card style="height: 260px">
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getData } from "../../src/api";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      console.log(data.data);
      this.tableData = tableData;

      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 指定图标的配置项和数据
      var echarts1Option = {};
      //  处理数据xAxis
      // es6特性，可以用花括号框解构赋值
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxosData = {
        data: xAxis,
      };
      echarts1Option.xAxis = xAxosData;
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxosData;
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });

      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option);
      console.log(xAxis);

      // 基于准备好的dom，初始化echarts实例
      const echarts2 = echarts.init(this.$refs.echarts2);
      // 指定图标的配置项和数据
      var echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            name: "活跃用户量",
            position: "left",
            min: 0,
            max: 800,
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
          {
            type: "value",
            name: "新增用户量",
            position: "right",
            min: 0,
            max: 80,
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            type: "bar",
            data: userData.map((item) => item.new),
            yAxisIndex: 1,
          },
          {
            name: "活跃用户",
            type: "bar",
            data: userData.map((item) => item.active),
            yAxisIndex: 0,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      echarts2.setOption(echarts2Option);

      // 基于准备好的dom，初始化echarts实例
      const echarts3 = echarts.init(this.$refs.echarts3);
      // 指定图标的配置项和数据
      var echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            type: 'pie',
            data: videoData,
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .price {
    font-size: 30px;
    margin-bottom: 10px;
    line-height: 30px;
    height: 30px;
  }
  .desc {
    font-size: 14px;
    color: #999;
    text-align: center;
  }
}
.graph2 {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
