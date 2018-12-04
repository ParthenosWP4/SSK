#!/bin/bash
# Schematron process of SSK TEI files and get SVRL reports


mkdir $1

saxon -s:qualCheckSSK.sch -xsl:code/iso_svrl_for_xslt2.xsl -o:qualCheckSSK.xsl
if [ -d $2 ]
then
    saxon -s:$2 -xsl:qualCheckSSK.xsl -o:$1
fi
if [ -d $3 ]
then
    saxon -s:$3 -xsl:qualCheckSSK.xsl -o:$1
fi
cd $1
for j in *.xml; do mv -- "$j" "${j%.xml}_report.xml"; done