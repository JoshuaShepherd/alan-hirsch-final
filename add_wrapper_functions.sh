#!/bin/bash

# Function to add wrapper functions to a file
add_wrappers() {
    local file="$1"
    local entity_name=$(basename "$file" .queries.ts)
    
    # Convert kebab-case to PascalCase for function names
    local pascal_case=$(echo "$entity_name" | sed -r 's/(^|-)([a-z])/\U\2/g')
    
    # Extract the base function names from the file
    local get_func=$(grep -o "get${pascal_case}ById" "$file" | head -1)
    local list_func=$(grep -o "list${pascal_case}s" "$file" | head -1)
    local create_func=$(grep -o "create${pascal_case}" "$file" | head -1)
    local update_func=$(grep -o "update${pascal_case}" "$file" | head -1)
    local delete_func=$(grep -o "delete${pascal_case}" "$file" | head -1)
    
    # If we can't find the functions, try alternative patterns
    if [ -z "$get_func" ]; then
        get_func=$(grep -o "get.*ById" "$file" | head -1)
    fi
    if [ -z "$list_func" ]; then
        list_func=$(grep -o "list.*" "$file" | head -1)
    fi
    if [ -z "$create_func" ]; then
        create_func=$(grep -o "create.*" "$file" | head -1)
    fi
    if [ -z "$update_func" ]; then
        update_func=$(grep -o "update.*" "$file" | head -1)
    fi
    if [ -z "$delete_func" ]; then
        delete_func=$(grep -o "delete.*" "$file" | head -1)
    fi
    
    # Add wrapper functions if they don't exist
    if ! grep -q "export const getById" "$file"; then
        echo "" >> "$file"
        echo "// Standardized wrapper functions for service layer compatibility" >> "$file"
        echo "export const getById = $get_func;" >> "$file"
        echo "export const list = $list_func;" >> "$file"
        echo "export const create = $create_func;" >> "$file"
        echo "export const update = $update_func;" >> "$file"
        echo "export const remove = $delete_func;" >> "$file"
        echo "Added wrapper functions to $file"
    fi
}

# Process all files that need wrapper functions
for file in src/lib/database/db/queries/*.queries.ts; do
    if ! grep -q "export const getById" "$file"; then
        add_wrappers "$file"
    fi
done
