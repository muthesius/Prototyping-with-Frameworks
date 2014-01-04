Ember.onLoad('Ember.Application', function(Application) {
  Application.initializer({
    name: "force load fixtures",
    after: "store",
    initialize: function(container, application) {
      var store = container.lookup('store:main');
      var keys = Ember.keys(application);

      keys.forEach(function (k) {
        var prop = application[k], fixtures;
        if ('function' === typeof prop.detect && DS.Model.detect(prop) && (fixtures = prop.FIXTURES)) {
          store.pushMany(k, fixtures);
        }
      });
    }
  });
});

App.Lecturer.FIXTURES = DB.lecturers;
App.Course.FIXTURES = DB.courses;

App.Program.FIXTURES = DB.programs;
App.Module.FIXTURES = DB.modules;
App.Field.FIXTURES = DB.fields;

App.Semester.FIXTURES = DB.semester;
App.Degree.FIXTURES = DB.degrees;
