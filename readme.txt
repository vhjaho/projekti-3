Projekti 3

Ohjelma hakee tietoja elokuvista mongoosesta. Mongodb:n uri on env-tiedostossa.
Reitit toimivat seuraavasti: 
-hakee viiden ensimmäisen elokuvan tiedot
-hakee id:n perusteella tiedot
-lisää uuden elokuvan, bodyyn määritettävät muuttujat: title(string), year(number), runtime(number)
-id:n perusteella vaihtaa elokuvan vuosiluvuksi bodyyn määritetyn arvon: year
-sama kuin edellinen, mutta vaihdettava arvo on elokuvan nimi: title
-sama kuin edellinen, mutta arvo on elokuvan kesto: runtime
-poistaa id:n perusteella elokuvan