#!/usr/bin/env python

import os
import sys
import glob
import time

inpath = '../tadirah'
outpath = '../tadirah/xml'

if not os.path.exists(outpath): os.makedirs(outpath)

lang_codes_in = ['deu', 'fra', 'reading', 'spa']    # correspond to directories in github repo
lang_codes_out = ['de', 'fr', 'en', 'es']           # codes to use for output

# merge .md files for each language
for lang_in, lang_out in zip(lang_codes_in, lang_codes_out):
    filelist = glob.glob(inpath+'/'+lang_in+'/*.md')

    with open(outpath+'/'+lang_out+'.md', 'w') as outfile:
        for fname in filelist:
            with open(fname) as infile:
                for line in infile:
                    if '*' in line:
                        line = line.replace('*', '\n') + '----------\n'
                    outfile.write(line)
                outfile.write('\n')

# transform to xml
filelist = glob.glob(outpath+'/*.md')
for infile in filelist:
    outfile = outpath+'/'+os.path.basename(infile)[:-3]+'.xml'

    cmd = 'pandoc -s \"'+infile+'\" -o \"'+outfile+'\"'
    print(cmd)
    os.system(cmd)
