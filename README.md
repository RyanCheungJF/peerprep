# PeerPrep

## Developed with :heart: in:

<p align="center">
   <span>
      <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" width="45px" alt="react" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" width="45px" alt="mui" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-plain.svg" width="45px" alt="tailwind" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg" width="45px" alt="nodejs" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original-wordmark.svg" width="45px" alt="mongodb" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/redis/redis-original-wordmark.svg" width="45px" alt="redis" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/socketio/socketio-original.svg" width="45px" alt="socketio" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original-wordmark.svg" width="45px" alt="docker" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/digitalocean/digitalocean-original-wordmark.svg" width="45px" alt="digitalocean" />
   </span>
</p>

## Accessing our website
Our website is hosted online with [DigitalOcean](https://www.digitalocean.com/) and can be accessed by clicking [here](http://www.peerprep.me).

## Running the repository locally
You are able to run our application locally. 
However, to do so, you will require the `.env` file for each respective microservices in order to connect to MongoDB.

Kindly obtain the `.env` file from a project member if you wish to run the application locally.

1. Clone the repository.
2. Once cloned, add the respective `.env` files into the root of each microservice.
3. Run the following in the root of each microservice to install dependecies.
    ```
    npm i
    ```
4. Spin up the individual microservices by running the commands in the root of each microservice.
    ```
    // for frontend
    npm start

    // for other services
    npm run dev
    ```
