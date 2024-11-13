#!/bin/bash

# Set the model directory (you can change this to any directory)
MODEL_DIR="$1"  # Takes the first argument as the directory

# Check if the directory is provided and exists
if [ -z "$MODEL_DIR" ]; then
  echo "Please provide the directory containing the model files."
  exit 1
elif [ ! -d "$MODEL_DIR" ]; then
  echo "The specified directory does not exist: $MODEL_DIR"
  exit 1
fi

# Determine if we’re on macOS or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED_INPLACE_FLAG="-i ''"
else
  SED_INPLACE_FLAG="-i"
fi

# Loop over all .ts files in the directory
for file in "$MODEL_DIR"/*.ts; do
  echo "Processing $file..."

  # Use grep with a regular expression to find any type matching List<wildcard>200Response = PaginatedDto;
  if grep -qE '^export type List[A-Za-z0-9_]+200Response = PaginatedDto;$' "$file"; then
    # Extract the wildcard part (e.g., `PaymentMethods`, `PlatformFees`, etc.)
    type_name=$(sed -n -e 's/^export type List\([A-Za-z0-9_]*\)200Response = PaginatedDto;$/\1/p' "$file")

    # If no type name was found, skip this file
    if [[ -z "$type_name" ]]; then
      echo "No matching type found in $file. Skipping..."
      continue
    fi

    # Convert camelCase or PascalCase type name to kebab-case (e.g., `TerminalReaders` -> `terminal-readers`)
    kebab_case_name=$(echo "$type_name" | sed -E 's/([a-z])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')

    # Handle both `import type` and `import` variants for `PaginatedDto`
    if grep -q "import type { PaginatedDto" "$file"; then
      sed $SED_INPLACE_FLAG -e "s/import type { PaginatedDto }/import { PaginatedDto }/" "$file"
    fi

    # Insert import for `<TypeName>AllOf` right after the `PaginatedDto` import with correct kebab-case formatting
    sed $SED_INPLACE_FLAG -e "/import { PaginatedDto } from '.\/paginated-dto';/a\\
    // @ts-ignore\\
    import { List${type_name}200ResponseAllOf } from './list-${kebab_case_name}200-response-all-of';
    " "$file"

    # Update the export line to use `<TypeName>AllOf & PaginatedDto`
    sed $SED_INPLACE_FLAG -e "s/export type List${type_name}200Response = PaginatedDto;/export type List${type_name}200Response = List${type_name}200ResponseAllOf \& PaginatedDto;/g" "$file"

    echo "Processed $file"
  else
    echo "No match found in $file. Skipping..."
  fi
done

echo "All files have been processed."
