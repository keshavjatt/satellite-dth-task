import swaggerUi from 'swagger-ui-express'
import express from 'express';
import YAML from 'yamljs';
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import channelRoutes from './routes/channelRoutes';
import packageRoutes from './routes/packageRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import { credentials } from './constants';
import { errorHandler } from './errorHandlers/globalErrHandler'
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/index';

export const app = express();

app.use(cors());
app.use(express.json());

//Swagger Setup
const swaggerDocs = YAML.load('src/swagger/Dth_Task.postman_collection.json-OpenApi3Yaml.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//GraphQL Setup
app.use('/graphql', graphqlHTTP({ schema, graphiql:true }))

//Database Conne
AppDataSource.initialize().then(()=> {
    app.listen(credentials.PORT, ()=> {
    console.log(`Server is running on PORT ${credentials.PORT}`)
    console.log("Connected to the MySQL DB")
})
}).catch((error)=>{
    console.log(error)
})

//global error handlers
app.use(errorHandler)

//routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/package", packageRoutes)
app.use("/api/v1/channel", channelRoutes)
app.use("/api/v1/subscription", subscriptionRoutes);