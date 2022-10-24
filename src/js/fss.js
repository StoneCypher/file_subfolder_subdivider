#!/usr/bin/env node

// So the situation is weird.
//
// What's gone wrong, fundamentally, is Windows' filesystem NTFS.  Apparently
// the time to list a directory, as well as the time to open a single file, are
// logarithmic to the number of files in a directory.
//
// Interestingly, *moving* a file is still linear (albeit slow.)
//
// The other interesting thing is that the bug seems not to be disk related;
// doing these in parallel doesn't slow one another down much.
//
// So how do you break the directory up in quasi-linear time?  Well, just
// observe that when moving a file with wildcards, moving nothing is not an
// error; rather, it just does nothing (sfinae in da house.)  Also, observe
// that once they're in a reasonable headcount, listing the directory is no
// longer a punishment.
//
// Therefore, we can just make way too many breakup directories, waste some time
// breaking up files that don't exist,




// let digits = 5,
//     mask   = '';





const { execSync } = require('child_process');





const default_range_digits = 3,
      default_mask_digits  = 4,
      default_mask         = 'frame##.png',
      default_parallelism  = 1;

const is_win = (process.platform === 'win32');  // todo





const { program } = require('commander');

program
  .option('-t, --test',                  'explain the arguments given')
  .option('-q, --quiet',                 'do not log progress')
  .option('-d, --mask_digits <number>',  'count of question marks in the file mask', default_mask_digits.toString())
  .option('-r, --range_digits <number>', 'digits to expand to; use 0 to not expand', default_range_digits.toString())
//.option('-p, --parallelism <number>',  'maximum movers to run in parallel',        default_parallelism.toString())
  .option('-m, --mask <string>',         'text mask for filename; use $$ for inset', default_mask);

program.parse();





const options      = program.opts(),
      is_quiet     = options['quiet']        ?? false,
      parallelism  = options['parallelism']  ?? default_parallelism,
      range_digits = options['range_digits'] ?? default_range_digits,
      mask_digits  = options['mask_digits']  ?? default_mask_digits,
      mask         = options['mask']         ?? default_mask;

const [ mask_lo,
        mask_hi ]  = mask.split('##');





const seq = n =>
  new Array(n).fill(0).map( (_, i) => i );

const dec_range = n =>
  seq( Math.pow(10, n) );





function filename_instance(index, u_range_digits, u_mask_digits, mask) {

  if (mask_lo === undefined) { throw 'mask completely missing'; }
  if (mask_hi === undefined) { throw `mask missing ## breakpoint (mask_lo is ${mask_lo})`; }

  const inset   = index.toString().padStart(u_range_digits, '0'),
        maskset = ''.padStart(u_mask_digits, '?');
//      maskset = '*';

  return `${mask_lo}${inset}${maskset}${mask_hi}`;

}





const l_move_command = (u_index, u_range_digits, u_mask_digits, u_mask, u_pad_index) =>
  `mv ${filename_instance(u_index, u_range_digits, u_mask_digits, u_mask)} ./${u_pad_index}/ `;

const w_move_command = (index, range_digits, mask_digits, mask, u_pad_index) =>
  `move ${filename_instance(index, range_digits, mask_digits, mask)} ${u_pad_index} `;


function move_command(index, range_digits, mask_digits, mask) {

  const pad_index = index.toString().padStart(range_digits, '0');
  if (!(is_quiet)) { console.log(`  Filling ${pad_index}`); }

  const cmd = is_win
    ? w_move_command(index, range_digits, mask_digits, mask, pad_index)
    : l_move_command(index, range_digits, mask_digits, mask, pad_index)

  if (index === 0) { console.log(cmd); }
  execSync( cmd );

}





const  l_mkdir = index =>
  `md ${index}`;

const  w_mkdir = index =>
  `mkdir ${index}`;


function mkdir(u_index, u_range_digits) {

  const pad_index = u_index.toString().padStart(u_range_digits, '0');
  if (!(is_quiet)) { console.log(`\nMaking directory ${pad_index}`); }

  const cmd = is_win
    ? w_mkdir(pad_index)
    : l_mkdir(pad_index)

  try {
    execSync( cmd );
  } catch (e) { }

}





function test() {

  const trim = '9876543210'.substring(0, range_digits);

  console.log(`range ${range_digits}, mask ${mask_digits} ${mask}, parallelism ${parallelism}`);
  console.log(`  example: ${filename_instance(0,    range_digits, mask_digits, 'example##.png')}`);
  console.log(`  example: ${filename_instance(trim, range_digits, mask_digits, 'example##.png')}`);
  console.log(`  example: ${move_command(     trim, range_digits, mask_digits, 'example##.png')}`);

}





function make_range(u_dir_idx) {
  mkdir(u_dir_idx, range_digits);
  move_command(u_dir_idx, range_digits, mask_digits, mask)
}





function bootstrap() {

  if (options['test']) {
    test();
  } else {

    const dec = dec_range(range_digits);

    dec.map(d => make_range(d));

  }

}

bootstrap();





module.exports = { bootstrap };
