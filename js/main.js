
var Vehicle = Backbone.Model.extend({
    idRegNumber: 'registrationNumber' ,
    urlRoot: '/api/vehicle',
    start: function() {
        return 'Vehicle started';
    },
    validate: function(attrs){
        if (!attrs.registrationNumber)
            return 'Registration number is required.';
    }
});

var Car = Vehicle.extend({
    // initialize: function() {
    //     console.log('Car initialized');
    // },
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started.");
	}
});

// // var Car = new Car({registrationNumber: ' XLI887', color: 'red'});

var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});

var cars = new Vehicles ([
    new Car ({ registrationNumber: 'XLI887', colour: 'Blue' }),
    new Car ({ registrationNumber: 'ZNP123', colour: 'Blue' }),
    new Car ({ registrationNumber: 'XUV456', colour: 'Gray' })
]);



// var blueCars = cars.where({ colour: 'Blue' });
// console.log("Blue cars", blueCars);

// var carXLI887 = cars.findWhere({ registrationNumber : 'XLI887' });
// cars.remove(carXLI887);

// console.log("Vehicles as JSON", cars.toJSON());

// cars.each(function(car){
//     console.log(car);
// });

var vehicle = new Vehicle();

var VehicleView = Backbone.View.extend({
    
    initialize: function(options) {
        this.bus = options.bus;
    },
    
    events:{
        "click .delete": "onDelete"
    },
    tagName: "li",
    className: "vehicle",
    attributes: {
        "data-color": "Color"
    },
    onDelete: function(){
        this.remove();
    },
    render: function()  {
        var source = $("#vehicleTemplate").html();
        var template = _.template(source);
        
        this.$el.html(template(this.model.toJSON()));
        this.$el.attr("data-color", this.model.get("color"));
        
        return this;
    }
});

var bus = _.extend({}, Backbone.Events);

var VehiclesView = Backbone.View.extend({
    id: "vehicles",
    tagName: "ul",

    initialize: function() {
        bus.on("carAdded", this.onCarAdded, this);
    },

    onCarAdded: function(registrationNumber) {
        var car = new Car({ registrationNumber: registrationNumber });
        var vehicleView = new VehicleView({ model: car });
        this.$el.prepend(vehicleView.render().$el);
    },

    render: function()  {
        this.collection.each(function(vehicle){
            var vehicleView = new VehicleView({model: vehicle });
            this.$el.append(vehicleView.render().$el);
        }, this);

        return this;
    }
});

var NewVehicleView = Backbone.View.extend({
    events:{
        "click .add": "addNewCar"
    },
    
    render: function()  {
        var source = $("#newVehicleTemplate").html();
        var template = _.template(source);
        
        this.$el.html(template());
        
        return this;
    },

    addNewCar: function(){
        var input = this.$el.find(".registration-number");
        var registrationNumber = input.val();
        bus.trigger("carAdded", registrationNumber);

        // It's the responsibility of this view to clear its text box
        input.val("");
    }
});

var cars = new Vehicles ([
    new Vehicle ({ registrationNumber: 'XLI887', color: "Blue" }),
    new Vehicle ({ registrationNumber: 'ZNP123', color: "Blue"  }),
    new Vehicle ({ registrationNumber: 'XUV456', color: "Gray"  })
]);

var boats = new Vehicles ([
    new Vehicle ({ registrationNumber: 'boat1', color: "Green" }),
    new Vehicle ({ registrationNumber: 'boat2', color: "White"  }),
    new Vehicle ({ registrationNumber: 'boat3', color: "Yellow"  })
]);

// $("#container")
//             .append(new NewVehicleView().render().$el)
//             .append(new VehiclesView({ collection: vehicles }).render().$el);


var CarsView = Backbone.View.extend({
    // render: function(cars){
    //     this.$el.html(cars);

    //     return this;
    // },

    render: function()  {
        this.collection.each(function(vehicle){
            var vehicleView = new VehicleView({model: vehicle });
            this.$el.append(vehicleView.render().$el);
        }, this);

        return this;
    }
});


var BoatsView = Backbone.View.extend({
    // render: function(boats){
    //     this.$el.html(boats);

    //     return this;
    // }

    render: function()  {
        this.collection.each(function(boat){
            var vehicleView = new VehicleView({model: boat });
            this.$el.append(vehicleView.render().$el);
        }, this);

        return this;
    }
});

var HomeView = Backbone.View.extend({
    render: function(){
        this.$el.html("Home Page");

        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "homeView",
        "cars": "viewCars",
        "boats": "viewBoats",
        "*other": "defaultRoute"

    },
    homeView: function() {
        this.loadView(new HomeView());
    },

    viewCars: function() {
        this.loadView(new CarsView({ collection: cars }));
    },

    viewBoats: function() {
        this.loadView(new BoatsView({ collection: boats }));
    },

    // We use this method to prevent memory leaks. When you replace
	// the content of a DOM element with a new view, the old view is 
	// still in the memory. So, we need to remove it explicitly. 
	//
	// Here we use a private field (_currentView) to keep track of the
	// current view. 
	loadView: function(view){
		// If the currentView is set, remove it explicitly.
		if (this._currentView) {
			this._currentView.remove();
		}

		$("#container").html(view.render().$el);
		
		this._currentView = view;
    },
    
	defaultRoute: function(){
    }
});

var router = new AppRouter();
Backbone.history.start();

var NavView = Backbone.View.extend({
    events: {
        "click": "onClick"
    },

    onClick: function(e){
        var $li = $(e.target);
        router.navigate($li.attr("data-url"), {trigger:true});
    }
});

var navView = new NavView({el: "#nav"});





