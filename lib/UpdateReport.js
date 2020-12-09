const UpdateData = require("./UpdateData");

class UpdateReport {
    /**
     * 
     * @param {number} action //1 - Добавление ноды, 2 - изменение, 3 - удаление.
     * @param {number} time
     * @param {any} data
     */
    constructor(action, time, data) {
        this.action = action;
        this.time = time;
        this.data = data;
    }

    /**
     * При action = 1:
     *      data = {все данные о ноде};
     * При action = 2:
     *      data = {id + новые и изменённые поля};
     * При action = 3:
     *      data = {id удалённой ноды};
     */
}

module.exports = UpdateReport;