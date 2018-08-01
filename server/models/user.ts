
import { hashPassword, encrypt, decrypt } from '../helpers/encryption'
import { ObjectId } from 'mongodb'

import Model from './_model'
import { EMAIL, PASSWORD } from '../helpers/properties'

export default class User extends Model {
  static collection = 'users'
  static properties = {
    password: PASSWORD
  }


  static preprocess(data) {
    return super.preprocess({
      ...data,
      ...(data.password
      ? hashPassword(data.password)
      : {})
    })
  }

  static postprocess(data) {
    return super.postprocess({
      ...data
    })
  }


  static get(_id) {
    return super.get(_id).then(user => {
      delete user.password
      delete user.salt
      return user
    })
  }
}