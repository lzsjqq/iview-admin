<template>
  <div>
    <div>
      <Form :model="formItem" :label-width="80" inline>
        <FormItem label="股票代码">
          <Input v-model="formItem.shareCode" placeholder="请输入股票代码..."/>
        </FormItem>
        <FormItem label="所属行业">
          <Input v-model="formItem.industry" placeholder="请输入所属行业..."/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="search()" >搜索</Button>
        </FormItem>
      </Form>
     </div>

    <Card>
      <tables    ref="tables" editable searchable search-place="top" v-model="tableData"  :columns="columns" @on-delete="handleDelete" stripe border />
      <Page :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from './shareData'
import { getDateStr } from '@/api/date'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      formItem: {
        industry: '',
        shareCode: ''
      },
      // 总页数
      total: 246,
      // 开始页
      startRow: 1,
      // 每页条数
      endRow: 10,
      columns: [
        { title: '日期', key: 'tradingDate', width: 100 },
        { title: '股票名称', key: 'shareName', width: 100 },
        { title: '股票代码', key: 'shareCode', width: 100 },
        { title: '止损价', key: 'stopLossPrice', width: 100 },
        { title: '成交价', key: 'dealPrice', width: 100 },
        { title: '买卖方向',
          key: 'target',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, params.row.target === '1' ? '买入' : '卖出')
            ])
          } },
        { title: '成交量', key: 'volume', width: 100 },
        { title: '收益', key: 'profit', width: 100 },
        { title: '期间最低价', key: 'lowPrice', width: 100 },
        { title: '期间最高价', key: 'highPrice', width: 100 },
        { title: '5日最低价', key: 'fiveLowPrice', width: 100 },
        { title: '5日最高价', key: 'fiveHighPrice', width: 100 },
        { title: '5日风险收益比', key: 'fiveProfit', width: 100 },
        { title: 'R比率', key: 'rRate', width: 100 },
        { title: '原因', key: 'reason', width: 100 },
        { title: '修改时间',
          key: 'updateTime',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, getDateStr(params.row.updateTime, 'year'))
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    search () {
      this.formItem.pageNum = this.startRow
      this.formItem.pageSize = this.endRow
      getTableData(this.formItem).then(res => {
        let page = res.data
        this.tableData = page.list
        this.total = page.total
        this.startRow = page.pageNum
      })
    },
    pageChange (page) {
      this.startRow = page
      this.search()
    },
    pagesizechange (endRow) {
      this.endRow = endRow
      this.search()
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>

<style>

</style>
