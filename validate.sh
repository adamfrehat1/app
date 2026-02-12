#!/bin/bash

# Script to validate all JavaScript files in the project

echo "🔍 Validating JavaScript files..."
echo ""

error_count=0
success_count=0

# Find all .js files in src directory
for file in $(find src -name "*.js"); do
    if node -c "$file" 2>/dev/null; then
        echo "✅ $file"
        ((success_count++))
    else
        echo "❌ $file"
        node -c "$file"
        ((error_count++))
    fi
done

# Check main App.js
if node -c "App.js" 2>/dev/null; then
    echo "✅ App.js"
    ((success_count++))
else
    echo "❌ App.js"
    node -c "App.js"
    ((error_count++))
fi

echo ""
echo "📊 Summary:"
echo "  ✅ Valid files: $success_count"
echo "  ❌ Invalid files: $error_count"
echo ""

if [ $error_count -eq 0 ]; then
    echo "🎉 All files are valid!"
    exit 0
else
    echo "⚠️  Some files have syntax errors"
    exit 1
fi
