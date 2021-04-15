#!/bin/bash
latest_v=$(git describe --abbrev=0 --tags)
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "Latest version is $latest_v"
echo "Enter new version"
read new_v
git tag "$new_v"
npm install
npm run build
git checkout site
rm -rf docs
mv dist docs
git add docs
git commit -m "Releasing $new_v"
git checkout "$current_branch"