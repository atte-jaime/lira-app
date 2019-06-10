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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.post('/upload', (req, res, next) => {
  //console.log(req);
  let audioFile = req.files.file;
  
  // Si el archivo falla, colocar .mp3 al final del nombre
  audioFile.mv(`${__dirname}/public/audios/${audioFile.name}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  // Igual aquí  
    res.json({file: `public/audios/${audioFile.name}`});
  });

});

app.post('/analize', (req, res, next) => {
  console.log("Se recibió solicitud");
  
  
  
  let indexR= Math.floor(Math.random() * 2)+1; 
  let element1 = './public/audios/AUDIO'+indexR+'.wav';
  
  const speechToText = new SpeechToTextV1({
    iam_apikey:'bt4XBwSUa9SbbMIQ0nkDRd0Yx-LihQYH7AMZlYCfe25_'
  });

  const recognizeParams = {
    audio: fs.createReadStream(element1),
    content_type : 'audio/wav',
    model: 'es-ES_BroadbandModel',
    word_alternatives_threshold: 0.9,
    keywords: ['prueba'],
    keywords_threshold: 0.5,
  };
  
  let result = speechToText.recognize(recognizeParams)
    .then(speechRecognitionResults => {
      const result = speechRecognitionResults.results[0].alternatives[0].transcript;
      //console.log(result);
      
      res.json(result);
      // console.log({transcript: result});
      return result;
      //console.log(JSON.stringify(speechRecognitionResults, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
      res.status(500).send(err);
    });
    

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


analizeAudio = (sound) => {
  // for (let index = 0; index < 2; index++) {
    // const element = "./public/audios/prueba_audio"+(index+1)+".mp3";
    
    const speechToText = new SpeechToTextV1({
      iam_apikey:'bt4XBwSUa9SbbMIQ0nkDRd0Yx-LihQYH7AMZlYCfe25_'
    });

    const recognizeParams = {
      audio: fs.createReadStream(sound),
      content_type : 'audio/mp3',
      model: 'es-ES_BroadbandModel',
      word_alternatives_threshold: 0.9,
      keywords: ['prueba'],
      keywords_threshold: 0.5,
    };
    
    return speechToText.recognize(recognizeParams)
      .then(speechRecognitionResults => {
        const result = speechRecognitionResults.results[0].alternatives[0].transcript;
        console.log(result);
        return result;
        //console.log(JSON.stringify(speechRecognitionResults, null, 2));
      })
      .catch(err => {
        console.log('error:', err);
      });
  //}
}



app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;