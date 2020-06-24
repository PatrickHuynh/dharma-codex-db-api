"use strict";
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
    res.send(
      `${req.pathParams.name.toLowerCase().replace(" ", "_")}, ${
        req.pathParams.name
      }, ${req.pathParams.definition}`
    );
  })
  .pathParam("name", joi.string().required(), "Object name.")
  .pathParam("definition", joi.string().required(), "Object definition.")
  .response(["text/plain"], "A personalized greeting.")
  .summary("Inserts object into objects")
  .description("Inserts an object with user specified name and definition.");
