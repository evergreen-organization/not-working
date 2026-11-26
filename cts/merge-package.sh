#!/bin/bash
# Rebuild package.zip from its split parts and verify the checksum.
# Usage: ./merge-package.sh   (run from anywhere)

set -euo pipefail

cd "$(dirname "$0")"

shopt -s nullglob
parts=(package.zip.part*)
if [ ${#parts[@]} -eq 0 ]; then
  echo "Error: no package.zip.part* files found in $(pwd)" >&2
  exit 1
fi

if [ -f package.zip ]; then
  echo "package.zip already exists. Overwrite? [y/N]"
  read -r answer
  [[ "$answer" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }
fi

echo "Merging ${#parts[@]} parts..."
cat "${parts[@]}" > package.zip

if [ -f package.zip.sha256 ]; then
  echo "Verifying checksum..."
  if shasum -a 256 -c package.zip.sha256; then
    echo "Done: package.zip rebuilt and verified."
  else
    echo "Error: checksum mismatch. package.zip is corrupt; check that all parts are present." >&2
    exit 1
  fi
else
  echo "Warning: package.zip.sha256 not found, skipped verification."
fi
