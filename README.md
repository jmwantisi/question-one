setup your database enviroment variables in the .env file run npm install to install dependencies run "node init.js" to start the app, run "npm start"

endpoint:

POST - /authors/ { first_name, last_name }

GET - /authors/

PATCH - /authors/{id} {first_name, last_name}

DELETE - /authors/{id}

POST - /books/ { name, description, author_id }

GET - /books/

PATCH - /books/{id} {name, description}

DELETE - /books/{id}
