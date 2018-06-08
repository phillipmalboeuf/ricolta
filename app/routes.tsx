import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { Index } from './routes/index'
import { Login } from './routes/login'

export const Routes = ()=> <Switch>
  <Route exact path='/login' component={Login} />
  <Redirect from='/sessions/:_id' to='/' />

  <Route exact path='/' component={Index} />
</Switch>