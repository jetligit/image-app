import React, { useEffect, useState } from 'react';
import ExifReader from 'exifreader';

function Acceptor(){
    const [MyLocation, setMyLocation] = useState({ latitude: null, longitude: null });
    useEffect(() => {
        try{
            const fetchLocation = async () => {
                /** extracting  gps coordinates*/
                const {latitude, longitude} = await ExifReader.gps('Images/example_image1.jpg');
                if (latitude && longitude){
                    setMyLocation({latitude, longitude});
                }
                else {
                    console.error('no gps data found');
                }
            }
        }
        catch (error) {
            console.error('Error fetching or parsing image:', error);
        }
    })
   
    return (
        <div>
            <p> My image's latitude is: {MyLocation.latitude} </p>
            <p> My image's longitude is: {MyLocation.longitude} </p>
        </div>
    );
}


export default Acceptor;