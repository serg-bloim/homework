#!/bin/bash
latest_v=$(git describe --abbrev=0 --tags)
current_branch=$(git rev-parse --abbrev-ref HEAD)
index_changes=$(git status --porcelain | wc -l | xargs)
if [[ "$index_changes" != "0" ]]; then
  echo "There are index changes. Commit or reset first"
  exit 1
fi
echo "Latest version is $latest_v"
echo "Enter new version"
read new_v
echo "export const appVersion = '$new_v'" > src/util/version.js
git add src/util/version.js
npm install
npm run build
git add package-lock.json
git commit -m "Releasing $new_v"
git tag "$new_v"
cd ..
git checkout site
rm -rf docs
mv web/dist docs
git add docs
git commit -m "Releasing $new_v"
git checkout "$current_branch"
cd web