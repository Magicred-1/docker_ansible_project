FROM ubuntu:latest

# Installer NodeJS
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Installer Yarn
RUN npm install -g yarn

# Créer le dossier /app
RUN mkdir /app

# Définir le dossier de travail par défaut
WORKDIR /app

# Copier les fichiers du dossier files dans le dossier /app
COPY files /app

# Installer les dépendances
RUN yarn

# Lancer le build
RUN yarn build

# Launch nextjs
EXPOSE 3000
CMD ["yarn", "start"]
