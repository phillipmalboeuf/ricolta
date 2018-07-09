
import Parser from 'html-react-parser'
import * as React from 'react'

import { context } from '../context'
import Piece from '../models/piece'



interface Props {
  r: string,
  k: string,
  blank?: boolean,
  className?: string,
  context?: {
    pieces: {
      _id: string,
      [key:string]: any  
    }
  }
}
interface State {
  piece?: Piece
}

@context
export class P extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      // piece: new Piece({_id: props.piece._id})
    }
  }

  componentDidMount() {
  }

  public render() {
    return Parser(this.props.context.pieces[this.props.r][this.props.k])
  }
}

@context
export class A extends P {

  public render() {
    return <a href={this.props.context.pieces[this.props.r][this.props.k]} className={this.props.className} target={this.props.blank ? '_blank' : undefined}>{this.props.children}</a>
  }
}