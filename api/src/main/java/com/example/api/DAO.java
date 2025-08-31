package com.example.api;
import java.util.ArrayList;
import java.io.IOException;
import com.example.api.ImageMetadata;

public interface DAO {
    ArrayList<ImageMetadata> getAllImageMetadata();
    ImageMetadata createImageLocation(float latitude, float longitude, String date) throws IOException;
    boolean deleteAllCoords() throws IOException;
}

