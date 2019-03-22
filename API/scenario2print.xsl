<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:tei="http://www.tei-c.org/ns/1.0"
  exclude-result-prefixes="tei" 
  version="2.0">
  <xsl:output indent="yes"/>
  <xsl:strip-space elements="*"/>
  
  <xsl:template match="node() | @*" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy >
      <xsl:apply-templates select="node() | @*"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:sponsor"/>
  <xsl:template match="tei:head[@type='scenarioTitle']"/>
  
  <xsl:template match="tei:sourceDesc" xmlns="http://www.tei-c.org/ns/1.0">
    <sourceDesc>
      <p/>
    </sourceDesc>
  </xsl:template>
  <xsl:template match="tei:teiHeader">  
    <xsl:copy>
    <xsl:apply-templates mode="header"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:div[@type='scenario' or @type='researchScenario']">
    <xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template match="tei:fileDesc" mode="header" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:apply-templates mode="header"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:titleStmt" mode="header" xmlns="http://www.tei-c.org/ns/1.0">    
         <titleStmt><title>
          <xsl:value-of select="/tei:TEI/tei:text/tei:body/tei:div/tei:head"/>
          </title>
          <xsl:apply-templates/>
         </titleStmt> 
  </xsl:template>
  
  <xsl:template match="tei:publicationStmt" mode="header" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:sourceDesc" mode="header" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:revisionDesc" mode="header" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:copy>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="tei:title"/>
  
  <xsl:template match="tei:desc[@type='definition']" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:choose>
      <xsl:when test="parent::tei:event[@type = 'researchStep']">
        <div type='definition' xml:lang="{@xml:lang}">
          <xsl:choose>
            <xsl:when test="tei:p">
              <xsl:apply-templates></xsl:apply-templates>
            </xsl:when>
            <xsl:otherwise><p><xsl:apply-templates/></p></xsl:otherwise>
          </xsl:choose>
        </div>
      </xsl:when>
      <xsl:when test="parent::tei:div[@type = 'researchScenario' or @type='scenario']">
        <div type='definition' xml:lang="{@xml:lang}">
          <head>Scenario description</head>
          <xsl:choose>
            <xsl:when test="tei:p">
              <xsl:apply-templates></xsl:apply-templates>
            </xsl:when>
            <xsl:otherwise><p><xsl:apply-templates/></p></xsl:otherwise>
          </xsl:choose>
        </div>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template match="tei:listEvent" xmlns="http://www.tei-c.org/ns/1.0">
  <div type="steps">
    <head>Steps</head>
    <xsl:apply-templates/>
  </div>
