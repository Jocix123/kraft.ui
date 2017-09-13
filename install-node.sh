#!/bin/bash
#
# ---------------------------------------------
#  Kraft, Modular UI Designing Tool
# ---------------------------------------------
#  @@script: setup.sh
#  @@version: 0.0.0.1
#  @@description: server stack installer
#  @@author: Loouis Low
#  @@email: studio@dogsbark.net
#  @@copyright: dogsbark Inc (www.dogsbark.net)
# ---------------------------------------------
#

function runas_root() {
    if [ "$(whoami &2>/dev/null)" != "root" ] && [ "$(id -un &2>/dev/null)" != "root" ]
    then
        echo -e "\e[38;5;198m[kraft]\e[95m Permission denied."
    exit 1
    fi
}

function show_header() {
    echo -e "\e[95m----------------------------------------------"
    echo -e "\e[95m Kraft, Modular UI Designing Tool"
    echo -e "\e[95m----------------------------------------------"
    echo -e "\e[95m 0.0.0.1"
    echo -e "\e[95m----------------------------------------------"
}

function install_nodejs() {
    echo -e "\e[38;5;198m[kraft]\e[95m installing > node.js"
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    apt install -y nodejs
}

function node_modules() {
    echo -e "\e[38;5;198m[kraft]\e[95m installing > node modules"
    npm install -g http
    npm install --unsafe-perm
}

function rm_node_modules() {
   echo -e "\e[38;5;198m[kraft]\e[95m cleaning > node modules"
   find core/ -name "node_modules" -type d -exec rm -r "{}" \;
}

function build_perms() {
   echo -e "\e[38;5;198m[kraft]\e[95m changing > ownership..."
   chown -cR loouis:loouis *
}

function run_server() {
   echo -e "\e[38;5;198m[kraft]\e[95m initialize > sakura server"
   node server.js
}

### init
runas_root
show_header
install_nodejs
rm_node_modules
node_modules
build_perms
run_server