
$(document).ready(function(){
    var todoItems = new TodoList();
    todoItems.fetch();

    var todoItemsView = new TodoItemsView({model: todoItems});
    $("body").append(todoItemsView.render().$el);
})