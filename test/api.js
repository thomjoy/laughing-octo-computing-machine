// Test the filters applied to input

var expect = require('chai').expect,
    filters = require(__dirname + '/../filters'),
    response = require(__dirname + '/sample_request.json');

describe('Filters', function() {
  describe('#filterShowByDrmAndEpisodeCount', function() {
    it('returns shows with DRM and at least one episode', function() {
        var shows = response.payload;
        var filteredShows = shows.filter(filters.filterShowByDrmAndEpisodeCount);
        expect(filteredShows.length).to.equal(7);
    });

    it('handles empty input', function() {
        var shows = [];
        var filteredShows = shows.filter(filters.filterShowByDrmAndEpisodeCount);
        expect(filteredShows).to.be.empty;
    });
  });

  describe('#showProperties', function() {
    it('contains the correct properties', function() {
        var shows = [{
            "country": "UK",
            "description": "What's life like when you have enough children to field your own football team?",
            "drm": true,
            "episodeCount": 3,
            "genre": "Reality",
            "image": {
                "showImage": "http://catchup.ninemsn.com.au/img/jump-in/shows/16KidsandCounting1280.jpg"
            },
            "language": "English",
            "nextEpisode": null,
            "primaryColour": "#ff7800",
            "seasons": [
                {
                    "slug": "show/16kidsandcounting/season/1"
                }
            ],
            "slug": "show/16kidsandcounting",
            "title": "16 Kids and Counting",
            "tvChannel": "GEM"
        }];

        var filteredShows = shows.map(filters.showProperties);
        expect(filteredShows[0]).to.have.property('slug');
        expect(filteredShows[0]).to.have.property('title');
        expect(filteredShows[0]).to.have.property('image');

    });

    it('handles empty input', function() {
        var shows = [];
        var filteredShows = shows.map(filters.filterShowByDrmAndEpisodeCount);
        expect(filteredShows).to.be.empty;
    });
  });
});