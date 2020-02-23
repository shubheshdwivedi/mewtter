---
title: 'Instacar Assignment'
disqus: hackmd
---

Mewtter
===
Twitter with cat theme!

## Table of Contents

### Approach

The whole idea was to develop the application in a manner such that the frontend should be agnostic of the backend and vice versa. Entire components of the app can be replaced without affecting other components. 
#### Stack used:
    [MERN]
    -FRONTEND
        - React: for frontend spa
        - Redux: Predictable store management
        - React Bootstrap: Responsive design
    - BACKEND
        - Nodejs: v13, ES6
        - Express framework
        - MongoDB 
        - Mongoose ORM
        - Redis (caching and rate limiting)
        - Morgan & winston (logging)
    

Frontend
---
Frontend is written in hybrid of the ducks design pattern for react-redux. There are mainly three basic functionalities - authentication, tweeting and searching, on the basis of which the application is divided. 

Backend
---
On backend we went for a layered architecture approach, which consists of various modules. I have used mongoose ORM which talks to the database, and submits responses to data layer, i.e. data access objects. Service layer will use data object layer to get data for manipulation or processing, it shall never extract the data by itself. On top of that sits the controller layer, i.e. the routes which are only responsible for accepting a request, asking Service layer to do processing on the requested data and send out response.
I have created indexes for searches, to enable faster searching.

For better visualizations: https://hackmd.io/UQXFba88Q0-22r3AO3Orlw?view

MODEL => DAO => SERVICE => CONTROLLER

Serving app
---

Simply docker-compose up, all the services shall run automatically. 
You need to have the following ports available :
    - 3000 : For react
    - 8000 : For express
    - 27017: Mongo
    - 6379 : Redis
Run the web app on - localhost:3000


                            

