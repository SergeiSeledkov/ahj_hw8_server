class User {
	constructor(id, name, online) {
		this.id = id;
		this.name = name;
	}

	createUserObj() {
		return {
			id: this.id,
			name: this.name
		}
	}
}

module.exports = User;