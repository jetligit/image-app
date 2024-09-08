import { Component } from "react";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
//import Location from './Location.jsx'
//import Acceptor from './FileParser.js'

/** props example code which displays the information sent over from here to Location.jsx and 
function App () {
  return (
    <>
      <Location name = "New York" latitude = {40.7127281} longitude = {-74.0060152}/>
      <Location name = "Los Angeles" latitude = {34.0536909} longitude = {-118.242766}/>
      <Acceptor> </Acceptor>
    </>
  );
}
*/


/** list of multiple marker elements
 * when I figure out how to use EXF to get the gps locations, I could potentially use props to send over the coordinates, create a list of markers, and then display those markers below
  */
const markers = [
  {
    name: "New York",
    location: {
      lat: 40.748817, 
      lng: -73.985428,
    },
  },
  {
    name: "Los Angeles",
    location: {
      lat: 34.0536909, 
      lng: -118.242766,
    },
  },
];


 
/** how markers.map() works here is it iterates over each element of the markers array and returns a Marker object (displayed as a pin) for each element */
class MapContainer extends Component {
  render() {
    return(
      <Map
        google={this.props.google}
        style = {{width: "100%", height: "100%"}}
        zoom = {10}
        initialCenter = {{lat: 40.713051, lng: -74.007233}}
      >
        {markers.map((marker) => (
          <Marker 
            key = {marker.name}
            position = {marker.location} 
          />
          
        ))}
      </Map>
    )
  }
}
export default GoogleApiWrapper(
  {
    apiKey: "AIzaSyBZLadZhcb4dqAD6w-RZ6XQg74YGgx36rA"
  }
)(MapContainer)
