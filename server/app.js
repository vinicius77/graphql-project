const express = require("express")
const {graphqlHTTP} = require("express-graphql")

const app = express()

app.use("/graphql", graphqlHTTP({}))

const PORT = 4000 || process.env.PORT

app.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`)})

