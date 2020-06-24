"use strict";
const db = require("@arangodb").db;
const aql = require("@arangodb").aql;
const createRouter = require("@arangodb/foxx/router");
const joi = require("joi");
const router = createRouter();

module.context.use(router);

router
  .get("/hello-world", function (req, res) {
    res.send("Hello World!");
  })
  .response(["text/plain"], "A generic greeting.")
  .summary("Generic greeting")
  .description("Prints a generic greeting.");

router
  .get("/hello/:name", function (req, res) {
    res.send(`Hello ${req.pathParams.name}`);
  })
  .pathParam("name", joi.string().required(), "Name to greet.")
  .response(["text/plain"], "A personalized greeting.")
  .summary("Personalized greeting")
  .description("Prints a personalized greeting.");

router
  .get("/insert/objects/:name/:definition", function (req, res) {
    let obj = {
      _key: `${req.pathParams.name.toLowerCase().replace(" ", "_")}`,
      name: `${req.pathParams.name}`,
      definition: `${req.pathParams.definition}`,
    };
    db._collection("objects").save(obj);
    res.send(obj);
  })
  .pathParam("name", joi.string().required(), "Object name.")
  .pathParam("definition", joi.string().required(), "Object definition.")
  .response(["application/json"], "The object inserted.")
  .summary("Inserts object into objects")
  .description("Inserts an object with user specified name and definition.");

router
  .post("/objects/insert/", (req, res) => {
    const data = req.body;
    let coln = db._collection("objects");
    const meta = coln.save(data);
    res.send(Object.assign(data, meta));
  })
  .body(joi.object().required(), "Document to store in the collection");

/*
  PatrickHuynh/dharma-codex-db-api
  */
