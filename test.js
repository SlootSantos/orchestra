const { exec } = require('child_process');

exec('$tef plan', (e, so, se) => {
  console.log(e, so, se);
});
