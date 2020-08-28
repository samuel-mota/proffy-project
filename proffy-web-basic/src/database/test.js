const Database = require('./db'); //exported by db.js
const createProffy = require('./createProffy');

Database.then(async (db) => {
  // inserir dados
  proffyValue = {
    name: 'Samuel Mota',
    avatar: 'https://avatars3.githubusercontent.com/u/34915411?s=460&u=c8e940ebd7f5835b9ce2cf7e1aa7d175a1de2f79&v=4',
    whatsapp: '111111',
    bio: 'anything',
  }

  classValue = {
    subject: 1,
    cost: '20',
  }

  classScheduleValues = [{
    weekday: 1,
    time_from: 720,
    time_to: 1220
  }, {
    weekday: 0,
    time_from: 520,
    time_to: 1220
  }]

  // createProffy.js
  // await createProffy(db, {
  //   proffyValue,
  //   classValue,
  //   classScheduleValues
  // });


  // ****************************
  // consultar os dados inseridos
  // ****************************

  // const selectedProffys = await db.all("SELECT * FROM proffys");
  // console.log(selectedProffys);

  // const selectedClassesAndProffys = await db.all(`
  //   SELECT classes.*, proffys.*
  //   FROM proffys
  //   JOIN classes ON (classes.proffy_id = proffys.id)
  //   WHERE classes.proffy_id = 1;
  // `);
  // console.log(selectedClassesAndProffys);

  const selectedClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = "1"
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "520"
    AND class_schedule.time_to > "520";
  `);
  console.log(selectedClassesSchedules);


})