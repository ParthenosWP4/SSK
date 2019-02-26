#coding: utf-8

import subprocess
import os
import sys
from bs4 import BeautifulSoup
from datetime import datetime
import csv
from ssk import schSSK

#parse les steps, test les ressources, et check celles qui ne sont pas des ID zotero.


ssk = schSSK()
steps = ssk.get_files("../steps")

hardLinks = []
noZots = []
for step in steps:
    parsedStep = ssk.loadBS(step)
    linkGrps = parsedStep.findAll("linkGrp")

    for linkGrp in linkGrps:
        refs = linkGrp.findAll("ref")
        for ref in refs:
            if ref.has_attr("source"):
                source = ref["source"]
                if not source.startswith("zotero"):
                    noZot = {
                        "step" : step,
                        "source" : str(source)
                    }
            # if ref.has_attr("target"):
            #     target = ref["target"]
            #     if target.startswith("http"):
            #         hardlink = {
            #             "step" : step,
            #             "resource" : str(target)
            #         }
            #         hardLinks.append(hardlink)
            #         noZots.append(noZot)
if len(hardLinks) == 0:
    print("No hard Links in the SSK. Good job")
else:
    keys = hardLinks[0].keys()
    with open("hardLinks.csv", 'w') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(hardLinks)

if len(noZots) == 0:
    print("No source incoherence in SSK. Good job")
else:
    keys = noZots[0].keys()
    with open("noZots.csv", 'w') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(noZots)

                # check Zotero si la ressource existe
                    # Si non, on la crée avec API
                    # Si oui, on récupère l'ID et on remplace