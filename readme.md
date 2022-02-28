## Requirements
- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)

## Back End
1. Clone the repository.
1. Start the containers by running `docker-compose up -d` in the project root.
1. Install the composer packages by running `docker-compose exec laravel composer install`.
1. Create the table by running `docker-compose exec laravel php artisan migrate`.


Note that the changes you make to local files will be automatically reflected in the container. 

## Frontend
1. Step into the `frontend/` directory.
2. Install dependencies by running `npm install`.
3. Start the application by running `npm start`.
4. The app will be visible at `localhost:3000`.

Note: to point the Frontend to the location of the Backend the variable `baseUrl` in the `frontend\src\hooks\useBooks.ts` should be modified accordingly.
