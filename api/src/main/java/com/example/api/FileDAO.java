package com.example.api;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.logging.Logger;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class FileDAO {
    private static final Logger LOG = Logger.getLogger(FileDAO.class.getName());

    private Set<ImageMetadata> metadata = Collections.synchronizedSet(new HashSet<>());
    private final ObjectMapper objectMapper;
    private final String filename;

    public FileDAO(@Value("${imageMetadata.file}") String filename, ObjectMapper objectMapper) {
        this.filename = filename;
        this.objectMapper = objectMapper;
        try {
            load();
        } catch (IOException e) {
            LOG.warning("Could not load metadata file: " + e.getMessage());
        }
    }

    public ImageMetadata createImageLocation(float latitude, float longitude, String date) throws IOException {
        ImageMetadata myMetadata = new ImageMetadata(latitude, longitude, date);
        synchronized (metadata) { 
            if (!metadata.contains(myMetadata)) {
                metadata.add(myMetadata);
                save();
            }
        }
        return myMetadata;
    }

    public Set<ImageMetadata> getAllImageMetadata() {
        return metadata;
    }

    private void load() throws IOException {
        File file = new File(filename);
        if (file.exists()) {
            ImageMetadata[] metaArray = objectMapper.readValue(file, ImageMetadata[].class);
            synchronized (metadata) {
                metadata.clear();
                metadata.addAll(Arrays.asList(metaArray));
            }
        }
    }

    private boolean save() throws IOException {
        synchronized (metadata) {
            objectMapper.writeValue(new File(filename), metadata);
        }
        return true;
    }

    public boolean deleteAllCoords() throws IOException {
        synchronized (metadata) {
            metadata.clear();
            save();
			load();
        }
        return true;
    }
}

