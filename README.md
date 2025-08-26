# S3 Project

This project is part of an assignment for 3rd semester of the ICT bachelor programme at the
Hogeschool Utrecht, University of Applied Sciences.

## Starting the Project

To start the application for development you will need to create a database, start the backend service, 
and then start the frontend.

TLDR (in separate terminals):

```bash
docker compose up -d
```

```bash
cd backend
./mvnw spring-boot:start
```

```bash
cd frontend
npm install
npm run dev
```

### Database

Development is easiest with [Docker](https://docs.docker.com/desktop/). On Windows it is recommended to use
[WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) as backend for Docker.
If Docker is installed, you can start the database by executing `docker compose up` from the commandline 
(or `docker compose up -d` to run it in the background), while the current directory is the root of this project.

Docker will then start a PostgreSQL container, based on the official PostgreSQL image, with
the configuration stated in the `docker-compose.yml` and in the `database folder`.

### Backend

The Backend Web API is a Spring Boot application written in Java. It uses Maven as build tool and dependency manager.
For [Maven](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html),
you can use your IDE, install it [globally](https://maven.apache.org/download.cgi),
or use the supplied `mvnw` or `mvnw.cmd`.

Start the application via your IDE by running the `BackendApplication` class. 
Alternatively, run `mvn spring-boot:start` on the commandline.

### Frontend

The Frontend is a Lit-Element application written in plain Javascript. It uses npm as package manager.
To start the frontend, navigate to the `frontend` folder and run `npm install` to install the dependencies.
Then run `npm start` to start a development server. The application will be available at `http://localhost:5173`.

