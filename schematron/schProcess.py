#coding: utf-8

#OR use schvalidator https://github.com/openSUSE/schvalidator
# Get the report and do something with it. See end of document


import sys
import subprocess
import re
import os
from lxml import etree as ET
from bs4 import BeautifulSoup
from datetime import datetime
from time import strftime

# Calling the shell script that execute the schematron validation
reportFolder="reports" + str(datetime.now().strftime('%Y%m%d_%H%M%S'))
schematronTransformation = subprocess.call(['./schProcess.sh', reportFolder, '../scenarios', '../steps'])

# Manage input files to handle
def get_files(d):
    filesList = []  # liste fichiers
    for fileName in os.listdir(d):
        if fileName.endswith(".xml"):
            filesList.append(d + "/" + fileName)
    return filesList

def loadReport(xmlfile):
    with open(xmlfile) as file:
        testedFile = BeautifulSoup(file, 'xml')
        #testedFile = ET.parse(file)
        return testedFile

def loadSource(xmlfile):
    parser = ET.XMLParser(ns_clean=True)
    tree = ET.parse(xmlfile, parser)
    return tree


def getLocations(assertLocation):
    # patters to process the xpathes
    pattern1 = re.compile('/\*:')
    pattern2 = re.compile('\[namespace-uri\(\)=\'http://www\.tei\-c\.org/ns/1\.0\'\]')
    pattern3 = re.compile('/')

    location1 = re.sub(pattern1, '/', assertLocation)
    location2 = re.sub(pattern2, '', location1)
    # Different processings if the context node is root or not
    if len(location2) > 7:
        locationNorm = re.sub(pattern3, '/{http://www.tei-c.org/ns/1.0}', location2[7:])[1:]
    else:
        locationNorm = re.sub(pattern3, '/{http://www.tei-c.org/ns/1.0}', location2)[1:]

    location = tree.getroot().find(locationNorm)
    return location2, location

reports = get_files(reportFolder)

for report in reports:
    diagnostic = []
    svrl = loadReport(report)
    filePath = svrl.find('active-pattern')['document'][5:]
    tree = loadSource(filePath)


    fired = svrl.find_all('failed-assert')
    successfulReports = svrl.find_all('successful-report')
    reports.append(successfulReports)

    for fire in fired:
        location = getLocations(fire['location'])

    rule = {
            "context": fire.findPrevious('fired-rule')['context'],
            "test": fire['test'],
            "location": location[0],
            "line": location[1].sourceline,
            "tag": location[1].tag,
            "attributes" : location[1].attrib,
            "nodeText": location[1].text,
            "message": fire.text
        }
    diagnostic.append(rule)

    print(svrl.find('fired-rule').findPrevious('active-pattern'))

#xpathes:
# Context = preceding-sibling::svrl:fired-rule[1]/@context
# svrl:successful-report/@test
# svrl:successful-report/@location
# svrl:successful-report/svrl:text
# svrl:failed-assert/@test
# svrl:failed-assert/@location
# svrl:failed-assert/svrl:text