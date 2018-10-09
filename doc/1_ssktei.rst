.. _reTEI:

The SSK data model (TEI)
========================

The SSK offers researchers needing standardized methods and resources
complete frameworks to carry out their project, in Arts and Humanities
and Heritage science. It takes the form of step by step research
scenarios where the use of standards is clearly identified. Theses
scenarios are divided into different steps, implying specific tasks.
Each step contains a set of bibliographical resources.

TEI: the underlying data model
------------------------------

The underlying data model of the SSK itself respects a standard, the
Text Encoding Initiative, and is publicly available [2]_. Each scenario
and each step is encoded in TEI documents that are linked together with
referencing mechanisms. This choice was made in order to ensure that the
scenarios and the steps can be easily extended, reused and customized.
The data model allows scenario creators to modify the structure of their
research scenarios on the fly, by creating, removing or reordering
steps. As steps are considered as autonomous objects in the
architecture, they can be used in several scenarios. Customisation
mechanisms are added to make sure that the information displayed is
linked to the context of the scenarios as much as possible, namely
according to disciplines, research objects and techniques.

Main elements
-------------

The main elements of the SSK TEI are:

-  ``<listEvent >`` (list of events) contains a list of
   descriptions, each of which provides information about an
   identifiable event.
-  ``<event >`` contains data relating to any kind of
   significant event associated with a person, place, or organization.
-  ``<linkGrp >`` (link group) defines a collection of
   associations or hypertextual links.
-  ``<ref >`` (reference) defines a reference to another
   location, possibly modified by additional text or comment.

A scenario is a list of events (``<listEvent>``), each scenario step is an event (``<event>``).

The ``<event >`` element is the core of SSK scenarios. It contains the full description of scenario step:

- a ``<label >`` that contains any label or heading used to identify part of a text, typically but not exclusively in a list or glossary.
- a ``<desc >`` that contains a brief description of the object documented by its parent element, typically a documentation element or an entity.
- some descriptive terms following controlled vocabularies: ``<term >`` elements that contains a single-word, multi-word, or symbolic designation which is regarded as a technical term.
- bibliographical references: ``<ref >`` (reference) defines a reference to another location, possibly modified by additional text or comment.

Events are stored in external files, allowing them to be used in different scenarios.
Scenario files gather ``<event>`` in a ``<listEvent>`` element, by referencing them with a ``@ref`` attribute.
It is however possible to modify the content of the event called in a scenario, using the attribute mode (see below)

The resources consists of bibliographical references. They are gathered
in ``<linkGrp>`` elements. They are of two types : `general resources` and
`project specific`. ``<linkGrp>`` elements can be repeated (one per project). At
each level, the elements are enriched with keywords that can be term or
XML attributes.

Common attributes
-----------------

The attributes used by all the elements are:

* ``xml:lang``. This attribute is mandatory in all the content elements,namely label, desc, term. The authoritative list of registered language subtags is maintained by IANA and is available at http://www.iana.org/assignments/language-subtag-registry:

.. code-block:: xml

  <label xml:lang="en">Create associated documentation</label>
  <label xml:lang="fr">Création de la documentation associée</label>

* ``mode``, available for all content elements. the mode is used in scenario files to allow for modification of the imported steps:

.. code-block:: xml

  <event xml:id="s1" type="step" ref="step_EaXswO_290517">
    <head mode="change">
      <!-- The new <label> replace the initial step label, in the declared language-->
      <label mode="change" xml:lang="jp">...</label>
      <!-- A new term is added to the step -->
      <term mode="add"/>
    </head>
    ...
  </event>

* the ``type`` attribute is required in most elements. See below for details.

The Resources
=============

Zotero
------

The resources to be presented in the SSK are preferably stored in a Zotero
database, accessible  `here <https://www.zotero.org/groups/427927/ssk-parthenos>`_ . To add a resource, an account
on Zotero is required. Contact the SSK team to join the group (ssk [at]
inria [dot] fr)

The Zotero database fields required by the SSK are:

* `Item type`: The item type is most of the time identified by Zotero but it's important to check it. The most used item types are:

  * webpage
  * blogpost
  * journal article
  * book section
  * book
  * presentation

* `Title`: The title of the resource
* `Author`: The author of the resource
* `Date`: The date of the resource
* `Url`: the url of the resource
* `Language`: the language of the resource
* `Source`:

  * For webpages: website title
  * For blogposts: blog title
  * For journal articles, books, book sections, documents: library catalog

