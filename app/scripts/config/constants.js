app.constant('PAGE_SIZE', {
	'rows': [
		{
			'key' : 'five',
			'value' : 5
		},
		{
			'key' : 'ten',
			'value' : 10
		},
		{
			'key' : 'twentyFive',
			'value' : 25
		},
		{
			'key' : 'fifty',
			'value' : 50
		},
		{
			'key' : 'hundred',
			'value' : 100
		}
	]
});
app.constant('LOCALES', {
	'locales': {
		'en_US': 'English',
		'de_DE': 'Deutsche',
		'jp_JP': '日本語',
	},
	'preferredLocale': {
		'en_US': 'English'
	}
});
app.constant('API_URL', {
	'organisationLevel' : 'http://192.168.99.100:32769/',
	'roles' : 'http://192.168.99.100:32770/',
	'users' : 'http://192.168.99.100:32771/'
});
app.constant('AWS_URL', {
	'organisationLevel' : 'https://pkwtvdaw19.execute-api.us-east-1.amazonaws.com/',
	'users' : 'https://076krg0cia.execute-api.us-east-1.amazonaws.com/',
	'roles' : 'https://7jbg3t7p8f.execute-api.us-east-1.amazonaws.com/',
	'departments': 'https://hla66fn4d7.execute-api.us-east-1.amazonaws.com/',
	'locations': 'https://rpqq70e0b3.execute-api.us-east-1.amazonaws.com/'
});
app.constant('STATUS_CODE', {
	'status_ok' : 200,
	'status_bad_request' : 400,
	'status_no_found' : 404
});
app.constant('_', window._);
