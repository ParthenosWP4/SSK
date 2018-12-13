<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xsl:stylesheet xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns:saxon="http://saxon.sf.net/"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:schold="http://www.ascc.net/xml/schematron"
                xmlns:iso="http://purl.oclc.org/dsdl/schematron"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:tei="http://www.tei-c.org/ns/1.0"
                version="2.0"><!--Implementers: please note that overriding process-prolog or process-root is 
    the preferred method for meta-stylesheets to use where possible. -->
   <xsl:param name="archiveDirParameter"/>
   <xsl:param name="archiveNameParameter"/>
   <xsl:param name="fileNameParameter"/>
   <xsl:param name="fileDirParameter"/>
   <xsl:variable name="document-uri">
      <xsl:value-of select="document-uri(/)"/>
   </xsl:variable>
   <!--PHASES-->
   <!--PROLOG-->
   <xsl:output xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
               method="xml"
               omit-xml-declaration="no"
               standalone="yes"
               indent="yes"/>
   <!--XSD TYPES FOR XSLT2-->
   <!--KEYS AND FUNCTIONS-->
   <!--DEFAULT RULES-->
   <!--MODE: SCHEMATRON-SELECT-FULL-PATH-->
   <!--This mode can be used to generate an ugly though full XPath for locators-->
   <xsl:template match="*" mode="schematron-select-full-path">
      <xsl:apply-templates select="." mode="schematron-get-full-path"/>
   </xsl:template>
   <!--MODE: SCHEMATRON-FULL-PATH-->
   <!--This mode can be used to generate an ugly though full XPath for locators-->
   <xsl:template match="*" mode="schematron-get-full-path">
      <xsl:apply-templates select="parent::*" mode="schematron-get-full-path"/>
      <xsl:text>/</xsl:text>
      <xsl:choose>
         <xsl:when test="namespace-uri()=''">
            <xsl:value-of select="name()"/>
         </xsl:when>
         <xsl:otherwise>
            <xsl:text>*:</xsl:text>
            <xsl:value-of select="local-name()"/>
            <xsl:text>[namespace-uri()='</xsl:text>
            <xsl:value-of select="namespace-uri()"/>
            <xsl:text>']</xsl:text>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:variable name="preceding"
                    select="count(preceding-sibling::*[local-name()=local-name(current())                                   and namespace-uri() = namespace-uri(current())])"/>
      <xsl:text>[</xsl:text>
      <xsl:value-of select="1+ $preceding"/>
      <xsl:text>]</xsl:text>
   </xsl:template>
   <xsl:template match="@*" mode="schematron-get-full-path">
      <xsl:apply-templates select="parent::*" mode="schematron-get-full-path"/>
      <xsl:text>/</xsl:text>
      <xsl:choose>
         <xsl:when test="namespace-uri()=''">@<xsl:value-of select="name()"/>
         </xsl:when>
         <xsl:otherwise>
            <xsl:text>@*[local-name()='</xsl:text>
            <xsl:value-of select="local-name()"/>
            <xsl:text>' and namespace-uri()='</xsl:text>
            <xsl:value-of select="namespace-uri()"/>
            <xsl:text>']</xsl:text>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <!--MODE: SCHEMATRON-FULL-PATH-2-->
   <!--This mode can be used to generate prefixed XPath for humans-->
   <xsl:template match="node() | @*" mode="schematron-get-full-path-2">
      <xsl:for-each select="ancestor-or-self::*">
         <xsl:text>/</xsl:text>
         <xsl:value-of select="name(.)"/>
         <xsl:if test="preceding-sibling::*[name(.)=name(current())]">
            <xsl:text>[</xsl:text>
            <xsl:value-of select="count(preceding-sibling::*[name(.)=name(current())])+1"/>
            <xsl:text>]</xsl:text>
         </xsl:if>
      </xsl:for-each>
      <xsl:if test="not(self::*)">
         <xsl:text/>/@<xsl:value-of select="name(.)"/>
      </xsl:if>
   </xsl:template>
   <!--MODE: SCHEMATRON-FULL-PATH-3-->
   <!--This mode can be used to generate prefixed XPath for humans 
	(Top-level element has index)-->
   <xsl:template match="node() | @*" mode="schematron-get-full-path-3">
      <xsl:for-each select="ancestor-or-self::*">
         <xsl:text>/</xsl:text>
         <xsl:value-of select="name(.)"/>
         <xsl:if test="parent::*">
            <xsl:text>[</xsl:text>
            <xsl:value-of select="count(preceding-sibling::*[name(.)=name(current())])+1"/>
            <xsl:text>]</xsl:text>
         </xsl:if>
      </xsl:for-each>
      <xsl:if test="not(self::*)">
         <xsl:text/>/@<xsl:value-of select="name(.)"/>
      </xsl:if>
   </xsl:template>
   <!--MODE: GENERATE-ID-FROM-PATH -->
   <xsl:template match="/" mode="generate-id-from-path"/>
   <xsl:template match="text()" mode="generate-id-from-path">
      <xsl:apply-templates select="parent::*" mode="generate-id-from-path"/>
      <xsl:value-of select="concat('.text-', 1+count(preceding-sibling::text()), '-')"/>
   </xsl:template>
   <xsl:template match="comment()" mode="generate-id-from-path">
      <xsl:apply-templates select="parent::*" mode="generate-id-from-path"/>
      <xsl:value-of select="concat('.comment-', 1+count(preceding-sibling::comment()), '-')"/>
   </xsl:template>
   <xsl:template match="processing-instruction()" mode="generate-id-from-path">
      <xsl:apply-templates select="parent::*" mode="generate-id-from-path"/>
      <xsl:value-of select="concat('.processing-instruction-', 1+count(preceding-sibling::processing-instruction()), '-')"/>
   </xsl:template>
   <xsl:template match="@*" mode="generate-id-from-path">
      <xsl:apply-templates select="parent::*" mode="generate-id-from-path"/>
      <xsl:value-of select="concat('.@', name())"/>
   </xsl:template>
   <xsl:template match="*" mode="generate-id-from-path" priority="-0.5">
      <xsl:apply-templates select="parent::*" mode="generate-id-from-path"/>
      <xsl:text>.</xsl:text>
      <xsl:value-of select="concat('.',name(),'-',1+count(preceding-sibling::*[name()=name(current())]),'-')"/>
   </xsl:template>
   <!--MODE: GENERATE-ID-2 -->
   <xsl:template match="/" mode="generate-id-2">U</xsl:template>
   <xsl:template match="*" mode="generate-id-2" priority="2">
      <xsl:text>U</xsl:text>
      <xsl:number level="multiple" count="*"/>
   </xsl:template>
   <xsl:template match="node()" mode="generate-id-2">
      <xsl:text>U.</xsl:text>
      <xsl:number level="multiple" count="*"/>
      <xsl:text>n</xsl:text>
      <xsl:number count="node()"/>
   </xsl:template>
   <xsl:template match="@*" mode="generate-id-2">
      <xsl:text>U.</xsl:text>
      <xsl:number level="multiple" count="*"/>
      <xsl:text>_</xsl:text>
      <xsl:value-of select="string-length(local-name(.))"/>
      <xsl:text>_</xsl:text>
      <xsl:value-of select="translate(name(),':','.')"/>
   </xsl:template>
   <!--Strip characters-->
   <xsl:template match="text()" priority="-1"/>
   <!--SCHEMA SETUP-->
   <xsl:template match="/">
      <svrl:schematron-output xmlns:svrl="http://purl.oclc.org/dsdl/svrl" title="" schemaVersion="">
         <xsl:comment>
            <xsl:value-of select="$archiveDirParameter"/>   
		 <xsl:value-of select="$archiveNameParameter"/>  
		 <xsl:value-of select="$fileNameParameter"/>  
		 <xsl:value-of select="$fileDirParameter"/>
         </xsl:comment>
         <svrl:text>Pure TEI content rules</svrl:text>
         <svrl:ns-prefix-in-attribute-values uri="http://www.tei-c.org/ns/1.0" prefix="tei"/>
         <svrl:ns-prefix-in-attribute-values uri="http://www.w3.org/2001/XMLSchema" prefix="xs"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">xml:id</xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M3"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">Authors and sponsor</xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M4"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">Authority</xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M5"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M6"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">Licences</xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M7"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">Source Description</xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M8"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">revisionStmt</xsl:attribute>
            <svrl:text>Name, affiliation, date, desc</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M9"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">head</xsl:attribute>
            <svrl:text>title between 10 and 100 characters</svrl:text>
            <svrl:text>Start with a verb or a gerund</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M10"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">desc definition</xsl:attribute>
            <svrl:text>Need a description</svrl:text>
            <svrl:text>max 1500 characters</svrl:text>
            <svrl:text>Nothing but lists and refs</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M11"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">Image</xsl:attribute>
            <svrl:text>png or jpg</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M12"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">desc term</xsl:attribute>
            <svrl:text>For each type, Max 4</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M13"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <svrl:text>source attribute</svrl:text>
            <svrl:text>step file: Tadirah activity is mandatory</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M14"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">Resources</xsl:attribute>
            <svrl:text>General or project : if project, need a source and a corresp attributes</svrl:text>
            <svrl:text>Zotero = prefix + ^[A-Z0-9]{8}$</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M15"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M16"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:attribute name="name">@type</xsl:attribute>
            <svrl:text>body/div</svrl:text>
            <svrl:text>head</svrl:text>
            <svrl:text>desc x 2</svrl:text>
            <svrl:text>event</svrl:text>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M17"/>
         <svrl:active-pattern>
            <xsl:attribute name="document">
               <xsl:value-of select="document-uri(/)"/>
            </xsl:attribute>
            <xsl:apply-templates/>
         </svrl:active-pattern>
         <xsl:apply-templates select="/" mode="M18"/>
      </svrl:schematron-output>
   </xsl:template>
   <!--SCHEMATRON PATTERNS-->
   <!--PATTERN xml:id-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">xml:id</svrl:text>
   <xsl:variable name="fileName" select="tokenize(document-uri(/), '/')[last()]"/>
   <!--RULE -->
   <xsl:template match="tei:TEI" priority="1000" mode="M3">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:TEI"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="string(@xml:id) = substring-before($fileName, '.xml')"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="string(@xml:id) = substring-before($fileName, '.xml')">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The
        xml:id of the TEI element should be equal to the name of the file, without the file
        extension. Currently the value of xml:id is "<xsl:text/>
                  <xsl:value-of select="@xml:id"/>
                  <xsl:text/>" whilst the
        file name is "<xsl:text/>
                  <xsl:value-of select="$fileName"/>
                  <xsl:text/>"</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="string(@type) = 'researchScenario' or . = 'researchStep'"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="string(@type) = 'researchScenario' or . = 'researchStep'">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>TEI/@type should be either "researchScenario" or "researchStep". The current value of
        TEI/@type is "<xsl:text/>
                  <xsl:value-of select="@type"/>
                  <xsl:text/>"</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M3"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M3"/>
   <xsl:template match="@*|node()" priority="-2" mode="M3">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M3"/>
   </xsl:template>
   <!--PATTERN Authors and sponsor-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">Authors and sponsor</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:titleStmt" priority="1001" mode="M4">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:titleStmt"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="tei:author"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="tei:author">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>All scenarios and steps should have identified
        authors.</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--REPORT warning-->
      <xsl:if test="not(tei:sponsor)">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="not(tei:sponsor)">
            <xsl:attribute name="role">warning</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>The main sponsor of the SSK is the PARTHENOS project. All
        scenarios and steps should record this information.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M4"/>
   </xsl:template>
   <!--RULE -->
   <xsl:template match="tei:author" priority="1000" mode="M4">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:author"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="tei:persName and tei:affiliation"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="tei:persName and tei:affiliation">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>You need to supply the name and the
        affiliation of all authors.</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M4"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M4"/>
   <xsl:template match="@*|node()" priority="-2" mode="M4">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M4"/>
   </xsl:template>
   <!--PATTERN Authority-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">Authority</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:publicationStmt" priority="1000" mode="M5">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:publicationStmt"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="tei:authority"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="tei:authority">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>An authority responsibile for making the
        scenario or the step available should be provided. This authority can be the project or the
        team in the context which the research process described in the scenario has been carried
        out.</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M5"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M5"/>
   <xsl:template match="@*|node()" priority="-2" mode="M5">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M5"/>
   </xsl:template>
   <!--PATTERN -->
   <!--RULE -->
   <xsl:template match="tei:licence" priority="1000" mode="M6">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:licence"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="@target = 'http://creativecommons.org/licenses/by/4.0/' or @target = 'http://creativecommons.org/publicdomain/zero/1.0/'"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="@target = 'http://creativecommons.org/licenses/by/4.0/' or @target = 'http://creativecommons.org/publicdomain/zero/1.0/'">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text> The licences of the scenarios and steps should be CC-BY 4.0 or CC0 1.0 Don't
        forget to put the link towards the licence reference text in the @target attribute. The
        current value of "<xsl:text/>
                  <xsl:value-of select="name(@target)"/>
                  <xsl:text/>" is "<xsl:text/>
                  <xsl:value-of select="@target"/>
                  <xsl:text/>"</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M6"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M6"/>
   <xsl:template match="@*|node()" priority="-2" mode="M6">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M6"/>
   </xsl:template>
   <!--PATTERN Licences-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">Licences</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:availability" priority="1000" mode="M7">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:availability"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="tei:licence/@target and tei:licence/tei:p"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="tei:licence/@target and tei:licence/tei:p">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>A licence should be applied to
        all scenarios and steps. The declaration of the licence chosen in made by a clear sentence
        in natural language (in a p element) and a link towards the licence (with the attribute
        @target).</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M7"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M7"/>
   <xsl:template match="@*|node()" priority="-2" mode="M7">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M7"/>
   </xsl:template>
   <!--PATTERN Source Description-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">Source Description</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:sourceDesc" priority="1000" mode="M8">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:sourceDesc"
                       role="error"/>
      <!--REPORT information-->
      <xsl:if test="child::*">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="child::*">
            <xsl:attribute name="role">information</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>sourceDesc in mandatory in TEI, so if you want to give details on
        the way the scenario was conceived, it is the appropriate location.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M8"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M8"/>
   <xsl:template match="@*|node()" priority="-2" mode="M8">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M8"/>
   </xsl:template>
   <!--PATTERN revisionStmt-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">revisionStmt</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:change" priority="1000" mode="M9">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:change"/>
      <!--ASSERT information-->
      <xsl:choose>
         <xsl:when test="tei:date and tei:persName and tei:affiliation and tei:desc"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="tei:date and tei:persName and tei:affiliation and tei:desc">
               <xsl:attribute name="role">information</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>When recording a
        revision, some precise metadata must be given : the date of the revision, the name of the
        responsibe and his/her affiliation and a description. </svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M9"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M9"/>
   <xsl:template match="@*|node()" priority="-2" mode="M9">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M9"/>
   </xsl:template>
   <!--PATTERN head-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">head</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:div/tei:head" priority="1001" mode="M10">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:div/tei:head"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="string-length(.) &gt; 9"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="string-length(.) &gt; 9">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text> The title is too short: 10 characters minimum.
        Your title is <xsl:text/>
                  <xsl:value-of select="10 - string-length(.)"/>
                  <xsl:text/> characters too
        short.</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="string-length(.) &lt; 101"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="string-length(.) &lt; 101">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The title is too long: 100 characters maximum.
        Your title is <xsl:text/>
                  <xsl:value-of select="string-length(.) - 100"/>
                  <xsl:text/> characters too
        long.</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--REPORT information-->
      <xsl:if test="normalize-space(.)">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="normalize-space(.)">
            <xsl:attribute name="role">information</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>The title of a scenario should describe the main goal of
        the scenario.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M10"/>
   </xsl:template>
   <!--RULE -->
   <xsl:template match="tei:event/tei:head" priority="1000" mode="M10">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:event/tei:head"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="string-length(.) &gt; 9"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="string-length(.) &gt; 9">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text> The title is too short: 10 characters minimum </svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="string-length(.) &lt; 100"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="string-length(.) &lt; 100">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The title is too long: 100 characters
        maximum</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT information-->
      <xsl:choose>
         <xsl:when test="matches(., '(^\w*(ing|ion|ment|ments) )|( \w*(ing|ion|ment|ments$))')"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="matches(., '(^\w*(ing|ion|ment|ments) )|( \w*(ing|ion|ment|ments$))')">
               <xsl:attribute name="role">information</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The
        title of a step should describe the action to perform, starting or ending with a gerund (or
        an infinitive), or a noun .</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M10"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M10"/>
   <xsl:template match="@*|node()" priority="-2" mode="M10">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M10"/>
   </xsl:template>
   <!--PATTERN desc definition-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">desc definition</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:desc[@type = 'definition']" priority="1000" mode="M11">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:desc[@type = 'definition']"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="string-length(.) &lt; 1500"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="string-length(.) &lt; 1500">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The description is too long: 1500 characters
        maximum. Your description is <xsl:text/>
                  <xsl:value-of select="string-length(.) - 1500"/>
                  <xsl:text/> too
        long</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="tei:list or tei:ref"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="tei:list or tei:ref">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text> In the &lt;desc type="definition&gt;, there should be
        nothing more than text, &lt;list&gt; and &lt;ref&gt;.</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M11"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M11"/>
   <xsl:template match="@*|node()" priority="-2" mode="M11">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M11"/>
   </xsl:template>
   <!--PATTERN Image-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">Image</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:figure/tei:graphic/@url" priority="1000" mode="M12">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:figure/tei:graphic/@url"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="matches(., '\.(JPG|JPEG|PNG|jpg|png|jpeg)$')"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="matches(., '\.(JPG|JPEG|PNG|jpg|png|jpeg)$')">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The image format should be JPG
        or PNG. Accepted extensions are: jpg, JPG, jpeg, JPEG, png, PNG</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M12"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M12"/>
   <xsl:template match="@*|node()" priority="-2" mode="M12">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M12"/>
   </xsl:template>
   <!--PATTERN desc term-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">desc term</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:desc[@type = 'terms']" priority="1000" mode="M13">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:desc[@type = 'terms']"/>
      <!--REPORT error-->
      <xsl:if test="ancestor::tei:TEI[@type = 'researchStep'] and count(tei:term[@type = 'activity']) = 0">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                 test="ancestor::tei:TEI[@type = 'researchStep'] and count(tei:term[@type = 'activity']) = 0">
            <xsl:attribute name="role">error</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>A step should be described by an activity term, taken from the TADirAH
        taxonomy.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <!--REPORT information-->
      <xsl:if test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'standard']) = 0">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                 test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'standard']) = 0">
            <xsl:attribute name="role">information</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>A scenario could have several keywords
        related to standards. Check the documentation for more details</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <!--REPORT information-->
      <xsl:if test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'discipline']) = 0">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                 test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'discipline']) = 0">
            <xsl:attribute name="role">information</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>A scenario could have several keywords
        related to disciplines. Check the documentation for more details.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <!--REPORT information-->
      <xsl:if test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'technique']) = 0">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                 test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'technique']) = 0">
            <xsl:attribute name="role">information</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>A scenario could have several keywords
        related to research techniques. Check the Tadirah taxonomy for more details.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <!--REPORT information-->
      <xsl:if test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'object']) = 0">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                 test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'object']) = 0">
            <xsl:attribute name="role">information</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>A scenario could have several
        keywords related to research objects. Check the Tadirah taxonomy for more
        details.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test="count(tei:term[@type = 'standard']) &lt; 5"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="count(tei:term[@type = 'standard']) &lt; 5">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>More than 4 terms of the same
        vocabulary type may be too much: STANDARD</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test="count(tei:term[@type = 'discipline']) &lt; 5"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="count(tei:term[@type = 'discipline']) &lt; 5">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>More than 4 terms of the same
        vocabulary type may be too much: DISCIPLINE</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test="count(tei:term[@type = 'technique']) &lt; 5"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="count(tei:term[@type = 'technique']) &lt; 5">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>More than 4 terms of the same
        vocabulary type may be too much: TECHNIQUE</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test="count(tei:term[@type = 'object']) &lt; 5"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="count(tei:term[@type = 'object']) &lt; 5">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>More than 4 terms of the same
        vocabulary type may be too much: OBJECT</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M13"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M13"/>
   <xsl:template match="@*|node()" priority="-2" mode="M13">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M13"/>
   </xsl:template>
   <!--PATTERN -->
   <!--RULE -->
   <xsl:template match="tei:desc[@type = 'terms']/tei:term"
                 priority="1000"
                 mode="M14">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:desc[@type = 'terms']/tei:term"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="@source"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="@source">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The attribute source is important to specifiy which vocabulary was
        used. The main ones are "tadirah", aurehal, "standard".</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--REPORT warning-->
      <xsl:if test="ancestor::tei:TEI[@type = 'researchScenario'] and @type = 'activity'">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                 test="ancestor::tei:TEI[@type = 'researchScenario'] and @type = 'activity'">
            <xsl:attribute name="role">warning</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>The
        activity terms are more suitable for describing steps rather than scenarios. It is
        recommended to choose one activity term per scenario step.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M14"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M14"/>
   <xsl:template match="@*|node()" priority="-2" mode="M14">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M14"/>
   </xsl:template>
   <!--PATTERN Resources-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">Resources</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:linkGrp[@type = 'projectResources']"
                 priority="1001"
                 mode="M15">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:linkGrp[@type = 'projectResources']"/>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="normalize-space(@corresp)"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="normalize-space(@corresp)">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>Need a value for @corresp</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="matches(@corresp, '^https?:')"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="matches(@corresp, '^https?:')">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>Value of @corresp should be a valid URI. The
        current value of @corresp for "<xsl:text/>
                  <xsl:value-of select="name(.)"/>
                  <xsl:text/>" is <xsl:text/>
                  <xsl:value-of select="@corresp"/>
                  <xsl:text/>
               </svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="normalize-space(@source)"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="normalize-space(@source)">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The attribute @source should contain the name of
        the project whose references are listed inside the &lt;linkGrp&gt;. The current value of
        @source for "<xsl:text/>
                  <xsl:value-of select="name(.)"/>
                  <xsl:text/>" is <xsl:text/>
                  <xsl:value-of select="@source"/>
                  <xsl:text/>
               </svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M15"/>
   </xsl:template>
   <!--RULE -->
   <xsl:template match="tei:linkGrp/tei:ref[@source = 'zotero']"
                 priority="1000"
                 mode="M15">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:linkGrp/tei:ref[@source = 'zotero']"/>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test="matches(@target, '(wp2|wp3|wp4):[A-Z0-9]{8}') or matches(@target, '[A-Z0-9]{8}')"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                test="matches(@target, '(wp2|wp3|wp4):[A-Z0-9]{8}') or matches(@target, '[A-Z0-9]{8}')">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>The
        reference of a Zotero record is made with the Zotero item key (8 capitals or
        digits)</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M15"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M15"/>
   <xsl:template match="@*|node()" priority="-2" mode="M15">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M15"/>
   </xsl:template>
   <!--PATTERN -->
   <!--RULE -->
   <xsl:template match="tei:linkGrp/tei:ref" priority="1000" mode="M16">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:linkGrp/tei:ref"/>
      <!--ASSERT information-->
      <xsl:choose>
         <xsl:when test="tei:term"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="tei:term">
               <xsl:attribute name="role">information</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>It is possible to add terms to resources, for instance a standard
        or a technique.</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M16"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M16"/>
   <xsl:template match="@*|node()" priority="-2" mode="M16">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M16"/>
   </xsl:template>
   <!--PATTERN @type-->
   <svrl:text xmlns:svrl="http://purl.oclc.org/dsdl/svrl">@type</svrl:text>
   <!--RULE -->
   <xsl:template match="tei:body[ancestor::tei:TEI[@type = 'researchScenario']]/tei:div/@type"
                 priority="1003"
                 mode="M17">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:body[ancestor::tei:TEI[@type = 'researchScenario']]/tei:div/@type"/>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test=". = 'researchScenario'"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test=". = 'researchScenario'">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>@type attribute incoherence: document type is
          '<xsl:text/>
                  <xsl:value-of select="ancestor::tei:TEI/@type"/>
                  <xsl:text/>' and current element type value is
          '<xsl:text/>
                  <xsl:value-of select="."/>
                  <xsl:text/>'</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M17"/>
   </xsl:template>
   <!--RULE -->
   <xsl:template match="tei:body[ancestor::tei:TEI[@type = 'researchStep']]/tei:div/@type"
                 priority="1002"
                 mode="M17">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:body[ancestor::tei:TEI[@type = 'researchStep']]/tei:div/@type"/>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test=". = 'researchStep'"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test=". = 'researchStep'">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>@type attribute incoherence: document type is
          '<xsl:text/>
                  <xsl:value-of select="ancestor::tei:TEI/@type"/>
                  <xsl:text/>' and current element type value is
          '<xsl:text/>
                  <xsl:value-of select="."/>
                  <xsl:text/>'</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M17"/>
   </xsl:template>
   <!--RULE -->
   <xsl:template match="tei:head[ancestor::tei:TEI[@type = 'researchScenario']]/@type"
                 priority="1001"
                 mode="M17">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:head[ancestor::tei:TEI[@type = 'researchScenario']]/@type"/>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test=". = 'scenarioTitle'"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test=". = 'scenarioTitle'">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>@type attribute incoherence: document type is
          '<xsl:text/>
                  <xsl:value-of select="ancestor::tei:TEI/@type"/>
                  <xsl:text/>' and current element type value is
          '<xsl:text/>
                  <xsl:value-of select="."/>
                  <xsl:text/>'</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M17"/>
   </xsl:template>
   <!--RULE -->
   <xsl:template match="tei:head[ancestor::tei:TEI[@type = 'researchStep']]/@type"
                 priority="1000"
                 mode="M17">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                       context="tei:head[ancestor::tei:TEI[@type = 'researchStep']]/@type"/>
      <!--ASSERT warning-->
      <xsl:choose>
         <xsl:when test=". = 'stepTitle'"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test=". = 'stepTitle'">
               <xsl:attribute name="role">warning</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>@type attribute incoherence: document type is
          '<xsl:text/>
                  <xsl:value-of select="ancestor::tei:TEI/@type"/>
                  <xsl:text/>' and current element type value is
          '<xsl:text/>
                  <xsl:value-of select="."/>
                  <xsl:text/>'</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M17"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M17"/>
   <xsl:template match="@*|node()" priority="-2" mode="M17">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M17"/>
   </xsl:template>
   <!--PATTERN -->
   <!--RULE -->
   <xsl:template match="tei:event" priority="1000" mode="M18">
      <svrl:fired-rule xmlns:svrl="http://purl.oclc.org/dsdl/svrl" context="tei:event"/>
      <!--REPORT error-->
      <xsl:if test="ancestor::tei:TEI[@type = 'researchStep'] and not(tei:desc[@type = 'definition']) and not(tei:desc[@type = 'terms'])">
         <svrl:successful-report xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                                 test="ancestor::tei:TEI[@type = 'researchStep'] and not(tei:desc[@type = 'definition']) and not(tei:desc[@type = 'terms'])">
            <xsl:attribute name="role">error</xsl:attribute>
            <xsl:attribute name="location">
               <xsl:apply-templates select="." mode="schematron-select-full-path"/>
            </xsl:attribute>
            <svrl:text>we need a desc element for the description of the step or the scenario and a desc element
        for the associated terms.</svrl:text>
         </svrl:successful-report>
      </xsl:if>
      <!--ASSERT error-->
      <xsl:choose>
         <xsl:when test="@type = 'researchStep'"/>
         <xsl:otherwise>
            <svrl:failed-assert xmlns:svrl="http://purl.oclc.org/dsdl/svrl" test="@type = 'researchStep'">
               <xsl:attribute name="role">error</xsl:attribute>
               <xsl:attribute name="location">
                  <xsl:apply-templates select="." mode="schematron-select-full-path"/>
               </xsl:attribute>
               <svrl:text>An event element should be typed with
        'researchStep'</svrl:text>
            </svrl:failed-assert>
         </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M18"/>
   </xsl:template>
   <xsl:template match="text()" priority="-1" mode="M18"/>
   <xsl:template match="@*|node()" priority="-2" mode="M18">
      <xsl:apply-templates select="*|comment()|processing-instruction()" mode="M18"/>
   </xsl:template>
</xsl:stylesheet>
