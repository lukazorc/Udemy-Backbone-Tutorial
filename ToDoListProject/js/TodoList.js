 var TodoList = Backbone.Collection.extend({
    model: TodoItem,

    url: "http://jsonplaceholder.typicode.com/todos"  
 });