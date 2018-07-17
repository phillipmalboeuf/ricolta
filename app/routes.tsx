import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { Index } from './routes/index'
import { Login } from './routes/login'
import { New } from './routes/new'
import { Logout } from './routes/logout'

interface Props {
  host?: string
}

export const Routes: React.SFC<Props> = (props)=> <Switch>
  <Route exact path='/login' component={Login} />
  <Route exact path='/logout' component={Logout} />
  <Redirect from='/sessions/:_id' to='/' />

  <Route exact path='/' component={props.host == 'localhost:8080' ? New : Index} />
</Switch>