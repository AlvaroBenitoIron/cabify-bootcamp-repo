const express = require("express");

const cors = require("cors");

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors()
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
