#!/usr/bin/env bash
function join_by () { local IFS="$1"; shift; echo "$*"; }

packagesToIgnore=()
packagesToIgnore+=("test-app@0.1.0")

whitelistedLicenses=()
whitelistedLicenses+=("Apache-2.0")
whitelistedLicenses+=("Apache-1.1")
whitelistedLicenses+=("Bouncy Castle license (MIT)")
whitelistedLicenses+=("BSD-2-Clause")
whitelistedLicenses+=("BSD-3-Clause")
whitelistedLicenses+=("BSL-1.0")
whitelistedLicenses+=("CC-BY-2.5")
whitelistedLicenses+=("CC-BY-3.0")
whitelistedLicenses+=("CC-BY-4.0")
whitelistedLicenses+=("CC0-1.0")
whitelistedLicenses+=("CDDL 1.0")
whitelistedLicenses+=("GPL-CE + CDDL 1.1")
whitelistedLicenses+=("Eclipse-Dist-1.0")
whitelistedLicenses+=("Eclipse Public License v 1.0")
whitelistedLicenses+=("Eclipse Publice License (EPL) v. 2.0")
whitelistedLicenses+=("Fcgi")
whitelistedLicenses+=("ICU")
whitelistedLicenses+=("Info-ZIP")
whitelistedLicenses+=("ISC")
whitelistedLicenses+=("JSON.ORG")
whitelistedLicenses+=("LGPL 2.1")
whitelistedLicenses+=("LGPL 3.0")
whitelistedLicenses+=("libpng")
whitelistedLicenses+=("MIT")
whitelistedLicenses+=("Mozilla Public license 1.1")
whitelistedLicenses+=("Mozilla Public license 2.0")
whitelistedLicenses+=("NTP")
whitelistedLicenses+=("PHP-3.00")
whitelistedLicenses+=("PHP-3.01")
whitelistedLicenses+=("PostgreSQL")
whitelistedLicenses+=("Public Domain")
whitelistedLicenses+=("SAX license (=PD)")
whitelistedLicenses+=("OSL 1.1. (The OpenSymphony Software License, Version 1.1)")
whitelistedLicenses+=("Unlicense")
whitelistedLicenses+=("W3C License")
whitelistedLicenses+=("W3C-19980720")
whitelistedLicenses+=("WTFPL")
whitelistedLicenses+=("X11")
whitelistedLicenses+=("zlib")
whitelistedLicenses+=("BSD*") #mistype of "BSD-X-Clause"
whitelistedLicenses+=("BSD") #mistype of "BSD-X-Clause"
whitelistedLicenses+=("Apache License, Version 2.0") #mistype of "Apache-2.0"
whitelistedLicenses+=("MPL-2.0") #Mozilla Public license 2.0 for lazy peoples. Just type the full name, would you?

ignoreString=$(join_by ";" "${packagesToIgnore[@]}")
whitelistString=$(join_by ";" "${whitelistedLicenses[@]}")

./node_modules/.bin/license-checker --summary --excludePackages  "${ignoreString}" --onlyAllow "${whitelistString}"
