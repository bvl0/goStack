import { endOfDay, startOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/appointment';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const schedule = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseISO(date)), endOfDay(parseISO(date))],
        },
      },
    });

    return res.json(schedule);
  }
}

export default new ScheduleController();
