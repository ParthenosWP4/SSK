==============================================
The Standardization Survival Kit: presentation
==============================================

To support the digital turn of Social Sciences and Humanities research, it is necessary to stabilize knowledge on standards and research good practices. The goal of the **Standardization Survival Kit**, developed with the `PARTHENOS project <http://parthenos-project.eu>`_ project, is to accompany researchers along this way, giving access to standards and best practices in a meaningful way, by the mediation of research scenarios. These scenarios are at the core of the SSK, as they embed resources with contextual information and relevant examples on standardized processes and methods in a research context. The SSK in an open tool where users are able to publish new scenarios or adapt existing ones. Those scenarios can be seen as a living memory of what should be the best research practices in a given community, made accessible and reusable for other researchers.

Why standards after all?
------------------------

The main issue in defining a policy about standards is to understand
what they actually are. Standards usually take the form of documents
providing information about practices, protocols, or data formats that
can be used as a reference for two parties working in the same field of
activity so that they may produce comparable (or interoperable) results.
This will also foster innovative, cross-disciplinary research paths, and
hopefully contribute to bridging the gap between the different cultures
that are represented in the broad landscape of Humanities and Cultural
Heritage studies.

Nevertheless, standards are not regulations. There is no obligation to
follow them except when one actually wants to produce results that can
be compared with those of a wider community. This is why a
standardization policy for an infrastructure in the Arts and Humanities
should include recommendations as to what approach the scholarly
communities could or should adopt with regard to specific standards.

The SSK: a toolkit for Humanities scholars
---------------------------------

Because there is no obligation to use a given standard, it is essential
to provide potential users with:

#. an awareness of the appropriate standards and the advantages to be gained by adopting them,
#. the cognitive tools to help them identify the optimal use of standards through the selection and possibly customisation of a reference portfolio.

The work carried out by the SSK covers four types of activities related to the deployment and use of standards in the Humanities and Cultural Heritage fields:

-  **Documenting** existing standards to provide reference for scholars who want to find out more about their role and content. This relates to the specific provision of bibliographic sources, available documentation, specific targeted introductions, as well as providing prototypical examples which can serve as models for similar work, possibly made available through focused Virtual Research Environments within the PARTHENOS infrastructure;

-  **Supporting** the actual adoption of standards by identifying how they relate to research scenarios and gathering the essential materials for controlling their deployment (e.g. schemas);

-  **Communicating** with research communities so that they can be made aware of both the need to apply standards in their digital scholarly practices but also be informed of the essential standards for their own fields.

-  **Training** for researchers, by giving them access to complete frameworks so that they may acquire knowledge and know-how on standardized methodologies.

In order to apply these four principles, the SSK focuses on giving
researchers access to standards in a meaningful way. That is why it is
built around research scenarios.

These scenarios are the core of the SSK
because they aim at providing **contextual information** and relevant
**examples** on how standards can be applied in a given research
project. They cover **all the domains of the Humanities**, from
Literature to Heritage science, including History, Social sciences,
Linguistics, etc.

They have been created and they are added to by domain
experts, from **real life researcher-oriented use cases (PARTHENOS,
2016)**, divided into different steps, and involving specific tasks.


Those scenarios can be seen as a living memory of what should be the
best research practices in a given community, made accessible and
reusable for other researchers wishing to carry out a similar project
but unfamiliar with the recommended tools, formats, methods to use, etc.
For that reason, the SSK can be considered as a **complete framework**
showing concrete use of standards, rather than simply a catalog of
resources.

Design principles
-----------------
TODO

SSK components
--------------

The SSK is a web platform builded on three main layers nested within
each other following a specific order: Research scenarios, steps and resources.

Scenarios < Steps < Resources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Each **scenario** within the SSK works like a high-level research guide
for scholars. They are made up of successive **steps** or tasks, and can
be followed as a complete process to solve a given problem with the most
standardized means. For each step, the appropriate **resources** to
perform the given task are proposed, divided into two categories : the
“\ **general resources**\ ” that include the primary documentation and
tools; and the “\ **project-specific resources**\ ” that point to
concrete use cases in which a similar task was accomplished. The
material contained in these sections is of various kinds:

