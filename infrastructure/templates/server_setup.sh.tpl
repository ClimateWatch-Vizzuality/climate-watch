#!/bin/bash

#
# Public keys for ssh
#
touch /home/"${user}"/.ssh/authorized_keys

${authorized_ssh_keys}

chown ${user}: /home/"${user}"/.ssh/authorized_keys
chmod 0600 /home/"${user}"/.ssh/authorized_keys

sudo apt-get update
sudo apt-get upgrade -y


#
# Set a hostname that identifies the cluster properly, so we avoid mistakes
#
sudo hostnamectl set-hostname "${hostname}"


#
# RVM
#
sudo apt-get install -y software-properties-common
sudo apt-add-repository -y ppa:rael-gc/rvm
sudo apt-get -y update
sudo apt-get -y install rvm
sudo usermod -a -G rvm ubuntu
# WARNING: at this point https://github.com/rvm/ubuntu_rvm recommends a reboot, and indeed it seems to be needed.
# After the "sudo reboot" command below are the instructions to configure ruby and bundler, which you will have to manually run after a reboot


#
# Nginx + passenger
#
# Install our PGP key and add HTTPS support for APT
sudo apt-get install -y dirmngr gnupg nginx
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates

# Add our APT repository
sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger focal main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update

# Install Passenger + Nginx module
sudo apt-get install -y libnginx-mod-http-passenger

if [ ! -f /etc/nginx/modules-enabled/50-mod-http-passenger.conf ]; then sudo ln -s /usr/share/nginx/modules-available/mod-http-passenger.load /etc/nginx/modules-enabled/50-mod-http-passenger.conf ; fi

#
# Server reboot to make RVM work
#
sudo reboot


############
# Manually run these after the reboot
############


#
# NVM and nodejs
# These do not seem to run nicely in the data script, so run them manually
#
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 12


#
# Ruby
#
rvm install 2.5.9
gem install bundler -v 1.17.3


