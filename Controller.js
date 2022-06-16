const uuid = require('uuid');
const Message = require('./Message');
const User = require('./User');
const messageList = require('./messageList');
const userList = require('./userList');

class Controller {
	constructor() { }

	getTime() {
		const date = new Date();
		const year = date.getFullYear();
		let day = date.getDate();
		let month = date.getMonth();
		let hour = date.getHours();
		let minute = date.getMinutes();

		if (day < 10) {
			day = `0${day}`;
		}

		if (month < 10) {
			month = `0${month}`;
		}

		if (hour < 10) {
			hour = `0${hour}`;
		}

		if (minute < 10) {
			minute = `0${minute}`;
		}

		return `${day}.${month}.${year} ${hour}:${minute}`;
	}

	getAllUser() {
		return userList;
	}

	getAllMessage() {
		return messageList;
	}

	addNewUser(name) {
		const search = userList.find(item => item.name === name);

		if (typeof search === 'undefined') {
			const id = uuid.v1();
			const user = new User(id, name);
			const userObj = user.createUserObj();

			userList.push(userObj);

			return userObj;
		} else {
			return 403;
		}
	}

	deleteUser(id) {
		const search = userList.findIndex(item => item.id === id);

		if (search !== -1) {
			userList.splice(search, 1);

			return '200 Ok - User Deleted';
		} else {
			return 404;
		}
	}

	addNewMessage(idUser, userName, message) {
		const id = uuid.v1();
		const createMessage = new Message(idUser, id, userName, this.getTime(), message);
		const messageObj = createMessage.createMessageObj();

		messageList.push(messageObj);

		return messageObj;
	}
}

module.exports = Controller;