
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
interface State {}


@context
export class Menu extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {

  }

  componentWillUnmount(){

  }

  public render() {
    return <nav className='menu grid grid--vertically_spaced'>
      <a href='#contact' className='header_big'><P r='menu' k='contact' /></a>
      <a href='#benvenuto' className='header_big'><P r='menu' k='benvenuto' /></a>
      <a href='#pizza' className='header_big'><P r='menu' k='pizza' /></a>
      <a href='#local' className='header_big'><P r='menu' k='local' /></a>
      <a href='/' className='paragraph_big' onClick={()=> document.cookie = `locale=${this.props.context.pieces.locale === 'en_CA' ? 'fr_CA' : 'en_CA'}`}>
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
    </nav>
  }
}