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
^^^^^^^^^^^^^^^^^^^^^^^

This means retrieving TEI content from SSK Github repository. Validate
retrieved content according to the `RELAX NG schema <https://github.com/ParthenosWP4/SSK/blob/master/spec/TEI_SSK_ODD.rng>`__ defined for SSK
files. After validation TEI content are convert into Json format using
**XSLT**.  Resources are completed such as standards in differents ways. For standards, a knowledge base of standards is queried to retrieve more informations (standard complete name, multilingual
standard description and links). And for resources 
some queries are made on platforms like `Zotero <https://www.zotero.org/>`_ (which is a free
software for managing bibliographic references) , Github (for project
resources) or  **Website scraping** is also used to make resources more consistent.

After adding more content for either standards or ressources, these are then push into 
|elasticsearch| for indexing indexing and future searches. 

Note that each scenario and her steps are also pushed on |elasticsearch| and we added parent attributes in steps to reference their  parent. In a such way resources, metadata have been also targeted with their parent identifier, respectively steps for ressources and  step/scenario for metadata.


2 - API serving
^^^^^^^^^^^^^^^

The SSK Back-End makes its data available via REST API easily built with Spring boot and it's annotations. These API  helps to retrieve scenarios , steps, resources and metadata. In such way third party applications could also access SSK's data. 

3 - User management (for SSK contribution)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As SSK is built for researchers by giving them access to standards and best practices in a meaningful way. They need to have user account to be able to manage their data,  bookmark their best scenarios or steps in order to facilitate future navigations into SSK or stay in touch on some specific research fields. 

Holding an user account on SSK is must oriented for SSK contributions, and this is one of  the main feature of out platform. So through this features we give the opportuniy to researchers to create their one scenarios based on existing one or by starting from scratch. There are two  ways to do that:

- First by using TEI (XML)  
- Or Use froms designed in the :ref:`sskFrontEnd` part by just fill forms and select components such as metadata, existant steps...

4 - Search Engine
^^^^^^^^^^^^^^^^^
This module has been built to retreive from SSK whole data,  specific scenarios or steps by filtering using tags (standards, techniques, disciplines, activities  or objects ). As an example it could  allow user to  find all steps using TEI as standard, or scenarios with history as discipline.  Also it gives the possiblity to make full text search on SSK content. 


Elasticsearch (version 6.2.4)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
|elasticsearch| is a distributed, RESTful search and analytics engine capable of solving a growing number of use cases. As the heart of the Elastic Stack, it centrally stores your data so you can discover the expected and uncover the unexpected. 

We used it to easily index our data, and it hepls a lot with his RESTful search features with multi-criteria queries. This helps to query data in different ways such as specifying  fields,  type (for us , scenario, step, resource and metadata) of results. Also it's possible to make full text research with it.


.. _sskFrontEnd:

SSK Front-End
~~~~~~~~~~~~~
It's the client part of the SSK, where users can see  SSK's inputs (TEI files)  data in a different way. It  respects UX design principles in order to help researchers to easily access  contents of scenarios  and steps with their medatata.

It's built with |angular_link| (version 5) a |typescript| framework that offers many features to easy design Progressive Web Apps. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. The image below shows the architecture of an Angular application. 

|image1|

To display SSK's data on this web interface, we created couple of components, services  and templates folowing différents blocks of the previous image. Here components have been used to represent SSK's layers  which are Scenarios, steps, resources and metadata. Services helped to share data between those layers, but they also allowed us to design functions that queries  data from  main  module of SSK (Core SSK or Back-End) via  REST API.


Local Deployment
~~~~~~~~~~~~~~~~
Comming soon

Next features
~~~~~~~~~~~~~
Comming soon
 


.. |image0| image:: img/techArch.png
   :width: 6.27083in
   :height: 3.34722in

.. |image1| image:: img/overview2.png
   :width: 6.27083in
   :height: 3.34722in

.. |elasticsearch| raw:: html

   <a href="https://www.elastic.co/products/elasticsearch" target="_blank">Elasticsearch</a>

.. |angular_link| raw:: html

   <a href="https://angular.io/" target="_blank">Angular 5.2.11</a>

.. |typescript| raw:: html

	<a href="https://www.typescriptlang.org/" target="_blank">Typescript 2.9.2</a>
