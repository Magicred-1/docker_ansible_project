FROM ubuntu:latest

# Installer NodeJS
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Créer le dossier /app
RUN mkdir /app

# Définir le dossier de travail par défaut
WORKDIR /app

# Copier les fichiers du dossier files dans le dossier /app
COPY ./docker_images/web/files /app

# Installer les dépendances du projet provenant du dossier /files en local
RUN npm i

# Lancer l'application sur le port 3000 avec Yarn
EXPOSE 3000
RUN npm run dev
