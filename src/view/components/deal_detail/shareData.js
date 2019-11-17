import axios from '@/libs/api.request'

export const post = (formItem, url) => {
  return axios.request({
    url: url,
    method: 'post',
    data: formItem
  })
}
