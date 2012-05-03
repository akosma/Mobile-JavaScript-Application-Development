#!/usr/bin/env sh
echo "This script downloads required JavaScript libraries"

# Constants
LIBS=_libs

# If the "_libs" directory exists, delete it
if [ -d "$LIBS" ]; then
  rm -r $LIBS
fi

# Create the directory
mkdir $LIBS




echo
echo "###############################"
echo "#"
echo "# Installing the submodules"
echo "#"
echo "###############################"
git submodule init
git submodule update




echo
echo "###############################"
echo "#"
echo "# Downloading jQuery Mobile"
echo "#"
echo "###############################"
curl http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.zip --output $LIBS/jqm.zip

# Extract zip file contents
unzip $LIBS/jqm.zip -d $LIBS

# Rename the folder
mv $LIBS/jquery.mobile-1.1.0 $LIBS/jqm/

# Remove the zip file
rm $LIBS/jqm.zip

# Download jQuery itself
curl http://code.jquery.com/jquery-1.7.2.min.js --output $LIBS/jqm/jquery-1.7.2.min.js




echo
echo "###############################"
echo "#"
echo "# Downloading Sencha Touch"
echo "#"
echo "###############################"
curl http://cdn.sencha.io/touch/sencha-touch-2.0.1-gpl.zip --output $LIBS/sencha.zip

# Extract the contents of the zip file
unzip $LIBS/sencha.zip -d $LIBS

# Rename the folder
mv $LIBS/sencha-touch-2.0.1/ $LIBS/sencha/

# Remove the zip file
rm $LIBS/sencha.zip




echo
echo "###############################"
echo "#"
echo "# Downloading PhoneGap"
echo "#"
echo "###############################"
curl https://github.com/phonegap/phonegap/zipball/1.7.0 --location --output $LIBS/phonegap.zip

# Extract the contents of the zip file
unzip $LIBS/phonegap.zip -d $LIBS

# Rename the folder
mv $LIBS/phonegap-phonegap-475bfd2/ $LIBS/phonegap

# Remove the zip file
rm $LIBS/phonegap.zip

