App = Ember.Application.create();

App.initializer({
  name: "session",
  after: "store",
  initialize: function(container,application) {
    var store = container.lookup('store:main');
    var session = store.findAll('session').get('firstObject');
    if (!session) session = store.createRecord('session');
    application.register('session:main', {create:function(){return session;}}, {singleton: true});
    application.inject('controller', 'session', 'session:main');
    application.inject('route', 'session', 'session:main');
  }
});

App.Session = DS.Model.extend({
  name: DS.attr('string',{defaultValue: "session"}),
  todos: DS.hasMany()
});

App.Router.map(function() {
  this.resource( 'todos', { path: '/' } );
});

App.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('todo');
  }
});

App.TodosView = Ember.View.extend({
  didInsertElement: function() {
    this.$('input:first').focus();
  }
});

App.TodosController = Ember.ArrayController.extend({
  actions: {
    newTodo: function() {
      var newTodoTitle = this.get('newTitle').trim();

      if ( newTodoTitle.length > 0 ) {
        var newTodo = this.store.createRecord('todo');

        newTodo.set('title', newTodoTitle );
        this.session.get('todos').addObject(newTodo);
        this.session.save();
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
