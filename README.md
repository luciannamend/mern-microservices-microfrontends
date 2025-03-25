## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB (if using a local database)
- Git (optional for cloning the repository)

## Environment Variables

Before running the application, you need to create the **`.env`** file in each microservice with the following variables:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## Installation and Setup

**1. Clone the Repository**

git clone <repository_url>
cd <repository_directory>

**2. Set Up Microservices**

Each microservice should be set up individually. Navigate to each microservice directory and run the following commands:

npm init -y   # Initialize the project (if not already initialized)
npm install   # Install dependencies

**3. Run Microservices**

After installing dependencies, run each microservice:

node .\server.js  # Check the sever file name

**4. Set Up Microfrontends**

Similar to microservices, navigate to each microfrontend directory and run:

npm init -y   # Initialize the frontend project (if not already initialized)
npm install   # Install dependencies

**5. Build and Run Microfrontends**

After installing dependencies, build and preview each microfrontend:

npm run build  # Build the frontend
npm run preview  # Run the frontend in preview mode

**6. Running the Full Application**

Ensure that all microservices and microfrontends are running properly. Access the application via the provided URLs.