NB: A short description of the resource should be provided when
possible. In Zotero, the appropriate field is abstract, but it is also
possible to add this description in the TEI, with a ``<desc>`` element, as
shown in the following example:

.. code-block:: xml

  <linkGrp type="generalResources">
   <ref source="zotero" subtype="book" target="PM5P3JDB" type="tutorial">
    <desc xml:lang="en" type="resourceDesc"> This booklet is
     intended as an introductory textbook for students and
     end-users interested in knowing more about the exciting
     developments in this high-tech area of conservation and
     conservation science. Their teachers are invited to use the
     texts and photographic materials for educational purposes,
     while the conservation scientist might appreciate the short
     reviews of applications and of the science underlying the
     described processes.</desc>
   <term key="Laser cleaning" type="tutorial"/>
  </ref>
 </linkGrp>

GitHub
------

It is also possible to point to a GitHub user or repository. In this
case, the informations that the SSK shows (via the API) are:

* For a GitHub User:

  * name
  * html\_url
  * bio
  * updated\_at
  * type
  * avatar\_url

* For a GitHub repository

  * owner (NB : a GitHub user)
  * full\_name
  * html\_url
  * description

A dedicated GitHub repository has been set for projects supported or
maintained by Parthenos. It is available here. Contact the SSK team for
more information.

Detailed structure
==================

Scenarios and steps are represented in different files. This choice has
been made to facilitate the use of a step in several scenarios, with or
without modifications.

Files naming conventions are the following:

* for scenarios:

  * sc for scenario
  * an underscore
  * a condensed title of the scenario in camel case

* for steps:

  * the string step
  * an underscore
  * the intials of the step name, with the liaison words in lower case, and the meaningful words in upper case
  * an underscore and the date (optional)

Scenarios and steps structure
-----------------------------

Scenarios
~~~~~~~~~

The scenario is represented by the element listEvent, containing a set of event elements that reference external TEI files.

Header
^^^^^^

The structure of the Scenario header is as follows:

.. code-block:: xml

  <TEI type="scenario" xmlns="http://www.tei-c.org/ns/1.0">
    <teiHeader>
      <fileDesc>
        <titleStmt>
          <title>
          <!-- Title of the tei document, not title of the scenario -->
          </title>
          <author>
            <persName>...</persName>
            <affiliation>...</affiliation>
          </author>
          <sponsor>PARTHENOS</sponsor>
        </titleStmt>
        <publicationStmt>
          <authority>...</authority>
          <availability>
            <licence target="http://creativecommons.org/licenses/by/4.0/">
              <p>The Creative Commons Attribution 4.0 Unported
              (CC BY 4.0) Licence applies to this document.</p>
            </licence>
          </availability>
        </publicationStmt>
        <sourceDesc>
          <p>Created from scratch</p>
        </sourceDesc>
      </fileDesc>
      <revisionDesc>
        <change>
        <!-- Only for major changes: addition of an author, of a step, etc. -->
        </change>
      </revisionDesc>
    </teiHeader>
    ...
  </TEI>

The scenario header includes the following data elements:

  * the title of the document (which is not the title of the scenario)
  * the authors of the scenarios
  * the major modifications

Structure
^^^^^^^^^

In a scenario file, event elements are used as pointers to link to full
event elements stored in external files.

.. code-block:: xml

  <listEvent>
    <event xml:id="s1" type="step" ref="step_EaXswO_290517"/>
    <event xml:id="s2" type="step" ref="step_Eprimrf_300517"/>
    <event xml:id="s3" type="step" ref="step_Cad_300517"/>
    <event xml:id="s4" type="step" ref="step_Tdats_300517"/>
    <event xml:id="s5" type="step" ref="step_Sapditnf_300517"/>
  </listEvent>

It is also possible to refer to another scenario, that will be entirely
(or partially by using parameters - see below) include in the described
scenario. ...

.. code-block:: xml

  <listEvent>
    <event type="scenario" ref="SSK_digitization.xml"/>
    <event xml:id="s1" type="step" ref="step_KedKep_170717"/>
    ...
  </listEvent>

It is possible to modify the content of an existing step directly in the
scenario file. See the advanced features for more information.

Steps
~~~~~

A full description of the scenario step.

header
^^^^^^

The structure of the step header is as follows:

