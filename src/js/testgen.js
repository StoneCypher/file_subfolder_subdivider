#!/usr/bin/env node

// it's argv[3] if run as a node arg, 2 if directly as a global

const fs = require('fs');





const arg   = process.argv[3] ?? process.argv[2] ?? 120_000,
      range = Number(arg);





for (var i=0; i<range; ++i) {

  const padded_i = i.toString().padStart(7, '0');
  if ((i % 1000) === 0) { console.log(`Writing ${i}...`); }
  fs.closeSync(fs.openSync(`./frame${padded_i}.png`, 'w'));

}
