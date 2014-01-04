var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;

App.Course = DS.Model.extend({
  lecturers: hasMany(),
  fields: hasMany(),
  modules: hasMany(),
  degrees: hasMany(),
  semester: belongsTo('semester'),
  title: attr('string'),
  info: attr('string',{defaultValue:'Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte. »Es ist ein eigentümlicher Apparat«, sagte der Offizier zu dem Forschungsreisenden und überblickte mit einem gewissermaßen bewundernden Blick den ihm doch wohlbekannten Apparat. Sie hätten noch ins Boot springen können, aber der Reisende hob ein schweres, geknotetes Tau vom Boden, drohte ihnen damit und hielt sie dadurch von dem Sprunge ab. In den letzten Jahrzehnten ist das Interesse an Hungerkünstlern sehr zurückgegangen. Aber sie überwanden sich, umdrängten den Käfig und wollten sich gar nicht fortrühren.Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich'}),
  day: attr('string'),
  time: attr('string'),
  start: attr('string'),
  ort: attr('string'),
  termine: attr('string'),
  type: attr('string'),
  sws: attr('number'),
  field: function(){
    return this.get('fields.firstObject');
  }.property('fields')
});

App.Lecturer = DS.Model.extend({
  name: attr('string'),
  courses: hasMany(),
  programs: hasMany()
});

App.Semester = DS.Model.extend({
  name: attr('string'),
  courses: hasMany()
});

App.Degree = DS.Model.extend({
  name: attr('string'),
  programs: hasMany(),
  fields: function(){
    return this.get('programs.modules');
  }.property('programs'),
  courses: hasMany(),
  lecturers: function(){
    return this.get('courses.lecturers');
  }.property('courses')
});

App.Program = DS.Model.extend({
  name: attr('string'),
  courses: hasMany(),
  modules: hasMany(),
  degree: belongsTo('degree'),
  lecturers: function(){
    return this.get('courses.lecturers');
  }.property('courses')
});

App.Module = DS.Model.extend({
  program: belongsTo('program'),
  name: attr('string'),
  fields: hasMany(),
  // number: attr('number'),
  // title: function(){
  //   return this.get('name') + " – Modul " + this.get('id');
  // }.property('name','id'),
  courses: function(){
    return this.get('fields.courses');
  }.property('fields'),
});

App.Field = DS.Model.extend({
  name: attr('string'),
  module: belongsTo('module'),
  courses: hasMany()
});
