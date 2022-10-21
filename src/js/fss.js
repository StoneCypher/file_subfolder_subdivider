
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





// var { spawn, exec } = require('child_process');





const default_range_digits = 3,
      default_mask_digits  = 4,
      default_mask         = 'frame$$.png',
      default_parallelism  = 1;





const { program } = require('commander');

program
  .option('-d, --mask-digits <number>',  'count of question marks in the file mask', default_mask_digits.toString())
  .option('-r, --range-digits <number>', 'digits to expand to; use 0 to not expand', default_range_digits.toString())
  .option('-m, --mask <string>',         'text mask for filename; use $$ for inset', default_mask)
  .option('-p, --parallelism <number>',  'maximum movers to run in parallel',        default_parallelism);

program.parse();





const options      = program.opts(),
      parallelism  = options['parallelism']  ?? default_parallelism,
      range_digits = options['range-digits'] ?? default_range_digits,
      mask_digits  = options['mask-digits']  ?? default_mask_digits,
      mask         = options['mask']         ?? default_mask;





function filename_instance(index, range_digits, mask_digits, mask) {

  const [ lo, hi ] = mask.split('$$');
  if (lo === undefined) { throw 'mask completely missing'; }
  if (hi === undefined) { throw 'mask missing $$ breakpoint'; }

  const inset   = index.toString().padStart(range_digits, '0'),
        maskset = ''.padStart(mask_digits, '?');

  return `${lo}${inset}${maskset}${hi}`;

}





function bootstrap() {
  console.log(`range ${range_digits}, mask ${mask_digits} ${mask}, parallelism ${parallelism}`);
}

bootstrap();





module.exports = { bootstrap };
