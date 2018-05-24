#!/usr/bin/env python

import os
import sys
import glob
import time


inpath = '../data/TaDiRAH/xml'
outpath = '../data/out'
outfile = outpath+'/TaDiRAH.tbx.xml'

if not os.path.exists(outpath): os.makedirs(outpath)


# transform

cmd = 'saxon -it:main -xsl:toTBX.xsl inpath=\"'+inpath+'\" outpath=\"'+outfile+'\"'
print(cmd)
os.system(cmd)


# validate

os.system('./validate.sh')
os.system('cat xmllint-out.txt')
