#coding: utf-8

import subprocess
import os
import sys
from bs4 import BeautifulSoup
from datetime import datetime
import csv
from ssk import schSSK
import requests
import urllib.request as req

ssk = schSSK()

url = "http://ssk.paris.inria.fr:8080/ssk_services-0.0.1/api/scenarios?id="
scenarios = ssk.get_files("../scenarios")
folder = "../API/scenariosExport2/"
ssk.create_directory(folder)
for scenario in scenarios:
    id = str(scenario)[13:-4]
    r = requests.get(url+id)
    file = folder + id + ".xml"
    with open(file, 'wb') as f:
        f.write(r.content)

source = '-s:'+folder
outFolder = "../API/print2/"
ssk.create_directory(outFolder)
out = '-o:'+ outFolder
tei2print = subprocess.run(['saxon', source, '-xsl:../API/scenario2print.xsl', out])
prints = ssk.get_files(outFolder)
for printo in prints:
    print2docx = subprocess.run(['../spec/Stylesheets/bin/teitodocx', printo])