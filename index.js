require('look').start();

var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    api = express(),
    filters = require('./filters');

var errorHandler = function(err, req, res, next) {
  res.status(400);
  res.json({error: "Could not decode request: JSON parsing failed"});
};

api.set('port', (process.env.PORT || 8989));

api.use(compression());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.raw());
api.use(errorHandler);

api.post('/', function(req, res, next) {
  var shows = req.body.payload || [],
      filteredShows = shows
        .filter(filters.filterShowByDrmAndEpisodeCount)
        .map(filters.showProperties);

  res.status(200);
  res.json({"response": filteredShows});
});

api.listen(api.get('port'));
console.log('API running on ' + api.get('port'));