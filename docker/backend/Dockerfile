# Build stage : we build and package our project
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage : jdk
FROM amazoncorretto:17
ARG PROFILE=dev

# Must be updated always there is change
ARG APP_VERSION=1.0.3

# Copy the .jar file from build folder to app folder
WORKDIR /app
COPY --from=build /build/target/bsn-backend-*.jar /app/

### Expose application port
EXPOSE 8088

# Environment (postgres-bsn = docker container name)
ENV DB_URL=jdbc:postgresql://postgres-bsn:5432/bsndb
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOSTNAME=missing_hostname
ENV EMAIL_USERNAME=missing_username
ENV EMAIL_PASSWORD=missing_password
# ENV EMAIL_PORT=missing_port

# Run the jar file
CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} bsn-backend-${JAR_VERSION}.jar

# Build image by doing this cm : docker build -t bsn/bsn:1.0.0 -f ../docker/backend/Dockerfile .