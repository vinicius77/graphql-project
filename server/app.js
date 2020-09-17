const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

/** Temporally MongoDB Connection */
const db = '';

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Successfully Connect to MongoDB Database'))
  .catch((error) => console.log(`Something Went Wrong: ${error}`));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
