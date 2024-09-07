import React, { useEffect, useState } from 'react';
import ExifReader from 'exifreader';

function Acceptor() {
    const [myLocation, setMyLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('Images/example_image1.jpg');
                const arrayBuffer = await response.arrayBuffer();
                const tags = ExifReader.load(arrayBuffer);
                
                const latitude = tags.GPSLatitude?.description;
                const longitude = tags.GPSLongitude?.description;

                if (latitude && longitude) {
                    setMyLocation({ latitude, longitude });
                } else {
                    console.error('GPS data not found');
                }
            } catch (error) {
                console.error('Error fetching or parsing image:', error);
            }
        };

        fetchLocation();
    }, []); // Empty dependency array means this useEffect runs once after the initial render

    return (
        <div>
            <p>My image's latitude is: {myLocation.latitude}</p>
            <p>My image's longitude is: {myLocation.longitude}</p>
        </div>
    );
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


