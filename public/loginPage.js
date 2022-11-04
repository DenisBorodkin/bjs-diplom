"use strict";
const newUserForm = new UserForm();
newUserForm.loginFormCallback = data => {
	let login = data.login;
	let password = data.password;
	ApiConnector.login({ login, password }, data => {
		if (data.success) {
			location.reload();
		} else {
			newUserForm.setLoginErrorMessage(data.error);
		}
	});
}
newUserForm.registerFormCallback = data => {
	let login = data.login;
	let password = data.password;
	ApiConnector.register({ login, password }, data => {
		if (data.success) {
			location.reload();
		} else {
			newUserForm.setRegisterErrorMessage(data.error);
		}
	});
}



