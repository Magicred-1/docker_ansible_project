FROM node:18-alpine AS ts-builder

ENV PORT=$PORT_WEB

# Créer le dossier /app
RUN mkdir -p /usr/src/app

# Copier les fichiers du dossier files dans le dossier /app
COPY ./docker_images/web/files .

# Définir le dossier de travail par défaut
WORKDIR /usr/src/app

RUN npm install --omit=dev

# Exposer le port en argument d'environnement
EXPOSE $PORT

FROM node:18-alpine AS ts-runtime

# Définir les arguments d'environnement
ENV PORT=$PORT_WEB

COPY --from=ts-builder /usr/src/app/dist /usr/src/app/dist

# Définir le dossier de travail par défaut
WORKDIR /usr/src/app


# Lancer l'application sur le port avec Node
CMD ["npm", "run", "start"]
