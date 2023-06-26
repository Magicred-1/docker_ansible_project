FROM ubuntu as builder

# Installer NodeJS
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Installer Yarn
RUN npm install -g yarn

# Installer NextJS
RUN yarn global add next

# Copier les fichiers du dossier files dans le dossier /app
COPY files /app

# Launch nextjs
EXPOSE 3000
CMD ["yarn", "dev"]

