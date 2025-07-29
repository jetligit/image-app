package com.example.api;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.drew.lang.GeoLocation;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class Controller {
	private FileDAO myDao;
	private static final Logger LOG = Logger.getLogger(Controller.class.getName());

	public Controller(FileDAO dao){
		this.myDao = dao;
	}
	
	@PostMapping("/extract")
	public ResponseEntity<float[]> createCoordinates(@RequestParam("image") MultipartFile file){
		try (InputStream input = file.getInputStream()) {
            Metadata metadata = ImageMetadataReader.readMetadata(input);
            GpsDirectory gpsDir = metadata.getFirstDirectoryOfType(GpsDirectory.class);

			if (gpsDir != null){
				GeoLocation location = gpsDir.getGeoLocation();
				float[] coordinates = new float[2];
				coordinates[0] = (float) location.getLatitude();
				coordinates[1] = (float) location.getLongitude();
				LOG.info("extracted coordinates");

				myDao.createImageMetadata(coordinates[0], coordinates[1]); // Save to file
				return new ResponseEntity<>(coordinates, HttpStatus.CREATED);
			} else {
				return ResponseEntity.badRequest().body(null);
			}
		} catch(Exception e){
			e.printStackTrace();
            return ResponseEntity.status(500).body(null);
		}
	}

	@GetMapping("/extract")
	public ResponseEntity<ArrayList<ImageMetadata>> getCoordinates(){
		LOG.info("GET /extract");
		try {
			ArrayList<ImageMetadata> images = myDao.getAllImageMetadata();
			return new ResponseEntity<>(images, HttpStatus.OK);
		} catch (Exception e) {
			LOG.log(Level.SEVERE, e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
