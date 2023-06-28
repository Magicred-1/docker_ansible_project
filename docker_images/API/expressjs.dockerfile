FROM ubuntu:latest

# Installer NodeJS
RUN apt-get update && apt-get install -y curl

# Installer NodeJS et les dépendances + Typescript
RUN npm install -g yarn express \
mongoose typescript ts-node \
@types/express @types/mongoose \
@types/node dotenv

# Créer le dossier /api
RUN mkdir /api

# Définir le dossier de travail par défaut
WORKDIR /api

# Copier les fichiers du dossier files dans le dossier /api
COPY files /api/

# Installer les dépendances
RUN yarn build

# Lancer l'application sur le port 5000 avec Yarn
EXPOSE 5000
CMD ["yarn", "start"]