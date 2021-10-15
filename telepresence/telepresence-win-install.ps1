# Unzip the zip file to a suitable directory + cleanup zip
Expand-Archive -Path telepresence.zip
Remove-Item 'telepresence.zip'
cd telepresence

# Run the install-telepresence.ps1 to install telepresence's dependencies. 
# It will install telepresence to C:\telepresence by default, 
# but you can specify a custom path $path with -Path $path
Set-ExecutionPolicy Bypass -Scope Process
.\install-telepresence.ps1 -Path "C:\Users\felipe\AppData\Roaming\Docker\Desktop\plugins\telepresence\host"

# Remove the unzipped directory
cd ..
Remove-Item -Recurse telepresence
