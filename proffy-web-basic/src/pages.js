const Database = require('./database/db');

const {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMinutes
} = require("./utils/format")

// FUNCIONALIDADES
function pageLanding(req, res) {
  return res.render("index.html"); // with nunjucks
  // return res.sendFile(__dirname + "/views/index.html");
}

async function pageStudy(req, res) {
  const filters = req.query;

  // test if fields are empty
  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render("study.html", {
      filters,
      subjects,
      weekdays
    }); // with nunjucks
    // return res.sendFile(__dirname + "/views/study.html");
  }

  // convert hour to minutes
  const timeToMinutes = convertHoursToMinutes(filters.time);

  const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = classes.id
      AND class_schedule.weekday = ${filters.weekday}
      AND class_schedule.time_from <= ${timeToMinutes}
      AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}';
  `;

  try {
    const db = await Database;
    const proffys = await db.all(query);

    // convert number to subject string
    proffys.map((proffy) => {
      proffy.subject = getSubject(proffy.subject);
    })

    return res.render('study.html', {
      proffys,
      subjects,
      filters,
      weekdays
    });

  } catch (error) {
    console.log(error);
  }
}

function pageGiveClasses(req, res) {

  return res.render("give-classes.html", {
    subjects,
    weekdays
  }); // with nunjucks
  // return res.sendFile(__dirname + "/views/give-classes.html");
}

async function saveClasses(req, res) {
  const createProffy = require('./database/createProffy');
  // const data = req.body;

  const proffyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio
  }

  const classValue = {
    subject: req.body.subject,
    cost: req.body.cost
  }

  const classScheduleValues = req.body.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertHoursToMinutes(req.body.time_from[index]),
      time_to: convertHoursToMinutes(req.body.time_to[index])
    }
  })

  try {
    const db = await Database;
    await createProffy(db, {
      proffyValue,
      classValue,
      classScheduleValues
    })

    // display page with registered teacher
    let queryString = "?subject=" + req.body.subject
    queryString += "&weekday=" + req.body.weekday[0]
    queryString += "&time=" + req.body.time_from[0]

    return res.redirect("/study" + queryString);
  } catch (error) {
    console.log(error);
  }


  // TO USE WITH GET
  // const isNotEmpty = Object.keys(data).length > 0; // count the keys of the object, if zero = false

  // if (isNotEmpty) {

  //   data.subject = getSubject(data.subject); // change number to the word itself

  //   proffys.push(data);

  // }

}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses
}