//palvelimen portti
const PORT = process.env.PORT || 8081;

var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var path = require("path");
require("dotenv").config();
var mongoose = require("mongoose");
// Määritellään yhteysosoite
var uri = process.env.DB_URI;

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, 'public')));

//Määritetään mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Tehdään uusi mongoose-malli/schema
const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  runtime: Number,
});

//Tehdään mallin mukainen muuttuja
const Movie = mongoose.model(
  "Movie",
  MovieSchema,
  "movies"
);

//Haetaan viisi elokuvaa tietokannasta
app.get("/api/getall", function (req, res, next) {
  Movie.find({}, null, { limit: 5 }, function (err, results) {
    //Jos tapahtuu virhe, palautetaan virhekoodi selaimelle
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    }
    //Tulokset selaimelle
    else {
      console.log(results);
      res.json(results, 200);
    }
  });
});

//Haetaan id:n perusteella elokuva
app.get("/api/:id", function (req, res, next) {
  var id = req.params.id;

  Movie.findById(id, function (err, results) {
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    } else {
      console.log(results);
      res.json(results, 200);
    }
  });
});

//Lisätään elokuva kantaan
app.post("/api/add", function (req, res, next) {
  //Haetaan nimi ja vuosi
  var nimi = req.body.title;
  var vuosi = req.body.year;
  var aika = req.body.runtime;

  //Tehdään uusi elokuva tiedoilla
  const leffa = new Movie({
    title: nimi,
    year: vuosi,
    runtime: aika,
  });

  //Tallennetaan elokuva kantaan
  console.log(leffa);
  leffa.save();

  res.send(
    "Lisätään elokuva: " + req.body.title + " (" + req.body.year + ")",
    200
  );
});

//Muokataan elokuvan vuosilukua
app.put("/api/updateyear/:id", function (req, res, next) {
  //Hankitaan id ja vuosi
  var id = req.params.id;
  var vuosi = req.body.year;
  Movie.findByIdAndUpdate(id, { year: vuosi }, function (err, results) {
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    } else {
      res.json(
        "Vaihdettiin elokuvan " +
          id +
          " vuosiluvuksi: " +
          vuosi,
        200
      );
    }
  });
});

//Vaihdetaan elokuvan nimi
app.put("/api/updatetitle/:id", function (req, res, next) {
  //Hankitaan id ja nimi
  var id = req.params.id;
  var nimi = req.body.title;
  Movie.findByIdAndUpdate(id, { title: nimi }, function (err, results) {
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    } else {
      res.json(
        "Vaihdettiin elokuvan " +
          id +
          " nimeksi: " +
          nimi,
        200
      );
    }
  });
});

//Muutetaan elokuvan kestoa
app.put("/api/updatetime/:id", function (req, res, next) {
  //Hankitaan id ja kesto
  var id = req.params.id;
  var aika = req.body.runtime;
  Movie.findByIdAndUpdate(id, { runtime: aika }, function (err, results) {
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    } else {
      res.json(
        "Vaihdettiin elokuvan " +
          id +
          " kestoksi: " +
          aika,
        200
      );
    }
  });
});

//Poistetaan elokuva id:n perusteella
app.delete("/api/delete/:id", function (req, res, next) {
  var id = req.params.id;
  Movie.findByIdAndDelete(id, function (err, results) {
    if (err) {
      console.log(err);
      res.json("Järjestelmässä tapahtui virhe", 500);
    } else if (results == null) {
      res.json("Ei löytynyt mitään", 200);
    } else {
      res.json("Poistettiin: " + id + " " + results.title, 200);
    }
  });
});

app.listen(PORT, function () {
  console.log("App listening on port 8081");
});
