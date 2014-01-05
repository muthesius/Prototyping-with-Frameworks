App = Ember.Application.create();

App.Router.map(function() {
  this.resource('courses', { path : 'courses' }, function() {
    this.resource('course', { path : ':course_id' });
  });
});

App.CoursesRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('course');
  }
});
