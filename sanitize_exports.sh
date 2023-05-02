#!/bin/bash

DIRECTORY_PATH="model"

find "$DIRECTORY_PATH" -name "*.ts" -type f -print0 | while read -d $'\0' file
do
    perl -0777 -i -pe 's/export\s+type\s+(\w+)\s+=\s+\1;/export type \{$1\};/g' "$file"
    echo "Replaced type exports in $file"
done