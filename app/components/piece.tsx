
import Parser from 'html-react-parser'
import * as React from 'react'

import { context } from '../context'
import Piece from '../models/piece'
import { Button } from './button'



interface Props {
  r: string,
  k: string,
  blank?: boolean,
  className?: string,
  context?: {
    pieces: {
      _id: string,
      [key:string]: any  
    },
    editable: boolean
  }
}

interface State {
  value?: any
}


class _P extends React.Component<Props, State> {

  public piece: Piece

  constructor(props: Props) {
    super(props)
    this.state = {
    }

    this.piece = new Piece({_id: props.context.pieces[this.props.r]._id})
  }

  componentDidMount() {
  }

  protected input(e: React.FormEvent<HTMLSpanElement>) {
    this.setState({
      value: e.currentTarget.innerHTML
    })
  }

  protected save() {
    this.piece.save({
      content: {
        [this.props.k]: this.state.value
      }
    })
      .then(piece => this.setState({ 
        value: undefined
      }))
  }

  public render() {
    return this.props.context.editable
      ? <>
        <span contentEditable suppressContentEditableWarning onInput={e => this.input(e)} onClick={e => e.preventDefault()}>{Parser(this.props.context.pieces[this.props.r][this.props.k])}</span>
        <Button sup disabled={this.state.value === undefined} label='Save' onClick={e => this.save()} />
      </>
      : Parser(this.props.context.pieces[this.props.r][this.props.k])
  }
}

class _A extends _P {

  public render() {
    return this.props.context.editable
      ? <>
        <a href={this.props.context.pieces[this.props.r][this.props.k]} className={this.props.className} target={this.props.blank ? '_blank' : undefined}>{this.props.children}</a>
        <br />
        <span contentEditable suppressContentEditableWarning onInput={e => this.input(e)}>{this.props.context.pieces[this.props.r][this.props.k]}</span>
        <Button sup disabled={this.state.value === undefined} label='Save' onClick={e => this.save()} />
      </>
      : <a href={this.props.context.pieces[this.props.r][this.props.k]} className={this.props.className} target={this.props.blank ? '_blank' : undefined}>{this.props.children}</a>
  }
}

class _Img extends _P {

  public render() {
    return <picture>
      <img src={`https://montrealuploads.imgix.net${this.props.context.pieces[this.props.r][this.props.k]}?auto=format,compress`} className={this.props.className} />
    </picture>
  }
}


export const P = context(_P)
export const A = context(_A)
export const Img = context(_Img)