</xsl:template>
  
  <xsl:template match="tei:event" xmlns="http://www.tei-c.org/ns/1.0">
    <div type="step">
      <xsl:apply-templates/>
    </div>
  </xsl:template>
  
  <xsl:template match="tei:biblFull">
    
  </xsl:template>
  
  <xsl:template match="tei:desc[@type='term' or @type='terms']" xmlns="http://www.tei-c.org/ns/1.0">
    <xsl:choose>
      <xsl:when test="parent::tei:event[@type = 'researchStep']">
        <div type='terms' xml:lang="{@xml:lang}">
          <head>Step descriptive terms</head>
            <xsl:if test="tei:term[@type='standards']">
              <list>
              <head>Standards</head>
              <xsl:apply-templates select="tei:term[@type='standards']"/>
            </list>
            </xsl:if>
          <xsl:if test="tei:term[@type='techniques']">
          <list>
            <head>Research techniques</head>
            <xsl:apply-templates select="tei:term[@type='techniques']"/>
          </list>
          </xsl:if>
          <xsl:if test="tei:term[@type='objects']">
            <list>
              <head>Research objects</head>
              <xsl:apply-templates select="tei:term[@type='objects']"/>
            </list>
          </xsl:if>
          <xsl:if test="tei:term[@type='activity']">
            <list>
              <head>Research activity</head>
              <xsl:apply-templates select="tei:term[@type='activity']"/>
            </list>
          </xsl:if>
         </div>
      </xsl:when>
      <xsl:when test="parent::tei:div[@type = 'researchScenario' or 'scenario']">
        <div type='term' xml:lang="{@xml:lang}">
          <head>Scenario descriptive terms</head>
          <xsl:if test="tei:term[@type='standards']">
            <list>
              <head>Standards</head>
              <xsl:apply-templates select="tei:term[@type='standards']"/>
            </list>
          </xsl:if>
          <xsl:if test="tei:term[@type='techniques']">
            <list>
              <head>Research techniques</head>
              <xsl:apply-templates select="tei:term[@type='techniques']"/>
            </list>
          </xsl:if>
          <xsl:if test="tei:term[@type='objects']">
            <list>
              <head>Research objects</head>
              <xsl:apply-templates select="tei:term[@type='objects']"/>
            </list>
          </xsl:if>
          <xsl:if test="tei:term[@type='discipline']">
            <list>
              <head>Discipline</head>
              <xsl:apply-templates select="tei:term[@type='discipline']"/>
            </list>
          </xsl:if>
        </div>
      </xsl:when>
    </xsl:choose>
  </xsl:template> 
  
  <xsl:template match="tei:term[@type='discipline']" xmlns="http://www.tei-c.org/ns/1.0">
    <item><xsl:value-of select="@key"/></item>
  </xsl:template>
  
  <xsl:template match="tei:term[@type='standards']" xmlns="http://www.tei-c.org/ns/1.0">
   <item><xsl:value-of select="@key"/></item>
  </xsl:template>
  
  <xsl:template match="tei:term[@type='techniques']" xmlns="http://www.tei-c.org/ns/1.0">
    <item><xsl:value-of select="@key"/></item>
  </xsl:template>
  
  <xsl:template match="tei:term[@type='objects']" xmlns="http://www.tei-c.org/ns/1.0">
    <item><xsl:value-of select="@key"/></item>
  </xsl:template>
  
  <xsl:template match="tei:term[@type='activity']" xmlns="http://www.tei-c.org/ns/1.0">
    <item><xsl:value-of select="@key"/></item>
  </xsl:template>
  
  <xsl:template match="tei:linkGrp" xmlns="http://www.tei-c.org/ns/1.0">
    <div type="resources">
      <head>Resources</head>
      <xsl:apply-templates mode="resources"/>
    </div>
  </xsl:template>
  
  <xsl:template match="tei:ref" xmlns="http://www.tei-c.org/ns/1.0" mode="resources">
    <div>
      <head corresp="{tei:biblStruct/@corresp}"><xsl:value-of select="normalize-space(tei:biblStruct/tei:analytic/tei:title[@level='a'])"/>
      <xsl:if test="string(tei:biblStruct/tei:monogr/tei:imprint/tei:date)">
        <xsl:text>, </xsl:text><xsl:value-of select="tei:biblStruct/tei:monogr/tei:imprint/tei:date"/>
      </xsl:if></head>
      <xsl:if test="tei:biblStruct/tei:analytic/tei:author">
        <p>
        <lb/>Author(s): <xsl:for-each select="tei:biblStruct/tei:analytic/tei:author">
          <xsl:if test="tei:name"><xsl:value-of select="normalize-space(.)"/></xsl:if>
          <xsl:if test="tei:forename"><xsl:value-of select="normalize-space(concat(concat(tei:forename, '&#xA0;'), normalize-space(tei:surname)))"/></xsl:if>
          <xsl:if test="text()"><xsl:value-of select="."/></xsl:if>
          <xsl:choose>
            <xsl:when test="position() != last()"><xsl:text>, </xsl:text></xsl:when>
          </xsl:choose>
        </xsl:for-each>
        </p>
      </xsl:if>
      <xsl:if test="tei:biblStruct/tei:monogr/tei:imprint/tei:note[@type='url']">
        <p><lb/>Link: <ref type="{@type}" target="{tei:biblStruct/tei:monogr/tei:imprint/tei:note[@type='url']}"><xsl:value-of select="normalize-space(tei:biblStruct/tei:monogr/tei:imprint/tei:note[@type='url'])"/></ref></p>
      </xsl:if>
    <xsl:if test="tei:biblStruct/tei:monogr/tei:imprint/tei:note[@type='abstract']">
      <p><lb/>Abstract:<lb/><xsl:value-of select="normalize-space(tei:biblStruct/tei:monogr/tei:imprint/tei:note[@type='abstract'])"/></p>
      </xsl:if>
    </div>
  </xsl:template>
  
</xsl:stylesheet>