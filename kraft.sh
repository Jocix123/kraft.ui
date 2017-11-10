#!/bin/bash
#
# ---------------------------------------------
#  Kraft, Modular UI Designing Tool
# ---------------------------------------------
#  @@script: kraft.sh
#  @@version:
#  @@description: server stack installer
#  @@author: Nathan
#  @@email: nathan@dogsbark.net
#  @@copyright: dogsbark Inc (dogsbark.net)
# ---------------------------------------------
#

binary=$(basename $0)

function runas_root() {
  if [ "$(whoami &2> /dev/null)" != "root" ] &&
     [ "$(id -un &2> /dev/null)" != "root" ]
  then
    echo "[kraft] permission denied"
  exit 1
  fi
}

function install_nodejs() {
  echo "[kraft] installing > node.js"
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  apt install -y nodejs
  sudo npm i -g n
  sudo n stable
}

function node_modules() {
  echo "[kraft] cleaning > node modules"
  find core/ -name "node_modules" -type d -exec rm -r "{}" \;
}

function run_server() {
  echo "[kraft] initialize > sakura server"
  node core/server.js
}


echo "[kraft] usage: $binary --help"

while test "$#" -gt 0;
do
  case "$1" in
    -h|--help)
    shift
      echo "USAGE:"
      echo "-h, --help          Display this message"
      echo "-i, --install       Setup application"
      echo "-c, --clean         Flush modules"
      echo "-s, --start         Start server"
      exit 0
    shift;;
    
    -i|--install)
    shift
      install_nodejs
      node_modules
    shift;;
    
    -c|--clean)
    shift
      npm i
      node_modules
    shift;;
    
    -s|--start)
    shift
      run_server
    shift;;
    
  esac
done
