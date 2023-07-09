FROM node:18-alpine AS ts-builder

# Créer le dossier /api
RUN mkdir -p /usr/src/api

# Définir le dossier de travail par défaut
WORKDIR /usr/src/api

COPY ./docker_images/api/files .

# Installer les dépendances du projet provenant du dossier /files en local
RUN npm i --omit=dev

FROM node:18-alpine AS ts-runtime

# Définir les arguments d'environnement
ENV MONGODB_URI=$MONGODB_URI
ENV MONGODB_DB_NAME=$MONGODB_DB_NAME
ENV PORT=$PORT_API

COPY --from=ts-builder /usr/src/api/dist /api/dist

# Définir le dossier de travail par défaut
WORKDIR /api

# Exposer le port 3000
EXPOSE $PORT

# Lancer l'application sur le port 3000 avec Yarn
CMD ["node", "dist/index.js"]

