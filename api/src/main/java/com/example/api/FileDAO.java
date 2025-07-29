package com.example.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.logging.Logger;
import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class FileDAO {
	private static final Logger LOG = Logger.getLogger(FileDAO.class.getName());

	private ArrayList<ImageMetadata> metadata = new ArrayList<>();
	private ObjectMapper objectMapper;
	private String filename;

	public FileDAO(@Value("${imageMetadata.file}") String filename, ObjectMapper objectMapper) throws IOException {
		this.filename = filename;
		this.objectMapper = objectMapper;
		load();
	}

	public ImageMetadata createImageMetadata(float latitude, float longitude) throws IOException {
		ImageMetadata my_metadata = new ImageMetadata(latitude, longitude);
		metadata.add(my_metadata);
		save();
		return my_metadata;
	}

	public ArrayList<ImageMetadata> getAllImageMetadata() {
		return metadata;
	}

	private void load() throws IOException {
		File file = new File(filename);
		if (file.exists()) {
			ImageMetadata[] MetaArray = objectMapper.readValue(file, ImageMetadata[].class);
			metadata = new ArrayList<>(Arrays.asList(MetaArray));
		}
	}

	private boolean save() throws IOException {
		objectMapper.writeValue(new File(filename), metadata);
		return true;
	}
}
