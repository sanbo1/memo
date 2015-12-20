#!/bin/sh

# start hci dump
#sudo hcidump -R &
sudo hcidump -R > hcidump.txt 2>&1 &

# start inqiry
sudo hcitool lescan
