# Book Search Engine Starter Code

To-do:
refactor from RESTful to GraphQl Apollo
Add axios dependency for making https requests with graphql
create env file with mongodb uri

Server structure:
config
models
Bookschema
schemas
index
resolvers
this is where well create the searchBooks, etc. queries with axios
typedefs
seeds
server.js

Client structure:
public
src
pages
utils
mutations
queries - figure out how to make an https query
app
index.js

Server-side to-dos

Server.js
Need to import Apollo server
import typedegs and resolvers

create a new apolloserver including the resolvers and typedefs
start the apollo server

Schemas
create resolvers
create type defs

Client side to-dos

create axios api calls to google books api

Pages
All pages need to be refactored to use graphql queries

Utils
Remove api util
create mutations
create queries
