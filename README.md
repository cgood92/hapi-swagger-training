# hapi-swagger-training

_Swagger - a way to find Hapi-Nes and Joi_

## What is this project?

This project is simply a demo built to train about some tools available to build an API using Node.js. The master branch contains the finished product. Branches are used to create a sequence of tagged commits, in order to follow along a specific training outline.

## How to get setup

This project consists of a client, and an API. Both will need to be properly set up, and ran independently of each other in separate terminal windows or tabs.

**Firebase**

You will need to setup your own Firebase instance, and store a local copy of the key/credentials needed to access your instance.

There is a video showing how to do this here: []()

Instructions can be found here:

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/). 
2. Click on “Create New Project”. Follow instructions to complete setup. 
3. Go to the console for the database you just set up. 
4. Project Settings &gt; Service Accounts &gt; Generate New Private Key 
5. Edit the private key that has been downloaded to your computer. For the sake of the way this project was set up, please edit the file to look like this: 

```
    {
        "key": {
            "type": "service_account",
            "project_id": "...",
            "private_key_id": "...",
            "private_key": "-----BEGIN PRIVATE KEY-----]
            ...
            -----END PRIVATE KEY-----\n",
            ... 
        },
        "databaseURL": "https://your-app-uri.firebaseio.com/"
    }
```

We are enclosing the key inside of a first-child node of the root, and adding a new node (also first-child node of the root) of `databaseURL`.

**API**

*Prerequisite: setup a Firebase instance

To install the API, `cd` into the `api/` directory.  Run the following commands:

```
    # first time only
    /api$ > npm i
    /api$ > npm run init
    
    # to run.  Make sure that you have nodemon installed before running (`npm i -g nodemon`)
    /api$ > npm start
```

Your API will be running on the host and port: [http://localhost:7777/](http://localhost:7777/).

**Client**

To install the client, `cd` into the `client/` directory.  Run the following commands:

```
    # first time only
    /client$ > npm i
    
    # to run
    /client$ > npm run dev
```

Your API will be running on the host and port: [http://localhost:3000/](http://localhost:3000/).

## Available trainings

1. [UtahJS training](https://github.com/cgood92/hapi-swagger-training/tree/utahjs) 

## Other

- [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)