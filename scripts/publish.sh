for i in packages/*; do
  PACKAGE=$(jq -r .name < "$i"/package.json)
  PRIVATE=$(jq -r .private < "$i"/package.json)
  if [[ "$PRIVATE" == "true" ]]; then
    echo "Skipping $i ($PACKAGE is private)"
    continue
  fi
  SOURCE_VERSION=$(jq -r .version < "$i"/package.json)
  LAST_PUBLISHED=$(npm view "$PACKAGE" version 2>/dev/null)
  if [[ "$LAST_PUBLISHED" == "$SOURCE_VERSION" ]]; then
    echo "Skipping $i ($PACKAGE $SOURCE_VERSION is up-to-date)"
    continue
  fi
  echo "Publishing $i ($PACKAGE $SOURCE_VERSION replacing $LAST_PUBLISHED)"
  # NOTE: Using npm --prefix _DOES NOT_ seem to work with publish
  # here.  So we use pushd/popd instead.
  set -e
  pushd "$i"
  npm publish --access public
  popd
  set +e
done
