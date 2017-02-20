const env = require('./config.json');

exports.get = () => {
    const node_env = process.env.NODE_ENV || 'development';
    const env_variables = env[node_env];
    env_variables.client.id = process.env.CLIENT_ID || env_variables.client.id;
    env_variables.client.secret = process.env.CLIENT_SECRET || env_variables.client.secret;
    return env_variables;
};


