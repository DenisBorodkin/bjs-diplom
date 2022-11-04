
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
		ProfileWidget.showProfile(data);
	}
})