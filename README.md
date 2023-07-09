# docker_ansible_project

## Description
This project is a containerized Docker project that can be used to deploy a three projects that depends on each other. The project is composed of three containers: a web server, a database server and an API. 

The web server is a NextJS website that displays datas from the API. 

The API is a simple API that display datas from the database server about a Car Carsitting company.

The database server is a MongoDB database that contains datas about the Car Carsitting company and its users used by the API.

## How to use
To use this project, you need to have Docker installed on your machine.

To start the project, you need to run the following command:
```bash
    docker-compose up
```

To stop the project, you need to run the following command:
```bash
    docker-compose down
```

## How to access the project
To access the project, you need to go to the following URL: http://localhost:80

## How to access the API
To access the API, you need to go to the following URL: http://localhost:5000



