<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:tei="http://www.tei-c.org/ns/1.0"
  exclude-result-prefixes="xs tei"
  version="2.0">
  <xsl:output encoding="UTF-8" method="xml" indent="yes"/>
  
  <xsl:strip-space elements="*"/>
  
  
  <xsl:template match="/">
    <xsl:processing-instruction name="xml-model">href="https://raw.githubusercontent.com/ParthenosWP4/SSK/master/spec/TEI_SSK_ODD.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"</xsl:processing-instruction> 
    <xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template match="@*|node()" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:TEI">
    <xsl:choose>
      <xsl:when test="/tei:TEI/@xml:base='assets/tei_meta/models/SSKODDforScForm.xml'">
        <TEI xmlns="http://www.tei-c.org/ns/1.0" type="researchScenario">
        <xsl:apply-templates/>
        </TEI>
      </xsl:when>
      <xsl:when test="/tei:TEI/@xml:base='assets/tei_meta/models/SSKODDforStepForm.xml'">
        <TEI xmlns="http://www.tei-c.org/ns/1.0" type="researchStep"><xsl:apply-templates/>
        </TEI>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template match="tei:teiHeader" xmlns="http://www.tei-c.org/ns/1.0">
    <teiHeader>
      <xsl:apply-templates/>
      <revisionDesc>
        <change/>
      </revisionDesc>
    </teiHeader>
  </xsl:template>
  
  <xsl:template match="tei:fileDesc" xmlns="http://www.tei-c.org/ns/1.0">
    <fileDesc>
      <xsl:apply-templates/>
      <sourceDesc>
        <p/>
      </sourceDesc>
    </fileDesc>
  </xsl:template>
  
  <xsl:template match="tei:titleStmt" xmlns="http://www.tei-c.org/ns/1.0">
    <titleStmt>
    <title>
      <xsl:choose>
        <xsl:when test="/tei:TEI/@xml:base='SSKODDforScForm.xml'">
          <xsl:text>"</xsl:text><xsl:value-of select="/tei:TEI/tei:text/tei:body/tei:div/tei:head"/><xsl:text>" scenario</xsl:text>
        </xsl:when>
        <xsl:when test="/tei:TEI/@xml:base='SSKODDforStepForm.xml'">
          <xsl:text>"</xsl:text><xsl:value-of select="/tei:TEI/tei:text/tei:body/tei:listEvent/tei:event/tei:head"/><xsl:text>" step</xsl:text>
        </xsl:when>
      </xsl:choose>
    </title>
    <xsl:apply-templates/>
    </titleStmt>
  </xsl:template>
  
  <xsl:template match="/tei:TEI/tei:text/tei:body/tei:div" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:attribute name="type">researchScenario</xsl:attribute>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="/tei:TEI/tei:text/tei:body/tei:div/tei:head" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:attribute name="type">scenarioTitle</xsl:attribute>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="/tei:TEI/tei:text/tei:body/tei:listEvent/tei:event/tei:head" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:attribute name="type">stepTitle</xsl:attribute>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:desc/@corresp"/>
  
  <xsl:template match="tei:desc[@corresp='definition']" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:attribute name="type">definition</xsl:attribute>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:desc[@corresp='terms']" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:attribute name="type">terms</xsl:attribute>
      <xsl:attribute name="xml:lang">en</xsl:attribute>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:term" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:choose>
      <xsl:when test="@corresp='disciplines'">
      <xsl:variable name="termValue"><xsl:value-of select="@key"/></xsl:variable>
        <term key="{$termValue}" source="aureHAL" type="discipline"/>
      </xsl:when>
      <xsl:when test="@corresp='techniques'">
      <xsl:variable name="termValue"><xsl:value-of select="@key"/></xsl:variable>
        <term key="{$termValue}" source="TaDiRAH" type="technique"/>
      </xsl:when>
      <xsl:when test="@corresp='objects'">
      <xsl:variable name="termValue"><xsl:value-of select="@key"/></xsl:variable>
        <term key="{$termValue}" source="TaDiRAH" type="object"/>
      </xsl:when>
      <xsl:when test="@corresp='activity'">
      <xsl:variable name="termValue"><xsl:value-of select="@key"/></xsl:variable>
        <term key="{$termValue}" source="TaDiRAH" type="activity"/>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template match="tei:author[@corresp='imgAuthor']">
    <xsl:copy>
      <xsl:attribute name="type">imgAuthor</xsl:attribute>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:figDesc/tei:availability">
    <xsl:copy>
      <xsl:attribute name="type">imgLicence</xsl:attribute>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:linkGrp">
    <xsl:choose>
      <xsl:when test="@corresp='generalResources'">
        <xsl:copy>
          <xsl:attribute name="type">generalResources</xsl:attribute>
          <xsl:attribute name="xml:base">http://www.zotero.org/groups/427927/ssk-parthenos/items/itemKey/</xsl:attribute>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="@corresp='projectResources'">
        <xsl:copy>
          <xsl:attribute name="type">projectResources</xsl:attribute>
          <xsl:attribute name="corresp"><xsl:value-of select="@url"/></xsl:attribute>
          <xsl:attribute name="xml:base">http://www.zotero.org/groups/427927/ssk-parthenos/items/itemKey/</xsl:attribute>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template match="tei:event">
    <xsl:copy>
      <xsl:attribute name="type">researchStep</xsl:attribute>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:figure/@corresp"/>
  <xsl:template match="tei:head/@corresp"/>
  <xsl:template match="tei:author/@corresp"/>
  <xsl:template match="tei:linkGrp/@corresp"/>
  <xsl:template match="tei:linkGrp/@url"/>
  
  <xsl:template match="tei:lb"/>
  <xsl:template match="@default"/>
  <xsl:template match="@part"/>
  <xsl:template match="@instant"/>
  <xsl:template match="@full"/>
  <xsl:template match="@org"/>
  <xsl:template match="@sample"/>
  
</xsl:stylesheet>