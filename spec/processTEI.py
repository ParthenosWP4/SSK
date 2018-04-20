# coding: utf-8

#######
'''
This script is made for Python3
To run it, you need to add a path to the directories you want to process as a paramter:
python processTEI.py path/to/directory/1 path/to/directory/2 ...
'''

from bs4 import BeautifulSoup
from os import listdir
import sys

def listXMLfiles(repertoire):
    #List all XML files in a given directory
	fichiersTexte = [] #liste fichiers
	for nomFichier in listdir(repertoire):
		if nomFichier.endswith(".xml"):
			fichiersTexte.append(repertoire + "/" + nomFichier)
	return fichiersTexte


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
                        output.write(soup.prettify())
                    print("CHANGE " + file + " = " + soup.TEI['xml:id'])
                    countchanges+=1

            else:
                soup.TEI['xml:id'] = getID
                with open(file, 'w') as output:
                    output.write(soup.prettify())
                print("ADD " + file + " = " + soup.TEI['xml:id'])
                countadds+=1
    return countadds, countchanges


if __name__ == '__main__':
    dirList = sys.argv[1:]
    adds,changes=checkXmlId(dirList)
    print("Nombre d'xml:id ajoutés : "+str(adds))
    print("Nombre d'xml:id modifiés : "+str(changes))