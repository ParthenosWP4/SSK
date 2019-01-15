# coding: utf-8

#######
'''
This script is made for Python3
'''

from bs4 import BeautifulSoup
import sys
from ssk import schSSK

ssk = schSSK()

if __name__ == '__main__':
    funcChoice = sys.argv[1]

    # update dirList when needed, or uncomment the line below (and comment the following one) to pass the paths are arguments
    #dirList = sys.argv[2:]
    dirList = ["../scenarios", "../steps"]
    if funcChoice == "getContributors":
        ssk.getContributors(dirList, "../scenariosContributors.rst")