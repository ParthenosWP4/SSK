======================
Technical architecture
======================

The implementation of the SSK is based on a flexible, easy to deploy and
maintained architecture, composed of independent entities that
communicate together through services (REST / JSON). The most important
entity is the core of the SSK, which makes queries to our data
repositories (Github, Zotero, etc.) and processes retrieved data. This
core also communicates with a search engine (part of the architecture)
based on Apache Lucene. Data processed from the core part and from the
search engine are all delivered via an API to third-party applications
like the SSK interface, which is an entity of our architecture. Below is
the architecture of SSK.

|image0|


SSK’s input
~~~~~~~~~~~~

The SSK processes TEI files stored on Github and divided into two folders,
`scenarios <https://github.com/ParthenosWP4/SSK/tree/master/scenarios>`_ and `steps <https://github.com/ParthenosWP4/SSK/tree/master/steps>`_.
For more information about the data model, check the dedicated section: :ref:`reTEI`.

Core of SSK
~~~~~~~~~~~

This part is the main component of the SSK, it has been built using
**Spring Boot version 1.5.4.RELEASE**, a Java based framework (more details `here <https://spring.io/blog/2017/06/08/spring-boot-1-5-4-available-now>`_).
It contains modules for :

1 - Processing SSK data
^^^^^^^^^^^^^^^^^^^^^^

This means retrieving TEI content from SSK Github repository. Validate
retrieved content according to the `RELAX NG schema <https://github.com/ParthenosWP4/SSK/blob/master/spec/TEI_SSK_ODD.rng>`__ defined for SSK
files. After validation TEI content are convert into Json format using
**XSLT**. After this, some resources are completed such as standards and
resources. For standards, a knowledge base of standards is queried to
retrieve more informations (standard complete name, multilingual
standard description and links). In this same way step’s resources are
also completed querying platform like `Zotero <https://www.zotero.org/>`_ (which is a free
software for managing bibliographic references) , Github (for project
resources). **Website scraping** is also use to complete resources.
When all data are completed for a TEI content (scenario or step), the
JSON content obtained is then store on ElasticSearch for future easier searches.

sankj

2 - API serving
^^^^^^^^^^^^^^

The SSK makes its data available via web API. There are API to retrieve
scenarios , steps, resources and standards. In fact all SSK content can
be retrieve. This API also give the possibilities to specify number of
item, fields and type (scenarios , steps, resources or standards) you
want to request.

3 - User management (for SSK contribution)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As SSK is built for researchers by giving them access to standards and best practices in a meaningful way. They need to have user account to be able to manage their data,  bookmark their best scenarios or steps in order to facilitate future navigations into SSK or stay in touch on some specific research fields. 

Holding an user account on SSK is must oriented for SSK contributions, and this is one of  the main feature of out platform. So through this features we give the opportuniy to researchers to create their one scenarios based on existing one or by starting from scratch. There are two  ways to do that:

- First by using TEI (XML)  
- Or Use froms built in the :ref:`sskFrontEnd` part by just fill forms and select components such as metadata, existant steps...

4 - Search Engine
^^^^^^^^^^^^^

TODO


.. _sskFrontEnd:

SSK Front-End
^^^^^^^^^^^^^

TODO

.. |image0| image:: img/techArch.png
   :width: 6.27083in
   :height: 3.34722in