.. code-block:: xml

  <TEI type="step" xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
  <fileDesc>
   <titleStmt>
    <title>
  <!-- title of the file, not title of the step -->
    </title>
    <author>
     <persName>Charles Riondet</persName>
     <affiliation>Inria</affiliation>
    </author>
   </titleStmt>
   <publicationStmt>
    <authority>Parthenos</authority>
    <availability>
     <licence target="http://creativecommons.org/licenses/by/4.0/">
      <p>The Creative Commons Attribution 4.0 Unported
             (CC BY 4.0) Licence applies to this document.</p>
     </licence>
    </availability>
   </publicationStmt>
   <sourceDesc>
    <p>Created from scratch</p>
   </sourceDesc>
  </fileDesc>
  <revisionDesc>
   <change/>
  </revisionDesc>
  </teiHeader> ...
  </TEI>

The step header includes the following data elements:

* the title of the document
* the author of the step
* the major modification

structure
^^^^^^^^^

The main elements of a ``<event>`` are the description of the event, and the
resources related to it. The description is recorded in the elements
``head`` (see below) and ``desc`` and the resources are contained by
one or two ``linkGrp``.

Content of scenarios and steps
------------------------------

head
~~~~

The TEI ``head`` element record the title of a scenario or a step.

The attribute ``xml:lang`` is mandatory. The element ``head`` can be repeated to
give as many translated versions as possible. Create associated
documentation

desc
~~~~

The element ``desc`` is used in two ways for the description of the scenarios and the steps. The distinction is made with the attribute ``type``

* When the value of type is `definition`, the content of desc is a short text describing the scenario or the step
* When the value of type is `term`, the content of desc is a set of term elements

term
~~~~

``term`` elements are used to tag the scenarios, the steps and the resources, according to the SSK taxonomies, that are:

* Tadirah activities, objects and techniques
* The NEDIMAH type taxonomy for Information resource (or objects)
* the Dariah-IT Standard Knowledge base
* aureHAL disciplines

Functioning
^^^^^^^^^^^

These taxonomies are declared with the attributes ``type`` and ``source``. The
attributes of term are:

* The type attribute gives an information about the kind of term used. Its values are

  * standard: the key gives the id of a standard referenced in the SSK standard Knowledge base
  * activity: the value of key is taken from the tadirah ontology, research activities section
  * object: the value of key is taken from the NEMO taxonomy Information Resource Types, research objects section
  * technique: the value of key is taken from the tadirah ontology, research techniques section
  * discipline, taken from the aureHAL taxonomy

* The source attribute sets a reference link for the taxonomy.
* The key attribute gives either an URI when the label of the term can be taken from or directly a label

Taxonomies
^^^^^^^^^^

Tadirah activities
''''''''''''''''''

the activities must be chosen in the following list (only pick between
the second level values):

* Capture

  * Conversion
  * Data Recognition
  * Discovering
  * Gathering
  * Imaging
  * Recording
  * Transcription

* Creation

  * Designing
  * Programming
  * Translation
  * Web development
  * Writing

* Enrichment

  * Annotating
  * Cleanup
  * Editing

* Analysis

  * Content Analysis
  * Network Analysis
  * Relational Analysis
  * Spatial Analysis
  * Structural Analysis
  * Stylistic Analysis
  * Visualization

* Interpretation

  * Contextualizing
  * Modeling
  * Theorizing

* Storage

  * Archiving
  * Identifying
  * Organizing
  * Preservation

* Dissemination

  * Collaboration
  * Commenting
  * Communicating
  * Crowdsourcing
  * Publishing
  * Sharing

* Meta-Activities

  * Assessing
  * Community Building
  * Give Overview
  * Project Management
  * Teaching / Learning

Tadirah techniques
''''''''''''''''''

The Tadirah techniques are the following :

- Bit Stream Preservation

-  Brainstorming

-  Browsing

-  Cluster Analysis

-  Collocation Analysis

-  Commenting

-  Concordancing

-  Debugging

-  Distance Measures

-  Durable Persistent Media

-  Emulation

-  Encoding

-  Gamification

-  Georeferencing

-  Information Retrieval

-  Linked Open Data

-  Machine Learning

-  Mapping

-  Migration

-  Named Entity Recognition

-  Open Archival Information Systems

-  Pattern Recognition

-  Photography

-  POS-Tagging

-  Preservation Metadata

-  Principal Component Analysis

-  Replication

-  Scanning

-  Searching

-  Sentiment Analysis

-  Sequence Alignment

-  Technology Preservation

-  Topic Modeling

-  Versioning

-  Web Crawling

-  Text Mining


