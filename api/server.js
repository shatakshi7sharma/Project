'use strict';

const Hapi = require('@hapi/hapi');
const userControllers = require('./Models/Users/userControllers');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost',
        routes: {
            cors: {
                credentials: false,
                origin: 'ignore',
                headers: ['Authorization', 'Content-Type', 'If-None-Match']
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/signup',
        handler: userControllers.signup
    });

    server.route({
        method: 'POST',
        path: '/login',
        handler: userControllers.login
    });


    const start = async function () {
        try {
            await server.register({
                plugin: require('hapi-cors'),
                options: {
                    origins: ['http://localhost:4000']
                }
            });
            await server.start();
            console.log('server started');
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    };

    start();


    //await server.start();

    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err));
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();