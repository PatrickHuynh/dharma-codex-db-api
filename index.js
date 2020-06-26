"use strict";
const db = require("@arangodb").db;
const { query } = require("@arangodb");
const aql = require("@arangodb").aql;
const createRouter = require("@arangodb/foxx/router");
const joi = require("joi");
const router = createRouter();

module.context.use(router);

// general object insert function
const insertDocument = (collection, document) => {
  const coln = db._collection(collection);
  const meta = coln.save(document);
  return meta;
};

// objects CRUD
// create object
router
  .post("/insert/:collection/", (req, res) => {
    const document = req.body;
    const collectionName = req.pathParams.collection.toLowerCase();
    const meta = insertDocument(collectionName, document);
    res.send(Object.assign(document, meta));
  })
  .body(joi.object().required(), "Document to store in the collection")
  .pathParam("collection", joi.string().required(), "Collection name")
  .response(joi.object().required(), "Document to stored in the collection")
  .summary("Creates a document")
  .description("Creates a document in the collection by key.");

// get object
router
  .get("/listAll/:collection", (req, res) => {
    try {
      const collectionName = req.pathParams.collection.toLowerCase();
      const result = query`
        for d in ${collectionName} return d
        `.toArray();
      res.send(data);
    } catch (e) {
      if (!e.isArangoError || e.errorNum !== DOC_NOT_FOUND) {
        throw e;
      }
      res.throw(404, "The entry does not exist", e);
    }
  })
  .pathParam("collection", joi.string().required(), "Collection name")
  .response(joi.array().required(), "Array of documents from the collection.")
  .summary("Retrieves all documents")
  .description("Retrieves all documents from the collection.");

// get object
router
  .get("/get/:collection/:key", (req, res) => {
    try {
      const collectionName = req.pathParams.collection.toLowerCase();
      const key = req.pathParams.key.toLowerCase().replace(" ", "_");
      const data = db._collection(collectionName).document(key);
      res.send(data);
    } catch (e) {
      if (!e.isArangoError || e.errorNum !== DOC_NOT_FOUND) {
        throw e;
      }
      res.throw(404, "The entry does not exist", e);
    }
  })
  .pathParam("collection", joi.string().required(), "Collection name")
  .pathParam("key", joi.string().required(), "Key of document in collection")
  .response(joi.object().required(), "Document to stored in the collection")
  .summary("Retrieve an entry")
  .description("Retrieves an entry from the collection by key.");

// update object

// delete object

/*
  PatrickHuynh/dharma-codex-db-api
  */
