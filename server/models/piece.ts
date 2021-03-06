
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { CONF } from '../../config'

import Model from './_model'

export default class Piece extends Model {
  static collection = 'pieces'


  static list(filters, limit=50, page=0, sort?, locale?) {
    return super.list(filters).then(pieces => pieces.reduce((values, piece)=> {
      values[piece.route] = {
        ...piece.content,
        _id: piece._id
      }

      if (locale && locale.toString() !== CONF('DEFAULT_LOCALE') && piece.translations[locale.language]) {
        values[piece.route] = {
          ...values[piece.route],
          ...piece.translations[locale.language].content
        }
      }

      return values
    }, {
      locale: locale ? locale.toString() : CONF('DEFAULT_LOCALE')
    }))
  }

  static update(_id, data, locale?) {
    return super.update(_id, Object.keys(data.content).reduce((content, key)=> {
      

      if (locale && locale.toString() !== CONF('DEFAULT_LOCALE')) {
        content[`translations.${locale.language}.content.${key}`] = data.content[key]
      } else {
        content[`content.${key}`] = data.content[key]
      }

      return content
    }, {}))
  }


  static endpoints() : {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    function: (req: Request) => Promise<any> | Promise<any[]> | Promise<{ _id: ObjectId }> | Promise<{ deleted: number }>
  }[] {
    return [
      {
        method: 'GET',
        endpoint: `/${this.collection}`,
        function: req => this.list(req.query, req.query.limit, req.query.page, req.query.sort, req.locale)
      },
      {
        method: 'PUT',
        endpoint: `/${this.collection}/:id`,
        function: req => this.update(req.params.id, req.body, req.locale)
      }
    ]
  }
}