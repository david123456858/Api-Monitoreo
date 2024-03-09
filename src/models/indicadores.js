const { Schema, model } = require("mongoose");
const indicadores = Schema(
  {
    datos: [],
  },
  { timestamps: true, versionKey: false }
);
const modelIndicadores = model("indicadorres", indicadores);
module.exports = modelIndicadores;
