#!/bin/bash

set -eu

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 WHITELIST"
  echo ""
  echo "WHITELIST is a text file containing a new-line separated list of allowed licenses"
  exit 1
fi

function join_by () { local IFS="$1"; shift; echo "$*"; }

packagesToIgnore=()
packagesToIgnore+=("rio-test-app@3.0.1")

readarray -t whitelistedLicenses < "$1"

if [[ ${#whitelistedLicenses[@]} -eq 0 ]]; then
  echo "ERROR: List of allowed licenses is empty!"
  exit 2
fi

ignoreString=$(join_by ";" "${packagesToIgnore[@]}")
whitelistString=$(join_by ";" "${whitelistedLicenses[@]}")

./node_modules/.bin/license-checker --summary --excludePackages "${ignoreString}" --onlyAllow "${whitelistString}"
