import axios from '@/libs/api.request'

export const getTableData = (formItem) => {
  return axios.request({
    url: 'deal/dealDetailInfo',
    method: 'post',
    data: formItem
  })
}
