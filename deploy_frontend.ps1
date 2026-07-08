# PowerShell script to deploy React Frontend files to Hostinger FTP Server
# Run this script to publish frontend changes.

$ftpHost = "145.79.213.144"
$ftpUser = "u882069120.orange-yak-837262.hostingersite.com"
$ftpPass = "Sandanithin@2026"
$localDistFolder = Join-Path $PSScriptRoot "dist"
$remotePath = "" # Directly to FTP web root

Write-Host "Starting FTP deployment of frontend to $ftpHost..." -ForegroundColor Cyan

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

# Ensure assets directory exists on remote server
Create-FtpDirectory -dirPath "/assets"

# Get all files recursively in dist directory
$files = Get-ChildItem -Path $localDistFolder -Recurse -File
foreach ($file in $files) {
    $relativePath = $file.FullName.Replace($localDistFolder, "").Replace("\", "/")
    $targetRemotePath = $remotePath + $relativePath
    Upload-File -localFile $file.FullName -remoteFile $targetRemotePath
}

Write-Host "Frontend deployment completed!" -ForegroundColor Green
