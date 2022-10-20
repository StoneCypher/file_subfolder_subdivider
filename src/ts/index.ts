
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




let digits = 5,
    mask   = '';





var { spawn, exec } = require('child_process');





export {

};
