
import * as React from 'react'
import { Link, RouteComponentProps, Redirect } from 'react-router-dom'

import { context } from '../context'

import { Button } from '../components/button'
import { Icon } from '../components/icon'
import { P, A, Img } from '../components/piece'
import { GoogleMap } from '../components/map'


interface Props extends RouteComponentProps<any> {
  context?: {
    pieces: {
      _id: string,
      [key:string]: any  
    }
  }
}
interface State {}


@context
export class Index extends React.Component<Props, State> {

  private photos: HTMLDivElement[]

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.scroll()
    window.addEventListener('scroll', this.scroll.bind(this))
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scroll.bind(this))
  }

  private scroll() {
    this.photos.forEach(photo => photo.style.transform = `translateY(-${window.scrollY/3}px)`)
  }

  public render() {
    return <div className='boxes'>
      <div className='box box--full'>
        <div className='box__top_right' style={{zIndex: 4}}>
          {/* <a href='/' className='button--transparent paragraph_medium' onClick={()=> document.cookie = `locale=${this.props.context.pieces.locale === 'en_CA' ? 'fr_CA' : 'en_CA'}`}>
            <P r='index' k='other_language' />
          </a> */}
        </div>
        <div className='grid box__top_left' style={{pointerEvents: 'auto'}} ref={element => this.photos = Array.from(element.querySelectorAll('.col'))}>
          <div className='col col--6of12' />
          <div className='col col--3of12'><Img r='index' k='photo_1' /></div>
          <div className='col col--3of12' />
          <div className='col col--9of12' />
          <div className='col col--3of12 map' style={{zIndex: 3}}>
            <GoogleMap
              zoom={13}
              center={{
                lat: 45.507039,
                lng: -73.550891
              }}
              markers={[{
                title: 'Ricolta',
                link: 'https://goo.gl/maps/bWzWWJc3o6H2',
                position: {
                  lat: 45.507039,
                  lng: -73.550891
                },
                home: true
              }]} />
          </div>
          <div className='col col--6of12' style={{zIndex: 3}}><Img r='index' k='photo_3' /></div>
          <div className='col col--6of12' />
          <div className='col col--9of12' />
          <div className='col col--3of12'><Img r='index' k='photo_4' /></div>
          <div className='col col--3of12'><Img r='index' k='photo_5' /></div>
          <div className='col col--9of12' />
          <div className='col col--6of12' />
          <div className='col col--6of12' style={{zIndex: 3}}><Img r='index' k='photo_6' /></div>
          <div className='col col--3of12' style={{zIndex: 2}}><Img r='index' k='photo_7' /></div>
          <div className='col col--9of12' />
          <div className='col col--9of12' />
          <div className='col col--3of12'><Img r='index' k='photo_8' /></div>
          <div className='col col--3of12' />
          <div className='col col--3of12' style={{zIndex: 2}}><Img r='index' k='photo_9' /></div>
          <div className='col col--6of12' />
          <div className='col col--12of12' style={{height: '25vw'}} />
          <div className='col col--6of12' />
          <div className='col col--3of12' style={{zIndex: 3}}><Img r='index' k='photo_10' /></div>
        </div>

        <div className='box__border' />

        <div className='grid grid--center' style={{zIndex: 2}}>
          <a id='benvenuto' className='a--anchor' />
          <div className='col col--6of12'>
            <div className='grid grid--guttered'>
              <div className='col col--12of12'>
                <h1 className='header_giant'><P r='index' k='title' /></h1>
              </div>

              <div className='col col--12of12'>
                <A r='menu' k='address_link' blank className='info_medium'> 
                  <small className='info_small'><P r='index' k='address_more' /></small><br />
                  <P r='index' k='address' />
                </A>
              </div>

              <div className='col col--9of12 col--bottom'>
                <h4 className='header_medium'><P r='index' k='hours' /></h4>
              </div>

              <div className='col col--3of12 text_right'>
                <A r='menu' k='facebook_link' blank><Icon i='facebook' /></A>
                <div className='normal_bottom' />
                <A r='menu' k='instagram_link' blank><Icon i='instagram' /></A>
                <div className='normal_bottom' />
                <A r='menu' k='email_link' blank><Icon i='mail' /></A>
              </div>

              <div className='col col--spacer' />

              <div className='col col--6of12'>
                <h3 className='info_big'><P r='index' k='city' /></h3>
              </div>
              <div className='col col--6of12 text_right'>
                <h3 className='header_big'><P r='index' k='year' /></h3>
              </div>

              <div className='col col--12of12 medium_bottom' />
              <div className='col col--12of12'>
                <h2 className='header_medium'><P r='index' k='sub_description' /></h2>
              </div>
              <div className='col col--12of12 medium_bottom' />

              <div className='col col--12of12'>
                <p className='paragraph_big'><P r='index' k='description' /></p>
              </div>

              <div className='col col--spacer' />

              <div className='col col--12of12'>
                <a id='pizza' className='a--anchor' />
                <p className='header_big'><P r='index' k='pizza_1' /></p>
              </div>
              <div className='col col--4of12 col--rotate'>
                <p className='header_small' style={{maxHeight: '40vh'}}><P r='index' k='pizza_2' /></p>
              </div>

              <div className='col col--8of12'>
                <p className='info_small big_bottom'><P r='index' k='pizza_3' /></p>
                <p className='paragraph_medium'><P r='index' k='pizza_4' /></p>
              </div>

              <div className='col col--spacer' />

              <div className='col col--8of12'>
                <a id='local' className='a--anchor' />
                <p className='info_medium medium_bottom'><P r='index' k='seasons_1' /></p>
                <p className='header_small'><P r='index' k='seasons_3' /></p>
              </div>
              <div className='col col--4of12 col--rotate col--rotate--inverse'>
                <p className='header_medium' style={{maxHeight: '40vh'}}><P r='index' k='seasons_2' /></p>
              </div>

              <div className='col col--spacer' />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}