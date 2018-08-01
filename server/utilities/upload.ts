
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { ObjectId } from 'mongodb'
import { S3 } from 'aws-sdk'
import { CONF } from '../../config'

import { ResponseError } from '../helpers/errors'


export default class Upload {

  static upload(file: UploadedFile) {
    const s3 = new S3()
    s3.config.accessKeyId = CONF('AWS_ACCESS_KEY')
    s3.config.secretAccessKey = CONF('AWS_SECRET_KEY')
    s3.config.region = CONF('AWS_S3_REGION')

    const path = `${CONF('AWS_S3_FOLDER')}/${new ObjectId()}/${file.name}`
    
    return s3.putObject({
      Bucket: CONF('AWS_S3_BUCKET'),
      Key: path,
      Body: file.data
    }).promise().then(response => ({
      path
    }))
  }
 
  static endpoints() : {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    function: (req: Request) => Promise<any>
  }[] {
    return [
      {
        method: 'POST',
        endpoint: `/_upload`,
        function: (req: Request) : Promise<any> => this.upload(req.files.file as UploadedFile)
      }
    ]
  }
}

