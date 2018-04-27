# coding: utf-8

#######
'''
This script is made for Python3
To run it, you need to add a path to the directories you want to process as a paramter:
python processTEI.py path/to/directory/1 path/to/directory/2 ...
'''

from bs4 import BeautifulSoup
import os
import sys


def file_is_empty(path):
    return os.stat(path).st_size==0

def listXMLfiles(repertoire):
    fichierstexte = [] #liste fichiers
    for nomFichier in os.listdir(repertoire):
        if nomFichier.endswith(".xml"):
            pathFile = repertoire + "/" + nomFichier
            if file_is_empty(pathFile) == False:
                fichierstexte.append(pathFile)
    return fichierstexte


def load(file):
    #load XML files with Beautiful Soup
    with open(file) as sskf:
        soup = BeautifulSoup(sskf, "xml")
    return soup


def checkXmlId(dirList):
    # Check in all XML files of one or more directory the xml:id of the TEI root element
    # If there is not : add one (from the file name without the ".xml" extension
    # If there is one : change it the same way or leave it as it is
    for folder in dirList:
        files = (listXMLfiles(folder))
        countchanges = 0
        countadds = 0
        for file in files:
            getID = file[len(folder) + 1:len(file) - 4]
            soup = load(file)
            if soup.TEI.has_attr('xml:id'):
                if soup.TEI['xml:id'] != getID:
                    soup.TEI['xml:id'] = getID
                    with open(file, 'w') as output:
                        output.write(soup)
                    print("CHANGE " + file + " = " + soup.TEI['xml:id'])
                    countchanges+=1

            else:
                soup.TEI['xml:id'] = getID
                with open(file, 'w') as output:
                    output.write(soup)
                print("ADD " + file + " = " + soup.TEI['xml:id'])
                countadds+=1
    return countadds, countchanges

def normalizeSPace(dirList):
    for folder in dirList:
        files = (listXMLfiles(folder))
        for file in files:
            with open(file) as file:
                soup = BeautifulSoup(file, "xml")
                print(str(soup).replace("> ", ">").replace(" </", "</"))
    return


def getContributors(dirList):
    for folder in dirList:
        files = (listXMLfiles(folder))
        authors = []
        for file in files:
            with open(file) as file:
                soup = BeautifulSoup(file, "xml")
                scontribs = soup.find_all("author")
                for contrib in scontribs:
                    line = str(contrib.persName.text).strip()+" ("+str(contrib.affiliation.text).strip()+")\n"
                    authors.append(line)
        with open("../scenariosContributors.txt", "w") as contributors:
            authors = list(set(authors))
            authors.insert(0, '''SSK Scenarios contributors\n*************************\n\n''')
            contributors.writelines(authors)
    return

if __name__ == '__main__':
    funcChoice = sys.argv[1]

    # update dirList when needed, or uncomment the line below (and comment the following one) to pass the paths are arguments
    #dirList = sys.argv[2:]
    dirList = ["../scenarios", "../steps"]
    if funcChoice == "checkId":
        adds,changes=checkXmlId(dirList)
        print("Nombre d'xml:id ajoutés : "+str(adds))
        print("Nombre d'xml:id modifiés : "+str(changes))
    elif funcChoice == "normalizeSpace":
        normalizeSPace(dirList)
    elif funcChoice == "getContributors":
        getContributors(dirList)
