# Responsive Digital Library

Responsive Digital Library is a web application that allows users to manage their organisation's (or personal) book collections. It provides features such as adding, removing, and categorizing books, loaning and creating reading lists, and fast search functionality. The library is built using the MERN stack (MongoDB, Express, React, and Node) and can be easily deployed using Docker.

## Features

-   **Add and Remove Books**: Users can add books and e-books to their library by providing the ISBN. If a book is not found in the database, users have the option to manually add the book's information.
-   **Tag System**: Categorize books with tags for easy organization and retrieval.
-   **Loan and Reading List**: Mark books as loaned or add them to the reading list to keep track of reading progress.
-   **Profile Page**: View all the books in your collection, including loaned books and books on the reading list.
-   **Fast Search**: Quickly search for books by name, ISBN, tags, and other relevant information.
-   **Easy setup using Docker**.

## Technologies Used

The [Responsive] Digital Library is built using:

-   **MongoDB**: A NoSQL database for storing book information, user data, and library-related data.
-   **Express**: A web application framework for Node.js that handles server-side logic and routing.
-   **React**: A JavaScript library for building user interfaces, used for creating client-side components and views.
-   **Node.js**: A JavaScript runtime environment for server-side development and running the Express application.
    to start all the containers in development mode, simply run following command in your favorite terminal:

## Getting started

To run the project locally, it's easiest with Docker Desktop app:

1. Install Docker on your machine: [Install Docker Desktop](https://www.docker.com/products/docker-desktop/).
1. Clone the project repository and navigate to the root directory.
1. Run Docker Desktop
1. Build the Docker image and start the containers:

```shell
docker compose up --build
```

5. When it is done building, create an account.
   Go to root directory and run:

```shell
./user_setup.sh
```

6. Follow the script to create a user account. Note: there are no admin accounts with special priveleges (yet).
7. Access the application in your web browser at http://localhost:3000 and login with the credentials you just created.

## Development

The day-to-day cycle for shipping a change:

1. **Edit locally**, then run the dev stack to verify:

    ```shell
    docker compose up --build
    ```

    React hot-reloads at <http://localhost:3000>, server via nodemon at port 8080. Debug from VS Code with the included launch configuration (Node inspector on `:9229`).

2. **(Optional) Verify the prod-shape image locally** before pushing:

    ```shell
    docker compose -f docker-compose.build.yml up --build -d
    ```

    Same self-contained image CI builds, served at <http://localhost:8082>.

3. **Push** to `main`. GitHub Actions builds and pushes a multi-arch `responsiveab/responsive-digital-library:latest` to Docker Hub.

4. **Pull on staging** to verify the published image on this machine:

    ```shell
    cd ~/Utveckling/responsive-digital-library-staging
    docker compose pull && docker compose up -d
    ```

5. **Deploy to prod** once staging looks good. SSH to lima, then in `/home/responsive/dockers/responsive-digital-library`:

    ```shell
    docker compose pull && docker compose up -d
    ```

### Environment setup

Each environment needs a `.env` file next to its `docker-compose.yml` with at minimum:

```
TOKEN_KEY=<openssl rand -hex 32>
```

See `.env.example`. Rotating `TOKEN_KEY` invalidates every active session.

### Operator scripts

Run from the directory containing the active `docker-compose.yml`:

-   `user-setup.sh` — register a new user
-   `reset-password.sh` — set a new password for an existing user
-   `delete-user.sh` — remove a user (their next API call clears their browser session)
-   `migrate-covers.sh` — one-shot conversion of legacy URL covers to embedded data URLs

### [Docker install](DOCKER-INSTALL.md)

## License

### [License](LICENSE)

The Responsive Digital Library is open-source software released under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the license.
