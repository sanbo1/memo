#!/bin/sh

# UUID
UUID="11 22 33 44 55 66 77 88 99 00 AA BB CC DD EE FF"

# major
MAJOR="00 01"

# minor
MINOR="00 02"

`sudo hciconfig hci0 leadv 3`
`sudo hcitool -i hci0 cmd 0x08 0x0008 1E 02 01 1A 1A FF 4C 00 02 15 ${UUID} ${MAJOR} ${MINOR} C8 00`
