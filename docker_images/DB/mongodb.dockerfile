# Utilisation de l'image officielle MongoDB
FROM mongo:latest

# Définition des variables d'environnement
ENV MONGO_INITDB_ROOT_USERNAME=$MONGODB_DB_USERNAME
ENV MONGO_INITDB_ROOT_PASSWORD=$MONGODB_DB_PASSWORD
ENV MONGO_INITDB_DATABASE=$MONGODB_DB_NAME

# Copie du script d'initialisation de la base de données
COPY ./docker_images/db/init_db.js /docker-entrypoint-initdb.d/

# Exécution du script d'initialisation de la base de données
CMD ["mongodb"]