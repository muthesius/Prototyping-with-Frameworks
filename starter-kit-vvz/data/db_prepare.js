DB.courses.map(function(c){
  if (c.info === "") delete c.info;
});

DB.lecturers.map(function(l){
  l.courses = [];
  l.programs = [];
  l.degrees = [];
  l.modules = [];
  l.fields = [];
  DB.courses.map(function(c){
    if (c.lecturers.indexOf(l.id) >= 0) {
      l.courses.push(c.id);
      c.programs.map(function(p){
        if (l.programs.indexOf(p) < 0) l.programs.push(p);
      });
      c.degrees.map(function(p){
        if (l.degrees.indexOf(p) < 0) l.degrees.push(p);
      });
      c.modules.map(function(p){
        if (l.modules.indexOf(p) < 0) l.modules.push(p);
      });
      c.fields.map(function(p){
        if (l.fields.indexOf(p) < 0) l.fields.push(p);
      });
    }
  });
});


DB.semester.map(function(l){
  l.courses = [];
  DB.courses.map(function(c){
    l.courses.push(c.id);
  });
});


DB.degrees.map(function(l){
  l.courses = [];
  l.programs = [];
  l.modules = [];
  l.fields = [];
  DB.courses.map(function(c){
    if (c.degrees.indexOf(l.id) >= 0) {
      l.courses.push(c.id);
      c.programs.map(function(p){
        if (l.programs.indexOf(p) < 0) l.programs.push(p);
      });
      c.modules.map(function(p){
        if (l.modules.indexOf(p) < 0) l.modules.push(p);
      });
      c.fields.map(function(p){
        if (l.fields.indexOf(p) < 0) l.fields.push(p);
      });
    }
  });
});

DB.programs.map(function(l){
  l.courses = [];
  l.modules = [];
  DB.courses.map(function(c){
    if (c.programs.indexOf(l.id) >= 0) {
      l.courses.push(c.id);
      c.modules.map(function(p){
        if (l.modules.indexOf(p) < 0) l.modules.push(p);
      });
      if (c.degrees.length > 0) l.degree = c.degrees[0];
    }
  });
});


DB.modules.map(function(l){
  l.courses = [];
  l.fields = [];
  DB.courses.map(function(c){
    if (c.modules.indexOf(l.id) >= 0) {
      l.courses.push(c.id);
      c.fields.map(function(p){
        if (l.fields.indexOf(p) < 0) l.fields.push(p);
      });
      if (c.programs.length > 0) l.program = c.programs[0];
    }
  });
});

DB.fields.map(function(l){
  l.courses = [];
  DB.courses.map(function(c){
    if (c.fields.indexOf(l.id) >= 0) {
      l.courses.push(c.id);
      if (c.modules.length > 0) l.module = c.modules[0];
    }
  });
});
