module.exports = {
  filterShowByDrmAndEpisodeCount: function(show) {
    return show.drm && show.episodeCount > 0;
  },

  // short circuit operators added as not clear whether properties
  // would always exists on show object
  showProperties: function(show) {
    var props = [];
    return {
      image: show.image.showImage || "",
      slug: show.slug || "",
      title: show.title || ""
    };
  }
};