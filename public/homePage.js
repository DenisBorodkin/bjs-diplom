

const newLogoutButton = new LogoutButton();
newLogoutButton.action = () => {
	ApiConnector.logout(data => {
		if (data.success) {
			location.reload();
		}
	})
}
ApiConnector.current(data => {
	if (data.success) {
		ProfileWidget.showProfile(data.data);
	}
});
const newRatesBoard = new RatesBoard();
let timerId = setInterval(() => {
	ApiConnector.getStocks(data => {
		if (data.success) {
			newRatesBoard.clearTable();
			newRatesBoard.fillTable(data.data);
		}
	})
}, 60000);
const newMoneyManager = new MoneyManager();
newMoneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			newMoneyManager.setMessage(response.success, 'Пополнение выполненно успешно');
		}
		else {
			newMoneyManager.setMessage(response.success, response.error);
		}
	});
};
newMoneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			newMoneyManager.setMessage(response.success, 'Конвертация выполнена успешно');
		}
		else {
			newMoneyManager.setMessage(response.success, response.error);
		}
	});
}
newMoneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			newMoneyManager.setMessage(response.success, 'Перевод выполнен успешно');
		}
		else {
			newMoneyManager.setMessage(response.success, response.error);
		}
	});
}
const newFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(data => {
	if (data.success) {
		newFavoritesWidget.clearTable();
		newFavoritesWidget.fillTable(data.data);
		newFavoritesWidget.updateUsersList(data.data);
	}
})
newFavoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			newFavoritesWidget.clearTable();
			newFavoritesWidget.fillTable(response.data);
			newFavoritesWidget.updateUsersList(response.data);
			newFavoritesWidget.setMessage(response.success, 'Пользователь успешно добавлен');
		}
		else {
			newFavoritesWidget.setMessage(response.success, response.error);
		}
	})
}
newFavoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {	
		if (response.success) {
			newFavoritesWidget.clearTable();
			newFavoritesWidget.fillTable(response.data);
			newFavoritesWidget.updateUsersList(response.data);
			newFavoritesWidget.setMessage(response.success, 'Пользователь успешно удалён');
		}
		else {
			newFavoritesWidget.setMessage(response.success, response.error);
		}
	})
}









