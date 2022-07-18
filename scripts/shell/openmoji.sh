#!/bin/sh

openMojiRelease='https://github.com/hfg-gmuend/openmoji/releases/latest/download/openmoji-svg-color.zip'
curl -L -o ./static/openmoji.zip $openMojiRelease
unzip -o ./static/openmoji.zip -d ./static/openmoji
rm ./static/openmoji.zip