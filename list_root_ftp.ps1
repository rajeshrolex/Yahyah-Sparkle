$ftpHost = "145.79.213.144"
$ftpUser = "u882069120.orange-yak-837262.hostingersite.com"
$ftpPass = "Sandanithin@2026"

$uri = New-Object System.Uri("ftp://$ftpHost/../")
$webRequest = [System.Net.FtpWebRequest]::Create($uri)
$webRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
$webRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails

try {
    $response = $webRequest.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $output = $reader.ReadToEnd()
    $reader.Close()
    $response.Close()
    Write-Host $output
}
catch {
    Write-Host "Failed to list FTP directory: $_" -ForegroundColor Red
}
