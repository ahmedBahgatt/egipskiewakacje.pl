#!/usr/bin/env bash
# Lightweight, dependency-free secret scan over tracked files.
# Fails (exit 1) if anything resembling a real credential is committed.
set -euo pipefail

# High-signal secret patterns. Placeholders like "sk..." / "xxx" won't match these.
PATTERN='gho_[A-Za-z0-9]{30,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{60,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|-----BEGIN (RSA|EC|OPENSSH|PGP) PRIVATE KEY-----|sk[-_](live|test)_[A-Za-z0-9]{20,}|sk[A-Za-z0-9]{32,}'

# Only scan tracked, text-ish files; skip lockfiles.
files=$(git ls-files | grep -Ev 'package-lock\.json|\.map$' || true)

hits=$(printf '%s\n' "$files" | xargs -I{} grep -InE "$PATTERN" "{}" 2>/dev/null || true)

if [ -n "$hits" ]; then
  echo "Potential secret material found in tracked files:"
  echo "$hits"
  exit 1
fi

echo "Secret scan: clean (no committed credentials detected)."
