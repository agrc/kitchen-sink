#!/bin/bash

# Keep Firebase emulator output intact while filtering noisy macOS lsof warnings.
args=()

for arg in "$@"; do
  if [[ "$arg" != "--" ]]; then
    args+=("$arg")
  fi
done

firebase emulators:start "${args[@]}" 2> >(grep -Ev 'lsof|Output information may be incomplete|assuming "dev=.*" from mount table' >&2)
