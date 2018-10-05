The SSK TEI in short
====================

The SSK offers researchers needing standardized methods and resources
complete frameworks to carry out their project, in Arts and Humanities
and Heritage science. It takes the form of step by step research
scenarios where the use of standards is clearly identified. Theses
scenarios are divided into different steps, implying specific tasks.
Each step contains a set of bibliographical resources.

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

-  a ``<label >`` that contains any label or heading used to identify part of a text, typically but not exclusively in a list or glossary.
-  a ``<desc >`` that contains a brief description of the object documented by its parent element, typically a documentation element or an entity.
-  some descriptive terms following controlled vocabularies: ``<term >`` elements that contains a single-word, multi-word, or symbolic designation which is regarded as a technical term.
-  bibliographical references: ``<ref >`` (reference) defines a reference to another location, possibly modified by additional text or comment.

Events are stored in external files, allowing them to be used in different scenarios.
Scenario files gather ``<event>`` in a ``<listEvent>`` element, by referencing them with a ``@ref`` attribute.
It is however possible to modify the content of the event called in a scenario, using the attribute mode (see below)

The resources consists of bibliographical references. They are gathered
in linkGrp elements. They are of two types : `general resources` and
`project specific`. ``linkGrp`` elements can be repeated (one per project). At
each level, the elements are enriched with keywords that can be term or
XML attributes.

Common attributes
-----------------

The attributes used by all the elements are: \* xml:lang. This attribute
is mandatory in all the content elements,namely label, desc, term. The
authoritative list of registered language subtags is maintained by IANA
and is available at http://www.iana.org/assignments/language-subtag-registry. Create
associated documentation Création de la documentation associée

-  mode, available for all content elements. the mode is used in
   scenario files to allow for modification of the imported steps. ...
   ...

-  the type attribute is required in most elements. See below for
   details.

The Resources
=============

Zotero
------

The resources to be presented in the SSK are preferably stored in Zotero
Parthenos WP4 database, accessible here. To add a resource, an account
on Zotero is required. Contact the SSK team to join the group (ssk [at]
inria [dot] fr)

The Zotero database fields required by the SSK are: \* Item type: The
item type is most of the time identified by Zotero but it's important to
check it. The most used item types are: \* webpage

-  blogpost

-  journal article

-  book section

-  book

-  presentation

-  Title: The title of the resource

-  Author: The author of the resource

-  Date: The date of the resource

-  Url: the url of the resource

-  Language: the language of the resource

-  Source:
-  For webpages: website title

-  For blogposts: blog title

-  For journal articles, books, book sections, documents: library
   catalog

NB: A short description of the resource should be provided when
possible. In Zotero, the appropriate field is abstract, but it is also
possible to add this description in the TEI, with a desc element, as
shown in the following example: This booklet is intended as an
introductory textbook for students and end-users interested in knowing
more about the exciting developments in this high-tech area of
conservation and conservation science. Their teachers are invited to use
the texts and photographic materials for educational purposes, while the
conservation scientist might appreciate the short reviews of
applications and of the science underlying the described processes.

GitHub
------

It is also possible to point to a GitHub user or repository. In this
case, the informations that the SSK shows (via the API) are:

-  For a GitHub User
-  name

-  html\_url

-  bio

-  updated\_at

-  type

-  avatar\_url

-  For a GitHub repository
-  owner (NB : a GitHub user)

-  full\_name

-  html\_url

-  description

A dedicated GitHub repository has been set for projects supported or
maintained by Parthenos. It is available here. Contact the SSK team for
more information.

Detailed structure
==================

Scenarios and steps are represented in different files. This choice has
been made to facilitate the use of a step in several scenarios, with or
without modifications.

Files naming conventions are the following: \* for scenarios: \* sc for
scenario

-  an underscore

-  a condensed title of the scenario in camel case

-  for steps:
-  the string step

-  an underscore

-  the intials of the step name, with the liaison words in lower case,
   and the meaningful words in upper case

-  an underscore and the date (optional)

