App = Ember.Application.create();

App.Router.map(function() {
  this.resource( 'todos', { path: '/' } );
});

App.TodosRoute = Ember.Route.extend({
  model: function() {
    return TODOS;
  }
});

App.TodosController = Ember.ArrayController.extend({
  actions: {
    newTodo: function() {
      var newTodoTitle = this.get('newTitle').trim();

      if ( newTodoTitle.length > 0 ) {
        var newTodo = { title: newTodoTitle, completed: false };
        this.addObject(newTodo);
        this.set('newTitle',"");
      }
    }
  }
});

App.TodoController = Ember.ObjectController.extend({
  actions: {
    toggleCompleted: function() {
      // toggle the completed state:
      // the ember way:
      this.toggleProperty('completed');
      // the old way ...
      // if (this.get('completed') === true) {
      //   this.set('completed',false);
      // } else {
      //   this.set('completed',true);
      // }
    }
  }
});


TODOS = [
  {
    title: "Seminar vorbereiten",
    completed: true
  },
  {
    title: "Seminar halten",
    completed: true
  },
  {
    title: "Projektpräsentation",
    completed: false
  }
];
