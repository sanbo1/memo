#!/bin/sh

#
# check bluetooth infomation
#
hciconfig

# start bluetooth
sudo hciconfig hci0 up
sudo hciconfig hci0 noscan
sudo hciconfig hci0 leadv3

hciconfig


