import * as React from 'react'

export const PiecesContext = React.createContext({
  pieces: {} as {
      [key:string]: {
      _id: string,
      [key:string]: any
    }
  }
})