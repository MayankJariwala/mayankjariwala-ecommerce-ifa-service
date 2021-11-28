#!/usr/bin/env bash

function upload_to_heroku() {
#      heroku accounts:set prod
#      git checkout -f master
#      git pull origin master
#      git push heroku-prod master
#      git checkout $1
       git --version
}


function deploy() {
    upload_to_heroku
}

deploy
