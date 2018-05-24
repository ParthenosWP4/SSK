<?xml version="1.0" encoding="UTF-8"?>
<?xml-model href="../schema/TBXinTEI.rnc" type="application/relax-ng-compact-syntax"?>

<xsl:stylesheet version="2.0" exclude-result-prefixes="html"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:tbx="http://www.tbx.org"
    xmlns:html="http://www.w3.org/1999/xhtml">
 
    <xsl:param name="inpath"/>
    <xsl:param name="outpath"/>
    

    <!-- calling saxon with -it:main instead of input doc -->
    <xsl:template match="/" name="main">
        
        <xsl:variable name="entries_tmp">
            
            <xsl:for-each select="collection(concat($inpath, '?select=*.xml'))">
                <xsl:variable name="langcode" select="substring-before(tokenize(document-uri(.), '/')[last()],'.')"/>   <!-- get language code from filename -->
                <xsl:variable name="filename" select="document-uri(.)"/>


                <!-- for each group -->
                <xsl:for-each-group select="/html:html/html:body/*" group-starting-with="html:h1">
                    
                    <xsl:variable name="topid" select="concat('c', position())"/>
                    
                    <xsl:variable name="topterm">
                        <xsl:choose>
                            <xsl:when test="contains(current-group()[1], ' - ')">
                                <xsl:value-of select="substring-after(current-group()[1], ' - ')"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="current-group()[1]"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    
                    <xsl:variable name="subs">
                        <xsl:choose>
                            <!-- if the group has only two elements, its the top-top-level ("research activities") -->
                            <xsl:when test="count(current-group()) = 2">
                                <!-- hard coded offsets to retrieve subordinated h1's -->
                                <xsl:copy-of select="document($filename)/html:html/html:body/html:h1[position() > 1 and not(position() > 8)]"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:copy-of select="current-group()[position() &gt; 2]"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    
                    
                    <!-- entries for top-level concepts -->
                    
                    <!-- for each line in group -->
                    <xsl:for-each select="current-group()">
                        
                        <xsl:if test="self::html:h1">                                
                            <termEntry>
                                <xsl:attribute name="xml:id">
                                    <xsl:value-of select="$topid"/>
                                </xsl:attribute>
                                
                                <!-- reference to superordinate (top-top) concept -->
                                <xsl:if test="contains('c2 c3 c4 c5 c6 c7 c8', $topid)">   <!-- hard coded entry ids -->
                                    <xsl:element name="descrip" namespace="http://www.tbx.org">
                                        <xsl:attribute name="type">
                                            <xsl:text>superordinateConceptPartitive</xsl:text>
                                        </xsl:attribute>
                                        <xsl:attribute name="target">
                                            <xsl:value-of select="'#c1'"/>
                                        </xsl:attribute>
                                    </xsl:element>
                                </xsl:if>
                                
                                <!-- references to subordinate concepts -->
                                <xsl:for-each select="$subs/*[not(self::html:p)]">
                                    <xsl:variable name="subterm" select="."/>
                                    <xsl:variable name="subid">
                                        <xsl:choose>
                                            <xsl:when test="count(current-group()) = 2">    <!-- top-top level -->
                                                <xsl:value-of select="concat('c', position() + 1)"/>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat($topid, '_', position())"/>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:variable>
                                    
                                    <!-- <descrip type="subordinateConceptPartitive" target="#c3"/> -->
                                    <xsl:element name="descrip" namespace="http://www.tbx.org">
                                        <xsl:attribute name="type">
                                            <xsl:text>subordinateConceptPartitive</xsl:text>
                                        </xsl:attribute>
                                        <xsl:attribute name="target">
                                            <xsl:value-of select="concat('#', $subid)"/>
                                        </xsl:attribute>
                                        <!-- <xsl:value-of select="$subterm"/> -->
                                    </xsl:element>
                                </xsl:for-each>
                                
                                <!-- <langSet> -->
                                <xsl:element name="langSet" namespace="http://www.tbx.org">
                                    <xsl:attribute name="xml:lang">
                                        <xsl:value-of select="$langcode"/>
                                    </xsl:attribute>
                                    
                                    <!-- <descrip type="definition"> -->
                                    <xsl:element name="descrip" namespace="http://www.tbx.org">
                                        <xsl:attribute name="type">
                                            <xsl:text>definition</xsl:text>
                                        </xsl:attribute>
                                        <xsl:value-of select="following-sibling::html:p[1]"/>
                                    </xsl:element>
                                    
                                    <!-- <tig> -->
                                    <xsl:element name="tig" namespace="http://www.tbx.org">
                                        <tei:term>
                                            <xsl:value-of select="$topterm"/>
                                        </tei:term>
                                    </xsl:element>
                                                                                                                    
                                </xsl:element>>
                            </termEntry>
                            
                            
                            <!-- entries for subordinate concepts -->
                            
                            <xsl:if test="count(current-group()) != 2">   <!-- skip, if we are at the top-top level -->
                                
                                <xsl:for-each-group select="$subs/*" group-starting-with="html:h2">
                                    
                                    <xsl:variable name="subid" select="concat($topid, '_', position())"/>
                                    <xsl:variable name="subterm" select="current-group()[1]"/>
                                    
                                    <termEntry>
                                        <xsl:attribute name="xml:id">
                                            <xsl:value-of select="$subid"/>
                                        </xsl:attribute>
                                        
                                        <!-- <descrip type="superordinateConceptPartitive" target="#c3"/> -->
                                        <xsl:element name="descrip" namespace="http://www.tbx.org">
                                            <xsl:attribute name="type">
                                                <xsl:text>superordinateConceptPartitive</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="target">
                                                <xsl:value-of select="concat('#', $topid)"/>
                                            </xsl:attribute>
                                            <!-- <xsl:value-of select="$topterm"/> -->
                                        </xsl:element>
                                        
                                        <!-- <langSet> -->
                                        <xsl:element name="langSet" namespace="http://www.tbx.org">
                                            <xsl:attribute name="xml:lang">
                                                <xsl:value-of select="$langcode"/>
                                            </xsl:attribute>
                                            
                                            <!-- <descrip type="definition"> -->
                                            <xsl:element name="descrip" namespace="http://www.tbx.org">
                                                <xsl:attribute name="type">
                                                    <xsl:text>definition</xsl:text>
                                                </xsl:attribute>
                                                <xsl:value-of select="current-group()[2]"/>
                                            </xsl:element>
                                            
                                            <!-- <tig> -->
                                            <xsl:element name="tig" namespace="http://www.tbx.org">
                                                <tei:term>
                                                    <xsl:value-of select="$subterm"/>
                                                </tei:term>
                                            </xsl:element>
                                            
                                        </xsl:element>
                                    </termEntry>
                            
                                </xsl:for-each-group>   <!-- end for-each sub-level -->
                            </xsl:if>
                            
                        </xsl:if>
                        
                    </xsl:for-each>     <!-- end for-each top-level -->
                </xsl:for-each-group>   <!-- end for-each group -->
            </xsl:for-each>             <!-- end for-each input file -->
            
        </xsl:variable>
        
        
        <xsl:result-document href="{$outpath}" method="xml" encoding="utf-8" indent="yes">
            
            <TEI xmlns="http://www.tei-c.org/ns/1.0" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:tbx="http://www.tbx.org">
                <teiHeader>
                    <fileDesc>
                        <titleStmt>
                            <title>TaDiRAH - Taxonomy of Digital Research Activities in the Humanities</title>
                        </titleStmt>
                        <publicationStmt>
                            <p>...</p>
                        </publicationStmt>
                        <sourceDesc>
                            <p>...</p>
                        </sourceDesc>
                    </fileDesc> 
                </teiHeader>
                
                <text>
                    <body>
                        <div>              
                            
                            <xsl:for-each-group select="$entries_tmp/termEntry" group-by="@xml:id">
                                
                                <!-- <termEntry> -->
                                <xsl:element name="termEntry" namespace="http://www.tbx.org">
                                    <xsl:attribute name="xml:id">
                                        <xsl:value-of select="@xml:id"/>
                                    </xsl:attribute>
                                    
                                    <!-- remove duplicates due to the different language versions -->
                                    <xsl:for-each select="distinct-values(current-group()/*/@target)">
                                        <xsl:variable name="target" select="."/>
                                        <xsl:copy-of select="(current-group()//tbx:descrip[@target = $target])[1]"/>
                                    </xsl:for-each>

                                    <xsl:copy-of select="current-group()/tbx:langSet"/>
                                </xsl:element>
                                
                            </xsl:for-each-group>
                            
                        </div>
                    </body>
                </text>
            </TEI>
            
        </xsl:result-document>
        
    </xsl:template>
    
</xsl:stylesheet>