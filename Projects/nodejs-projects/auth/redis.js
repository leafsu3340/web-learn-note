const redis = require('redis');
const client = redis.createClient(6379, 'localhost')
client.set('hello', 'hahaha')
client.get('hello', (err, v) => {
  console.log('hello:', v);
})