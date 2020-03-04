#!/usr/bin/python3

import glob
import os
import sys
import re

XYZ_RE = re.compile("([A-Za-z]+)\s+([-+]?\d+.?\d+)\s+([-+]?\d+.?\d+)\s+([-+]?\d+.?\d+)")

def stitch(files, outname):
    with open(outname, 'w+') as out:
        for i, fname in enumerate(files, 1):
            print(i, fname)
            out.write(f'MODEL {i}\n')
            with open(fname, 'r') as f:
                n_atoms = int(f.readline().strip())  # n_atoms
                f.readline()                         # title line
                for a in range(1, n_atoms+1):
                    match = XYZ_RE.match(f.readline().strip())
                    atom, x, y, z = match.group(1, 2, 3, 4)
                    x, y, z = float(x), float(y), float(z)
                    out.write('HETATM   {:>2}  {:<2}    *     0     {:7.3f} {:7.3f} {:7.3f}  1.00  0.00           {:<2}\n'.format(a, atom, x, y, z, atom))
            out.write('ENDMDL\n')

def main():
    assert len(sys.argv) == 2
    path = os.path.abspath(sys.argv[1])
    frames = glob.glob(path + '/*.xyz')
    frames.sort()
    stitch(frames, path + '/stitched_f.pdb')
    frames.sort(reverse=True)
    stitch(frames, path + '/stitched_r.pdb')

if __name__ == '__main__':
    main()

