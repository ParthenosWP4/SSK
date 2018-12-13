#coding: utf-8

import re
import os
from lxml import etree as ET
from bs4 import BeautifulSoup
import csv


class schSSK:

    def create_directory(self, directory):
        """Create a new directory.
        :param directory: path to new directory
        :type directory: string
        """
        if not os.path.exists(directory):
            os.makedirs(directory)

    # Manage input files to handle
    def get_files(self, d):
        filesList = []  # liste fichiers
        for fileName in os.listdir(d):
            if fileName.endswith(".xml"):
                filesList.append(d + "/" + fileName)
        return filesList

    def loadBS(self, xmlfile):
        with open(xmlfile) as file:
            testedFile = BeautifulSoup(file, 'xml')
            return testedFile

    def loadTree(self, xmlfile):
        parser = ET.XMLParser(ns_clean=True)
        tree = ET.parse(xmlfile, parser)
        return tree

    def parseSVRL(self, svrl, tree):
        diagnostic = []
        fired = svrl.find_all('failed-assert')
        successfulReports = svrl.find_all('successful-report')
        fired.extend(successfulReports)
        for fire in fired:
            location = self.getLocations(fire.attrs['location'], tree)
            if location[1] is not None:
                lineNumber = location[1].sourceline
                tagName = location[1].tag
                tagText = location[1].text
            else:
                lineNumber = ""
                tagName = ""
                tagText = ""
            role = fire.attrs['role']
            message = " ".join(fire.text.split())
            rule = {
                   # "context": fire.findPrevious('fired-rule')['context'],
                    #"test": fire['test'],
                    "location": location[0],
                    "line": lineNumber,
                    "role" : role,
                    #"tag" : tagName,
                    # "attributes" : location[1].attrib,
                    #"nodeText": tagText,
                    "message": message
                }
            diagnostic.append(rule)
        return diagnostic

    def getLocations(self, assertLocation, tree):
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

    def writeCSV(self, diagnostic, report, reportFolder):
        keys = diagnostic[0].keys()
        reportFile = re.search('\/(.+?)\.xml', report).group(1) + "_report.csv"
        csvFile = reportFolder + "/" + os.path.basename(os.path.normpath(reportFile))

        with open(csvFile, 'w') as output_file:
            dict_writer = csv.DictWriter(output_file, keys)
            dict_writer.writeheader()
            dict_writer.writerows(diagnostic)