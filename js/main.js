
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
    initialize: function() {
        console.log('Car initialized');
    },
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started.");
	}
});

// var Car = new Car({registrationNumber: ' XLI887', color: 'red'});

var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});

var cars = new Vehicles ([
    new Car ({ registrationNumber: 'XLI887', colour: 'Blue' }),
    new Car ({ registrationNumber: 'ZNP123', colour: 'Blue' }),
    new Car ({ registrationNumber: 'XUV456', colour: 'Gray' })
]);

var blueCars = cars.where({ colour: 'Blue' });
console.log("Blue cars", blueCars);

var carXLI887 = cars.findWhere({ registrationNumber : 'XLI887' });
cars.remove(carXLI887);

console.log("Vehicles as JSON", cars.toJSON());

cars.each(function(car){
    console.log(car);
});