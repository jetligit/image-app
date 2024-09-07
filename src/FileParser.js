import React, { useEffect, useState } from 'react';
import ExifReader from './node_modules/exifreader/src/exif-reader.js';
import 

function Acceptor(){
    const [MyLocation, setMyLocation] = useState({ latitude: null, longitude: null });
    //const [latitude, setLatitude] = useState(-1);
    //const [longitude, setLongtiude] = useState(-1);

    useEffect(() => {
        const fetchLocation = async () => {
            const {latitude, longitude} = await ExifReader.gps('../Images/central_park.jpg');
            setMyLocation({latitude, longitude});
        }
    })
    
    return (<h1> latitude is: {latitude} </h1>)
}

export default Acceptor;
    /** 
    "exifreader": {
    "include": {
        "exif": [
            "DateTime",
            "GPSLatitude",
            "GPSLatitudeRef",
            "GPSLongitude",
            "GPSLongitudeRef",
            "GPSAltitude",
            "GPSAltitudeRef"
        ]
    }
    }
    */


