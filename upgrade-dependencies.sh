#!/bin/bash

set -e

[[ " $@ " =~ ' -c ' ]] && rm -rf ./node_modules ./pnpm-lock.yaml

pnpm upgrade -L
./modify-files-permissions.sh
