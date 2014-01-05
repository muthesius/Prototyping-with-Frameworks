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

App.CoursesIndexController = Ember.ArrayController.extend({
  needs: [ 'courses' ],
  courses: function() {
    return this.get('controllers.courses.model');
  }.property('controllers.courses.model')
});


App.CourseController = Ember.ObjectController.extend({
  lecturerNames: function() {
    var l = this.get('lecturers');
    return l.getEach('name').join(', ');
  }.property('lecturers.@each'),
    
  lecturerCourses: function() {
    var related = this.get('lecturers.firstObject.courses');
    return related;
  }.property('lecturers.firstObject')
});







