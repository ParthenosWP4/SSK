#coding: utf-8

#OR use schvalidator https://github.com/openSUSE/schvalidator
# Get the report and do something with it. See end of document

import subprocess
import os
from bs4 import BeautifulSoup
from datetime import datetime
from ssk import schSSK

#Function section (to be moved in a separate file
#################################################
#################################################

# class schSSK:
#
#     def create_directory(directory):
#         """Create a new directory.
#         :param directory: path to new directory
#         :type directory: string
#         """
#         if not os.path.exists(directory):
#             os.makedirs(directory)
#
#     # Manage input files to handle
#     def get_files(d):
#         filesList = []  # liste fichiers
#         for fileName in os.listdir(d):
#             if fileName.endswith(".xml"):
#                 filesList.append(d + "/" + fileName)
#         return filesList
#
#     def loadReport(xmlfile):
#         with open(xmlfile) as file:
#             testedFile = BeautifulSoup(file, 'xml')
#             return testedFile
#
#     def loadSource(xmlfile):
#         parser = ET.XMLParser(ns_clean=True)
#         tree = ET.parse(xmlfile, parser)
#         return tree
#
#     def parseSVRL(svrl, tree):
#         diagnostic = []
#         fired = svrl.find_all('failed-assert')
#         successfulReports = svrl.find_all('successful-report')
#         fired.extend(successfulReports)
#         for fire in fired:
#             location = ssk.getLocations(fire.attrs['location'], tree)
#             if location[1] is not None:
#                 lineNumber = location[1].sourceline
#                 tagName = location[1].tag
#                 tagText = location[1].text
#             else:
#                 lineNumber = ""
#                 tagName = ""
#                 tagText = ""
#
#             message = " ".join(fire.text.split())
#             rule = {
#                     "context": fire.findPrevious('fired-rule')['context'],
#                     "test": fire['test'],
#                     "location": location[0],
#                     "line": lineNumber,
#                     "tag" : tagName,
#                     # "attributes" : location[1].attrib,
#                     "nodeText": tagText,
#                     "message": message
#                 }
#             diagnostic.append(rule)
#         return diagnostic
#
#     def getLocations(assertLocation, tree):
#         # patters to process the xpathes
#         pattern1 = re.compile('/\*:')
#         pattern2 = re.compile('\[namespace-uri\(\)=\'http://www\.tei\-c\.org/ns/1\.0\'\]')
#         pattern3 = re.compile('/')
#
#         location1 = re.sub(pattern1, '/', assertLocation)
#         location2 = re.sub(pattern2, '', location1)
#         # Different processings if the context node is root or not
#         if len(location2) > 7:
#             locationNorm = re.sub(pattern3, '/{http://www.tei-c.org/ns/1.0}', location2[7:])[1:]
#         else:
#             locationNorm = re.sub(pattern3, '/{http://www.tei-c.org/ns/1.0}', location2)[1:]
#
#         location = tree.getroot().find(locationNorm)
#         return location2, location
#
#     def writeCSV(diagnostic, report, reportFolder):
#         keys = diagnostic[0].keys()
#         reportFile = re.search('\/(.+?)\.xml', report).group(1) + ".csv"
#         csvFile = reportFolder + "/" + os.path.basename(os.path.normpath(reportFile))
#
#         with open(csvFile, 'w') as output_file:
#             dict_writer = csv.DictWriter(output_file, keys)
#             dict_writer.writeheader()
#             dict_writer.writerows(diagnostic)

#################################################
#################################################

ssk = schSSK()
reportsFolder = "reports" + str(datetime.now().strftime('%Y%m%d_%H%M%S'))

# Add a control here to remove the scenarios marked as unstable ("unst")
ssk.create_directory(reportsFolder)

scenariosFolder = os.getcwd() + "/" + reportsFolder + "/scenarios_temp"
ssk.create_directory(scenariosFolder)
try:
    sch2xsl = subprocess.run(['saxon', '-s:qualCheckSSK.sch', '-xsl:code/iso_svrl_for_xslt2.xsl', '-o:qualCheckSSK.xsl'])
    try:
        outputSc = "-o:"+scenariosFolder
        SVRLscenarios = subprocess.run(['saxon', '-s:../scenarios', '-xsl:qualCheckSSK.xsl', outputSc])
    except:
        print("Error validating scenarios files")
except:
    print("Error transforming Schematron in XSLT")

listScReports = ssk.get_files(scenariosFolder)

for report in listScReports:
    reportFolderName = os.path.basename(os.path.normpath(report))[:-4]
    reportFolder = reportsFolder + "/" + reportFolderName
    ssk.create_directory(reportFolder)
    try:
        svrl = ssk.loadBS(report)
        filePath = svrl.find('active-pattern')['document'][5:]
        tree = ssk.loadTree(filePath)
        diagnostic = ssk.parseSVRL(svrl, tree)
        try:
            ssk.writeCSV(diagnostic, report, reportFolder)
            #create ReadMe.txt
        except:
            print("Error writing CSV for" + report)

        if tree.getroot().get('type') == 'researchScenario':
            steps = tree.findall(".//{http://www.tei-c.org/ns/1.0}event")
            # This doesn't work if a scenario is listed in <listEvent>

            # Source file ../steps/SSK_sc_digitization.xml does not exist
            # Error validating steps files

            stepsFolder = reportFolder + "/steps"
            ssk.create_directory(stepsFolder)
            readmeFile = reportFolder + "/readme.txt"
            lines = ["steps checked:\n\n"]
            with open(readmeFile, "w") as f:
                firstLine = "Validation report for https://github.com/ParthenosWP4/SSK/tree/master/scenarios/" + os.path.basename(os.path.normpath(report)) + "\n"
                f.write(firstLine)
            for step in steps:
                Id = str(step.get("ref")) + ".xml"
                readMeLine = "- Step https://github.com/ParthenosWP4/SSK/tree/master/steps/" + Id + "\n"
                # ParseSVRL the steps corresponding to these IDs
                try:
                    input = "-s:../steps/" + Id
                    query = "saxon " + input + " -xsl:qualCheckSSK.xsl"
                    parseStep = subprocess.check_output(query, shell=True)
                    svrlSt = BeautifulSoup(parseStep, 'xml')
                    filePathSt = svrlSt.find('active-pattern')['document'][5:]
                    treeSt = ssk.loadTree(filePathSt)
                    stepDiag = ssk.parseSVRL(svrlSt, treeSt)
                    try:
                        ssk.writeCSV(stepDiag, input[3:], stepsFolder)
                        lines.append(readMeLine)
                    except:
                        print("Error writing CSV for" + input[3:])

                except:
                    print("Error validating steps file: " + Id)
            with open(readmeFile, "a") as f:
                f.writelines(lines)
# https://github.com/ParthenosWP4/SSK/tree/master/steps/
    except:
        print("error "+report)

subprocess.run(["rm", "-r", scenariosFolder])