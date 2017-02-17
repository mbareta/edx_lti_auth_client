const envs = require('./env.json');

exports.get = () => {
    const node_env = process.env.NODE_ENV || 'development';
    return envs[node_env];
};