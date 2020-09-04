#!/bin/bash
sudo apt update
sudo apt install ruby
sudo apt install wget

cd /home/ubuntu

wget https://aws-codedeploy-ca-central-1.s3.ca-central-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent restart

sudo apt install -y openjdk-11-jre