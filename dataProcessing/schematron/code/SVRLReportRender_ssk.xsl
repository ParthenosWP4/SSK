
<!--
 Programmers: Rick Jelliffe, Cheney Xin, Rahul Grewel
-->
<!--
	The code was written under sponsorship of JSTOR The Scholarly Journal Archive

	This code is also available under the GPL (v3. http://www.gnu.org/copyleft/gpl.html)
 -->

 <!--
Open Source Initiative OSI - The MIT License:Licensing
[OSI Approved License]

The MIT License

	This code copyright 2007-2009 jointly and severally
		Allette Systems Pty. Ltd. (www.allette.com.au),
		Topologi Pty. Ltd. (www.topologi.com),
		JSTOR (http://www.jstor.org/)
		and Rick Jelliffe.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

-->

<xsl:stylesheet version="3.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:xs="http://www.w3.org/2001/XMLSchema"
				xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
				xmlns:sch="http://www.ascc.net/xml/schematron"
				xmlns:iso="http://purl.oclc.org/dsdl/schematron"
				xmlns:tei="http://tei-c.org/ns/1.0"
				xmlns="http://www.w3.org/1999/xhtml" xpath-default-namespace="tei">

<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="/">
	<html>
		<xsl:comment>no seeding</xsl:comment>
		<head>
			<title>SVRL Validation Report</title>
			<link rel="stylesheet" href="../code/SVRLreports.css" type="text/css" />
		</head>
		<body>
			<h1>SVRL Validation Report</h1>
      <div class="filename">
      	<h2>Instance File Name: <xsl:value-of select="svrl:schematron-output/svrl:active-pattern[1]/@document"/></h2>
      </div>
      <div class="status">
      	<h3 class="no">You have <xsl:value-of select="(count(svrl:schematron-output/svrl:successful-report) + count(svrl:schematron-output/svrl:failed-assert))"/> alerts related to your document.</h3>
        
      </div>
      <div class="schematron">
        <!--<div class="schematron-title">
          <p>Schematron Title: <xsl:value-of select="svrl:schematron-output/@title" /></p>
        </div>
        <div class="schematron-version">
          <p>Schematron Version: <xsl:value-of select="svrl:schematron-output/@schemaVersion" /></p>
        </div>-->
        <!--
        <xsl:for-each select="svrl:ns-prefix-in-attribute-values">
          <div class="schematron-ns">
            <p>Schematron Namespace Prefix: <xsl:value-of select="@prefix" /></p>
            <p>Schematron Namespace URI: <xsl:value-of select="@uri" /></p>
          </div>
        </xsl:for-each>
        -->
        <div class="result">
        	<table>
        		<tr>
        			<th>Test type</th><th>context</th><th>Test</th><th>Location</th><th>Description</th>
        		</tr>
          <xsl:apply-templates />
        	</table>
        </div>
      </div>
			<p><b>Date: </b> <xsl:value-of select="format-date(xs:date(current-date()), '[D] [MNn], [Y]')" /></p>
		</body>
	</html>
</xsl:template>

<xsl:template match="svrl:successful-report">
	<tr class="result-report">
		<td>succesful report</td>
		<td>
			<xsl:value-of select="preceding-sibling::svrl:fired-rule[1]/@context"/>
		</td>
		<td class="result-report-test">
			<xsl:value-of select="@test" />
		</td>
		<td class="result-report-location">
			<xsl:value-of select="@location"/>		
			
		</td>
		<td class="result-report-text">
			<xsl:value-of select="svrl:text" />
		</td>
	</tr>
</xsl:template>

<xsl:template match="svrl:failed-assert">
	<tr class="result-assert">
		<td>failed assert</td>
		<td>
			<xsl:value-of select="preceding-sibling::svrl:fired-rule[1]/@context"/>
		</td>
		<td class="result-assert-test">
			<xsl:value-of select="@test" />
		</td>
		<td class="result-assert-location">
			<xsl:value-of select="@location"/>
			
		</td>
		<td class="result-assert-text">
			<xsl:value-of select="svrl:text" />
		</td>
	</tr>
</xsl:template>

<xsl:template match="text()">
</xsl:template>

</xsl:stylesheet>
