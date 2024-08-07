import { ApolloServer, gql } from 'apollo-server-micro';

// const apolloServer = new ApolloServer({
//     introspection: true,  // Allow introspection in non-production environments
// });

// const startServer = apolloServer.start();
  
const helloWorld = () => {
    return (<>
        hello bad bitches
    </>);
}

export default helloWorld;