# PowerShell script to deploy Backend files to Hostinger FTP Server
# Run this script to publish changes.

$ftpHost = "145.79.213.144"
$ftpUser = "u882069120.orange-yak-837262.hostingersite.com"
$ftpPass = "Sandanithin@2026"
$localBackendFolder = Join-Path $PSScriptRoot "backend"
$remotePath = "" # Leave empty for root. Paths will start with /

Write-Host "Starting FTP deployment to $ftpHost..." -ForegroundColor Cyan

# Create FTP upload helper function
function Upload-File {
    param (
        [string]$localFile,
        [string]$remoteFile
    )
    $uri = New-Object System.Uri("ftp://$ftpHost$remoteFile")
    $webRequest = [System.Net.FtpWebRequest]::Create($uri)
    $webRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    $webRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $webRequest.UseBinary = $true
    
    try {
        $fileBytes = [System.IO.File]::ReadAllBytes($localFile)
        $webRequest.ContentLength = $fileBytes.Length
        $requestStream = $webRequest.GetRequestStream()
        $requestStream.Write($fileBytes, 0, $fileBytes.Length)
        $requestStream.Close()
        $requestStream.Dispose()
        Write-Host "Uploaded: $remoteFile" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to upload $remoteFile : $_" -ForegroundColor Red
    }
}

function Create-FtpDirectory {
    param (
        [string]$dirPath
    )
    $uri = New-Object System.Uri("ftp://$ftpHost$dirPath")
    $webRequest = [System.Net.FtpWebRequest]::Create($uri)
    $webRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    $webRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    try {
        $response = $webRequest.GetResponse()
        $response.Close()
        Write-Host "Created Directory: $dirPath" -ForegroundColor Yellow
    } catch {
        # Directory might already exist, ignore error
    }
}

# Ensure directories are created on remote server
Create-FtpDirectory -dirPath "$remotePath/backend"
Create-FtpDirectory -dirPath "$remotePath/backend/config"
Create-FtpDirectory -dirPath "$remotePath/backend/database"
Create-FtpDirectory -dirPath "$remotePath/backend/api"
Create-FtpDirectory -dirPath "$remotePath/backend/api/auth"
Create-FtpDirectory -dirPath "$remotePath/backend/api/public"
Create-FtpDirectory -dirPath "$remotePath/backend/api/admin"
Create-FtpDirectory -dirPath "$remotePath/uploads"

# Get all files recursively in backend directory
$files = Get-ChildItem -Path $localBackendFolder -Recurse -File
foreach ($file in $files) {
    $relativePath = $file.FullName.Replace($localBackendFolder, "").Replace("\", "/")
    $targetRemotePath = "$remotePath/backend" + $relativePath
    Upload-File -localFile $file.FullName -remoteFile $targetRemotePath
}

# Upload files in the uploads folder
$localUploadsFolder = Join-Path $PSScriptRoot "uploads"
if (Test-Path $localUploadsFolder) {
    $uploadFiles = Get-ChildItem -Path $localUploadsFolder -Recurse -File
    foreach ($file in $uploadFiles) {
        $relativePath = $file.FullName.Replace($localUploadsFolder, "").Replace("\", "/")
        $targetRemotePath = "$remotePath/uploads" + $relativePath
        Upload-File -localFile $file.FullName -remoteFile $targetRemotePath
    }
}

Write-Host "Deployment completed!" -ForegroundColor Green
