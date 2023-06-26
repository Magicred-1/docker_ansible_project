#!/bin/bash

# Lancer docker-compose avec les arguments de DB
# db_name, db_user, db_password

# Prompt pour le db_name & db_user & db_password
read -p "Entrer le nom de la db: " db_name
read -p "Entrer le nom d'utilisateur de la db: " db_user
read -p "Entrer le mot de passe de la db: " db_password

docker-compose run --rm --service-ports --name tp_docker_ansible tp_docker_ansible $db_name $db_user $db_password
