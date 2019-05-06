const { join } = require('path');
const { existsSync } = require('fs');
const { config } = require('dotenv');

const application = require('./dist');

module.exports = application;

const { env, exit } = process;
const { log, error } = console;
const path = join(__dirname, '.env');

const handleError = err => {
	error(err.message);
	exit(1);
};

if (!existsSync(path)) {
	error('env file is required.');
	exit(1);
}

const { error: err, parsed } = config({ path });

if (err) {
	error(err.message);
	exit(1);
}

if (require.main === module) {
	// Run the application
	const config = {
		rest: {
			port: +(process.env.PORT || 3000),
			host: process.env.HOST,
			openApiSpec: {
				// useful when used with OASGraph to locate your application
				setServersFromRequest: true
			}
		}
	};
	application.main(config).catch(err => {
		console.error('Cannot start the application.', err);
		process.exit(1);
	});
}
