
import * as React from 'react'
import { Link } from 'react-router-dom'

import { context } from '../context'

import { Button } from '../components/button'
import { Icon } from '../components/icon'
import { P, A, Img } from '../components/piece'


interface Props {
  context?: {
    pieces: {
      _id: string,
      [key:string]: any  
    }
  }
}
interface State {
  visible: boolean
}


@context
export class Menu extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(){

  }

  public toggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.blur()
    this.setState({
      visible: !this.state.visible
    })
  }

  private linkclick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    this.setState({
      visible: false
    })

    window.scroll({
      left: 0,
      top: document.querySelector(e.currentTarget.getAttribute('href')).offsetTop,
      behavior: 'smooth'
    })
  }

  public render() {
    const nav = <>
      <A r='menu' k='email_link' blank className='header_big'><P r='menu' k='contact' /></A>
      <a href='#benvenuto' onClick={(e)=> this.linkclick(e)} className='header_big'><P r='menu' k='benvenuto' /></a>
      <a href='#pizza' onClick={(e)=> this.linkclick(e)} className='header_big'><P r='menu' k='pizza' /></a>
      <a href='#local' onClick={(e)=> this.linkclick(e)} className='header_big'><P r='menu' k='local' /></a>
      <a href='/' className='paragraph_big' onClick={()=> document.cookie = `locale=${this.props.context.pieces.locale.includes('en') ? 'fr_CA' : 'en_CA'}`}>
        <P r='menu' k='other_language' />
      </a>
      <div className='grid grid--center'>
        <span className='header_small'><P r='menu' k='copyright' /></span>
        <A r='menu' k='address_link' className='header_small' blank><P r='menu' k='address' /></A>
        <A r='menu' k='phone_link' className='header_small' blank><P r='menu' k='phone' /></A>
        <A r='menu' k='facebook_link' className='header_small' blank><P r='menu' k='facebook' /></A>
        <A r='menu' k='instagram_link' className='header_small' blank><P r='menu' k='instagram' /></A>
        <A r='menu' k='email_link' className='header_small' blank><P r='menu' k='email' /></A>
      </div>
    </>

    return <>
      <button className={`button--transparent menu_button${this.state.visible ? ' menu_button--toggled' : ''}`}
        onClick={(e)=> this.toggle(e)}>
        <Icon i='menu' />
      </button>
      <nav className={`menu`}>
        {nav}
      </nav>
      <nav className={`menu menu--fixed${this.state.visible ? ' menu--visible' : ''}`}>
        {nav}
      </nav>
    </>
  }
}