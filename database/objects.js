// Объекты эквиваленты объектам из базы данных

class UserInfo {
    constructor(nickname, name, surname, email, password, token)
    {
        this.nickname = nickname;
        this.email = email;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.token = token;
    }
}

module.exports = {
    UserInfo
};
