export const getLocalTimeStamp = () => {

    Date.prototype.toISOString = function () {
        let pad = (n) => (n < 10) ? '0' + n : n;
        let hours_offset = this.getTimezoneOffset() / 60;
        let offset_date = this.setHours(this.getHours() - hours_offset);
        let symbol = (hours_offset >= 0) ? "-" : "+";
        let time_zone = symbol + pad(Math.abs(hours_offset)) + ":00";

        return this.getUTCFullYear() +
            '-' + pad(this.getUTCMonth() + 1) +
            '-' + pad(this.getUTCDate()) +
            'T' + pad(this.getUTCHours()) +
            ':' + pad(this.getUTCMinutes()) +
            ':' + pad(this.getUTCSeconds()) +
            '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
    };

    return new Date().toISOString();
}