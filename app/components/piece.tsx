
import Parser from 'html-react-parser'
import * as React from 'react'

import { context } from '../context'
import Piece from '../models/piece'
import { Button } from './button'
import { upload } from '../utilities/upload'
import { Loading } from './loading'



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
  value?: any,
  loading?: boolean
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

  protected save(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
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
        <Button sup disabled={this.state.value === undefined} label='Save' onClick={e => this.save(e)} />
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
        <Button sup disabled={this.state.value === undefined} label='Save' onClick={e => this.save(e)} />
      </>
      : <a href={this.props.context.pieces[this.props.r][this.props.k]} className={this.props.className} target={this.props.blank ? '_blank' : undefined}>{this.props.children}</a>
  }
}

class _Img extends _P {

  protected input(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      loading: true
    })

    let file = e.currentTarget.files[0]
    if (file && file.type.match('image.*')) {
      upload(file).then(response => {
        this.setState({
          value: `/${response.path}`
        })
      })
    }
  }

  public render() {
    return this.props.context.editable
      ? <>
        <img src={`https://montrealuploads.imgix.net${this.state.value || this.props.context.pieces[this.props.r][this.props.k]}?auto=format,compress`} className={this.props.className} onLoad={e => this.setState({loading: false})} />
        <input className='flat_bottom' type='file' onChange={e => this.input(e)} />
        <Loading start={this.state.loading} finish={!this.state.loading && this.state.value} />
      </>
    : <picture>
      <source srcSet={`https://montrealuploads.imgix.net${this.props.context.pieces[this.props.r][this.props.k]}?auto=format,compress&w=600`} media='(max-width: 600px)' />
      <source srcSet={`https://montrealuploads.imgix.net${this.props.context.pieces[this.props.r][this.props.k]}?auto=format,compress&w=900`} media='(max-width: 900px)' />
      <source srcSet={`https://montrealuploads.imgix.net${this.props.context.pieces[this.props.r][this.props.k]}?auto=format,compress&w=1200`} media='(max-width: 1200px)' />
      <img src={`https://montrealuploads.imgix.net${this.props.context.pieces[this.props.r][this.props.k]}?auto=format,compress&w=1500`} className={this.props.className} />
    </picture>
  }
}


export const P = context(_P)
export const A = context(_A)
export const Img = context(_Img)