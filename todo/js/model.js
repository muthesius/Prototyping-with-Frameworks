// 1) Adapter festlegen
App.ApplicationAdapter = DS.LSAdapter.extend();

// 2) Model beschreiben
App.Todo = DS.Model.extend({
  title: DS.attr('string'),
  completed: DS.attr('boolean', { defaultValue: false } )
});