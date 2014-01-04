App = Ember.Application.create();

App.Router.map(function() {
  this.resource( 'todos', { path: '/' } );
});

App.TodosRoute = Ember.Route.extend({
  model: function() {
    return TODOS;
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
