
const Parser = require('html-react-parser')
import * as React from 'react'

import { PiecesContext } from '../contexts/pieces'

import Piece from '../models/piece'
import { Button } from '../components/button'


interface Props {
  r: string,
  k: string,
  blank?: boolean
}
interface State {
  value: any
}

export class P extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
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

  // save() {
  //   this.state.piece.save({
  //     content: {
  //       [this.props.k]: this.state.value
  //     }
  //   })
  //     .then(piece => this.setState({ 
  //       value: undefined,
  //       piece: piece
  //     }))
  // }

  public render() {
    return <PiecesContext.Consumer>
      {(context) => Parser(context.pieces[this.props.r][this.props.k])}
    </PiecesContext.Consumer>
  }
}

export class A extends P {

  public render() {
    return <PiecesContext.Consumer>
      {(context) => <a href={context.pieces[this.props.r][this.props.k]} target={this.props.blank ? '_blank' : undefined}>{this.props.children}</a>}
    </PiecesContext.Consumer>
  }
}