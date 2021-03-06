const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const app = express();
let transcriptedData = [];
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.post('/upload', (req, res, next) => {
  //console.log(req);
  let audioFile = req.files.file;

  // Si el archivo falla, colocar .mp3 al final del nombre
  audioFile.mv(`${__dirname}/public/audios/${audioFile.name}`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    // Igual aquí  
    res.json({
      file: `public/audios/${audioFile.name}`
    });
  });

});

app.post('/analize', (req, res, next) => {
  console.log("Se recibió solicitud");

  const speechToText = new SpeechToTextV1({
    iam_apikey: 'bt4XBwSUa9SbbMIQ0nkDRd0Yx-LihQYH7AMZlYCfe25_',
  });

  const analize = async () => {
    /* const tempTrans = await getTranscript(speechToText,1);
     const tempTrans2 = await getTranscript(speechToText,2); 
     const holi =  [tempTrans,tempTrans2];
     return holi; */
    var datos = [];

    for (let i = 1; i < 10; i++) {
      datos.push(await getTranscript(speechToText, i));
    }
    return datos;
  }

  analize().then(tempTranscript => {
    tempTranscript.forEach(element => {
      var tempData = element.split(",");
      var tempText = tempData[1].split(" ");

      var especieLoc = "";
      var distanciaLoc = "";
      var individuosLoc = "";
      var actividadLoc = "";

      // Posiciones de las variables en el texto transcrito
      for (let i = 0; i < tempText.length; i++) {
        const variable = tempText[i];
        variable === "especie" ? especieLoc = i : null;
        variable === "distancia" ? distanciaLoc = i : null;
        variable === "número" ? individuosLoc = i : null;
        variable === "actividad" ? actividadLoc = i : null;
      }

      // Arreglos con las variables
      var especie = tempText.slice(especieLoc, distanciaLoc);
      var distancia = tempText.slice(distanciaLoc, individuosLoc);
      var individuos = tempText.slice(individuosLoc, actividadLoc);
      var actividad = tempText.slice(actividadLoc);

      // Construcción del dato en formato de objeto
      var datoCompleto = {
        puntoCaptura: 1,
        numAudio: tempData[0],
        especie: especie[especie.length - 1],
        distancia: {
          valor: convertirNum(distancia[1]),
          unidad: distancia[distancia.length - 1]
        },
        individuos: convertirNum(individuos[individuos.length - 1]),
        actividad: actividad[1]
      }

      transcriptedData.push(datoCompleto);


      //console.log("especie en: "+especieLoc + ", distancia en:" + distanciaLoc + ", número de individuos en: " + individuosLoc + ", actividad en: " + actividadLoc);
      console.log("audio num: " + tempData[0] + ", " + tempData[1]);
      console.log(especie, distancia, individuos, actividad);
      console.log(datoCompleto);
      console.log("");

      /* 

      */
      //console.log("audio numero: "+ tempData[0]+", "+tempData[1]);
    });

    //console.log(tempTranscript);

    

    let data = crearNuevosDatos();

    fs.writeFile('./public/data/valores-raw.json', data, (err) => {
      if (err) throw err;
      console.log('Datos escritos');
    });

  });

});

const crearNuevosDatos = () =>{
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  var especie=["azulejo", "canario", "carpintero", "perico", "torcasa"];
  var actividad = ["volando", "reposo", "incubando"];

  for (let i = 0; i < 40; i++) {
    var datoCompleto = {
      puntoCaptura: getRndInteger(2,11),
      numAudio: 0,
      especie: especie[getRndInteger(0, especie.length)],
      distancia: {
        valor: getRndInteger(2,30),
        unidad: "metros"
      },
      individuos: getRndInteger(5,40),
      actividad: actividad[getRndInteger(0,actividad.length)]
    }
    transcriptedData.push(datoCompleto);
  }

  let data = JSON.stringify(transcriptedData, null, 2);
  return data;
}

const convertirNum = (numEscrito) => {
  var numTrans = "";
  var numText = [
    "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete",
    "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés",
    "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho",
    "veintinueve", "treinta"
  ]

  for (let i = 0; i < numText.length; i++) {
    const pos = numText[i];
    if (numEscrito === pos) {
      numTrans = i+1;
    }
  }

  return parseInt(numTrans);
}

const getTranscript = async (speechKey, num) => {
  const audioPath = './public/audios/audio' + num + '.mp3';

  const recognizeParams = {
    audio: fs.createReadStream(audioPath),
    model: 'es-ES_BroadbandModel',
    content_type: 'audio/mp3',
    word_alternatives_threshold: 0.9,
    keywords: ['especie', 'distancia', 'individuos'],
    keywords_threshold: 0.5,
  };

  var transcripcion = await speechKey.recognize(recognizeParams)
    .then(speechRecognitionResults => {
      var temp = num + "," + speechRecognitionResults.results[0].alternatives[0].transcript;
      return temp;
      //transcriptedData.push(temp);
      //console.log("num: " + num + " " + temp);
      //console.log(JSON.stringify(speechRecognitionResults, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });

  return transcripcion;

}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;