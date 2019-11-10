import axios from '@/libs/api.request'

export const getTableData = (formItem) => {
  return axios.request({
    url: 'deal/info',
    method: 'post',
    data: formItem
  })
}
