//App = Ember.Application.create({LOG_TRANSITIONS: true });

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('semesters');

  this.resource('semester',{path:'/:url'},function(){
    this.resource('event',{path:'/:id'});
  });

});

App.SemestersRoute = Em.Route.extend({
  model: function(params) {
      return this.store.find('semester')
  }
});

App.SemesterRoute = Em.Route.extend({
  model: function(params) {
    return this.store.find('semester').then(function(semesters){
      return semesters.findBy('url',params.url);
    });
  }
});

App.EventRoute = Em.Route.extend({
  model: function(params) {
    console.log(params)
    return this.store.find('event',params.id);
  }
});




App.Semester = DS.Model.extend({
  name: DS.attr('string'),
  events: DS.hasMany('event',{async:true}),
  url: function(){
    return this.get('name').replace(/\W/g,'-').replace(/-+/g,'-').toLowerCase();
  }.property('name')
});


App.Event = DS.Model.extend({
  title: DS.attr('string'),
  text: DS.attr('string'),
  semester: DS.belongsTo('semester')
});