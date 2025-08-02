# ---------- STAGE 1: Build ----------
    FROM maven:3.8.5-openjdk-17 AS build

    # Set working directory
    WORKDIR /app
    
    # Copy the pom and source files
    COPY . .
    
    # Package the app (skip tests to speed up build)
    RUN mvn clean package -DskipTests
    
    # ---------- STAGE 2: Run ----------
    FROM eclipse-temurin:17-jdk
    
    # Set working directory
    WORKDIR /app
    
    # Copy the JAR from the build stage
    COPY --from=build /app/target/*.jar app.jar
    
    # Expose the default Spring Boot port
    EXPOSE 8080
    
    # Run the application
    ENTRYPOINT ["java", "-jar", "app.jar"]
    