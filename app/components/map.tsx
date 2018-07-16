
import * as React from 'react'
import { Link } from 'react-router-dom'

import { context } from '../context'

import { Button } from '../components/button'
import { Icon } from '../components/icon'
import { P, A, Img } from '../components/piece'


interface Props {
  zoom: number,
  center: {lat: number, lng: number},
  markers: {
    title: string,
    link: string,
    position: {lat: number, lng: number},
    home?: boolean
  }[]
}
interface State {}


@context
export class GoogleMap extends React.Component<Props, State> {

  private element: HTMLDivElement
  public map: google.maps.Map

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {

    let colors = {
      base: '#FFFFFF',
      text: '#dddddd',
      textStroke: '#FFFFFF',
      road: '#eeeeee',
      highway: '#dddddd',
      roadText: '#dddddd',
      poi: '#FFFFFF',
      poiText: '#dddddd',
      park: '#FFFFFF',
      parkText: '#dddddd',
      transitLine: '#dddddd',
      transitStation: '#dddddd',
      water: '#cddee8',
      waterText: '#dddddd'
    }

    this.map = new google.maps.Map(this.element, {
      zoom: this.props.zoom,
      center: this.props.center,
      scrollwheel: false,
      mapTypeControl: false,
      styles: [{'elementType': 'geometry', 'stylers': [{'color': colors.base} ] }, {'elementType': 'labels.text.fill', 'stylers': [{'color': colors.text} ] }, {'elementType': 'labels.text.stroke', 'stylers': [{'color': colors.textStroke} ] }, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': colors.poi} ] }, {'featureType': 'poi', 'elementType': 'labels.text.fill', 'stylers': [{'color': colors.poiText} ] }, {'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{'color': colors.park} ] }, {'featureType': 'poi.park', 'elementType': 'labels.text.fill', 'stylers': [{'color': colors.parkText} ] }, {'featureType': 'road', 'elementType': 'geometry', 'stylers': [{'color': colors.road} ] }, {'featureType': 'road.arterial', 'elementType': 'labels.text.fill', 'stylers': [{'color': colors.roadText} ] }, {'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{'color': colors.highway} ] }, {'featureType': 'road.highway', 'elementType': 'labels.text.fill', 'stylers': [{'color': colors.roadText} ] }, {'featureType': 'road.local', 'elementType': 'labels.text.fill', 'stylers': [{'color': colors.roadText} ] }, {'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{'color': colors.transitLine} ] }, {'featureType': 'transit.station', 'elementType': 'geometry', 'stylers': [{'color': colors.transitStation} ] }, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': colors.water} ] }, {'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{'color': colors.waterText} ] }]
    })

    this.props.markers.map((marker)=> {
      let _marker = new google.maps.Marker({
        map: this.map,
        position: marker.position,
        title: marker.title
      })

      let infowindow = new google.maps.InfoWindow({
				content: `<a href="${marker.link}" class="black" target="_blank">${marker.title}</a>`
			})

			if (marker.home) {
				infowindow.open(this.map, _marker)
			}

			_marker.addListener('click', ()=> {
				infowindow.open(this.map, _marker)
			})
    })
  }

  componentWillUnmount(){

  }

  public render() {
    return <div className='map' ref={(element)=> { this.element = element }} />
  }
}