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
                element should be equal to the name of the file, without the file extension </sch:assert>
            <sch:assert test="@type = 'researchScenario' or @type = 'researchStep'">TEI/@type should
                be either "researchScenario" or "researchStep".</sch:assert>
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
            <sch:assert test="matches(., '\.(JPG|JPEG|PNG|jpg|png|jpeg)$')">The image format should
                be JPG or PNG. Accepted extensions are: jpg, JPG, jpeg, JPEG, png, PNG</sch:assert>
        </sch:rule>
    </sch:pattern>

    <sch:pattern>
        <sch:title>desc term</sch:title>

        <sch:rule context="tei:desc[@type = 'terms']">
            <sch:p>For each type, Max 4</sch:p>
            <sch:assert test="count(tei:term[@type = 'standard']) lt 5">More than 4 terms of the
                same vocabulary type may be too much: STANDARD</sch:assert>
            <sch:assert test="count(tei:term[@type = 'discipline']) lt 5">More than 4 terms of the
                same vocabulary type may be too much: DISCIPLINE</sch:assert>
            <sch:assert test="count(tei:term[@type = 'technique']) lt 5">More than 4 terms of the
                same vocabulary type may be too much: TECHNIQUE</sch:assert>
            <sch:assert test="count(tei:term[@type = 'object']) lt 5">More than 4 terms of the same
                vocabulary type may be too much: OBJECT</sch:assert>

        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:p>source attribute</sch:p>
        <sch:rule context="tei:term/@source">
            <sch:assert test=".">The attribute source is important to specifiy which vocabulary was
                used. The main ones are "tadirah", "nedimah", aurehal, "standard".</sch:assert>
        </sch:rule>
        <sch:p>step file: Tadirah activity is mandatory</sch:p>
        <sch:rule context="tei:term[ancestor::tei:TEI[@type = 'researchStep']]">
            <sch:assert test="@type = 'activity'">A step should be described by an activity term,
                taken from the TADirAH taxonomy.</sch:assert>
        </sch:rule>
        <sch:rule context="tei:term[ancestor::tei:TEI[@type = 'researchScenario']]">
            <sch:report test="@type = 'activity'">The activity terms are more suitable for
                describing steps rather than scenarios. It is recommended to choose one activity
                term per scenario step.</sch:report>
        </sch:rule>
        <sch:rule context="tei:term/@key">
            <sch:report test="matches(., '\w*/\w*')">No hierarchy in the term @key
                attribute.</sch:report>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:title>Resources</sch:title>
        <sch:p>General or project : if project, need a source and a corresp attributes</sch:p>
        <sch:rule context="tei:linkGrp[@type = 'projectResources']">
            <sch:assert test="normalize-space(@corresp)">Need a value for @corresp</sch:assert>
            <sch:assert test="matches(@corresp, '^https?:')">Value of @corresp should be a valid
                URI</sch:assert>
            <sch:assert test="normalize-space(@source)">The attribute @source should contain the
                name of the project whose references are listed inside the
                &lt;linkGrp&gt;</sch:assert>
        </sch:rule>
        <sch:p>Zotero = prefix + ^[A-Z0-9]{8}$</sch:p>
        <sch:rule context="tei:linkGrp/tei:ref[@source = 'zotero']">
            <sch:assert
                test="matches(@target, '(wp2|wp3|wp4):[A-Z0-9]{8}') or matches(@target, '[A-Z0-9]{8}')"
                >The reference of a Zotero frecord is made with the Zotero item key (8 capitals or
                digits)</sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:rule context="tei:linkGrp/tei:ref">
            <sch:assert test="tei:term">It is possible to add terms to resources, for instance a
                standard or a technique.</sch:assert>
        </sch:rule>
    </sch:pattern>
    <sch:pattern>
        <sch:title>@type</sch:title>
        <sch:p>body/div</sch:p>
        <sch:rule context="tei:body[ancestor::tei:TEI[@type = 'researchScenario']]/tei:div/@type">
            <sch:assert test=". = 'researchScenario'">@type attribute incoherence</sch:assert>
        </sch:rule>
        <sch:rule context="tei:body[ancestor::tei:TEI[@type = 'researchStep']]/tei:div/@type">
            <sch:assert test=". = 'researchStep'">@type attribute incoherence</sch:assert>
        </sch:rule>
        <sch:p>head</sch:p>
        <sch:rule context="tei:head[ancestor::tei:TEI[@type = 'researchScenario']]/@type">
            <sch:assert test=". = 'scenarioTitle'">@type attribute incoherence</sch:assert>
        </sch:rule>
        <sch:rule context="tei:head[ancestor::tei:TEI[@type = 'researchStep']]/@type">
            <sch:assert test=". = 'stepTitle'">@type attribute incoherence</sch:assert>
        </sch:rule>
        <sch:p>desc x 2</sch:p>
        <sch:rule context="tei:event">
            <sch:assert test="tei:desc[@type = 'definition'] and tei:desc[@type = 'terms']">we need
                a desc element for the description of the step or the scenario and a desc element
                for the associated terms.</sch:assert>
        </sch:rule>
        <sch:p>event</sch:p>
        <sch:rule context="tei:event/@type">
            <sch:assert test=". = 'researchStep'">An event element should be type with
                'researchStep'</sch:assert>
        </sch:rule>
    </sch:pattern>
</sch:schema>
