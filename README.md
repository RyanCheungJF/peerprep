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

<br>

![](/docs/peerprep.jpg)

## What is PeerPrep?

Technical interviews are hard.

They're even harder when you do them alone.

PeerPrep aims to solve this by allowing you to simulate interviews and collaborate real time with your peers!

Take a sneak peek at our collaboration space down below:

![](/docs/collab.jpg)

## PeerPrep Architecture

PeerPrep is a microservices web application built with the latest tech stack. 
If you want to take a look at our architecture and other design considerations, 
do check out our report below!

## Accessing our website
Our website is hosted online with [DigitalOcean](https://www.digitalocean.com/) and can be accessed by clicking [here](http://www.peerprep.me).

## Running the repository locally

### Pre-requisites

You are able to run our application locally.
However, to do so, you will require the `.env` file for each backend microservices in order to connect to MongoDB.

Kindly obtain the `.env` file from a project member if you wish to run the application locally.

The fields needed in our `.env` file is given as such, please double check to see that you have all necessary fields.
```
ENV={...}
DB_CLOUD_URI={...}
TOKEN_SECRET={...}
```
Insert the `.env` file into the root of the folders `user-service`, `matching-service`, `collaboration-service`, `question-service` and `review-service`.

### Setting up

1. Clone the repository.
2. Once cloned, add the respective `.env` files into the root of each microservice.
3. Start a redis instance running on port 6379
4. Run the following in the root of each microservice to install dependecies.

   More specifically, in the folders `frontend`, `user-service`, `matching-service`, `collaboration-service`, `question-service` and `review-service`.
    ```
    npm i
    ```
5. Spin up the individual microservices by running the commands in the root of each microservice.
    ```
    // for frontend
    npm start

    // for other services
    // i.e user, matching, collaboration, question, review
    npm run dev
    ```
### Report
Our project report can be found [here](/docs/35-FinalReport.pdf).
