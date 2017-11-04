describe("Song", function() {
    var song;

    beforeEach(function(){
        song = new Song();
    });
    
    it("urlRoot sould be /api/songs", function(){
        expect(song.urlRoot).toEqual("/api/songs");
    });

    it("numberOfPlays attribute should be 0 by default", function(){
        expect(song.get("numberOfPlays")).toEqual(0);
    });

    it("title is required", function(){
        expect(song.isValid()).toBeFalsy();

        song.set("title", "Blue in Green");

        expect(song.isValid()).toBeTruthy();
    });

    it("play should increment the numberOfPlays", function(){
        song.play();

        expect(song.get("numberOfPlays")).toEqual(1);
    });
});