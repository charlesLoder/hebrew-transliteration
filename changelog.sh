#! /bin/sh

read -p "Have you updated the changelog? Y/n " yn
case $yn in
    [Yy]* ) exit 0;;
    [Nn]* ) exit 1;;
    * ) echo "Please answer yes or no.";;
esac