import pymongo
import pandas as pd
mycliente = pymongo.MongoClient("mongodb://localhost:27017/")

myBd = mycliente["monitoreo"]

mycol = myBd["indicadorres"]

#Vista de datos de inflacion desde mongo
def CargaDatosInflacion():
    x = mycol.find({},{"datos":1,"_id":0})
    x2 = x[1]
    df = pd.DataFrame.from_dict(x2)
    print(df)
# para poder analizar los datos de pib en la base de datos    
def CragarDatosPIB():
    x = mycol.find_one()
    datos = x.get("datos", [1])
    datos_colombia = [dato for dato in datos if dato.get("DEPARTAMENTOS") == "COLOMBIA"]
    df = pd.DataFrame(datos_colombia)
    df.columns = df.columns.astype(str)
    print(df)
