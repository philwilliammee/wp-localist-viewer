import React from "react";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   // createHttpLink,
// } from "@apollo/client";
import Localist from "./localist";
import EventsState from "./js/context/EventState";

// link: 'https://cihmid.lndo.site/graphql',
// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     uri: '/graphql'
//   });

const App = (props) => (
  // <ApolloProvider client={client}>
  <EventsState>
    <Localist {...props} />
  </EventsState>
  // </ApolloProvider>
);

export default App;
