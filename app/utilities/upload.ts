import axios, { AxiosRequestConfig } from 'axios'

export const upload = (file: File)=> {
  let data = new FormData()
  data.append('file', file)

  return axios({
    method: 'POST',
    url: `${process.env.NODE_ENV === 'production' ? '' : '//localhost:8089'}/_upload?filename=${file.name}&type=${file.type}`,
    withCredentials: true,
    responseType: 'json',
    data
  } as AxiosRequestConfig)
    .then(response => {
      return response.data
    })
}