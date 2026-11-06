param([string]$OutputPath = 'C:/Users/HomePC/MyWork/firewall-portfolio-netlify.zip')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
$sourceDirectory = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot 'dist')).Path
$outputFile = [System.IO.Path]::GetFullPath($OutputPath)
$stream = [System.IO.File]::Open($outputFile, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($file in Get-ChildItem -LiteralPath $sourceDirectory -File -Recurse) {
        $relativePath = $file.FullName.Substring($sourceDirectory.Length + 1).Replace('\', '/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $relativePath, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
} finally {
    $archive.Dispose()
    $stream.Dispose()
}
$check = [System.IO.Compression.ZipFile]::OpenRead($outputFile)
try {
    $paths = @($check.Entries | ForEach-Object FullName)
    if ($paths -notcontains 'index.html') { throw 'Missing root index.html' }
    if ($paths | Where-Object { $_.Contains('\') }) { throw 'Non-portable ZIP path found' }
    foreach ($file in Get-ChildItem -LiteralPath $sourceDirectory -File -Recurse) {
        $relativePath = $file.FullName.Substring($sourceDirectory.Length + 1).Replace('\', '/')
        $entry = $check.GetEntry($relativePath)
        if ($null -eq $entry -or $entry.Length -ne $file.Length) { throw "Missing or invalid file: $relativePath" }
    }
    Write-Output "Verified $($paths.Count) files with portable ZIP paths: $outputFile"
} finally {
    $check.Dispose()
}
