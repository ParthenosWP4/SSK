.. _reTEI:

========================
The SSK data model (TEI)
========================

The SSK offers researchers needing standardized methods and resources
complete frameworks to carry out their project, in Arts and Humanities
and Heritage science. It takes the form of step by step research
scenarios where the use of standards is clearly identified. Theses
scenarios are divided into different steps, implying specific tasks.
Each step contains a set of bibliographical resources.

TEI: the underlying data model
==============================

The underlying data model of the SSK itself respects a standard, the
Text Encoding Initiative. Each scenario
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

The SSK TEI specification can be accessed on GitHub: https://github.com/ParthenosWP4/SSK/tree/master/spec/TEI_SSK_ODD.xml.

This ODD specification allows us to generate a RELAXNG Schema : https://github.com/ParthenosWP4/SSK/tree/master/spec/TEI_SSK_ODD.rng.

Contribute to the SSK on GitHub with the TEI
--------------------------------------------

Users willing to create scenarios in TEI should follow the following
instructions:

-  Download or fork the SSK data repository in GitHub. It is necessary to have an account on GitHub: `https://github.com/ParthenosWP4/SSK/tree/master/ <https://github.com/ParthenosWP4/SSK/tree/master/`__ (NB: to fork a repository, a GitHub user account is necessary);
-  Create your files with your favourite XML editor. Don't forget to validate them against the SSK schema (see above);
-  To publish scenarios on the SSK, the TEI files need to be in the *scenarios* and *steps* folders;
-  Users with a GitHub account can make a pull request to ask for the update of the repository. Users without an account can contact the SSK team at ssk [at] inria [dot] fr.

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
database, accessible  `here <https://www.zotero.org/groups/427927/ssk-parthenos>`_. To add a resource, an account
on Zotero is required. Contact the SSK team to join the group (ssk [at]
inria [dot] fr).

The Zotero database fields required by the SSK are:

* ``Item type``: The item type is most of the time identified by Zotero but it's important to check it. The most used item types are:

  * webpage
  * blogpost
  * journal article
  * book section
  * book
  * presentation

* ``Title``: The title of the resource
* ``Author``: The author of the resource
* ``Date``: The date of the resource
* ``Url``: The url of the resource
* ``DOI``: The DOI
* ``Language``: the language of the resource
* ``Source``:

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
    <desc xml:lang="en" type="resourceDesc">This booklet is
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
  * html\_url (i.e. the URL of the profile page)
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

For scenarios:

#. ``sc`` for scenario
#. an underscore : ``_``
#. a condensed title of the scenario in camel case: ``myScenarioTitle``

example:

``sc_myScenarioTitle.xml``

For steps:

#. the string ``step``
#. an underscore; ``_``
#. the initials of the step name, with the liaison words in lower case, and the meaningful words in upper case. For example, if a step title is : ``Searching for a relevant step title``, it would give : ``SfaRST``.
#. an underscore and the date (optional)

example:

``step_SfaRST_10092018.xml``

Scenarios and steps structure
-----------------------------

Scenarios
~~~~~~~~~

The scenario is represented by the element ``<listEvent>``, containing a set of event elements that reference external TEI files.

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

In a scenario file, ``<event>`` elements are used as pointers to link to full
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
scenario.

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

Step files record the full description of the scenario step. Several elements have the same meaning and behaviour than those in scenario files.
The main difference is the content of the ``<event>`` element.

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

The main components of a ``<event>`` element are the description of the event, and the
resources related to it. The description is recorded in the elements
``head`` (see below) and ``desc`` and the resources are contained by
one or several ``linkGrp``.

Content of scenarios and steps
------------------------------

.. _head:

head
~~~~

The TEI ``head`` element record the title of a scenario or a step.

The attribute ``xml:lang`` is mandatory. The element ``head`` can be repeated to
give as many translated versions as possible. Create associated
documentation

.. _desc:

desc
~~~~

The element ``desc`` is used in two ways for the description of the scenarios and the steps. The distinction is made with the attribute ``type``

