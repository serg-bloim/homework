#!/bin/bash

npm install
npm run build
git checkout site
rm -rf docs
mv dist docs
git add docs
git commit
git checkout master