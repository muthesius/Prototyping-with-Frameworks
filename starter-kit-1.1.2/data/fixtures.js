DS.FixtureAdapter.reopen({
  queryFixtures: function(records, query, type) { 
      return records.filter(function(record) {
          for(var key in query) {
              if (!query.hasOwnProperty(key)) { continue; }
              var value = query[key];
              if (record[key] !== value) { return false; }
          }
          return true;
      });
  }
});

App.Semester.FIXTURES = [
  {
    id: 1,
    name: "Wintersemester 2013/14",
    events: [1,2]
  }, {
    id: 2,
    name: "Sommersemester 2013",
    events: [1,2]
  }
];

App.Event.FIXTURES = [
  {
    id: 1,
    title: "event 1",
    text: "es findet statt...",
    semester: 1
  },
  {
    id: 2,
    title: "event 2",
    text: "nch etwas findet statt...",
    semester: 1
  }
];
