const driver = require("./driver");

class Response {
    constructor(response) {
        this.response = response;
    }

    /**
     * 
     * @param {number} i 
     */
    at(i) {
        if(this.response.records.length == 0)
            return 0;
        return this.response.records[i]["_fields"][0];
    }

    length() {
        return this.response.records.length;
    }
}

class DatabaseWorker {
    /**
     * 
     * @param {Driver} driver 
     */
    constructor(driver) {
        this.driver = driver;
    }

    /**
     * 
     * @param {string} query 
     * @param {any} parameters 
     */
    async run(query, parameters = undefined) {
        let response;
        if(parameters != undefined)
            response = await driver.session().run(query, parameters);
        else
            response = await driver.session().run(query);

        return new Response(response);
    }

    /**
     * 
     * @param {string} query 
     * @param {any} parameters 
     */
    async runDefault(query, parameters = undefined) {
        return await driver.session().run(query, parameters);
    }
}

const worker = new DatabaseWorker(driver);

module.exports = worker;