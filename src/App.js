import { Component } from "react";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

const markerPosition = {
  lat: 40.748817, // Example latitude (New York)
  lng: -73.985428 // Example longitude (New York)
};

class MapContainer extends Component {
  render() {
    return(
      <Map
        google={this.props.google}
        style = {{width: "100%", height: "100%"}}
        zoom = {10}
        initialCenter = {{lat: 40.713051, lng: -74.007233}}
      >

        /** cannot read my location */
        <Marker position = {MyLocation} />
      </Map>
    );
  }
}

export default GoogleApiWrapper(
  {
    apiKey: "AIzaSyBZLadZhcb4dqAD6w-RZ6XQg74YGgx36rA"
  }
)(MapContainer)
