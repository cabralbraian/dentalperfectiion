const https = require('https');

https.get('https://dentalperfection.site/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp|svg)/gi;
    const matches = data.match(regex) || [];
    const unique = [...new Set(matches)];
    console.log(JSON.stringify(unique, null, 2));
  });
}).on('error', (err) => {
  console.error(err);
});