Scenarios and steps structure
-----------------------------

Scenarios
~~~~~~~~~

The scenario is represented by the element listEvent, containing a set
of event elements that reference external TEI files.

Header
^^^^^^

The structure of the Scenario header is as follows: ... ... Parthenos
... The Creative Commons Attribution 4.0 Unported (CC BY 4.0) Licence
applies to this document. Created from scratch ... The scenario header
includes the following data elements: \* the title of the document
(which is not the title of the scenario)

-  the authors of the scenarios

-  the majors modifications

Structure
^^^^^^^^^

In a scenario file, event elements are used as pointers to link to full
event elements stored in external files.

It is also possible to refer to another scenario, that will be entirely
(or partially by using parameters - see below) include in the described
scenario. ...

It is possible to modify the content of an existing step directly in the
scenario file. See the advanced features for more information.

Steps
~~~~~

A full description of the scenario step.

header
^^^^^^

The structure of the step header is as follows: Charles Riondet Inria
Parthenos The Creative Commons Attribution 4.0 Unported (CC BY 4.0)
Licence applies to this document. Created from scratch ... The step
header includes the following data elements: \* the title of the
document

-  the author of the step

-  the major modification

structure
^^^^^^^^^

The main elements of a event are the description of the event, and the
resources related to it. The description is recorded in the elements
head (see below) and desc (see below) and the resources are contained by
one or two linkGrp (see below).

Content of scenarios and steps
------------------------------

head
~~~~

The TEI head element record the title of a scenario or a step.

The attribute xml:lang is mandatory. The element head can be repeated to
give as many translated versions as possible. Create associated
documentation ### desc

The element desc is used in two ways for the description of the
scenarios and the steps. The disctinction is made with the attribute
type \* When the value of type is definition, the content of desc is a
short text describing the scenario or the step

-  When the value of type is term, the content of desc is a set of term
   elements

term
~~~~

term elements are used to tag the scenarios, the steps and the
resources, according to the SSK taxonomies, that are: \* Tadirah
activities, objects and techniques

-  The NEDIMAH type taxonomy for Information resource (or objects)

-  the Dariah-IT Standard Knowledge base

-  aureHAL disciplines

Functioning
^^^^^^^^^^^

These taxonomies are declared with the attributes type and source. The
attributes of term are \* The type attribute gives an information about
the kind of term used. Its values are \* standard: the key gives the id
of a standard referenced in the SSK standards Knowledge base

-  activity: the value of key is taken from the tadirah ontology,
   research activities section

-  object: the value of key is taken from the NEMO taxonomy Information
   Resource Types, research objects section

-  technique: the value of key is taken from the tadirah ontology,
   research techniques section

-  discipline, taken from the aureHAL taxonomy

-  The source attribute sets a reference link for the taxonomy.

-  The key attribute gives either an URI when the label of the term can
   be taken from or directly a label

Taxonomies
^^^^^^^^^^

Tadirah activities
''''''''''''''''''

the activities must be chosen in the following list (only pick between
the second level values): \* Capture \* Conversion

-  Data Recognition

-  Discovering

-  Gathering

-  Imaging

-  Recording

-  Transcription

-  Creation
-  Designing

-  Programming

-  Translation

-  Web development

-  Writing

-  Enrichment
-  Annotating

-  Cleanup

-  Editing

-  Analysis
-  Content Analysis

-  Network Analysis

-  Relational Analysis

-  Spatial Analysis

-  Structural Analysis

-  Stylistic Analysis

-  Visualization

-  Interpretation
-  Contextualizing

-  Modeling

-  Theorizing

-  Storage
-  Archiving

-  Identifying

-  Organizing

-  Preservation

-  Dissemination
-  Collaboration

-  Commenting

-  Communicating

-  Crowdsourcing

-  Publishing

-  Sharing

-  Meta-Activities
-  Meta: Assessing

-  Meta: Community Building

-  Meta: Give Overview

-  Meta: Project Management

