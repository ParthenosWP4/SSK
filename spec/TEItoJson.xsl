<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
        <xsl:output method="text"/>
<<<<<<< HEAD
        
        <xsl:template match="/">{
            <xsl:apply-templates select="*"/>}
        </xsl:template>
        
=======
        <xsl:strip-space elements="*"/>

        <xsl:template match="/">{
            <xsl:apply-templates select="*"/>}
        </xsl:template>

>>>>>>> 463c1e43a2f272c1825267e632aabca902f54871
        <!-- Object or Element Property-->
        <xsl:template match="*">
            "<xsl:value-of select="name()"/>" : <xsl:call-template name="Properties"/>
        </xsl:template>
<<<<<<< HEAD
        
=======

>>>>>>> 463c1e43a2f272c1825267e632aabca902f54871
        <!-- Array Element -->
        <xsl:template match="*" mode="ArrayElement">
            <xsl:call-template name="Properties"/>
        </xsl:template>
<<<<<<< HEAD
        
=======

>>>>>>> 463c1e43a2f272c1825267e632aabca902f54871
        <!-- Object Properties -->
        <xsl:template name="Properties">
            <xsl:variable name="childName" select="name(*[1])"/>
            <xsl:choose>
<<<<<<< HEAD
                <xsl:when test="not(*|@*)">"<xsl:value-of select="."/>"</xsl:when>
=======
                <xsl:when test="not(*|@*)">"<xsl:call-template name="jsonescape">
                    <xsl:with-param name="str" select="." />
                </xsl:call-template> "</xsl:when>
>>>>>>> 463c1e43a2f272c1825267e632aabca902f54871
                <xsl:when test="count(*[name()=$childName]) > 1">{ "<xsl:value-of select="$childName"/>" :[<xsl:apply-templates select="*" mode="ArrayElement"/>] }</xsl:when>
                <xsl:otherwise>{
                    <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="*"/>
<<<<<<< HEAD
                    }</xsl:otherwise>
            </xsl:choose>
            <xsl:if test="following-sibling::*">,</xsl:if>
            
        </xsl:template>
        
=======
                    <xsl:if test="text()">
                "content": "<xsl:value-of select="text()"/>"
                    </xsl:if>
                }</xsl:otherwise>
            </xsl:choose>
            <xsl:if test="following-sibling::*">,</xsl:if>

        </xsl:template>

>>>>>>> 463c1e43a2f272c1825267e632aabca902f54871
        <!-- Attribute Property -->
        <xsl:template match="@*">
            "<xsl:value-of select="name()"/>" : "<xsl:value-of select="."/>",
        </xsl:template>
<<<<<<< HEAD
</xsl:stylesheet>
=======

    <xsl:template name="jsonescape">
        <xsl:param name="str" select="."/>
        <xsl:param name="escapeChars" select="'\&quot;'" />
        <xsl:variable name="first" select="substring(translate($str, translate($str, $escapeChars, ''), ''), 1, 1)" />
        <xsl:choose>
            <xsl:when test="$first">
                <xsl:value-of select="concat(substring-before($str, $first), '\', $first)"/>
                <xsl:call-template name="jsonescape">
                    <xsl:with-param name="str" select="substring-after($str, $first)"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$str"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
>>>>>>> 463c1e43a2f272c1825267e632aabca902f54871
