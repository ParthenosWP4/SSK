#coding: utf-8

from os import listdir
from bs4 import BeautifulSoup
import json

#Extracting the information from the XML nodes

xmlBase = "http://www.github.com/ParthenosWP4/SSK/tree/master/"

def get_files(d):
    fichiersTexte = []  # liste fichiers
    for nomFichier in listdir(d):
        if nomFichier.endswith(".xml"):
            fichiersTexte.append(d + "/" + nomFichier)
    return fichiersTexte

def parseSteps(files):

    dictSteps = []

    for xml_file in files:
        with open(xml_file) as file:
            soup = BeautifulSoup(file, "xml")

        heads = soup.find_all("head")
        for head in heads:
            if head['xml:lang'] == "en":
                hText = head.text.replace('\n', ' ').replace('\r', '').replace('  ', '').strip()
                step = {
                    "name" : hText,
                    "url" : xmlBase + xml_file
                    }
                dictSteps.append(step)
    return dictSteps


def parseSSK(files):
    listScens = []
    stepsList = parseSteps(get_files("../steps"))
    for xml_file in files:
        with open(xml_file) as file:
            soup = BeautifulSoup(file, "xml")
        head = soup.find("head", {"type" : "scenarioTitle"})
        hText = head.text.replace('\n',' ').replace('\r', '').replace('  ', '').strip()
        dictScen = {
            "name" : hText,
            "url" : xmlBase + xml_file
        }
        dictScen["steps"] = []
        events = soup.find_all("event")
        for event in events:
            eventRef = event["ref"]
            for i in range(len(stepsList)):
                if eventRef in stepsList[i]["url"]:
                    step = {
                            "name" : stepsList[i]["name"],
                            "url" : stepsList[i]["url"]
                         }
                    dictScen["steps"].append(step)

        listScens.append(dictScen)
    SSKParsed = {
        "scenarios" : listScens,
        "steps" : stepsList
    }

    return SSKParsed

parsedSSK = parseSSK(get_files("../scenarios"))

with open('scenariosStepsSSK2.json', 'w') as file:
    json.dump(parsedSSK, file)

