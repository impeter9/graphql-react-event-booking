const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolver/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    //schema
    schema: graphQlSchema,
    //resolver
    rootValue: graphQlResolver,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ns2qt.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
                    ).then(()=>{
                        app.listen(8000);
                    }).catch(err => {
                        console.log(err);
                    });