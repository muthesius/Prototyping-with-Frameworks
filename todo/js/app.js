App = Ember.Application.create();

App.Router.map(function() {
  this.resource( 'todos', { path: '/' } );
});

App.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('todo');
  }
});

App.TodosController = Ember.ArrayController.extend({
  actions: {
    newTodo: function() {
      var newTodoTitle = this.get('newTitle').trim();

      if ( newTodoTitle.length > 0 ) {
        var newTodo = this.store.createRecord('todo');

        newTodo.set('title', newTodoTitle );
        newTodo.save();

        this.set('newTitle',"");
      }
    },
    deleteAllDone: function() {
      var doneTodos = this.get('completedTodos');
      doneTodos.forEach(function(todo){
        // löscht das todo aus der liste UND dem localstorage
        todo.destroyRecord(); 
      });
    }
  },

  completedTodos: function() {
    var todos = this.get('model');
    return todos.filterBy('completed');
  }.property('@each.completed'),

  numTodosDone: function() {
    return this.get('completedTodos.length');
  }.property('completedTodos')

});

App.TodoController = Ember.ObjectController.extend({
  actions: {
    toggleCompleted: function() {
      // toggle the completed state:
      // the old way ...
      // if (this.get('completed') === true) {
      //   this.set('completed',false);
      // } else {
      //   this.set('completed',true);
      // }

      // the ember way:
      var todo = this.get('model');
      todo.toggleProperty('completed');
      todo.save();
    }
  }
});
