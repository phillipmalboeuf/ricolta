
import '../styles/styles.scss'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import * as cookies from 'browser-cookies'

import Piece from './models/piece'
import User from './models/user'

import { Routes } from './routes'
import { AppContext } from './context'


const app = (pieces, response, user, editable)=> <AppContext.Provider value={{
    pieces,
    response,
    user,
    editable
  }}>
    <BrowserRouter>
      <>
        <Routes host={window.location.host} />
      </>
    </BrowserRouter>
  </AppContext.Provider>


let user = new User({_id: cookies.get('User-Id')})

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(
    app(window.pieces, window.response, user, user._id ? true : false),
    document.getElementById('app'))
} else {
  Promise.all([
    Piece.list(),
    user._id ? user.fetch() : Promise.resolve(user)
  ]).then(([pieces, user])=>
    ReactDOM.render(
      app(pieces, undefined, user, user._id ? true : false),
      document.getElementById('app')))
}

