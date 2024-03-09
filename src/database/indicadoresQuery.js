const modelIndicadores = require("../models/indicadores");

const Guardar = async (indicador) => {
  try {
    const res = await modelIndicadores.create(indicador);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
const getIndicador = async () => {
    try {
      const res = await modelIndicadores.find({});
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };
module.exports = {Guardar,getIndicador};
