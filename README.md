# api-monitoreo-financiero
tener instalado node.js y mongodb 
para que el servidor funcione instalar las dependencias: npm install
inicar servidor : npm run dev
rutas
GET: http://localhost:4000/getIndicadores
esta ruta nos trae  un array de objetos con la informacion de los indicadores :
- Producto interno bruto (PIB) [0]
- Inflación [1]
- Desempleo [2]
- Deuda [3]
algo asi: [{},{},{},{},{}]
cada objeto dentro del array representa los datos de cada indicador respectivamente 
POST: http://localhost:4000/read
esta ruta nos permite leer y guardar en la base de datos la informacion que se encuentra en los documentos de excel que se encuentran en la carpeta data
