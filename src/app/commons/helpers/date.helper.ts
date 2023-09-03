import * as moment from 'moment';

const months =  {
    es: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'setiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ]
};

type MonthLeng = keyof typeof months;

export class DateHelper {

    public static current(): moment.Moment {
        return moment();
    }

    public static dateFromUnix(unixTime: number): moment.Moment {
        const date = moment.unix(unixTime);
        return date;
    }

    public static dateHuman(timeStamps: number, leng: MonthLeng = 'es') {
        const date = moment(timeStamps);
        const month = date.month();
        const day = date.day().toString().padStart(2, '0');
        const year = date.year();
        return `${day} ${months[leng][month]} ${year} (${date.format('h:mm a')})`;
    }


}