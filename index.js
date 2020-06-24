"use strict";
const db = require("@arangodb").db;
const aql = require("@arangodb").aql;
const createRouter = require("@arangodb/foxx/router");
const joi = require("joi");
const router = createRouter();

module.context.use(router);

// objects CRUD
router
  .post("/collection/:collection/insert/", (req, res) => {
    const data = req.body;
    const colnName = req.pathParams.collection;
    const coln = db._collection(colnName);
    const meta = coln.save(data);
    res.send(Object.assign(data, meta));
  })
  .body(joi.object().required(), "Document to store in the collection")
  .response(joi.object().required(), "Document to stored in the collection");

// create object

// get object

// update object

// delete object

/*
  PatrickHuynh/dharma-codex-db-api
  */
