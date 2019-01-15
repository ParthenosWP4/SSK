#coding: utf-8

import subprocess
import os
import sys
from bs4 import BeautifulSoup
from datetime import datetime
from dataProcessing.ssk import schSSK

#parameter for input (scenarios and steps)
if len(sys.argv) > 1:
    paramSc = sys.argv[1]
else:
    paramSc = "../../scenarios"

ssk = schSSK()
reportsFolder = "reports_" + paramSc.split("/")[-1] + "_" + str(datetime.now().strftime('%Y%m%d_%H%M%S'))

# Add a control here to remove the scenarios marked as unstable ("unst")
ssk.create_directory(reportsFolder)


try:
    sch2xsl = subprocess.run(['saxon', '-s:qualCheckSSK.sch', '-xsl:code/iso_svrl_for_xslt2.xsl', '-o:qualCheckSSK.xsl'])
    try:
        inputSc = "-s:"+paramSc
        scenariosFolder = os.getcwd() + "/" + reportsFolder + "/scenarios_temp"
        ssk.create_directory(scenariosFolder)
        if os.path.isdir(os.getcwd() + "/" + paramSc):
            outputSc = "-o:"+scenariosFolder
        elif os.path.isfile(os.getcwd() + "/" + paramSc):
            outputSc = "-o:" + scenariosFolder + "/" + paramSc.split("/")[-1]
        SVRLscenarios = subprocess.run(['saxon', inputSc, '-xsl:qualCheckSSK.xsl', outputSc])
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
                    input = "-s:../../steps/" + Id
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