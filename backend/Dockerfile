# Etapa 1: Construcción
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Construimos el proyecto
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Usamos un comodín más específico para evitar copiar archivos "original"
COPY --from=build /app/target/aplicacion_de_gestion_de_proyectos-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]