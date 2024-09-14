import React, { useState } from 'react';
import ExifReader from 'exifreader';

function Acceptor() {
  const [exifData, setExifData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target.result;
          ExifReader.load(arrayBuffer)
            .then((tags) => {
              setExifData(tags);
              setError(null);
            })
            .catch((err) => {
              console.error("Error fetching or parsing image:", err);
              setError("Error fetching or parsing image");
            });
        } catch (error) {
          console.error("Error processing file:", error);
          setError("Error processing file");
        }
      };
      reader.readAsArrayBuffer(file); // Ensure this line is correct
    }
  };

  return (
    <div> 
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div>Error: {error}</div>}
      {exifData && (
        <div>
          <h3>EXIF Data:</h3>
          <pre>{JSON.stringify(exifData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
    /** 
    return (
        <div>
            <p> My image's latitude is: {myLat} and My image's longitude is {myLong} </p>
        </div>
    );
    */
//}

export default Acceptor;