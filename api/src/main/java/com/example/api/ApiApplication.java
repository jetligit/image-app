package com.example.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.drew.lang.GeoLocation;

import java.io.InputStream;



@SpringBootApplication
@RestController
public class ApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
	
	@PostMapping("/extract")
	public ResponseEntity<float[]> getCoordinates(@RequestParam("image") MultipartFile file){
		try (InputStream input = file.getInputStream()) {
            Metadata metadata = ImageMetadataReader.readMetadata(input);
            GpsDirectory gpsDir = metadata.getFirstDirectoryOfType(GpsDirectory.class);

			if (gpsDir != null){
				GeoLocation location = gpsDir.getGeoLocation();
				float[] coordinates = new float[2];
				coordinates[0] = (float) location.getLatitude();
				coordinates[1] = (float) location.getLongitude();
				return ResponseEntity.ok(coordinates);
			}
			else{
				// No GPS data found
				return ResponseEntity.badRequest().body(null);
			}
		} catch(Exception e){
			e.printStackTrace();
            return ResponseEntity.status(500).body(null); // Internal server error
		}
	}

	@GetMapping("/extract")
    public String extract() {
        return "Extract endpoint is working!";
    }

}
