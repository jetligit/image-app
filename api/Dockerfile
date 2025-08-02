# Use an official Java image as the base
FROM eclipse-temurin:17-jdk

# Set the working directory in the container
WORKDIR /app

# Copy your built JAR file into the container
COPY target/*.jar app.jar

# Expose the port your Spring Boot app runs on (default is 8080)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
