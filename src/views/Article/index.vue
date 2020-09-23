<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
    <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="small">
      <el-form-item label="状态">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.date1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">筛选</el-button>
      </el-form-item>
    </el-form>
    <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 46147 条结果:</span>
      </div>
      <!-- 数据列表 -->
      <!--
        Table 表格组件
        1：把需要展示的数组列表数据绑定给 table 组件的 data属性
            注意： 不用遍历，内部已经遍历
        2：设计表格列 el-table-column
            width 可以设置表格列的宽度
            label 可以设定列的标题
            prop  用来设定要渲染的列表项数据字段--只能展示文本
        3：表格列默认只能渲染普通文本，如果需要展示其他内容，例如按钮，图片。。。
            需要使用 自定以表格列模板
       -->
      <el-table
        :data="articles"
        style="width: 100%"
        stripe border
        class="list-table"
        size="small">
        <el-table-column
          prop="date"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <!-- 如果需要使用自定义表格列模板，则把需要定义的内容放到template里面 -->
          <template>
            <el-button
              size= "mini"
              circle
              icon="el-icon-edit"
              type="primary"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              ></el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- /数据列表 -->

    <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        background>
      </el-pagination>
    <!-- /列表分页 -->
</el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [] // 文章数据列表
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      getArticles().then(res => {
        console.log(res)
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
</style>
