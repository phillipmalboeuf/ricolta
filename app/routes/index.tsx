
import * as React from 'react'
import { Link, RouteComponentProps, Redirect } from 'react-router-dom'

import { context } from '../context'

import { Button } from '../components/button'
import { Icon } from '../components/icon'
import { P, A, Img } from '../components/piece'


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
export class Index extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  componentWillUnmount(){
  }

  public render() {
    return <div className='boxes'>
      <div className='box box--full box--full--tight'>
        <div className="box__top_right">
          <a href='/' className='button--transparent paragraph_medium' onClick={()=> document.cookie = `locale=${this.props.context.pieces.locale.includes('en') ? 'fr_CA' : 'en_CA'}`}>
            <P r='menu' k='other_language' />
          </a>
        </div>
        <div className='grid grid--guttered grid--center'>
          <div className='col col--2of12 col--tablet_landscape--3of12 col--rotate hide_on_tablet_portrait'>
            <h1 className='header_giant'><P r='index' k='title' /></h1>
          </div>

          <div className='col col--6of12 col--tablet_landscape--7of12 col--tablet_portrait--9of12 col--phone--11of12'>
            <div className='grid grid--guttered'>
              <div className='col col--4of12 col--tablet_portrait--5of12'>
                <h3 className='info_big'><P r='index' k='city' /></h3>
              </div>
              <div className='col col--4of12 col--phone--5of12 text_center'>
                <h4 className='header_medium'><P r='index' k='hours' /></h4>
              </div>
              <div className='col col--3of12 col--phone--2of12'>
                <h4 className='info_small text_right'><P r='index' k='days' /></h4>
              </div>
              
              <div className='col col--12of12 big_bottom' />
              <div className='col col--12of12 tablet_portrait_only'>
                <A r='index' k='address_link' blank className='info_medium'>
                  <small className='info_small'><P r='index' k='address_more' /></small><br />
                  <P r='index' k='address' />
                </A>
              </div>
              <div className='col col--12of12 big_bottom tablet_portrait_only' />
              <div className='col col--12of12 tablet_portrait_only'>
                <h1 className='header_giant'><P r='index' k='title' /></h1>
              </div>

              <div className='col col--12of12 col--tablet_portrait--last'>
                <h2 className='header_medium'><P r='index' k='sub_description' /></h2>
              </div>
              <div className='col col--12of12 medium_bottom' />
              <div className='col col--12of12'>
                <p className='paragraph_big'><P r='index' k='description' /></p>
              </div>
              <div className='col col--12of12 big_bottom tablet_portrait_only' />
            </div>
          </div>

          <div className='col col--1of12 col--rotate hide_on_tablet_portrait'>
            <A r='index' k='address_link' blank className='info_medium'> 
              <small className='info_small'><P r='index' k='address_more' /></small><br />
              <P r='index' k='address' />
            </A>
          </div>

          {/* <div className='col col--1of12 text_right hide_on_phone'>
            <A r='index' k='facebook' blank><Icon i='facebook' /></A>
            <div className='medium_bottom' />
            <A r='index' k='instagram' blank><Icon i='instagram' /></A>
            <div className='medium_bottom' />
            <A r='index' k='mail' blank><Icon i='mail' /></A>
          </div> */}
        </div>
      </div>
    </div>
  }
}