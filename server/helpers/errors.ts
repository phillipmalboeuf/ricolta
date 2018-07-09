
import { Request, Response } from 'express'

export class ResponseError extends Error {

  status: number
  date: Date
  fields?: {[name:string]: any}

  constructor(message, status = 400, fields?) {
    super(message)

    this.status = status
    this.fields = fields
    this.date = new Date()
  }
}

export const sendError = (response: Response, error: ResponseError) => {
  console.error(error)
  return response.status(error.status || 400).json({ message: error.message, fields: error.fields })
}