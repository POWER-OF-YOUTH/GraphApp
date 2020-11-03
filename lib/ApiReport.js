class ApiReport {
    /**
     * 
     * @param {string} status 
     * @param {number} code 
     * @param {string} message 
     * @param {any} data
     */
    constructor(status, code, message, data = undefined)
    {
        this.status = status;
        this.code = code;
        this.message = message;
        if(data != undefined)
            this.data = data;
    }
}

module.exports = ApiReport;