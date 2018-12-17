<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2"
  xmlns:sqf="http://www.schematron-quickfix.com/validator/process">
  <sch:ns uri="http://www.tei-c.org/ns/1.0" prefix="tei"/>
  <sch:ns prefix="xs" uri="http://www.w3.org/2001/XMLSchema"/>
  <sch:p>Pure TEI content rules</sch:p>
  <!-- HEADER -->
  <sch:pattern>
    <sch:title>xml:id</sch:title>
    <sch:let name="fileName" value="tokenize(document-uri(/), '/')[last()]"/>
    <sch:rule context="tei:TEI">
      <sch:assert test="string(@xml:id) = substring-before($fileName, '.xml')" role="error">The
        xml:id of the TEI element should be equal to the name of the file, without the file
        extension. Currently the value of xml:id is "<sch:value-of select="@xml:id"/>" whilst the
        file name is "<sch:value-of select="$fileName"/>"</sch:assert>
      <sch:assert test="string(@type) = 'researchScenario' or 'researchStep'" role="error"
        >TEI/@type should be either "researchScenario" or "researchStep". The current value of
        TEI/@type is "<sch:value-of select="@type"/>"</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>Authors and sponsor</sch:title>
    <sch:rule context="tei:titleStmt">
      <sch:assert test="tei:author" role="error">All scenarios and steps should have identified
        authors.</sch:assert>
      <sch:report test="not(tei:sponsor)" role="warning">The main sponsor of the SSK is the PARTHENOS project. All
        scenarios and steps should record this information.</sch:report>
    </sch:rule>
    <sch:rule context="tei:author">
      <sch:assert test="tei:persName and tei:affiliation" role="error">You need to supply the name and the
        affiliation of all authors.</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>Authority</sch:title>
    <sch:rule context="tei:publicationStmt">
      <sch:assert test="tei:authority" role="error">An authority responsibile for making the
        scenario or the step available should be provided. This authority can be the project or the
        team in the context which the research process described in the scenario has been carried
        out.</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:rule context="tei:licence">
      <sch:assert
        test="@target = 'http://creativecommons.org/licenses/by/4.0/' or @target = 'http://creativecommons.org/publicdomain/zero/1.0/'"
        role="error"> The licences of the scenarios and steps should be CC-BY 4.0 or CC0 1.0 Don't
        forget to put the link towards the licence reference text in the @target attribute. The
        current value of "<sch:name path="@target"/>" is "<sch:value-of select="@target"
        />"</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>Licences</sch:title>
    <sch:rule context="tei:availability">
      <sch:assert test="tei:licence/@target and tei:licence/tei:p" role="error">A licence should be applied to
        all scenarios and steps. The declaration of the licence chosen in made by a clear sentence
        in natural language (in a p element) and a link towards the licence (with the attribute
        @target).</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>Source Description</sch:title>
    <sch:rule context="tei:sourceDesc" role="error">
      <sch:report test="child::*" role="information">sourceDesc in mandatory in TEI, so if you want to give details on
        the way the scenario was conceived, it is the appropriate location.</sch:report>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>revisionStmt</sch:title>
    <sch:p>Name, affiliation, date, desc</sch:p>
    <sch:rule context="tei:change">
      <sch:assert test="tei:date and tei:persName and tei:affiliation and tei:desc" role="information">When recording a
        revision, some precise metadata must be given : the date of the revision, the name of the
        responsibe and his/her affiliation and a description. </sch:assert>
    </sch:rule>
  </sch:pattern>
  <!-- BODY -->

  <sch:pattern>
    <sch:title>head</sch:title>
    <sch:p>title between 10 and 100 characters</sch:p>
    <sch:p>Start with a verb or a gerund</sch:p>
    <sch:rule context="tei:div/tei:head">
      <sch:assert test="string-length(.) &gt; 9" role="error"> The title is too short: 10 characters minimum.
        Your title is <sch:value-of select="10 - string-length(.)"/> characters too
        short.</sch:assert>
      <sch:assert test="string-length(.) &lt; 101" role="error">The title is too long: 100 characters maximum.
        Your title is <sch:value-of select="string-length(.) - 100"/> characters too
        long.</sch:assert>
      <sch:report test="normalize-space(.)" role="information">The title of a scenario should describe the main goal of
        the scenario.</sch:report>
    </sch:rule>
    <sch:rule context="tei:event/tei:head">
      <sch:assert test="string-length(.) &gt; 9" role="error"> The title is too short: 10 characters minimum </sch:assert>
      <sch:assert test="string-length(.) &lt; 100" role="error">The title is too long: 100 characters
        maximum</sch:assert>
      <sch:assert test="matches(., '(^\w*(ing|ion|ment|ments) )|( \w*(ing|ion|ment|ments$))')" role="information">The
        title of a step should describe the action to perform, starting or ending with a gerund (or
        an infinitive), or a noun .</sch:assert>
    </sch:rule>
  </sch:pattern>

  <sch:pattern>
    <sch:title>desc definition</sch:title>
    <sch:p>Need a description</sch:p>
    <sch:p>max 1500 characters</sch:p>
    <sch:p>Nothing but lists and refs</sch:p>
    <sch:rule context="tei:desc[@type = 'definition']">
      <sch:assert test="string-length(.) &lt; 1500" role="error">The description is too long: 1500 characters
        maximum. Your description is <sch:value-of select="string-length(.) - 1500"/> too
        long</sch:assert>
      <sch:assert test="tei:list or tei:ref or text()" role="error"> In the &lt;desc type="definition&gt;, there should be
        nothing more than text, &lt;list&gt; and &lt;ref&gt;.</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>Image</sch:title>
    <sch:p>png or jpg</sch:p>
    <sch:rule context="tei:figure/tei:graphic/@url">
      <sch:assert test="matches(., '\.(JPG|JPEG|PNG|jpg|png|jpeg)$')" role="error">The image format should be JPG
        or PNG. Accepted extensions are: jpg, JPG, jpeg, JPEG, png, PNG</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>desc term</sch:title>
    <sch:p>For each type, Max 4</sch:p>
    <sch:rule context="tei:desc[@type = 'terms']">
      <sch:report
        test="ancestor::tei:TEI[@type = 'researchStep'] and count(tei:term[@type = 'activity']) = 0" role="error"
        >A step should be described by an activity term, taken from the TADirAH
        taxonomy.</sch:report>
      <sch:report
        test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'standard']) = 0"
        see="http://ssk.huma-num.fr/#/glossary/standards" role="information">A scenario could have several keywords
        related to standards. Check the documentation for more details</sch:report>
      <sch:report
        test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'discipline']) = 0"
        see="http://ssk.huma-num.fr/#/glossary/disciplines" role="information">A scenario could have several keywords
        related to disciplines. Check the documentation for more details.</sch:report>
      <sch:report
        test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'technique']) = 0"
        see="http://ssk.huma-num.fr/#/glossary/techniques" role="information">A scenario could have several keywords
        related to research techniques. Check the Tadirah taxonomy for more details.</sch:report>
      <sch:report
        test="ancestor::tei:TEI[@type = 'researchScenario'] and count(tei:term[@type = 'object']) = 0"
        see="http://ssk.huma-num.fr/#/glossary/standards/objects" role="information">A scenario could have several
        keywords related to research objects. Check the Tadirah taxonomy for more
        details.</sch:report>
      <sch:assert test="count(tei:term[@type = 'standard']) &lt; 5" role="warning">More than 4 terms of the same
        vocabulary type may be too much: STANDARD</sch:assert>
      <sch:assert test="count(tei:term[@type = 'discipline']) &lt; 5" role="warning">More than 4 terms of the same
        vocabulary type may be too much: DISCIPLINE</sch:assert>
      <sch:assert test="count(tei:term[@type = 'technique']) &lt; 5" role="warning">More than 4 terms of the same
        vocabulary type may be too much: TECHNIQUE</sch:assert>
      <sch:assert test="count(tei:term[@type = 'object']) &lt; 5" role="warning">More than 4 terms of the same
        vocabulary type may be too much: OBJECT</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:p>source attribute</sch:p>
    <sch:p>step file: Tadirah activity is mandatory</sch:p>
    <sch:rule context="tei:desc[@type = 'terms']/tei:term">
      <sch:assert test="@source" role="error">The attribute source is important to specifiy which vocabulary was
        used. The main ones are "tadirah", aurehal, "standard".</sch:assert>
      <sch:report test="ancestor::tei:TEI[@type = 'researchScenario'] and @type = 'activity'" role="warning">The
        activity terms are more suitable for describing steps rather than scenarios. It is
        recommended to choose one activity term per scenario step.</sch:report>
      <!--<sch:report test="@key = matches(., '\w*/\w*')">No hierarchy in the term @key attribute.</sch:report>-->
    </sch:rule>
  </sch:pattern>
  <!--<sch:rule context="tei:term[ancestor::tei:TEI[@type = 'researchStep']]">
      <sch:assert test="@type = 'activity'">A step should be described by an activity term, taken
        from the TADirAH taxonomy.</sch:assert>
    </sch:rule>-->
  <!--<sch:rule context="tei:term[ancestor::tei:TEI[@type = 'researchScenario']]">
      <sch:report test="@type = 'activity'">The activity terms are more suitable for describing
        steps rather than scenarios. It is recommended to choose one activity term per scenario
        step.</sch:report>
    </sch:rule>-->
  <!--    <sch:rule context="tei:term/@key">
      <sch:report test="matches(., '\w*/\w*')">No hierarchy in the term @key attribute.</sch:report>
    </sch:rule>
  -->
  <sch:pattern>
    <sch:title>Resources</sch:title>
    <sch:p>General or project : if project, need a source and a corresp attributes</sch:p>
    <sch:p>Zotero = prefix + ^[A-Z0-9]{8}$</sch:p>
    <sch:rule context="tei:linkGrp[@type = 'projectResources']">
      <sch:assert test="normalize-space(@corresp)" role="error">Need a value for @corresp</sch:assert>
      <sch:assert test="matches(@corresp, '^https?:')" role="error">Value of @corresp should be a valid URI. The
        current value of @corresp for "<sch:name path="."/>" is <sch:value-of select="@corresp"
        /></sch:assert>
      <sch:assert test="normalize-space(@source)" role="error">The attribute @source should contain the name of
        the project whose references are listed inside the &lt;linkGrp&gt;. The current value of
        @source for "<sch:name path="."/>" is <sch:value-of select="@source"/></sch:assert>
    </sch:rule>
    <sch:rule context="tei:linkGrp/tei:ref[@source = 'zotero']">
      <sch:assert
        test="matches(@target, '(wp2|wp3|wp4):[A-Z0-9]{8}') or matches(@target, '[A-Z0-9]{8}')" role="warning">The
        reference of a Zotero record is made with the Zotero item key (8 capitals or
        digits)</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:rule context="tei:linkGrp/tei:ref">
      <sch:assert test="tei:term" role="information">It is possible to add terms to resources, for instance a standard
        or a technique.</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>@type</sch:title>
    <sch:p>body/div</sch:p>
    <sch:p>head</sch:p>
    <sch:p>desc x 2</sch:p>
    <sch:p>event</sch:p>
    <sch:rule context="tei:body[ancestor::tei:TEI[@type = 'researchScenario']]/tei:div/@type">
      <sch:assert test=". = 'researchScenario'" role="warning">@type attribute incoherence: document type is
          '<sch:value-of select="ancestor::tei:TEI/@type"/>' and current element type value is
          '<sch:value-of select="."/>'</sch:assert>
    </sch:rule>
    <sch:rule context="tei:body[ancestor::tei:TEI[@type = 'researchStep']]/tei:div/@type">
      <sch:assert test=". = 'researchStep'" role="warning">@type attribute incoherence: document type is
          '<sch:value-of select="ancestor::tei:TEI/@type"/>' and current element type value is
          '<sch:value-of select="."/>'</sch:assert>
    </sch:rule>
    <sch:rule context="tei:head[ancestor::tei:TEI[@type = 'researchScenario']]/@type">
      <sch:assert test=". = 'scenarioTitle'" role="warning">@type attribute incoherence: document type is
          '<sch:value-of select="ancestor::tei:TEI/@type"/>' and current element type value is
          '<sch:value-of select="."/>'</sch:assert>
    </sch:rule>
    <sch:rule context="tei:head[ancestor::tei:TEI[@type = 'researchStep']]/@type">
      <sch:assert test=". = 'stepTitle'" role="warning">@type attribute incoherence: document type is
          '<sch:value-of select="ancestor::tei:TEI/@type"/>' and current element type value is
          '<sch:value-of select="."/>'</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:rule context="tei:event">
      <sch:report
        test="ancestor::tei:TEI[@type = 'researchStep'] and not(tei:desc[@type = 'definition']) and not(tei:desc[@type = 'terms'])" role="error"
        >we need a desc element for the description of the step or the scenario and a desc element
        for the associated terms.</sch:report>
      <sch:assert test="@type = 'researchStep'" role="error">An event element should be typed with
        'researchStep'</sch:assert>
    </sch:rule>
  </sch:pattern>
</sch:schema>
