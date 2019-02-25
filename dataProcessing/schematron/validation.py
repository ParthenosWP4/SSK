#coding: utf-8

import subprocess
import os
import sys
import shutil
from bs4 import BeautifulSoup
from datetime import datetime
from pathlib import Path
from dataProcessing.ssk import schSSK


CWD = Path.cwd()
rscPath = Path("code/")
SAXON = rscPath / "saxon9he.jar"
path_to_parser = CWD / SAXON

#parameter for input (scenarios and steps)
if len(sys.argv) != 3:
    print("ERROR: You need to specify the path of the scenario and the steps you want to validate\nusage: $ python validation.py path-to-scenario path-to-steps")
    exit()
else:
    paramSc = Path(sys.argv[1])
    paramSt = Path(sys.argv[2])

ssk = schSSK()
scenarioName= paramSc.name
reportsFolder = "reports_" + scenarioName + "_" + str(datetime.now().strftime('%Y%m%d_%H%M%S'))
print(reportsFolder)
# Add a control here to remove the scenarios marked as unstable ("unst")

ssk.create_directory(reportsFolder)
reportsPath = Path(reportsFolder)

env = dict(os.environ)
env["JAVA_OPTS"] = "foo"

sourcePrefix = "-s:"
xslPrefix = "-xsl:"
outputPrefix = "-o:"

schematronF =  rscPath / "qualCheckSSK.sch"
sch2xslF = rscPath / "iso_svrl_for_xslt2.xsl"
XSL2SVRL = rscPath / "qualCheckSSK.xsl"

try:
    sch2xsl = subprocess.run(['java', '-jar', str(path_to_parser), sourcePrefix+str(schematronF), xslPrefix+str(sch2xslF), outputPrefix+str(XSL2SVRL)], env=env)
    try:
        scenariosFolder = CWD / reportsFolder / "scenarios_temp"
        ssk.create_directory(scenariosFolder)
        if os.path.isdir(CWD / paramSc):
            outputSc = scenariosFolder
        elif os.path.isfile(CWD / paramSc):
            outputSc = scenariosFolder / scenarioName
        SVRLscenarios = subprocess.run(['java', '-jar', str(path_to_parser), sourcePrefix+str(paramSc), xslPrefix+str(XSL2SVRL), outputPrefix+str(outputSc)], env=env)
    except Exception as e:
        print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)

except Exception as e:
        print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)
listScReports = ssk.get_files(scenariosFolder)

for report in listScReports:
    reportFolderName = os.path.basename(os.path.normpath(report))[:-4]
    reportFolder = reportsPath / reportFolderName
    ssk.create_directory(str(reportFolder))
    try:
        svrl = ssk.loadBS(report)
        testedSc = svrl.find('active-pattern')['document'].split("/")[-1]
        if os.path.isdir(CWD / paramSc):
            filePath = str(paramSc / testedSc)
        elif os.path.isfile(CWD / paramSc):
            filePath = str(paramSc)

        tree = ssk.loadTree(filePath)
        diagnostic = ssk.parseSVRL(svrl, tree)
        try:
            ssk.writeCSV(diagnostic, str(report), str(reportFolder))
            #create ReadMe.txt
        except Exception as e:
            print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)

        if tree.getroot().get('type') == 'researchScenario':
            steps = tree.findall(".//{http://www.tei-c.org/ns/1.0}event")
            # This doesn't work if a scenario is listed in <listEvent>

            # Source file ../steps/SSK_sc_digitization.xml does not exist
            # Error validating steps files

            stepsFolder = reportFolder / "steps"
            ssk.create_directory(str(stepsFolder))
            readmeFile = reportFolder / "readme.txt"
            lines = ["steps checked:\n\n"]
            with open(readmeFile, "w") as f:
                firstLine = "Validation report for https://github.com/ParthenosWP4/SSK/tree/master/scenarios/" + os.path.basename(os.path.normpath(report)) + "\n"
                f.write(firstLine)
            for step in steps:
                if step.get("type") == "researchScenario":
                    Id = str(step.get("ref")) + ".xml"
                    readMeLine = "- Step https://github.com/ParthenosWP4/SSK/tree/master/scenarios/" + Id + "\n"
                else:
                    Id = str(step.get("ref")) + ".xml"
                    readMeLine = "- Step https://github.com/ParthenosWP4/SSK/tree/master/steps/" + Id + "\n"
                # ParseSVRL the steps corresponding to these IDs
                try:
                    inputSt = paramSt / Id
                    query = "java -jar " + str(path_to_parser) + " " + sourcePrefix + str(inputSt) + " "  + xslPrefix + str(XSL2SVRL)
                    parseStep = subprocess.check_output(query, shell=True, env=env)
                    svrlSt = BeautifulSoup(parseStep, 'xml')
                    filePathSt = str(inputSt)
                    treeSt = ssk.loadTree(filePathSt)
                    stepDiag = ssk.parseSVRL(svrlSt, treeSt)
                    try:
                        ssk.writeCSV(stepDiag, str(inputSt)[3:], str(stepsFolder))
                        lines.append(readMeLine)
                    except Exception as e:
                        print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)


                except Exception as e:
                    print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)
            with open(readmeFile, "a") as f:
                f.writelines(lines)
# https://github.com/ParthenosWP4/SSK/tree/master/steps/
    except Exception as e:
        print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)

shutil.rmtree(scenariosFolder)