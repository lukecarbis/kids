#!/bin/sh

openMojiRelease='https://github.com/hfg-gmuend/openmoji/releases/latest/download/openmoji-svg-color.zip'
curl -L -o ./public/openmoji.zip $openMojiRelease
unzip -o ./public/openmoji.zip -d ./public/openmoji
rm ./public/openmoji.zip