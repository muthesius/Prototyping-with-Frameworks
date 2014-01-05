App = Ember.Application.create();

App.Router.map(function() {
  this.resource('courses', { path : 'courses' }, function() {
    this.resource('course', { path : ':course_id' });
  });
  this.resource('lecturers', { path : 'lecturers' }, function() {
    this.resource('lecturer', { path : ':lecturer_id' });
  });
});

App.LecturersRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('lecturer');
  }
});

App.CoursesRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('course');
  }
});

App.CoursesIndexView = Ember.View.extend({
  didInsertElement: function() {
    this.$('.day').click(function(){
      $(this).next('ul').toggle();
    });
    this.$('ul').hide();
  }
});

App.CoursesIndexController = Ember.ArrayController.extend({
  needs: [ 'courses' ],
  courses: function() {
    return this.get('controllers.courses.model');
  }.property('controllers.courses.model'),

  byDay: function() {
    var courses = this.get('courses');
    var days = courses.getEach('day').uniq().filterBy('');

    var filterCourses = [];
    days.forEach( function( currentDay ) {
      filterCourses.addObject( {
        day: currentDay,
        courses: courses.filterBy('day',currentDay)
      });
    });

    return filterCourses;
  }.property('courses')
});


App.CourseController = Ember.ObjectController.extend({
  lecturerNames: function() {
    var l = this.get('lecturers');
    return l.getEach('name').join(', ');
  }.property('lecturers.@each'),
    
  lecturerCourses: function() {
    var related = this.get('lecturers.firstObject.courses');
    if (related) {
      related = related.rejectBy('id', this.get('id'));
      return related;
    }
  }.property('lecturers.firstObject')
});







