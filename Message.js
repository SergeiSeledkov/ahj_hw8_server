class Message {
	constructor(idUser, idMessage, userName, date, message) {
		this.idUser = idUser;
		this.idMessage = idMessage;
		this.userName = userName;
		this.date = date;
		this.message = message;
	}

	createMessageObj() {
		return {
			idUser: this.idUser,
			idMessage: this.idMessage,
			userName: this.userName,
			date: this.date,
			message: this.message
		}
	}
}

module.exports = Message;