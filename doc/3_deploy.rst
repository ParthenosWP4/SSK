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
~~~~~~~~~~~

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
~~~~~~~~~~~~~~
It's the client part of the SSK, where users can see  SSK's inputs (TEI files)  data in a different way. It  respects UX design principles in order to help researchers to easily access  contents of scenarios  and steps with their medatata.

It's built with |angular_link| a |typescript| framework that offers many features to easy design Progressive Web Apps. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. The image below (from https://angular.io/guide/architecture) shows the architecture of an Angular application. 

|image1|

To display SSK's data on this web interface, we created couple of components, services  and templates folowing différents blocks of the previous image. Here components have been used to represent SSK's layers  which are Scenarios, steps, resources and metadata. Services helped to share data between those layers, but they also allowed us to design functions that queries  data from  main  module of SSK (Core SSK or Back-End) via  REST API.


Deployment
~~~~~~~~~~

As the SSK is based on three main parts, it follows an independent deployment for each of her modules(Elasticsearch, Front-End, Bac-End). The are for those parts endspoints. There are  Elasticsearch endpoints that  give  possibility  for  the SSK's Back-end to communicate with Elasticsearch and  in the same way the Back-End also offers endpoints to the Front-end so that it can get SSK's data for display. That is how the different parts of SSK communicate to each other.

1 - Install Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^

The binary packages of Elasticsearch have only one dependency: Java. The minimum supported version is Java 8. To download and install Elasticsearch, use the commands that work with your system (deb for Debian/Ubuntu, rpm for Redhat/Centos/Fedora, mac for OS X, and win for Windows). Follos |installelasticsearch| for  more details.

2 - Deploy Back-End (Spring boot application)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Spring Boot is a convention over configuration framework that allows us to set up a production-ready setup of a Spring project, and Tomcat is one of the most popular Java Servlet Containers.

By default, Spring Boot builds a standalone Java application that can run as a desktop application or be configured as a system service, but there are environments where we can’t install a new service or run the application manually.

Opposite to standalone applications, Tomcat is installed as a service that can manage multiple applications within the same application process, avoiding the need for a specific setup for each application.

To build our Tomcat-deployable WAR application, we execute the **"gradle build"** command since |gradle| is our build automation system configured in SSK spring boot application. After that, our WAR file is generated at target/ssk_services.war (assuming the Gradle artifactId is “ssk_services”).

To have our WAR file deployed and running in Tomcat, we need to complete the following steps:

    - downloadApacheTomcat and unpackage it into a tomcat folder
    - Copy our WAR file from target/ssk_services.war to the tomcat/webapps/ folder
    - From a terminal navigate to tomcat/bin folder and execute
        	catalina.bat run (on Windows)
        	
        	catalina.sh run (on Unix-based systems)
    - Go to http://localhost:8080/ssk_services/ssk



Source: |backdepoyment|


.. |image0| image:: img/techArch.png
   :width: 6.27083in
   :height: 3.34722in

.. |image1| image:: img/overview2.png
   :width: 6.27083in
   :height: 3.34722in

.. |downloadApacheTomcat| raw:: html

   <a href="https://www.elastic.co/products/elasticsearch" target="_blank">Download Apache Tomcat</a>

.. |elasticsearch| raw:: html

   <a href="https://www.elastic.co/products/elasticsearch" target="_blank">Elasticsearch</a>

.. |backdepoyment| raw:: html

   <a href="https://www.baeldung.com/spring-boot-war-tomcat-deploy" target="_blank">Deploy a Spring Boot WAR</a>

.. |gradle| raw:: html

   <a href="https://gradle.org/" target="_blank">Gradle</a>

.. |installelasticsearch| raw:: html

   <a href="https://www.elastic.co/guide/en/beats/libbeat/6.2/elasticsearch-installation.html" target="_blank">Install Elasticsearch</a>

.. |angular_link| raw:: html

   <a href="https://angular.io/" target="_blank">Angular 5.2.11</a>

.. |typescript| raw:: html

	<a href="https://www.typescriptlang.org/" target="_blank">Typescript 2.9.2</a>
