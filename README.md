# Ételfutár weboldal

A feladat specifikációja a pdf fájlban olvasható.

Szükséges hozzá egy localhoston futó mysql szerver. A db elérési útját tegyük egy .env nevű fájlba DB_PATH néven. A kosár mérete szintén a .env fájblan konfigurálható MAX_CART_SIZE néven. A szerver indulásakor mindig újraépíti az adatbázist.


~~~~ 
$ npm install
~~~~
Nodemonnal futtatás :
~~~~
$ npm run dev
~~~~
Tesztek futtatása :
~~~~
$ npm test
~~~~