-  the most important is the **state-of-the-art bibliography**, which includes all the documentation needed to carry out a given task. The bibliographical references are up-to-date and gathered within the Zotero library, which was specially created for this project. This choice was made to ease the resource selection process and to allow for a collaborative watch and curation of relevant information. When the resource is available online, a direct link is provided ; otherwise, the user is given all the necessary metadata.

-  the SSK also offers more **technical resources**, such as stylesheets, code samples, software or services: a significant part of these resources has been brought together in a dedicated GitHub environment fed by expert partners of the PARTHENOS project.

-  **Training materials** like tutorials.

How to create a scenario for the SSK
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following instructions help users create a scenario for the SSK. They are conceived as a "scenario", a step-by-step tutorial.

First, contributors should be aware that:

* they can submit their new scenarios directly in TEI and upload them on the SSK GitHub (http://github.com/ParthenosWP4/SSK), or by using the dedicated SSK contribution workspace (still work in progress).
* scenarios and steps follow the same data model. The difference is that a scenario points to a set of steps whereas a step points to a set of external resources.
* In TEI, it is possible to translate the prose, by duplicating the elements head, desc or term, and adding xml:lang attribute

.. image:: ../img/img-tuto.jpeg
  :scale: 50 %

Choose explicit titles starting with a verb or a gerund
"""""""""""""""""""""""""""""""""""""""""""""""""""""""

The choice of good titles for a scenario and its steps is crucial. It will be the entry point of the users, that need to understand at first reading the scope and the aim of a scenario. To do so, we advice to build titles : <list>

* that starts with a verb or a gerund that describe the process (for a scenario) or the action (for a step) that the user will read about.
* with a number of characters comprised between 10 and 100

References:

* Documentation of the TEI element :ref:`head`
* Leahy, Richard. ‘Twenty Titles for the Writer’. College Composition and Communication 43, no. 4 (1992): 516–19. https://doi.org/10.2307/358644.

Describing a scenario or a step
"""""""""""""""""""""""""""""""

The description of the scenario and its steps is the longer text that the contributor has to provide.

* For a scenario, it should explain the scientific problematic and describe the solution put in place.
* For a step, It should describe the purpose of the action, how it relates with the previous ones and give an overall presentation of the different kind of methods and tools the resources would point to.
* For both, it is important to extend the acronyms cited and to briefly present the projects mentioned.

The form of this text should respect the following constraints:

* It shouldn't exceed 1500 characters.
* It is possible to point to external links (in TEI, with the following: <ref target="//url here//">text of the link</ref>
* Lists are also available. The TEI elements are <list> and <item>

References:

* Documentation of the TEI element :ref:`desc`
* Universitat Autònoma de Barcelona. ‘Describing a Process’. Coursera. Accessed 29 June 2018. https://www.coursera.org/lecture/teaching-english/3-1-1-describing-a-process-mjuio.

Associate keywords to the scenario or the step
""""""""""""""""""""""""""""""""""""""""""""""

The SSK vocabularies are

* `Research activities <http://ssk.huma-num.fr/#/glossary/activities>`_, taken from `Tadirah <https://github.com/dhtaxonomy/TaDiRAH>`_
* `Research techniques <http://ssk.huma-num.fr/#/glossary/techniques>`_, taken from `Tadirah <https://github.com/dhtaxonomy/TaDiRAH>`_
* `Research objects <http://ssk.huma-num.fr/#/glossary/objects>`_, taken from `Tadirah <https://github.com/dhtaxonomy/TaDiRAH>`_
* `Standards <http://ssk.huma-num.fr/#/glossary/standards>`_, taken from the SSK Standard Knowledge base (supported by DARIAH-IT)
* `Disciplines <http://ssk.huma-num.fr/#/glossary/standards>`_, taken from `aureHAL <https://aurehal.archives-ouvertes.fr/domain?locale=en>`_

When editing the description of a scenario, the available keywords are:

* Disciplines
* Techniques
* Objects
* Standards

For the steps, the most important keyword is the Activity, that should be unique for each step. It also possible to pick some techniques, objects and standards. In general, for each keyword type, we recommend to choose between 1 and 4 keywords.

References:

* Documentation of the TEI element :ref:`term`
* `TaDiRAH - Taxonomy of Digital Research Activities in the Humanities <http://tadirah.dariah.eu/>`_

Choose an illustration for the scenario
"""""""""""""""""""""""""""""""""""""""

* This illustration must closely relates with the purpose of the scenario, i.e. not only with the discipline or the period. Screenshots are accepted
* Landscape orientation image are recommended
* Maximum size : 2 Mo
* Accepted formats : png, jpg
* It must be published under the licence CC-BY or CC-0.

References:

* `Unsplash <https://unsplash.com/>`_, a gallery of free images and photos

Identify relevant resources processing
""""""""""""""""""""""""""""""""""""""

Identifying state of the art references is a prerequisite before actually add the resources to the steps.
When we are talking about resources, we mean a standardized tool, service or document helpful for the
task completion.

They take the form of a digital object : a webpage, a
journal article referenced in an online catalog or an archive, a code repository, a blog, etc.

References:

* `State of the art Wikipedia article <https://en.wikipedia.org/w/index.php?title=State_of_the_art&oldid=845308793>`_

Link the resources to the step
""""""""""""""""""""""""""""""

There is different ways to link resources to a step (TEI : <ref>; element). The one we favour is the recording of
the resource metadata in the dedicated SSK Zotero Library (see `here <https://www.zotero.org/groups/427927/items?>`_).

* To populate it, a Zotero account is necessary (create it  `here <https://www.zotero.org/user/register>`_) as well as a membership in the SSK group (apply `here <https://www.zotero.org/groups/427927/ssk-parthenos?>`_). The SSK library is organized in collections and sub-collections, by domains or standards. To learn more about how to use Zotero, many tutorial and learning resources are available `here <https://www.zotero.org/support/screencast_tutorials>`_.
* After adding a resource in the Zotero Library, it should be linked to the step, with the help of its Zotero key, i.e. the last part of the URL of the resource record on the Zotero website. For instance, in the following example, the key is 4B62GJ5I: https://www.zotero.org/groups/427927/ssk-parthenos/items/itemKey/4B62GJ5I. In TEI, the Zotero key should be used like this:  ``<ref type="zotero" key="4B62GJ5I"/ >``.
* It is possible to put directly the url of a Github repository or a document stored in HAL, and skip the Zotero part (the metadata would be fetched directly via the APIs)</item>
* It is possible and recommended to add a description of the resource, in addition of the zotero metadata. This description should make the link between the resource and the SSK step that references it. In TEI, the element to use is <desc>, inside a <ref> element

Advanced SSK functions (1) : customize a step or a scenario
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

he SSK is adaptable by nature and contributors don't have to start from scratch their scenario. It is possible to create a scenario with existing steps as basis. But if the content of the step doesn't exactly fit, it is also possible to modify it, by updating the
initial step (but with care), or, more safely, directly in the new scenario.
In TEI, the update of element is made with the help of the attribute @mode.
See more in the section: :ref:`custom`.

Advanced SSK functions (2) : link scenarios
"""""""""""""""""""""""""""""""""""""""""""

Link scenarios together, or in other words, include a scenario (entirely or partially) into another is an interesting possibility when a scenario is a pre-condition or the continuation of another one.
For instance, a scenario related to the preservation of 3D models can be preceded by a scenario explaining how to create such models.

The most common use cases are the following:

* Add a prerequisite scenario (as a first step)
* Associate a scenario that can be the follow-up of the current (as a last step)
* Insert a scenario (totally or partially) inside the current scenario, with the use of parameters that allows the user to choose which step of the external scenario should be included. See :ref:`param`.
