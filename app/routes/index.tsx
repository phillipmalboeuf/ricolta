
import * as React from 'react'
import { Link, RouteComponentProps, Redirect } from 'react-router-dom'
import * as cookies from 'browser-cookies'

import { Button } from '../components/button'
import { P } from '../components/piece'

import Piece from '../models/piece'

interface Props extends RouteComponentProps<any> {}
interface State {}

export class Index extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  public render() {
    return <div className='boxes'>
      <div className='box box--full'>
        {/*<div className='box__top_right'>
          <a className='paragraph_medium' onClick={()=> cookies.set('locale', this.state.pieces.language == 'en' ? 'fr_CA' : 'en_CA')}
            href={`${this.state.pieces.language == 'en' ? '/' : '/en'}${window.location.pathname.replace('/', '').replace(this.props.match.params.language, '')}`}>
            {this.state.pieces.language == 'en' ? 'Français' : 'English'}
          </a>
        </div>*/}
        <div className='grid grid--guttered grid--center'>
          <div className='col col--3of12 col--rotate'>
            <h1 className='header_giant'><P r='index' k='title' /></h1>
          </div>
          <div className='col col--2of12'>
            <h3 className='info_big'><P r='index' k='city' /></h3>
          </div>
          <div className='col col--2of12 text_center'>
            <h4 className='header_medium'><P r='index' k='hours' /></h4>
          </div>
          <div className='col col--1of12'>
            <h4 className='info_small text_right'><P r='index' k='days' /></h4>
          </div>
          
          
          <div className='col col--3of12 col--rotate'>
            <a href='' className='info_medium'>
              <small className='info_small'><P r='index' k='address_more' /></small><br />
              <P r='index' k='address' />
            </a>
          </div>
          <div className='col col--1of12'></div>

          <div className='col col--12of12 medium_bottom'></div>

          <div className='col col--6of12'>
            <h2 className='header_small'><P r='index' k='sub_description' /></h2>
          </div>
          <div className='col col--12of12 medium_bottom'></div>
          <div className='col col--6of12'>
            <p className='paragraph_big'><P r='index' k='description' /></p>
          </div>
        </div>
      </div>
    </div>)
  }
}