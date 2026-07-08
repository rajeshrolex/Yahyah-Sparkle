$ftpHost = "145.79.213.144"
$ftpUser = "u882069120.orange-yak-837262.hostingersite.com"
$ftpPass = "Sandanithin@2026"

$uri = New-Object System.Uri("ftp://$ftpHost/")
$webRequest = [System.Net.FtpWebRequest]::Create($uri)
$webRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
$webRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails

try {
    $response = $webRequest.GetResponse()
    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    $directoryList = $reader.ReadToEnd()
    $reader.Close()
    $response.Close()
    Write-Host "FTP Root Directory List:" -ForegroundColor Green
    Write-Host $directoryList
}
catch {
    Write-Host "Failed to list FTP directory: $_" -ForegroundColor Red
}
