#!/usr/bin/env bash

#NOTE: Please make sure you have committed your changes
#This script will always take a pull of master branch code, so  make sure your master is upto date
#usage:  deploy <env_name> <current_branch>

#MODIFICATION: One may change the respected branch for various env.

function upload_to_heroku() {
      heroku accounts:set prod
      git checkout -f master
      git pull origin master
      git push heroku-prod master
      git checkout $1
}


function deploy() {
    upload_to_heroku
}

deploy
