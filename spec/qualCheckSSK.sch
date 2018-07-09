<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2"
    xmlns:sqf="http://www.schematron-quickfix.com/validator/process">
    <sch:ns uri="http://www.tei-c.org/ns/1.0" prefix="tei"/>
    <sch:ns prefix="xs" uri="http://www.w3.org/2001/XMLSchema"/>

    <sch:title>Pure TEI content rules</sch:title>

    <!-- HEADER -->
    <sch:pattern>
        <sch:title>xml:id</sch:title>
        <sch:p>xml:id = name of the file</sch:p>
        <sch:rule context="tei:TEI">
            <sch:let name="fileName" value="tokenize(document-uri(/), '/')[last()]"/>
            <sch:assert test="@xml:id = substring-before($fileName, '.xml')"> The xml:id of the TEI
                element should be equal to the name of the file, without the file extension
            </sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:title>Author</sch:title>
        <sch:p>Need an author</sch:p>
        <sch:p>Need an affiliation</sch:p>
        <sch:rule context="tei:titleStmt">
            <sch:assert test="tei:author"> All scenarios and steps should have identified authors
            </sch:assert>
        </sch:rule>
        <sch:rule context="tei:author">
            <sch:assert test="tei:persName and tei:affiliation"> You need to supply the name and the
                affiliation of all authors. </sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:p>Authority</sch:p>
        <sch:rule context="tei:publicationStmt">
            <sch:assert test="tei:authority"> An authority responsibile for making the scenario or
                the step available should be provided. This authority can be the project or the
                infrastructure that maintain the SSK.</sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:title>Licenses</sch:title>
        <sch:p>CC0 or CC-BY license</sch:p>
        <sch:p>@target</sch:p>
        <sch:p>paragraph</sch:p>
        <sch:rule context="tei:license">
            <sch:assert test="@target and tei:p"> A license statement should be added to all
                scenarios and steps</sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:title>Choice of licenses</sch:title>
        <sch:p>This rule must be updated in case creative commons licenses evolved or a new
            licensing framework is chosen.</sch:p>
        <sch:rule context="tei:license">
            <sch:assert
                test="@target = 'http://creativecommons.org/licenses/by/4.0/' or 'https://creativecommons.org/publicdomain/zero/1.0/'"
            />
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:title>revisionStmt</sch:title>
        <sch:p>Name, affiliation, date, desc</sch:p>
        <sch:rule context="tei:change">
            <sch:assert test="tei:date and tei:persName and tei:affiliation and tei:desc"> When
                recording a revision, some precise metadata must be given : the date of the
                revision, the name of the responsibe and his/her affiliation and a description.
            </sch:assert>
        </sch:rule>
    </sch:pattern>

    <!-- BODY -->
    <sch:pattern>
        <sch:title>head</sch:title>
        <sch:p>title between 10 and 100 characters</sch:p>
        <sch:p>Start with a verb or a gerund</sch:p>
        <sch:rule context="tei:head">
            <sch:assert test="string-length(.) &gt; 10"> The title is too short: 10 characters
                minimum </sch:assert>
            <sch:assert test="string-length(.) &lt; 100">The title is too long: 100 characters
                maximum</sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:rule context="tei:head[@type = 'stepTitle']">
            <sch:p>This is only for English</sch:p>
            <sch:assert test="matches(., '(^\w*(ing|ion|ment|ments) )|( \w*(ing|ion|ment|ments$))')"
                >The title of a step should describe the action to perform, starting or ending with
                a gerund (or an infinitive), or a noun .</sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:rule context="tei:head[@type = 'scenarioTitle']">
            <sch:report test="matches(., '^. ')">The title of a scenario should describe the main
                goal of the scenario.</sch:report>
        </sch:rule>
    </sch:pattern>

    <sch:pattern>
        <sch:title>desc definition</sch:title>
        <sch:p>Need a description</sch:p>
        <sch:p>max 1500 characters</sch:p>
        <sch:p>Nothing but lists and refs</sch:p>
        <sch:rule context="tei:desc[@type = 'definition']">
            <sch:assert test="string-length(.) &lt; 1500">The description is too long: 1500
                characters maximum</sch:assert>
            <sch:assert test="tei:list or tei:ref"> In the &lt;desc type="definition&gt;, there
                should be nothing more than text, &lt;list&gt; and &lt;ref&gt;.</sch:assert>
        </sch:rule>
    </sch:pattern>

    <sch:pattern>
        <sch:title>Image</sch:title>
        <sch:p>png or jpg</sch:p>
        <sch:rule context="tei:figure/tei:graphic/@url">
            <sch:assert test="matches(., '(JPG|JPEG|PNG|jpg|png|jpeg)$')">The image format should be JPG or PNG. Accepted extensions are: jpg, JPG, jpeg, JPEG, png, PNG</sch:assert>
        </sch:rule>
    </sch:pattern>

    <sch:pattern>
        <sch:title>desc term</sch:title>
        <sch:p>For each type, Max 4</sch:p>
        <sch:p>source attribute</sch:p>
        <sch:p>key</sch:p>
        <sch:p>step file: Tadirah activity is mandatory</sch:p>
    </sch:pattern>

    <sch:pattern>
        <sch:title>Resources</sch:title>
        <sch:p>General or project : if project, need a source and a corresp attributes</sch:p>
        <sch:p>Zotero = prefix + ^[A-Z0-9]{8}$</sch:p>
    </sch:pattern>
    <sch:pattern>
        <sch:title>@type</sch:title>
        <sch:p>TEI</sch:p>
        <sch:p>body/div</sch:p>
        <sch:p>head</sch:p>
        <sch:p>desc x 2</sch:p>
        <sch:p>event</sch:p>
    </sch:pattern>

</sch:schema>
