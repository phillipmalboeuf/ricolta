
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'

import { AppContext } from '../context'
import { P } from './piece'


interface Props {
  pieces: {
    [key:string]: {
      _id: string,
      [key:string]: any
    }
  },
  response?: any,
  editable?: boolean
}

export const HTML: React.SFC<Props> = (props) => {
  return <AppContext.Provider value={{
    pieces: props.pieces,
    response: props.response,
    user: undefined,
    editable: props.editable
  }}>
    <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
      <meta name='google-site-verification' content='TbdTeN-7nA3C1J4AMdJjddIPtXTAokjeT5wRMqwtxeA' />
      <title><P r='index' k='title' /></title>
      <link rel='shortcut icon' type='image/png' href='https://montrealuploads.imgix.net/ricolta/favicon.png' />
      <link rel='stylesheet' type='text/css' href='/dist/app.css' />
    </head>
    <body>
      <section className='app' id='app'>
        <StaticRouter context={{}}>
          <>
            {props.children}
          </>
        </StaticRouter>
      </section>
      
      <script dangerouslySetInnerHTML={{ __html: `window.pieces = ${JSON.stringify(props.pieces)}` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.response = ${JSON.stringify(props.response)}` }} />
      <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBvxwTjOxuO7p3tNFL4feobGr4lWuCgMqo'></script>
      <script src='/dist/app.js'></script>
    </body>
    </html>
  </AppContext.Provider>
}