# file_subfolder_subdivider

What a niche tool.  

Make subdirectories in the current directory, and move batch files into them by wildcard, to cope with NTFS directory read overload problems.  

You do not need this tool.

&nbsp;

&nbsp;

# ... what?

I know, right?

Suppose you're working with frames from video, and you've produced a directory with some ungodly number of PNGs in it.  It turns out that modern NTFS struggles to list a directory somewhere over 15-20k, whereas a 2 hour film on typical American settings is 174k frames, so, ... problem.

Before a proper cope, this tool is to be deployed.

What this tool will do is create a stupid and inappropriately high number of subfolders (by default 500) then attempt to bulk move files into them with wildcards (by default 10k at a time,) which involves no directory listing and therefore proceeds at typical speeds.  

This process proceeds by default for 5m frames, an unrealistically high number, because moving a wildcard range of files that doesn't exist isn't actually an error.

After this process, each folder contains a number of files which can be handled in regular time, so we can just descend into the folders in reverse, and prune them until we find one that isn't empty, yielding a properly lengthed list of directories containing all the frames in range subdivisions.

After this process, the range subdivisions can be imported without slowdown problems in your video editor of choice.

&nbsp;

&nbsp;

# ... ... what?

```
frame_folder_subdivider
```

This will assume the filename `frameXXXX????.png`, where `XXXX` is an increasing number produced by the tool over 0000..0499 by default, and where `????` is the literal mask passed to the move command.  This will move `500*10000` five million frames maximum in blocks of ten thousand each.  Assuming 174,000 frames, this will create 18 directories.

```
file_folder_subdivider --prefix="image" --range=800 --length=3 --masklength=3 --suffix=".bmp"
```

This will assume the filename `imageXXX???.png`, where `XXX` is an increasing number produced by the tool over 000..799 by default, and where `???` is the literal mask passed to the move command.  This will move `800*1000` eight hundred thousand frames maximum in blocks of one thousand each.  Assuming 174,000 frames, this will create 174 directories.

