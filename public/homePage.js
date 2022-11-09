

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
			newRatesBoard.fillTable(data.data)
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
			newMoneyManager.setMessage(data.error, response.error);
		}
	});
};