TaDIRAH Objects
'''''''''''''''

The TaDIRAH objects vocabulary contains 36 types of research objects,
including the most common used by Arts and Humanities scholars.

-  Artifacts

-  Bibliographic Listings

-  Code

-  Computers

-  Curricula

-  Digital Humanities

-  Data

-  File

-  Images

-  Images (3D)

-  Infrastructure

-  Interaction

-  Language

-  Link

-  Literature

-  Manuscript

-  Map

-  Metadata

-  Methods

-  Multimedia

-  Multimodal

-  Named Entities

-  Persons

-  Projects

-  Research

-  Research Process

-  Research Results

-  Sheet Music

-  Software

-  Sound

-  Standards

-  Text

-  Text Bearing Objects

-  Tools

-  Video

-  VREs

aureHAL disciplines
'''''''''''''''''''

The disciplines must be chosen in the following list:

- Biological anthropology

- Social Anthropology and ethnology

-  Archaeology and Prehistory

-  Architecture, space management

-  Art and art history

-  Classical studies

-  Demography

-  Law

-  Economies and finances

-  Education

-  Environmental studies

-  Gender studies

-  Geography

-  Management

-  History, Philosophy and Sociology of Sciences

-  History

-  Communication sciences

-  Linguistics

-  Literature

-  Cultural heritage and museology

-  Musicology and performing arts

-  Philosophy

-  Psychology

-  Religions

-  Political science

-  Sociology

-  Methods and statistics

Standards knowledge base
''''''''''''''''''''''''

The list of the standards already described in the Standards Knowledge
base can be found here. If you don’t find the standard you want, you can
create a description using this sample file and upload it here to the GitHub folder `standardsDesc <https://github.com/ParthenosWP4/SSK/tree/master/standardsDesc>`_.

Note that the value to indicate in the key is the value of the field
"standard\_abbr\_name". See below the sample file.

.. code-block:: xml

  <doc>
      <field name="id">33 (must be incremented by 1 for each new standard)</field>
      <field name="standard_abbr_name">Standard abbreviated Name
      This information will be used in the TEI file to refer to this description</field>
      <field name="standard_complete_name">Standard Complete name</field>
      <field name="standard_type">Two values: 'standard' OR 'method'.
      When describing a format, use 'standard',
      when describing a protocol or a set of techniques, use 'method'</field>
      <field name="standard_desc_eng">English Description</field>
      <field name="standard_desc_fr">French Description</field>
      <field name="standard_desc_deu">German Description</field>
      <field name="standard_desc_esp">Spanish Description</field>
      <field name="standard_data_type">select from: Horizontal->e.g. XML, CSV
      and vertical ->e.g. EDM</field>
      <field name="standard_link">http://link_to_standard_official_page.com</field>
      <field name="standard_tags">Tag1: example-> Classification</field>
      <field name="standard_tags">Tag2: example-> Human-history</field>
      <field name="standard_tags">Tag3: example-> Research Activities - Organizing</field>
      <field name="standard_tags">Tag4: example-> Research Objects - Digital Humanities</field>
      <field name="standard_resources">http://link_to_resource_about_the _standard.com</field>
  </doc>

linkGrp
~~~~~~~

``linkGrp`` is the container for the resources associated to a given step. It can have three attributes:

* The attribute ``type`` is required and can have two values:

  * `generalResources`: for resources that give general input about a standard, a protocol, ...
  * `projectResources`: for resources that show examples of real projects using the described standard, protocol, ...

*  When type has `projectResources` for value, two more attributes are required:

  * `source` for the name of the project mentioned
  * `corresp` for a url pointing to or identifying the project


.. code-block:: xml

  <linkGrp type="generalResources">
    <ref type="Report" source="zotero" target="ZQVB6CIP"/>
  </linkGrp>
  <linkGrp type="projectResources" source="CODATA" corresp="http://www.codata.org/">
    <ref type="Report" source="zotero" target="G4UPDPG3"/>
  </linkGrp>

ref
~~~

The attributes for ref are type, subtype, source and target.

* The attribute type is required. Its values are taken from the Zotero item types, plus SSK specific values. Possible values are:

  * spec: the specification, of a standard for instance.
  * report: technical reports
  * blog: blog posts
  * tutorial: tutorials or guidelines
  * script: Scripts and code samples
  * paper: Scholarly papers
  * library: Computing libraries
  * tool: a link to a service or a software useful for a given step.
  * database:
  * method
  * bibliography
  * schema

*  the source attribute in ref is used by the SSK to record where the full information about the resource is stored, and that the SSK queries. The values are a semi-closed list. The source attribute has for possible values:

  * zotero: The Parthenos WP4 Zotero library: WP4 Zotero Library
  * github: resources hosted in a GitHub repository, preferably the Parthenos WP4 repository, but not exclusively
  * isidore: resources described in the platform of search Isidore dedicated to Humanities and Social Sciences.

* The target attribute specifies the destination of the reference with an URI.


.. code-block:: xml

  <ref type="spec" subtype="standard" target="http://zotero.org/groups/427927/items/BEVAWMPX"/>

param
~~~~~

See below the advanced features section

Advanced features
=================

Customize a step or a scenario
------------------------------

It is possible to modify the content of a step directly in the scenario
file, for instance, modifying the label to contextualize it, or adding a
very specific resource. To do so, event and its children can be
specified with the mode attribute; with the possible following values:

- `change`
- `add`

.. code-block:: xml

  <event type="step" ref="step_EaXswO_290517">
   <head mode="add" xml:lang="jp">...</head>
   <desc type="definition" mode="change">...</desc>
   ...
  </event>

The parameters
--------------

When pointing to a step inside a scenario, it is possible to use
parameters to refine the behaviour of this step. This parametrization
uses the element ``<param>`` in ``<event>``. Two different uses are possible for the
moment, to refine the resources selection in a given step, or to
include some steps of a scenario in another scenario.

Parameter #1 : refine the resources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is possible to select the resources to be displayed in a scenario.
The criteria are based on the taxonomies used by the SSK model :

- Tadirah Activities
- Tadirah techniques
- NEMO Data types
- aureHAL disciplines
- Standards

The element param contains an attribute name, that contains a formal name to identify on which taxonomy the parameter is applied. The possible values are :

-  activity

-  technique

-  datatype

-  discipline

-  standard

Another attribute value contains the term used to select the
wanted resources. In other words, in the example below, the resources
displayed would only be the ref that contains one or more term
elements with values "XML", "conversion" and "Text Bearing Objects".

.. code-block:: xml

  <event type="researchStep" ref="referencedStep">
   <label mode="replace">New label</label>
   <desc mode="replace">new description</desc>
   <!-- resources -->
   <param name="standard" value="XML"/>
   <param name="activity" value="conversion"/>
   <param name="technique" value="Text Bearing Objects"/> ...
  </event>

In this situation, all the following
resources would be selected.

.. code-block:: xml

  <ref type="code" target="// URL //">
   <term type="activity" source="tadirah" key="conversion"/>
   <term type="standard" key="XML"/>
  </ref>

  <ref type="code" target="// URL //">
   <term type="technique" source="tadirah" key="Text Bearing Objects"/>
   <term type="standard" key="XML"/>
  </ref>

  <ref type="code" target="// URL //">
   <term type="technique" source="tadirah" key="Text Bearing Objects"/>
   <term type="activity" source="tadirah" key="conversion"/>
  </ref>

  <ref type="code" target="URL">
   <term type="standard" key="XML"/>
  </ref>

Parameter #2 : include partially a scenario into another
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This mechanism records :

* The reference to a scenario
* A set of steps, not necessarily consecutive.

In this case, the attributes of param are also name and value, but they have a
different behaviour. The name value is range. The attribute value
records the interval of the steps (i.e. their order number) in the
scenario to include. To indicate an consecutive interval, the steps
indexes should be separated by an hyphen: ``-``. To indicate
non-consecutive steps, the steps indexes should be separated by a
comma: ``,``. These two behaviours can be mixed (see examples below)

A set of steps, sometimes consecutive, sometimes not consecutive
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This parameter would select steps 1, 2 and 3.

.. code-block:: xml

  <event xml:id="jjjj" type="researchScenario" ref="scenario_to_Be_Included">
    <param name="range" value="1-3"/>
  </event>

This parameter would select steps 1 and 3.

.. code-block:: xml

  <event xml:id="jjjj" type="researchScenario" ref="scenario_to_Be_Included">
    <param name="range" value="1,3"/>
  </event>

This parameter would select steps 1, 3, 5, 6 and 7.

.. code-block:: xml

  <event xml:id="jjjj" type="researchScenario" ref="scenario_to_Be_Included">
    <param name="range" value="1,3,5-7"/>
  </event>

Mixing parameters
~~~~~~~~~~~~~~~~~

This example shows the inclusion of a scenario into another and a
filter based on a keyword for a particular step in this subset. If the
@corresp is not used, the param will be applied to all the included
steps.

.. code-block:: xml

  <event xml:id="jjjj" type="researchScenario" ref="scenario_to_Be_Included">
    <param name="range" value="1,2,4-6"/>
    <!-- filter resources of the step nr 2 -->
    <param name="standards" value="XML" corresp="#2"/>
  </event>
