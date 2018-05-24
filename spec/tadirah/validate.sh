#!/bin/bash

validate_tei() {

    tei_validate_dir="../data/out"

    tei_schema="../resources/TBXinTEI/Schemas/TBXinTEI.rnc"

    echo "Validating files in $tei_validate_dir with $tei_schema ..."
    find "$tei_validate_dir" -name '*.xml' -print0 | \
                xargs -0 xmllint --relaxng "$tei_schema" --noout --nowarning 2>&1 | grep "does not" > xmllint-out.txt
}

validate_tei
