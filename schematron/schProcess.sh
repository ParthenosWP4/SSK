#!/bin/bash
# Schematron process of SSK TEI files and get SVRL reports
saxon -s:qualCheckSSK.sch -xsl:code/iso_svrl_for_xslt2.xsl -o:qualCheckSSK.xsl
saxon -s:tests -xsl:qualCheckSSK.xsl -o:reports
