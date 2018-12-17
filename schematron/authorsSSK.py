#coding: utf-8

import subprocess
import re
import os
from lxml import etree as ET
from bs4 import BeautifulSoup
from datetime import datetime
import csv
import sys

from ssk import schSSK

ssk = schSSK()

authorsList= []
scenarios = ssk.get_files("../scenarios")

lengthCal = []
for scenario in scenarios:
    parsed = ssk.loadBS(scenario)
    scAut = {
        "scenarioId": parsed.TEI.attrs["xml:id"],
        "scenarioURL": "https://github.com/ParthenosWP4/SSK/tree/master/"+ scenario[3:],
        "scenarioTitle": parsed.find("title").text
    }
    authors = parsed.find_all("author")
    for i in range(len(authors)):
        authName = authors[i].persName.text
        authAff = authors[i].affiliation.text
        authorKey = "author" + str(i+1)
        scAut[authorKey] = authName + " (" + authAff + ")"
    lengthCal.append(len(scAut))
    authorsList.append(scAut)

maxi = max(lengthCal)

#add additional empty fields for the csv
for scen in authorsList:
    authNumb = len(scen) - 3
    distance = maxi - len(scen)
    if distance > 0:
        for i in range(distance):
            newKey = "author" + str(authNumb + 1 + i)
            scen[newKey] = ""

output=os.getcwd()+"/authors.csv"
with open(output, "w") as f:

    keys = authorsList[maxi].keys()
    dict_writer = csv.DictWriter(f, keys)
    dict_writer.writeheader()
    dict_writer.writerows(authorsList)
