#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# Commit to Git

git_commit_id=$(git rev-parse --short HEAD) 
git_commit_message="New Deploy based on - $git_commit_id"

git init
git add -A
git commit -m $git_commit_message

# Push to gh-pages
git push -f https://github.com/arkits/exige-vue.git master:gh-pages

cd -