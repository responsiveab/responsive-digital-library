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
2. Clone the project repository and navigate to the root directory.
3. Run Docker Desktop
4. Build the Docker image and start the containers:

```shell
docker-compose up --build
```

5. When it is done building, create an account.
   Go to root directory and run:

```shell
chmod +x admin_setup.sh
./admin_setup.sh
```

6. Follow the script to create an account. Note: admin account don't have special priveleges (yet).
7. Access the application in your web browser at http://localhost:3000 and login with your credentials.

## Below are helpful documents for the project

### [Docker install](DOCKER-INSTALL.md)

### [Workflow](WORKFLOW.md)

### [Docker troubleshooting](DOCKER-TROUBLESHOOTING.md)

### [License](LICENSE)

### [Unit testing guide](UNIT-TEST-GUIDE.md)

## License

The Responsive Digital Library is open-source software released under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the license.