* When the value of type is `definition`, the content of desc is a short text describing the scenario or the step
* When the value of type is `term`, the content of desc is a set of term elements

.. _term:

term
~~~~

``term`` elements are used to tag the scenarios, the steps and the resources, according to the SSK taxonomies, that are:

* Tadirah activities, objects and techniques
* the Dariah-IT Standard Knowledge base
* aureHAL disciplines

Functioning
^^^^^^^^^^^

These taxonomies are declared with the attributes ``type`` and ``source``. The
attributes of ``<term>`` elements are:

* The ``type`` attribute gives an information about the kind of term used. Its values are

  * standard: the key gives the id of a standard referenced in the **SSK standard Knowledge base**
  * activity: the value of key is taken from the **Tadirah** ontology, research activities section
  * object: the value of key is taken from the **Tadirah** ontology, research objects section
  * technique: the value of key is taken from the **Tadirah** ontology, research techniques section
  * discipline, taken from the **aureHAL** taxonomy

* The ``source`` attribute sets a reference link for the taxonomy.
* The ``key`` attribute gives either an URI when the label of the term can be taken from or directly a label

.. _vocabs:

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
base can be found `here <http://ssk.huma-num.fr/#/glossary/standards>`_.

..
  If you don’t find the standard you want, you can create a description using this sample file and upload it here to the GitHub folder `standardsDesc <https://github.com/ParthenosWP4/SSK/tree/master/standardsDesc>`_.


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

.. _resources:

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

.. _refs:

ref
~~~

The attributes for ref are type, subtype, source and target.

* The attribute type is required. Its values are taken from the Zotero item types, plus SSK specific values. Possible values are:

  * `spec`: the specification (normative document) of a standard;
  * `report`: technical reports;
  * `blog`: blog posts;
  * `tutorial`: tutorials or guidelines;
  * `code`: Scripts and code samples;
  * `paper`: Scholarly papers;
  * `library`: Computing libraries;
  * `bibliography`: A list of bibliographic references
  * `database`: collection of structured data
  * `tool`: Computing tool, software;
  * `service`: Curating or hosting service.



*  the source attribute in ref is used by the SSK to record where the full information about the resource is stored, and that the SSK queries. The values are a semi-closed list. The source attribute has for possible values:

  * zotero: The Parthenos WP4 Zotero library: WP4 Zotero Library
  * github: resources hosted in a GitHub repository, preferably the Parthenos WP4 repository, but not exclusively
  * isidore: resources described in the platform of search Isidore dedicated to Humanities and Social Sciences.

* The target attribute specifies the destination of the reference with an URI.


.. code-block:: xml

  <ref type="spec" subtype="standard" target="http://zotero.org/groups/427927/items/BEVAWMPX"/>

.. _custom:

Point to other scenarios
========================
Beforehand and follow-up scenarios can be referenced just like steps within the list of steps (element ``<listEvent>``).


Customize a step
================

Steps
-----
It is possible to modify the content of a step directly in the scenario
file. To do so, ``<event>`` and its children can be specified with the mode attribute; with the possible following values:

- ``add``
- ``delete``

.. code-block:: xml

  <event xml:id="s5" type="researchStep" ref="step_Sapditnf_300517">
   <desc xml:lang="en" type="terms">
     <term source="standardList" type="standard" key="CIDOC-CRM" mode="add"/>
     <term source="standardList" type="standard" key="LIDO" mode="delete"/>
   </desc>
   <linkGrp type="generalResources">
     <ref type="code" source="zotero" target="9SKJDJKS" mode="add"/>
     <ref type="code" source="zotero" target="9SKORJKS" mode="delete"/>
   </linkGrp>
   <linkGrp type="projectResources" source="CODATA" corresp="http://www.codata.org/">
     <ref type="code" source="zotero" target="9SKJDJKS" mode="add"/>
     <ref type="code" source="zotero" target="9SKORJKS" mode="delete"/>
   </linkGrp>
 </event>