-  Meta: Teaching / Learning

Tadirah techniques
''''''''''''''''''

The Tadirah techniques are the following : \* Bit Stream Preservation

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

Research objects taxonomies
'''''''''''''''''''''''''''

We weren't able to find a single taxonomy complete enough for the
research objects (i.e. the material on which the research process is
undertaken). Therefore, It is possible to take a term from two
taxonomies : the NeDIMAH resource types and the TaDIRAH objects

TaDIRAH Objects
===============

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

NeDIMAH resource types
======================

The NeDIMAH resource types contains 106 terms divided in 7 categories :
Books, Computer Files, Continuining Resources, Maps, Mixed Materials,
Music and Visual Materials.

-  Books
-  Abstracts/summaries

-  Bibliographies

-  Calendars

-  Catalogs

-  Comics/graphic novels

-  Dictionaries

-  Directories

-  Discographies

-  Encyclopedias

-  Filmographies

-  Handbooks

-  Indexes

-  Law reports and digests

-  Legal articles

-  Legal cases and case notes

-  Legislation

-  Offprints

-  Patent document

-  Programmed texts

-  Reviews

-  Standards/specifications

-  Statistics

-  Surveys of literature in a subject area

-  Technical reports

-  Theses

-  Treaties

-  Yearbooks

-  Computer Files
-  Bibliographic data

-  Combination

-  Computer program

-  Document

-  Font

-  Game

-  Interactive multimedia

-  Numeric data

-  Online system or service

-  Representational

-  Sound

-  Continuing Resources
-  Abstracts/summaries

-  Bibliographies

-  Biography

-  Calendars

-  Catalogs

-  Comics/graphic novels

-  Dictionaries

-  Directories

-  Discographies

-  Encyclopedias

-  Filmographies

-  Handbooks

-  Indexes

-  Law reports and digests

-  Legal articles

-  Legal cases and case notes

-  Legislation

-  Programmed texts

-  Reviews

-  Standards/specifications

-  Statistics

-  Surveys of literature in a subject area

-  Technical reports

-  Theses

-  Treaties

-  Yearbooks

-  Maps
-  Atlas

-  Bound as part of another work

-  Globe

-  Map serial

-  Map series

-  Separate supplement to another work

-  Single map

-  Mixed Materials

-  Music
-  Accompaniment reduced for keyboard

-  Chorus score

-  Close score

-  Condensed score

-  Condensed score or piano-conductor score

-  Full score

-  Full score, miniature or study size

-  Multiple score formats

-  Performer-conductor part

-  Score

-  Vocal score

-  Voice score with accompaniment omitted

-  Visual Materials
-  Art original

-  Art reproduction

-  Chart

-  Diorama

-  Filmstrip

-  Flash card

-  Game

-  Graphic

-  Kit

-  Microscope slide

-  Model

-  Motion picture

-  Picture

-  Realia

-  Slide

-  Technical drawing

-  Toy

-  Transparency

-  Videorecording

aureHAL disciplines
'''''''''''''''''''

The disciplines must be chosen in the following list: \* Biological
anthropology

-  Social Anthropology and ethnology

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
create a description using this sample file and upload it here: choose
XML for Document Type, paste the content of the file in Document(s) and
submit.

Note that the value to indicate in the key is the value of the field
"standard\_abbr\_name". See below the sample file 33 (must be
incremented by 1 for each new standard) Standard abbreviated Name : This
information will be used in the TEI file to refer to this description
Standard Complete name Two values: 'standard' OR 'method'. When
describing a format, use 'standard', when describing a protocol or a set
of techniques, use 'method' English Description French Description
German Description Spanish Description select from: Horizontal->e.g.
XML, CSV and vertical ->e.g. EDM
http://link\_to\_standard\_official\_page.com Tag1: example->
Classification Tag2: example-> Human-history Tag3: example-> Research
Activities - Organizing Tag4: example-> Research Objects - Digital
Humanities http://link\_to\_resource\_about\_the \_standard.com ###
linkGrp

linkGrp is the container for the resources associated to a given step.
It can have three attributes: \* The attribute type is required and can
have two values: \* generalResources: for resources that give general
input about a standard, a protocol, ...

-  projectResources: for resources that show examples of real projects
   using the described standard, protocol, ...

-  When type has projectResources for value, two more attributes are
   required:
-  source for the name of the project mentioned

-  corresp for a url pointing to or identifying the project

ref
~~~

the attributes for ref are type, subtype, source and target. \* The
attribute type is required. Its values are taken from the Zotero item
types, plus SSK specific values. Possible values are: \* spec: the
specification, of a standard for instance.

-  report: technical reports

-  blog: blog posts

-  tutorial: tutorials or guidelines

-  script: Scripts and code samples

-  paper: Scholarly papers

-  library: Computing libraries

-  tool: a link to a service or a software useful for a given step.

-  database:

-  method

-  bibliography

-  schema

-  the source attribute in ref is used by the SSK to record where the
   full information about the resource is stored, and that the SSK
   queries. The values are a semi-closed list. The source attribute has
   for possible values:
-  zotero: The Parthenos WP4 Zotero library: WP4 Zotero Library

-  github: resources hosted in a GitHub repository, preferably the
   Parthenos WP4 repository, but not exclusively

-  isidore: resources described in the platform of search Isidore
   dedicated to Humanities and Social Sciences.

-  pilastro: The Knowledge base describing Humanities and Social
   Sciences standards.

-  The target attribute specifies the destination of the reference with
   an URI.

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
\* change

-  add ... ... ...

The parameters
--------------

When pointing to a step inside a scenario, it is possible to use
parameters to refine the behaviour of this step. This parametrization
uses the element param in event. Two different uses are possible for the
moment, (1) to refine the resources selection in a given step, (2) to
include some steps of a scenario in another scenario.

Parameter #1 : refine the resources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is possible to select the resources to be displayed in a scenario.
The criteria are based on the taxonomies used by the SSK model : \*
Tadirah Activities

-  Tadirah techniques

-  NEMO Data types

-  aureHAL disciplines

-  Standards The element param contains an attribute name, that contains
   a formal name to identify on which taxonomy the parameter is applied.
   The possible values are :
-  activity

-  technique

-  datatype

-  discipline

-  standard Another attribute value contains the term used to select the
   wanted resources. In other words, in the example below, the resources
   displayed would only be the ref that contains one or more term
   elements with values "XML", "conversion" and "Text Bearing Objects".
   New label new description ... In this situation, all the following
   resources would be selected.

Parameter #2 : include partially a scenario into another
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This mechanism records : \* The reference to a scenario

-  A set of steps, not necessarily consecutive. In this case, the
   attributes of param are also name and value, but they have a
   different behaviour. The name value is range. The attribute value
   records the interval of the steps (i.e. their order number) in the
   scenario to include. To indicate an consecutive interval, the steps
   indexes should be separated by an hyphen: -. To indicate
   non-consecutive steps, the steps indexes should be separated by a
   comma: ,. These two behaviours can be mixed (see examples below)

A set of steps, sometimes consecutive, sometimes not consecutive
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This parameter would select steps 1, 2 and 3.

This parameter would select steps 1 and 3.

This parameter would select steps 1, 3, 5, 6 and 7.

Mixing parameters
~~~~~~~~~~~~~~~~~

| This example shows the inclusion of a scenario into another and a
  filter based on a keyword for a particular step in this subset. If the
  @corresp is not used, the param will be applied to all the included
  steps.
| the parameters, expressed by param should only be used in scenario
  files, i.e. files where TEI type is researchScenarioParameters should
  only be used in scenario files
  DocumentationDocumentationSoftwareLogicielSpecificationSpécificationReportRapportBlogArticle
  de blogTutorialTutorielScripts and codeScripts et
  codeschemaSchémaScholarly paperpublication scientifique Maybe the
  values of the attribute @source should be stored in an external
  parameter file.
