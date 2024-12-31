# Use Eclipse Temurin JDK 22 with Alpine as the base image for the build stage
FROM eclipse-temurin:22-jdk-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven POM file and the source code into the container
COPY pom.xml .
COPY src src
COPY .mvn .mvn
COPY mvnw .

# Ensure the mvnw script is executable
RUN chmod +x mvnw

# Run Maven to build the application
RUN ./mvnw clean package -DskipTests

# Use Eclipse Temurin JRE 22 with Alpine as the base image for the runtime stage
FROM eclipse-temurin:22-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8080

# Set the entry point to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]