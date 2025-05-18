# Create directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "lib/cropperjs"

# Download Cropper.js
$jsUrl = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"
$jsOutput = "lib/cropperjs/cropper.min.js"
Invoke-WebRequest -Uri $jsUrl -OutFile $jsOutput
Write-Host "Downloaded Cropper.js to $jsOutput"

# Download Cropper.css
$cssUrl = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css"
$cssOutput = "lib/cropperjs/cropper.min.css"
Invoke-WebRequest -Uri $cssUrl -OutFile $cssOutput
Write-Host "Downloaded Cropper.css to $cssOutput" 