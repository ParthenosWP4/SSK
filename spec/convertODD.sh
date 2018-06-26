#!/bin/bash

# This script generates HTML documentation from TEI_SSK_ODD.xml
# To be executed in the 'spec' directory.
# A local installation of Java 1.6+ and Saxon is required
# For more information, check http://www.tei-c.org/release/doc/tei-xsl/#commandline
OXY_PATH=
#HTML
# We don't use the script provided by the TEI consortium in order to set our own parameters to the XLS stylesheets
saxon -s:TEI_SSK_ODD.xml -xsl:Stylesheets/odds/odd2odd.xsl -o:output.tmp1.xml defaultSource=/Applications/Oxygen\ XML\ Editor/frameworks/tei/xml/tei/odd/p5subset.xml
saxon -s:output.tmp1.xml -xsl:Stylesheets/odds/odd2lite.xsl -o:output.tmp2.xml
rm output.tmp1.xml
saxon -s:output.tmp2.xml -xsl:Stylesheets/html/html.xsl -o:../docs/SSKspec.html institution=PARTHENOS displayMode=rng cssFile=https://www.tei-c.org/release/xml/tei/stylesheet/tei.css cssPrintFile=https://www.tei-c.org/release/xml/tei/stylesheet/tei.css
rm output.tmp2.xml
echo Success
