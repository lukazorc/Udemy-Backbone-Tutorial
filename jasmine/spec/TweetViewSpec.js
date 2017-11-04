describe('TweetView', function() {
	var tweetView, tweet;
    // var view;
    // var model;

	beforeEach(function() {
		tweet = new Tweet();
		tweetView = new TweetView({model: tweet});
		tweetView.render();
	});
	
	it('tagName should be li', function() {
		expect(tweetView.tagName).toEqual('li');
	});
	
	it('className should be tweet', function() {
		expect(tweetView.className).toEqual('tweet');
	});
	
	it('should refresh when model state changes', function() {
		tweet.set('body', 'updated');
		expect(tweetView.$el).toContainText('updated');
	});
	
	describe('when clicking delete', function() {
		it('should display a confirmation box', function() {
			spyOn(window, 'confirm');
			tweetView.$el.find('#delete').click();
			expect(window.confirm).toHaveBeenCalled();
		});
		
		it('should destroy the model if user confirms', function() {
			spyOn(window, 'confirm').and.returnValue(true);
			spyOn(tweet, 'destroy');
			tweetView.$el.find('#delete').click();
			expect(tweet.destroy).toHaveBeenCalled();
		});
	});
	
	describe('when clicking expand', function () {
		it('should load the details if successful', function () {
			spyOn(tweet, "fetch").and.callFake(function(options){
				var data = {
					retweets: 10,
					favorites: 5
				};
				
				tweet.set(data);
				options.success();	
			});
			
			tweetView.$el.find('#expand').click();
			expect(tweetView.$el.find('.details')).toBeDefined();
			expect(tweetView.$el.find('.details')).toContainText('10 retweets');
		});
	});
});
