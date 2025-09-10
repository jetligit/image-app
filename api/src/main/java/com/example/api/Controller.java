package com.example.api;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.drew.metadata.exif.GpsDirectory;
import com.drew.lang.GeoLocation;
import com.example.api.ImageMetadata;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {
	private FileDAO myDao;
	private static final Logger LOG = Logger.getLogger(Controller.class.getName());

	public Controller(FileDAO dao){
		this.myDao = dao;
	}
	
	@PostMapping("/extract")
	public ResponseEntity<ImageMetadata>createCoordinates(@RequestParam("image") MultipartFile file){
		LOG.info("Received POST /extract request with file: " + file.getOriginalFilename() + ", size: " + file.getSize());
		try (InputStream input = file.getInputStream()) {
			Metadata metadata = ImageMetadataReader.readMetadata(input);
			GpsDirectory gpsDir = metadata.getFirstDirectoryOfType(GpsDirectory.class);
			if (gpsDir != null){
				GeoLocation location = gpsDir.getGeoLocation();
				if (location == null) {
					LOG.warning("GPS directory present but no GeoLocation found.");
					return ResponseEntity.badRequest().body(null);
				}
				ExifSubIFDDirectory directory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
				String justDate = "";
				if (directory != null) {
					Date date = directory.getDateOriginal();
					SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy");
					justDate = sdf.format(date);
				}
				float[] coordinates = new float[2];
				coordinates[0] = (float) location.getLatitude();
				coordinates[1] = (float) location.getLongitude();
				LOG.info("Extracted coordinates: lat=" + coordinates[0] + ", lon=" + coordinates[1]);
				myDao.createImageLocation(coordinates[0], coordinates[1], justDate);
				ImageMetadata my_meta = new ImageMetadata(coordinates[0], coordinates[1], justDate);
				return new ResponseEntity<>(my_meta, HttpStatus.CREATED);
			} else {
				LOG.warning("No GPS directory found in image metadata.");
				return ResponseEntity.badRequest().body(null);
			}
		} catch(Exception e){
			LOG.log(Level.SEVERE, "Error reading image metadata", e);
			return ResponseEntity.status(500).body(null);
		}
	}
	

	@GetMapping("/extract")
	public ResponseEntity<Set<ImageMetadata>> getCoordinates(){
		LOG.info("GET /extract");
		try {
			Set<ImageMetadata> images = myDao.getAllImageMetadata();
			return new ResponseEntity<>(images, HttpStatus.OK);
		} catch (Exception e) {
			LOG.log(Level.SEVERE, e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/extract")
	public ResponseEntity<Void> deleteCoordinates(){
		try{
			LOG.info("deleting all coordinates");
			myDao.deleteAllCoords();
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			LOG.log(Level.SEVERE, e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
