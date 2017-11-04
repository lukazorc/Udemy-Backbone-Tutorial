require.config({
    paths: {
        jquery: "../js/lib/jquery-min",
        underscore: "../js/lib/underscore-min",
        backbone: "../js/lib/backbone-min"
    }
})

define(["app"], function(App){
    App.initialize();
});