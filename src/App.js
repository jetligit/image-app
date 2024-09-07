//import { Component } from "react";
//import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import Location from './Location.jsx'
import Acceptor from './FileParser.js'

/** 
const markerPosition = {
  lat: 40.748817, // Example latitude (New York)
  lng: -73.985428 // Example longitude (New York)
};
*/

function App () {
  return (
    <>
      <Location name = "New York" latitude = {40.7127281} longitude = {-74.0060152}/>
      <Location name = "Los Angeles" latitude = {34.0536909} longitude = {-118.242766}/>
      <Acceptor> </Acceptor>
    </>
  );
}

/** 
class MapContainer extends Component {
  render() {
    return(
      <Map
        google={this.props.google}
        style = {{width: "100%", height: "100%"}}
        zoom = {10}
        initialCenter = {{lat: 40.713051, lng: -74.007233}}
      >

        // cannot read my location
        <Marker position = {Location} />
      </Map>
    );
  }
}
export default GoogleApiWrapper(
  {
    apiKey: "AIzaSyBZLadZhcb4dqAD6w-RZ6XQg74YGgx36rA"
  }
)(MapContainer)
*/

export default App