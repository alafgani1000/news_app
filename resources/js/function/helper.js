import moment from "moment";

export function dateReadable(start) {
    let dateNow = new Date();
    let startDate = moment(start);
    let endDate = moment(dateNow);
    let seconds = 0,
        minutes = 0,
        hours = 0,
        days = 0,
        weeks = 0,
        months = 0,
        years = 0;
    seconds = endDate.diff(startDate, "seconds");
    minutes = endDate.diff(startDate, "minutes");
    hours = endDate.diff(startDate, "hours");
    days = endDate.diff(startDate, "days");
    weeks = endDate.diff(startDate, "weeks");
    months = endDate.diff(startDate, "months");
    years = endDate.diff(startDate, "years");
    if (years > 0) {
        return `${years} tahun yang lalu`;
    } else if (months > 0) {
        return `${months} bulan yang lalu`;
    } else if (weeks > 0) {
        return `${weeks} minggu yang lalu`;
    } else if (days > 0) {
        return `${days} hari yang lalu`;
    } else if (hours > 0) {
        return `${hours} jam yang lalu`;
    } else if (minutes > 0) {
        return `${minutes} menit yang lalu`;
    } else {
        return `${seconds} detik yang lalu`;
    }
}
