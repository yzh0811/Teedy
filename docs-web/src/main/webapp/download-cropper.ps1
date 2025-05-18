# 创建目录
New-Item -ItemType Directory -Force -Path "lib/cropperjs"

# 下载文件
$cropperVersion = "1.5.13"
$baseUrl = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/$cropperVersion"

# 下载CSS文件
Invoke-WebRequest -Uri "$baseUrl/cropper.min.css" -OutFile "lib/cropperjs/cropper.min.css"

# 下载JS文件
Invoke-WebRequest -Uri "$baseUrl/cropper.min.js" -OutFile "lib/cropperjs/cropper.min.js" 