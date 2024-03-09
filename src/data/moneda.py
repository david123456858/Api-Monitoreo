
import json
data = {
  "success": True,
  "terms": "https://currencylayer.com/terms",
  "privacy": "https://currencylayer.com/privacy",
  "timestamp": 1698783123,
  "source": "USD",
  "quotes": {
    "USDEUR": 0.93297,
    "USDGBP": 0.822905,
    "USDCAD": 1.386825,
    "USDPLN": 4.21065
  }
}

# Tasa de cambio de USD a EUR
usd_to_eur = data["quotes"]["USDEUR"]
# Invierte la tasa de cambio para obtener EUR a USD
eur_to_usd = 1 / usd_to_eur
print ("tasa de cambio euro a dolar",eur_to_usd)
# Solicitar al usuario la cantidad en dólares
eur = float(input("Ingresa la cantidad en euros: "))
# Realizar la conversión a dolares
dolar = eur * eur_to_usd
print(f"{eur} euros son equivalentes a {round(dolar, 2)} dolares")
