package com.example.api;
import java.util.Objects;

public class ImageMetadata{
    private float latitude;
    private float longitude;
    private String date; 

    public ImageMetadata(float latitude, float longitude, String date) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public String getDate() {
        return date;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
	public boolean equals(Object o){
		if (this == o){
			return true;
		}
		if (!(o instanceof ImageMetadata)){
			return false;
		}
		ImageMetadata other = (ImageMetadata) o;
		return Float.compare(this.latitude, other.latitude) == 0 && Float.compare(this.longitude, other.longitude) == 0 && this.date.equals(other.date);
	}

    @Override
    public int hashCode(){
        return Objects.hash(latitude, longitude, date);
    }
}