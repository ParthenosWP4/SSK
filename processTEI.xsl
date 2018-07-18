<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei" version="2.0">
    <xsl:output indent="yes"/>
    <xsl:strip-space elements="*"/>

    <xsl:variable name="fileName">
        <xsl:value-of select="substring-before(tokenize(base-uri(), '/')[last()], '.xml')"/>
    </xsl:variable>
    <xsl:variable name="schemaURI" select="'https://raw.githubusercontent.com/ParthenosWP4/SSK/master/spec/TEI_SSK_ODD.rng'"/>
    
    <!-- Need to check in @xml:id is an XML name --> 
    
    <xsl:template match="tei:TEI[not(@xml:id)]">
        <xsl:message>Checking <xsl:value-of select="tokenize(base-uri(), '/')[last()]"/></xsl:message>
        <xsl:message>TEI has no @xml:id attribute.</xsl:message>
        
        <xsl:copy>
            <xsl:attribute name="xml:id" select="$fileName"/>
            <xsl:message>@xml:id created</xsl:message>
            <xsl:apply-templates select="node()|@*" /> 
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="node() | @*">
        <xsl:copy>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    

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

    
    <xsl:template match="tei:TEI/@xml:id">      
        <xsl:message>Checking <xsl:value-of select="tokenize(base-uri(), '/')[last()]"/></xsl:message>
        <xsl:variable name="currentID" select="."/>
        <xsl:message>current value of xml:id: //<xsl:value-of select="$currentID"/>//</xsl:message>
        <xsl:message>current value of file name without the extension: //<xsl:value-of select="$fileName"/>//</xsl:message>
        <xsl:message><xsl:value-of select="boolean($currentID=$fileName)"/></xsl:message>
        <xsl:choose>
            <xsl:when test="$currentID=$fileName">
                <xsl:message>xml:id equals file name</xsl:message>
                <xsl:attribute name="xml:id" select="$currentID"/>
            </xsl:when>
            <xsl:when test="not($currentID=$fileName)">
                <xsl:message>xml:id changed to file name</xsl:message>
                <xsl:attribute name="xml:id" select="$fileName"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
