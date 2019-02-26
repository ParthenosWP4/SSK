<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl" 
    exclude-result-prefixes="xd tei" 
    version="2.0">
    <xsl:output indent="yes"/>
    <xsl:strip-space elements="*"/>

    <xd:doc scope="stylesheet">
        <xd:desc>
            <xd:p><xd:b>Author:</xd:b> Charles Riondet charles.riondet@inria.fr</xd:p>
            <xd:p>This stylesheet process SSK TEI files to check the xml:id and remove extra white
                spaces before and after textual nodes.</xd:p>
        </xd:desc>
    </xd:doc>

    <xd:doc scope="component">
        <xd:desc>
            <xd:p>get the value of the file name for the @xml:id of the TEI element.</xd:p>
            <xd:p>A prefix "id_" is added when the filename starts with a number (i.e. not an xml
                name valid pattern)</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:variable name="fileName">
        <xsl:choose>
            <xsl:when test="matches(tokenize(base-uri(), '/')[last()], '^\d')">
                <xsl:value-of
                    select="concat('id_', substring-before(tokenize(base-uri(), '/')[last()], '.xml'))"
                />
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="substring-before(tokenize(base-uri(), '/')[last()], '.xml')"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="schemaURI"
        select="'https://raw.githubusercontent.com/ParthenosWP4/SSK/master/spec/TEI_SSK_ODD.rng'"/>

    <!-- Need to check in @xml:id is an XML name -->

    <xd:doc scope="component">
        <xd:desc>
            <xd:p>If there is no @xml:id, this template creates it with the with the value taken
                from the variable $filename, and copy the reste of the nodes</xd:p>
        </xd:desc>
    </xd:doc>
    <xsl:template match="tei:TEI[not(@xml:id)]">
        <xsl:message>Checking <xsl:value-of select="tokenize(base-uri(), '/')[last()]"
            /></xsl:message>
        <xsl:message>TEI has no @xml:id attribute.</xsl:message>

        <xsl:copy>
            <xsl:attribute name="xml:id" select="$fileName"/>
            <xsl:message>@xml:id created</xsl:message>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>

    <xd:doc scope="component">
        <xd:desc>Copy all nodes and attributes</xd:desc>
    </xd:doc>
    <xsl:template match="node() | @*">
        <xsl:copy>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>


    <xd:doc>
        <xd:desc>This template was created to reformat the files after they were modified with a
            python script using the library Beautiful Soup, that adds extra white spaces before and
            after the text nodes.</xd:desc>
    </xd:doc>
    <xsl:template match="text()[starts-with(., ' ') and ends-with(., ' ')]">
        <xsl:choose>
            <xsl:when test=".[position() = 1]/following-sibling::*">
                <xsl:value-of select="substring(., 2, string-length(.) - 1)"/>
            </xsl:when>
            <xsl:when test="./preceding-sibling::*">
                <xsl:value-of select="substring(., 1, string-length(.) - 1)"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="substring(., 2, string-length(.) - 2)"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xd:doc scope="component">
        <xd:desc>This template checks if the @xml:id of the TEI element has the expected
            value.</xd:desc>
    </xd:doc>
    <xsl:template match="tei:TEI/@xml:id">
      <xsl:variable name="currentID" select="."/>
      <xsl:if test="boolean($currentID = $fileName) = false()">
        <xsl:message>current value of xml:id: //<xsl:value-of select="$currentID"/>//</xsl:message>
        <xsl:message>current value of file name without the extension: //<xsl:value-of
          select="$fileName"/>//</xsl:message>
        <xsl:message>
          <xsl:value-of select="boolean($currentID = $fileName)"/>
        </xsl:message>
      </xsl:if>
       
        <xsl:choose>
            <xsl:when test="$currentID = $fileName">
                <xsl:attribute name="xml:id" select="$currentID"/>
            </xsl:when>
            <xsl:when test="not($currentID = $fileName)">
                <xsl:message>xml:id changed to file name</xsl:message>
                <xsl:attribute name="xml:id" select="$fileName"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    
    <xd:doc>
        <xd:desc>Add Sponsor element</xd:desc>
    </xd:doc>
    <xsl:template match="tei:titleStmt"  xmlns="http://www.tei-c.org/ns/1.0">
        <xsl:choose>
            <xsl:when test="tei:sponsor">
                <xsl:copy>
                    <xsl:apply-templates/>
                </xsl:copy>
            </xsl:when>
            <xsl:otherwise>
                <xsl:copy>
                    <xsl:apply-templates/>
                    <sponsor>PARTHENOS</sponsor>
                </xsl:copy>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xd:doc>
        <xd:desc>Remove 'Parthenos' in authority element</xd:desc>
    </xd:doc>
    <xsl:template match="tei:authority"  xmlns="http://www.tei-c.org/ns/1.0">
        <xsl:choose>
            <xsl:when test=". = 'Parthenos' or . = 'PARTHENOS'">
                <authority/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:copy>
                    <xsl:apply-templates/>
                </xsl:copy>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>