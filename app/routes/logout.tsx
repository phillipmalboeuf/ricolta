
import * as React from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import * as cookies from 'browser-cookies'

import { AppContext } from '../context'

import Session from '../models/session'


interface Props extends RouteComponentProps<any> {}

export const Logout: React.SFC<Props> = (props) => {
  return <AppContext.Consumer>
    {(context) => {
      (new Session({_id: cookies.get('Session-Id')})).destroy()
      context.user._id = undefined
      context.user.attributes = {}
      context.editable = false

      return <Redirect to='/' />
    }}
  </AppContext.Consumer>
}


