describe("Album", function() {
  var album;

  beforeEach(function(){
    album = new Album();
  });
  
  it("urlRoot should be /api/songs", function(){
      expect(album.url).toEqual("/api/songs");
  });

  describe("getpopularSongs", function(){
    it("sould return undefined if the sollection is empty", function(){
      expect(album.getPopularSongs()).toBeUndefined();
    });

    it("sould return the song with the highest number of plays if the collection is not empty", function(){
      var song1 = new Song({title: "Blue in Green", numberOfPlays: 10});
      var song2 = new Song({title: "So What", numberOfPlays: 5});

      album.add(song1);
      album.add(song2);

      expect(album.getPopularSongs()).toEqual(song1);
    });
  })  
});