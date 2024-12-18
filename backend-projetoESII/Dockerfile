FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -X
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21
WORKDIR /app
COPY --from=build /app/target/*.jar ./app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./app.jar"]


# etapa de package
#FROM maven:3.9.9-eclipse-temurin-11 AS build
#WORKDIR /app
#COPY pom.xml .
#COPY src /src
#RUN mvn clean package

# etapa de execução
#FROM eclipse-temurin:21
#COPY --from=build /app/target/*.jar /app/app.jar
#WORKDIR /app
#EXPOSE 8080
#CMD ["java", "-jar", "app.jar"]


##comandos docker

#build
#docker build -t my-app-image .

#roda o container my-container da imagem my-app-image
#docker run -d -p portadesaida:portaquetarodando --name my-container my-app-image

#lista os containers que estao rodando
#docker ps

#para o container
#docker stop my-container

#remove o container
#docker rm my-container

#remove a imagem
#docker rmi my-app-image

##comandos para repositorio

#login
#docker login -u user

#build user to repo
#docker build -t my_user/my_app_image:v1.0.0 .

#run image container (source-port:dest-port)
#docker run -d -p 80:80 --name my-container my_user/my_app_image:v1.0.0

#push image to repo
#docker push my_user/my_app_image:v1.0.0

#pull repo image
#docker pull my_user/my_app_image:v1.0.0

#remove image
#docker rmi my_user/my_app_image:v1.0.0


#reiniciar para atualizar
#docker build -t minha-aplicacao .
# docker stop meu-container
# docker rm meu-container
# docker run -d --name meu-container -p 8080:8080 minha-aplicacao
