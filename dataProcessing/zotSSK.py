#coding: utf-8

import subprocess
import os
import sys
from bs4 import BeautifulSoup
from datetime import datetime
import csv
from dataProcessing.ssk import schSSK

#parse les steps, test les ressources, et check celles qui ne sont pas des ID zotero.


ssk = schSSK()
steps = ssk.get_files("../steps")

hardLinks = []
for step in steps:
    parsedStep = ssk.loadBS(step)
    linkGrps = parsedStep.findAll("linkGrp")

    for linkGrp in linkGrps:
        refs = linkGrp.findAll("ref")

        for ref in refs:
            if ref.has_attr("target"):
                target = ref["target"]
                if target.startswith("http"):
                    hardlink = {
                        "step" : step,
                        "resource" : str(target)
                    }
                    hardLinks.append(hardlink)

keys = hardLinks[0].keys()

with open("hardLinks.csv", 'w') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(hardLinks)
                # check Zotero si la ressource existe
                # Si non, on la crée avec API
                # Si oui, on récupère l'ID et on remplace