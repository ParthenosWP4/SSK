.. _reTEI:

========================
The SSK data model (TEI)
========================

The underlying data model of the SSK respects itself a standard, the
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

The TEI specification
=====================

Schema
------

The SSK TEI specification takes the form of an ODD document, accessible on GitHub (https://github.com/ParthenosWP4/SSK/tree/master/spec/TEI_SSK_ODD.xml).
This ODD specification allows us to generate a RelaxNG schema, also hosted on GitHub (https://github.com/ParthenosWP4/SSK/tree/master/spec/TEI_SSK_ODD.rng).
This schema needs to be referenced in every TEI file, with this XML declaration:

.. code-block:: xml

  <?xml version="1.0" encoding="UTF-8"?>
  <?xml-model href="https://raw.githubusercontent.com/ParthenosWP4/SSK/master/spec/TEI_SSK_ODD.rng"
              type="application/xml"
              schematypens="http://relaxng.org/ns/structure/1.0"?>

Contribute to the SSK on GitHub with the TEI
--------------------------------------------

Users willing to create scenarios in TEI can follow these
instructions:

-  Download or fork the SSK data repository in GitHub. It is necessary to have an account on GitHub: https://github.com/ParthenosWP4/SSK/tree/master/ (NB: to fork a repository, a GitHub user account is necessary);
-  Create your files with your favourite XML editor. Don't forget to validate them against the SSK schema (see above);
-  To publish scenarios on the SSK, the TEI files need to be in the `scenarios <https://github.com/ParthenosWP4/SSK/tree/master/scenarios>`_ and `steps <https://github.com/ParthenosWP4/SSK/tree/master/steps>`_ folders;
-  Users with a GitHub account can make a pull request to ask for the update of the repository. Users without an account can contact the SSK team at ssk [at] inria [dot] fr.

More info on GitHub `documentation <https://help.github.com/>`_.

Main Principles
---------------

A scenario is a list of events (``<listEvent>``) where each scenario step is an event (``<event>``). In order to use steps in several scenarios, they are stored in separated files.

- Scenario files gather ``<event>`` in a ``<listEvent>`` element, by referencing them with a ``@ref`` attribute. It is however possible to modify the content of the event called in a scenario (see :ref:`stepsInScen`).
- The ``<event >`` element is the core of SSK scenarios. It contains the full description of scenario step:

  - A ``<head>`` that contains any label or heading used to identify part of a text, typically but not exclusively in a list or glossary.
  - A ``<desc type="definition">`` that contains a brief description of the object documented by its parent element, typically a documentation element or an entity.
  - Some descriptive terms following controlled vocabularies: ``<term >`` elements that contains a single-word, multi-word, or symbolic designation which is regarded as a technical term.
  - Bibliographical references with ``<ref >``. They are gathered
    in ``<linkGrp>`` elements, that can be of two types :
      - `general resources`
      - `project specific` (one ``<linkGrp>`` per project)

- The attribute ``xml:lang`` is mandatory in all the content elements, namely ``<head>`` and ``<desc type="definition">``. The authoritative list of registered language subtags is maintained by IANA and is available at http://www.iana.org/assignments/language-subtag-registry.

  Example:

  .. code-block:: xml

    <head xml:lang="en">Create associated documentation</head>
    <head xml:lang="fr">Création de la documentation associée</head>

Files naming conventions
========================

These conventions have to be used when creating TEI files by hand, to avoid name duplicates.

For scenarios
-------------

#. ``SSK_sc`` for scenario
#. an underscore : ``_``
#. a condensed title of the scenario in camel case: ``myScenarioTitle``

example:

``sc_myScenarioTitle.xml``

For steps
---------

#. the string ``step``
#. an underscore; ``_``
#. the initials of the step name, with the liaison words in lower case, and the meaningful words in upper case. For example, if a step title is : ``Searching for a relevant step title``, it would give : ``SfaRST``.
#. an underscore and the date (optional)

example:

``step_SfaRST_10092018.xml``

Scenarios and steps structure
=============================

Header
------

The ``<teiHeader>`` of each scenario and step files records important metadata, displayed in the SSK web application

Title
~~~~~
Note that the ``<title>`` element contain the title of the TEI document, and not the title of the scenario. This information is required by the TEI model.

Example:

.. code-block:: xml

  <title>Scenario \"Creation of a TEI-based corpus\"</title>

Authors
~~~~~~~
The ``<author>`` element is repeatable. It contains:

* ``<persName>``: the forename and surname of the author
* ``<affiliation>``: the institution of the author.

Example:

.. code-block:: xml

  <author>
    <persName>Mary Researcher-Name</persName>
    <affiliation>University of City</affiliation>
  </author>

Licence
~~~~~~~

For scenarios and steps, it is possible to choose between two licenses:

* CC-BY (Creative Commons Attribution)
* CC-0 (Public Domain)

In TEI files, the license declaration is presented like this:

CC-BY
^^^^^

.. code-block:: xml

  <availability>
     <licence target="http://creativecommons.org/licenses/by/4.0/">
        <p>The Creative Commons Attribution 4.0 Unported (CC BY 4.0) Licence applies to
           this document.</p>
     </licence>
  </availability>

CC-0 (Public domain)
^^^^^^^^^^^^^^^^^^^^
.. code-block:: xml

  <availability>
    <licence target="https://creativecommons.org/publicdomain/zero/1.0/">
      <p>This document is in the public domain.</p>
    </licence>
  </availability>

Revision history
~~~~~~~~~~~~~~~~

It is possible to record the History of modification of the TEI files: addition of an author, of a step, etc.

.. code-block:: xml

  <revisionDesc>
    <change when="2019-01-31">A new step between ...</change>
    <change when="2019-02-01">Addition of a new author</change>
  </revisionDesc>

Full example of a <teiHeader>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

  <TEI type="researchScenario" xmlns="http://www.tei-c.org/ns/1.0">
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
        <change when="2019-01-31">A new step between ...</change>
        <change when="2019-02-01">Addition of a new author</change>
      </revisionDesc>
    </teiHeader>

Scenarios
---------

In a scenario file, ``<event>`` elements are used as pointers to link to full
event elements stored in external files.

.. code-block:: xml

  <listEvent>
    <event xml:id="s1" type="researchStep" ref="step_EaXswO_290517"/>
    <event xml:id="s2" type="researchStep" ref="step_Eprimrf_300517"/>
    <event xml:id="s3" type="researchStep" ref="step_Cad_300517"/>
    <event xml:id="s4" type="researchStep" ref="step_Tdats_300517"/>
    <event xml:id="s5" type="researchStep" ref="step_Sapditnf_300517"/>
  </listEvent>

It is also possible to refer to another scenario, as a preliminary or a follow-up

.. code-block:: xml

  <listEvent>
    <event type="researchScenario" ref="SSK_sc_digitization.xml" subtype="preliminary"/>
    <event xml:id="s1" type="researchStep" ref="step_KedKep_170717"/>
    ...
    <event type="researchScenario" ref="SSK_sc_Preservation.xml" subtype="followUp"/>
  </listEvent>

It is possible to modify the content of an existing step directly in the
scenario file. See :ref:`stepsInScen` for more information.

Steps
-----

Step files record the full description of the scenario step. Several elements have the same meaning and behaviour than those in scenario files.
The main difference is the content of the ``<event>`` element. The main components of a ``<event>`` element are the description of the event, and the
resources related to it.

* The description is recorded in the elements: ``head`` (see below) and ``desc``;
* The resources are contained by one or several ``linkGrp``.

Content of scenarios and steps
==============================

.. _head:

``<head>`` element
------------------

The TEI ``head`` element record the title of a scenario or a step. It can be repeated to give as many translated versions as possible, with the attribute ``xml:lang``.

.. code-block:: xml

  <head xml:lang="en" type="scenarioTitle">Title of the scenario</head>
  <head xml:lang="fr" type="scenarioTitle">Titre du scénario</head>

.. _desc:

``<desc>`` element
------------------

The element ``<desc>`` is used in two ways for the description of the scenarios and the steps. The distinction is made with the attribute ``type``

* When the value of type is `definition`, the content of ``<desc>`` is a short text describing the scenario or the step;
* When the value of type is `term`, the content of ``<desc>`` is a set of term elements.

.. code-block:: xml

  <desc type="definition" xml:lang="en">Description of the scenario</desc>
  <desc xml:lang="en" type="terms">
    <term type="discipline" source="aurehal" key=""/>
    <term type="object" source="tadirah" key=""/>
    <term type="technique" source="tadirah" key=""/>
  </desc>

.. _term:

``<term>`` element
------------------

``<term>`` elements are used to tag the scenarios, the steps and the resources, according to the SSK taxonomies, that are:

* Tadirah activities, objects and techniques
* the Dariah-IT Standard Knowledge base
* aureHAL disciplines

Functioning
~~~~~~~~~~~

These taxonomies are declared with the attributes ``type`` and ``source``. The
attributes of ``<term>`` elements are:

* The ``type`` attribute gives an information about the kind of term used.
* The ``source`` attribute sets a reference link for the taxonomy.
* The ``key`` attribute gives either an URI when the label of the term can be taken from or directly a label

.. _vocabs:

Taxonomies
~~~~~~~~~~

For each kind of ``<term>``, the values of the attributes ``type``, ``source`` and ``key`` are:

+----------------------+-----------+-----------+------------------------------------------------------+
| Term                 | ``type``  | ``source``| List of possible terms: ``key``                      |
+----------------------+-----------+-----------+------------------------------------------------------+
| Research activities  | activity  | tadirah   | http://ssk.huma-num.fr/#/glossary/activities         |
+----------------------+-----------+-----------+------------------------------------------------------+
| Research techniques  | technique | tadirah   | http://ssk.huma-num.fr/#/glossary/techniques         |
+----------------------+-----------+-----------+------------------------------------------------------+
| Research objects     | object    | tadirah   | http://ssk.huma-num.fr/#/glossary/objects            |
+----------------------+-----------+-----------+------------------------------------------------------+
| Standards            | standard  | ssk       | http://ssk.huma-num.fr/#/glossary/standards          |
+----------------------+-----------+-----------+------------------------------------------------------+
| Disciplines          | discipline| aurehal   | http://ssk.huma-num.fr/#/glossary/disciplines        |
+----------------------+-----------+-----------+------------------------------------------------------+

NB: The value of the ``key`` attribute must be the exact same string the one displayed on the Glossary page. Use *copy & paste* to avoid trouble.

.. code-block:: xml

  <term type="activity" source="tadirah" target="Encoding"/>

.. _resources:

``<linkGrp>`` element
---------------------

``<linkGrp>`` is the container for the resources associated to a given step. It can have three attributes:

* The attribute ``type`` is required and can have two values:

  * `generalResources`: for resources that give general input about a standard, a protocol, ...
  * `projectResources`: for resources that show examples of real projects using the described standard, protocol, ...

*  When type has `projectResources` for value, two more attributes are required:

  * `source` for the name of the project mentioned
  * `corresp` for a url pointing to or identifying the project

.. code-block:: xml

  <linkGrp type="generalResources">
    <ref type="report" source="zotero" target="ZQVB6CIP"/>
  </linkGrp>
  <linkGrp type="projectResources" source="CODATA" corresp="http://www.codata.org/">
    <ref type="report" source="zotero" target="G4UPDPG3"/>
  </linkGrp>

.. _refs:

``<ref>`` element
-----------------

The ``<ref>`` elements gathered in ``<linkGrp>`` are used to point to resources of the SSK Zotero Library. See the section :ref:`reTuto`, to learn how to work with Zotero and the SSK.
The attributes for ``<ref>`` are ``type``, ``source`` and ``target``.

* The attribute ``type`` is required. Its values are taken from the Zotero item types, plus SSK specific values. Possible values are:

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

* The ``source`` attribute in ``<ref>`` records that the ``target`` refers to a zotero ID. The value of ``source`` is most of the time `zotero`
* The ``target`` attribute specifies the destination of the reference, i.e. the ID of the Zotero record. This ID is last part of the URL of the Zotero online record:

``https://www.zotero.org/groups/427927/ssk-parthenos/items/itemKey/BEVAWMPX``

A relatively easy way to quickly get this ID when you just added the resource to zotero is to go to the SSK group page, that lists the recently added items: https://www.zotero.org/groups/427927/ssk-parthenos

Example:

.. code-block:: xml

  <ref type="spec" source="zotero" target="BEVAWMPX"/>

.. _stepsInScen:

Reuse/customize a step
======================

One of the main features of the SSK is the possibility of reusing a step in several scenarios. However, it may be needed to update slightly the scope of an existing step when reusing it in a new scenario.
When updating a step, it is important to understand that every changed element must be expressly specified.

To declare that the selected step is updated, an attribute ``mode``, with the value `change` is added to the ``<event>`` element:

.. code-block:: xml

  <TEI type="researchScenario" xmlns="http://www.tei-c.org/ns/1.0">
    ...
    ...
    <listEvent>
      ...
      <event xml:id="s4" type="researchStep" ref="step_Tdats_300517"/>
      <event xml:id="s5" type="researchStep" ref="step_Sapditnf_300517" mode="change">
        ...
      </event>
    </listEvent>

The elements that can be updated, also specified with the ``mode`` attribute, are the following:

* The Standards (``<term type="standard">``, within ``<desc type="terms">``);
* The Resources (``<linkGrp>`` and ``<ref>``).

For these elements, the modification must be explicit :

* each new element must be specified with ``mode="add"``;
* every removed element from the original step must be specified with ``mode="delete"``.

Update standards
----------------


.. code-block:: xml

  <event xml:id="s5" type="researchStep" ref="step_Sapditnf_300517" mode="change">
   <desc xml:lang="en" type="terms" mode="change">
     <term source="standardList" type="standard" key="CIDOC-CRM" mode="add"/>
     <term source="standardList" type="standard" key="LIDO" mode="delete"/>
   </desc>


Update resources
----------------

.. code-block:: xml

  <event xml:id="s5" type="researchStep" ref="step_Sapditnf_300517" mode="change">
   <linkGrp type="generalResources">
     <ref type="code" source="zotero" target="9SKJDJKS" mode="add"/>
     <ref type="code" source="zotero" target="9SKORJKS" mode="delete"/>
   </linkGrp>
   <linkGrp type="projectResources" source="CODATA" corresp="http://www.codata.org/">
     <ref type="code" source="zotero" target="9SKJDJKS" mode="add"/>
     <ref type="code" source="zotero" target="9SKORJKS" mode="delete"/>
   </linkGrp>
 </event>
