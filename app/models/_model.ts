
import axios from 'axios'

export default class Model {

  static endpoint: string = 'models'

  public _id : string
  public attributes : any

  constructor(attributes?: any) {
    this._id = attributes ? attributes._id : undefined
    this.attributes = attributes
  }

  protected static request(method: string, endpoint: string, data?: any) {
    return axios({
      method,
      url: `${process.env.NODE_ENV === 'production' ? 'https://ricoltaserver.votre.best' : '//localhost:8089'}/${this.endpoint}${endpoint}`,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      responseType: 'json',
      body: data ? JSON.stringify(data) : undefined
    }).then(response => ({
      ...response.data,
      language: response.headers['content-language']
    }))
      
  }

  static list() {
    return this.request('GET', '')
      .then(json => {
        return json.map ? json.map((model: any)=> new this(model)) : json
      })
  }

  public fetch() {
    return (this.constructor as typeof Model).request('GET', `/${this._id}`)
      .then(json => {
        this._id = json._id
        this.attributes = json
        return this
      })
  }

  public save(data: any) {
    return (this.constructor as typeof Model).request(this._id ? 'PUT' : 'POST', `${this._id ? `/${this._id}` : ''}`, data)
      .then(json => {
        this._id = json._id
        this.attributes = json
        return this
      })
  }

  public destroy() {
    return (this.constructor as typeof Model).request('DELETE', `/${this._id}`)
      .then(json => {
        this._id = undefined
        this.attributes = {}
        return this
      })
  }

}