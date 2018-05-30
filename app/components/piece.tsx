
const Parser = require('html-react-parser')
import * as React from 'react'
import * as cookies from 'browser-cookies'

import Piece from '../models/piece'
import { Button } from '../components/button'


interface Props {
  k: string,
  piece: {
    _id: string,
    [key:string]: any
  }
}
interface State {
  piece: Piece,
  value: any
}

export class P extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      piece: new Piece({_id: props.piece._id}),
      value: undefined
    }
  }

  componentDidMount() {
  }

  onInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: e.currentTarget.innerHTML
    })
  }

  save() {
    this.state.piece.save({
      content: {
        [this.props.k]: this.state.value
      }
    })
      .then(piece => this.setState({ 
        value: undefined,
        piece: piece
      }))
  }

  public render() {
    return cookies.get('Session-Id')
      ? <>
        <span contentEditable suppressContentEditableWarning onInput={this.onInput.bind(this)}>
          {Parser(this.props.piece[this.props.k])}
        </span>
        <Button disabled={this.state.value === undefined} label='Save' onClick={this.save.bind(this)} />
      </>
      : Parser(this.props.piece[this.props.k])
  }
}