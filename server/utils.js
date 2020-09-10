
padding = string => ('00' + string).slice(-2)

getmytime = hours => {
    let now = new Date(Date.now()-(3600000*hours))
    return "'" + now.getUTCFullYear() + '-'
        + padding(now.getUTCMonth()+1) + '-'
        + padding(now.getUTCDate()) + ' '
        + padding(now.getUTCHours()) + ':'
        + padding(now.getUTCMinutes()) + ':'
        + padding(now.getUTCSeconds()) + "'"
}

module.exports.timeHoursBefore = getmytime;