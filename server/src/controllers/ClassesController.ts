import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  // METHOD GET
  async index(req: Request, res: Response) {
    const filters = req.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;


    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({ 
        error: "Missing filters to search classes" 
      })
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) // ?? = parameter inside array [week_day]
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return res.json(classes);
  }

  // METHOD POST
  async create(req: Request, res: Response) {
    const { 
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
    
    const trx = await db.transaction(); // executes all at the same time, if one fails it won't execute the others
  
    try {
      // USERS DB
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
  
      // CLASSES DB
      const user_id = insertedUsersIds[0];
  
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });
  
      // SCHEDULE DB
      const class_id = insertedClassesIds[0];
  
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      })
  
      await trx('class_schedule').insert(classSchedule);
  
      await trx.commit(); // if everything passes it will insert in the db
  
      return res.status(201).send(); // 201 = succesfully created
  
    } catch (err) {
      console.log(err);
      
      await trx.rollback(); // it will undo everything before the error
  
      return res.status(400).json({ // 400 = general error
        error: "Unexpected error while creating new class"
      })
    }
  }
};