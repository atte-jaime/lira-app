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

  const analize = async() => {
   /* const tempTrans = await getTranscript(speechToText,1);
    const tempTrans2 = await getTranscript(speechToText,2); 
    const holi =  [tempTrans,tempTrans2];
    return holi; */

    for (let i = 1; i < 7; i++) {
      getTranscript(speechToText,i);
    }

  } 

  analize().then(temp => console.log(temp));
  
});

const getTranscript = async(speechKey, num) =>{
  const audioPath = './public/audios/audio'+num+'.mp3';

  const recognizeParams = {
    audio: fs.createReadStream(audioPath),
    model: 'es-ES_BroadbandModel',
    content_type: 'audio/mp3',
    word_alternatives_threshold: 0.9,
    keywords: ['especie', 'distancia', 'individuos'],
    keywords_threshold: 0.5,
  };

  speechKey.recognize(recognizeParams)
    .then(speechRecognitionResults => {
      var temp= speechRecognitionResults.results[0].alternatives[0].transcript;
      transcriptedData.push(temp);
      console.log("num: "+num+" "+temp);
      //console.log(JSON.stringify(speechRecognitionResults, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });


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