# Specification of the SSK data model

The SSK underlying format is TEI.
The scenarios are described using the TEI format (Text Encoding Initiative). All the information displayed within the SSK proceed from TEI files.

A scenario is a list of events (`<tei:listEvent>`), each step in a scenario is an event (`<tei:event>`).

## The `processTEI.py` script

This script is used to perform some manipulations on and with the TEI files, by using arguments

It is made for Python3.

The possible manipulations are:
* check `xml:id`: process all the files and add or change the `<TEI>` root element `@xml:id` with by the name of the file.
* Get contributors: update the [scenariosContributors.txt](https://github.com/ParthenosWP4/SSK/blob/master/scenariosContributors.txt) file, by fetching all the `<author>` elements found in TEI files
* Normalize Space: delete additional white spaces within the TEI tags (not 100% efficient)

# `<term>` and `<ref>` typing

## term/@type

* `standard`: the key gives the id of a standard referenced in the SSK standards Knowledge base
* `activity`: the value of key is taken from the tadirah ontology, research activities section
* `object`: the value of key is taken from the NEMO taxonomy Information Resource Types, research objects section
* `technique`: the value of key is taken from the tadirah ontology, research techniques section
* `discipline`, taken from the aureHAL taxonomy

## ref/@type
* `spec`: the specification, of a standard for instance.
* `report`: technical reports
* `blog`: blog posts
* `tutorial`: tutorials or guidelines
* `script`: Scripts and code samples
* `paper`: Scholarly papers
* `tool`: software, service, plugin
* `database`: collection of structured data
* `method`: technical methodology (see also TaDiRAH techniques)
* `documentation`: general information about a tool, a method, a standard
* `bibliography`: list of references
* `schema`: direct link to a machine readable schema for a standard or a format
