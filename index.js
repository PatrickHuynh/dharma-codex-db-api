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
