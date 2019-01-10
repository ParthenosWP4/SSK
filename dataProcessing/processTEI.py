# coding: utf-8

#######
'''
This script is made for Python3
'''

from bs4 import BeautifulSoup
import os
import sys
import re
import vkbeautify as vkb

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


### DON'T USE, HANDLED WITH XSLT => processTEI.xsl
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

### DON'T USE, HANDLED WITH XSLT => processTEI.xsl
def normalizeSPace(dirList):
    for folder in dirList:
        files = (listXMLfiles(folder))
        for file in files:
            pretty = vkb.xml(file)
            normalized = re.sub(r'> ', r'>', pretty)
            normalized = re.sub(r' </', r'</', normalized)
            with open(file, 'w') as output:
                output.write(normalized)
            # with open(file, 'r+') as file:
            #     old=file.read()
            #     normalized=re.sub(r'> ', r'>', old)
            #     normalized=re.sub(r' </', r'</', normalized)
            #     file.seek(0)
            #     file.truncate()
            #     file.write(normalized)
            #     file.close()
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
    if funcChoice == "getContributors":
        getContributors(dirList)
