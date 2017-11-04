var TweetView = Backbone.View.extend({
	tagName: 'li',
	className: 'tweet',
	
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	events: {
		'click #delete': 'onClickDelete',
		'click #expand': 'onClickExpand'
	},

	onClickDelete: function() {
		if(confirm("Are you sure?"))
			this.model.destroy();
			// not removing view since this is just to showcase the testing
	},

	onClickExpand: function() {
		var self = this;
		this.model.fetch({
			success: function() {
				self.$el.append("<div class='details'>" + self.model.get('retweets') + ' retweets</details>');
			},
			error: function() {
			}
		});
	},

	render: function() {
		this.$el.html('<div class="tweet">' + this.model.get('body') + ' <button id="expand"></button><button id="delete"></button></div>');
		
		return this;
	}
});