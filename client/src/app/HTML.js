const favicon = require('./components/SiteHeader/hapi.png');

export default ({title="", meta="", links="", content="", initialState={}, env={}, base_path="" }) => `
<html>
	<head>
		<meta charset="utf-8">
		${title}
		<meta name="viewport" content="width=device-width, initial-scale=1">
		${meta}
		${links}
		<link rel="shortcut icon" href="${favicon}" type="image/x-icon">
		<link rel="icon" href="${favicon}" type="image/x-icon">
		<link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link href="//fonts.googleapis.com/icon?family=Roboto" rel="stylesheet">
		<link href="${base_path}/static/app.css" rel=stylesheet>

	</head>

	<body>
		<div id=app>${content}</div>
		<script>
			window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
			window.__APP_ENV_VARS__ = ${JSON.stringify(env)};
		</script>
		<script type=text/javascript src="${base_path}/static/app.js" charset=utf-8 async></script>
	</body>
</html>
`;
