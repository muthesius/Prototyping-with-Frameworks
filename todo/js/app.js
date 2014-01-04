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
      var newTodo = { title: this.get('newTitle'), completed: false };
      this.addObject(newTodo);
      this.set('newTitle',"");
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
