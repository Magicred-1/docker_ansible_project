# Utilisation de l'image officielle MongoDB
FROM mongo:latest

# Arguments personnalisables
ARG db_name
ARG db_user
ARG db_password

# Définition des variables d'environnement
ENV MONGO_INITDB_ROOT_USERNAME=$db_user
ENV MONGO_INITDB_ROOT_PASSWORD=$db_password
ENV MONGO_INITDB_DATABASE=$db_name

# Copie du script d'initialisation de la base de données
COPY init-db.js /docker-entrypoint-initdb.d/

# Exécution du script d'initialisation de la base de données
CMD ["mongod"]