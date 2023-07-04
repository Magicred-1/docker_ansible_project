FROM ubuntu:latest

# Définir les arguments d'environnement
ENV MONGODB_URI=$MONGODB_URI
ENV MONGODB_DB_NAME=$MONGODB_DB_NAME
ENV PORT=$PORT_API

# Installer NodeJS
RUN apt-get update && apt-get install -y curl nodejs npm git

# Créer le dossier /api
RUN mkdir /api

# Définir le dossier de travail par défaut
WORKDIR /api

# Copier les fichiers du dossier files en local dans le dossier /api
COPY ./docker_images/api/files /api

WORKDIR /api

# Installer les dépendances
RUN npm i

# Lancer le build
RUN npm run buildandrun
