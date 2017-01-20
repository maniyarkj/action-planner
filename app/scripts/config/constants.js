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
	'orgnizationLevel' : 'http://192.168.99.100:32772/',
	'roles' : 'http://192.168.99.100:32773/',
	'users' : 'http://192.168.99.100:32774/'
});
app.constant('STATUS_CODE', {
	'status_ok' : 200,
	'status_bad_request' : 400,
	'status_no_found' : 404
});
