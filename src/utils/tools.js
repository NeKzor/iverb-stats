import { scaleLinear } from 'd3-scale';
import moment from 'moment';

export function formatScore(score) {
    if (score === undefined || score === null) {
        return score;
    }

    let csec = score % 100;
    let tsec = Math.floor(score / 100);
    let sec = tsec % 60;
    let min = Math.floor(tsec / 60);

    return (min > 0 ? min + ':' : '') + (sec < 10 && min > 0 ? '0' + sec : sec) + '.' + (csec < 10 ? '0' + csec : csec);
}

// credits: https://github.com/iVerb1/Portal2Boards/blob/master/public/js/date.js#L21
const hourScale = scaleLinear()
    .domain([0, 24, 14 * 24, 2 * 30 * 24])
    .range(['#2eb82e', '#258e25', '#cca300', '#e67300']);

export function getDateDifferenceColor(date) {
    const passedHours = moment().diff(moment(date), 'hours');
    return passedHours <= 2 * 30 * 24 ? hourScale(passedHours) : undefined;
}

const minuteScale = scaleLinear()
    .domain([0, 8 * 60, 16 * 60, 24 * 60])
    .range(['#2eb82e', '#cca300', '#e67300', '#e63200']);

export function getDateTimeDifferenceColor(pastMinutes) {
    return pastMinutes >= 0 && pastMinutes <= 24 * 60 ? minuteScale(pastMinutes) : undefined;
}
