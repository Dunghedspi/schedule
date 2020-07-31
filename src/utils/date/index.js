function formatDate(date) {
    const dateformat = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split(':');
    return dateformat[0] + ':' + dateformat[1];
}
module.exports = formatDate;
