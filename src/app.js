// - Producto interno bruto (PIB) -ya
// - Inflación -ya
// - Desempleo -ya
// - Deuda -ya
// - Acciones
// - Moneda
require("./database/db");
const cors = require("cors");
const indicador = require("./database/indicadoresQuery");
const express = require("express");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");
const dotenv=require("dotenv")
const app = express();
dotenv.config()
app.use(cors());
// origin:"http://localhost:3000",
// credentials:true
app.use(express.json());
const port = process.env.PORT;
function cleanYearNames(data) {
  const cleanedData = data.map((row) => {
    const cleanedRow = {};
    Object.keys(row).forEach((key) => {
      const cleanedKey = key.replace(/[pr]/g, ""); // Eliminar letras 'p' y 'r'
      cleanedRow[cleanedKey] = row[key];
    });
    return cleanedRow;
  });
  return cleanedData;
}
app.get("/getIndicadores", async (req, res) => {
  const respuesta = await indicador.getIndicador("");
  // console.log(respuesta[3].datos[0]);
  res.status(200).json(respuesta);
});
app.post("/prediccion", async (req, res) => {
  const { datos } = req.body;
  const predi = {
    datos: datos,
  };
  console.log("vengo del cliente", predi);
  const respuesta = await indicador.Guardar(predi);
  console.log(respuesta);
  res.status(200).send({ message: "se guardo" });
});
var upload = multer({ dest: "uploads/" });
app.post("/read", upload.single("file"), async (req, res) => {
  try {
    if (req.file?.filename == null || req.file?.filename == "undefined") {
      res.status(400).json("NO SE SUBIO EL ARCHIVO");
    } else {
      var filePath = "uploads/" + req.file.filename;
      const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });

      //cambiando nombre de la propiedad año
      // const transformedData = transformYearKeys(excelData.Hoja1);
      // res.status(200).json({ Hoja1: transformedData });
      // console.log(transformedData[0].ano_2005);
      //respuesta normal

      //LEER : DESCOMENTAR LA PORCION DE CODIGO CORRESPONDIENTE AL ARCHIVO DEL INDICADOR A LEER,PARA GUARDARLO EN LA BD
      //EJEMPLO: SI VAS A LEER EL ARCHIVO DONDE ESTAN LOS DATOS DEL PIB, ENTONCES SOLAMENTE DESCOMENTAR EL CODIGO QUE DICE (PIB), LO MISMO PARA LOS DEMAS INDICADORES.
      //RUTA DE ARCHIVOS CON LOS DATOS : src/data
      //------------------------------PIB---------------------------------------

      // console.log("respuesta PIB",{datos: excelData.Hoja1});
      // const respuesta = await indicador.Guardar({datos: excelData.Hoja1});
      // console.log("soy res PIB",respuesta);

      // const cleanedData = cleanYearNames(excelData.Hoja1);
      // console.log(cleanedData);
      // const respuesta = await indicador.Guardar({ datos: cleanedData });
      // console.log("soy res PIB", respuesta);

      //------------------------------------------------------------------------
      //------------------------------INFLACION---------------------------------
      // console.log("respuesta Inflacion",{datos: excelData.Sheet1});
      // const respuesta = await indicador.Guardar({datos: excelData.Sheet1});
      // console.log("soy res INFLA",respuesta);
      //------------------------------------------------------------------------
      //------------------------------DESEMPLEO---------------------------------
      //console.log("respuesta Desempleo", { datos: excelData.Sheet1 });
      //const respuesta = await indicador.Guardar({ datos: excelData.Sheet1 });
      //console.log("soy res DESEMPLEO", respuesta);
      //------------------------------------------------------------------------
      //------------------------------DEUDA-------------------------------------
      // console.log("respuesta Deuda", { datos: excelData.Sheet1 });
      // const respuesta = await indicador.Guardar({ datos: excelData.Sheet1 });
      // console.log("soy res DEUDA", respuesta);
      //------------------------------------------------------------------------
      res.status(200).json({ cleanedData });
      fs.remove(filePath);
    }
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});
app.listen(port, () => {
  console.log(`servidor corriendo en el puerto http://localhost:${port}`);
});
