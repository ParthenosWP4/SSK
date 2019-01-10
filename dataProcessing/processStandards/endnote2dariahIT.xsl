<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:template match="/">
        <standards>
            <xsl:apply-templates/>
        </standards>
    </xsl:template>
    <xsl:template match="record">
<doc>
    <field name="id"></field>
    <field name="standard_abbr_name"><xsl:value-of select="titles/title"/></field>
    <field name="standard_complete_name">Standard Complete
        name</field>
    <field name="standard_type">standard</field>
    <field name="standard_desc_eng"><xsl:value-of select="abstract"/></field>
</doc>
    </xsl:template>
</xsl:stylesheet>