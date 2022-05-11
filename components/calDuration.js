
const calDuration = (millsecs) => {

    const mins = Math.floor(millsecs/60000);
    const secs = ((millsecs % 60000) / 1000).toFixed(0);
    return secs == 60? mins + 1 + ":00": mins + ":" + (secs < 10?"0":"") + secs

}

export default calDuration;
