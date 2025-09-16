# split-home.ps1
$locales = @("en", "fr", "ht", "es")
$basePath = "lib/i18n/dictionaries"

foreach ($locale in $locales) {
    $homeFile = Join-Path $basePath "$locale/home.json"

    if (Test-Path $homeFile) {
        Write-Host "Processing $homeFile..."

        # Read JSON
        $json = Get-Content $homeFile -Raw | ConvertFrom-Json

        # Extract contact + footer if they exist
        if ($json.PSObject.Properties.Name -contains "contact") {
            $contactFile = Join-Path $basePath "$locale/contact.json"
            $json.contact | ConvertTo-Json -Depth 5 | Out-File $contactFile -Encoding utf8
            $json.PSObject.Properties.Remove("contact")
            Write-Host "  -> Created $contactFile"
        }

        if ($json.PSObject.Properties.Name -contains "footer") {
            $footerFile = Join-Path $basePath "$locale/footer.json"
            $json.footer | ConvertTo-Json -Depth 5 | Out-File $footerFile -Encoding utf8
            $json.PSObject.Properties.Remove("footer")
            Write-Host "  -> Created $footerFile"
        }

        # Save updated home.json (without contact/footer)
        $json | ConvertTo-Json -Depth 5 | Out-File $homeFile -Encoding utf8
        Write-Host "  -> Updated $homeFile"
    } else {
        Write-Host "⚠️ Skipping ${locale}: no home.json found."
    }
}
