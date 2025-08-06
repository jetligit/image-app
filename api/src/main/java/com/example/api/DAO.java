package com.example.api;
import java.util.ArrayList;
import java.io.IOException;
import com.example.api.ImageMetadata;

public interface DAO {
    ArrayList<ImageMetadata> getAllImageMetadata();
    ImageMetadata createImageMetadata(float latitude, float longitude) throws IOException;
    boolean deleteAllCoords() throws IOException;
}

