const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const { json } = require("express");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
   
});

//POST: de criação de repositório
app.post("/repositories", (request, response) => {
  // TODO
 const { title, url, techs } = request.body;

 const repository = {
  id : uuid(),
  title,
  url,
  techs,
  likes : 0,

 };

 repositories.push(repository);

 return response.json(repository);

});


//UPDATE do repositório
app.put("/repositories/:id", (request, response) => {
 // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repositoriy => repositoriy.id === id);

  if(!repository) {
     return response.status(400).send();
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;
 
  repositories.splice(id,1, repository);

 return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  //console.log(id);

  const repositoryIdx = repositories.findIndex(repositoriy => repositoriy.id === id);

  if(repositoryIdx==-1) {
     return response.status(400).send();
  }
  
  const removed_item = repositories.splice(repositoryIdx,1);
  //console.log(removed_item);
  return response.status(204).send();

});


//rota de likes pois recebe o id do repositório
app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = repositories.find(repositoriy => repositoriy.id === id);

  if(!repository) {
    return response.status(400).send();
  }

  repository.likes++;

  return response.json(repository);

});

module.exports = app;
