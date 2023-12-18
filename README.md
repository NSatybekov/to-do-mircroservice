Put a .env file in the root directory 

Build and run the Docker containers. - docker-compose up --build

App available at this endpoint http://localhost:4000
Swagger - http://localhost:4000/api

Register or login to obtain an authentication token.
Copy the token.
Click on the "Authorize" button in Swagger UI.
Enter Bearer and click "Authorize."
You can now use the authenticated endpoints.

PostgreSQL: Database accessible at localhost:5432. 
Data is persisted in the ./db/data directory.
Creds located inside .env file

Project uses @Message pattern and Rabbit MQ to communicate between services
