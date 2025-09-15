# validate-translations.ps1
$basePath = "C:\Users\justi\newhaiti-site\lib\i18n\dictionaries"

# Locales and files to validate/sync
$locales = @("en", "fr", "ht", "es")
$files   = @("about.json", "projects.json", "blog.json", "newsletter.json")

Write-Host "`n🌍 Validating + Syncing translation files..." -ForegroundColor Cyan

# Summary tracking
$summary = @{
    Passed  = 0
    Fixed   = 0
    Failed  = 0
    Missing = 0
}
$reportLines = @()

function Get-Keys($obj, $prefix="") {
    $keys = @()
    if ($obj -is [System.Collections.IDictionary]) {
        foreach ($k in $obj.Keys) {
            $newPrefix = if ($prefix) { "$prefix.$k" } else { $k }
            $keys += $newPrefix
            $keys += Get-Keys $obj[$k] $newPrefix
        }
    } elseif ($obj -is [System.Collections.IEnumerable] -and -not ($obj -is [string])) {
        for ($i=0; $i -lt $obj.Count; $i++) {
            $keys += Get-Keys $obj[$i] "$prefix[$i]"
        }
    }
    return $keys
}

foreach ($file in $files) {
    Write-Host "`n📂 Checking consistency for: $file" -ForegroundColor Yellow
    $reportLines += "`n📂 Checking consistency for: $file"
    
    $allKeys = @{}
    $parsed = @{}
    $validLocales = @()

    foreach ($locale in $locales) {
        $filePath = Join-Path $basePath "$locale\$file"

        if (-not (Test-Path $filePath)) {
            Write-Host "❌ Missing: $filePath" -ForegroundColor Red
            $reportLines += "❌ Missing: $filePath"
            $summary.Missing++
            continue
        }

        try {
            $content = Get-Content $filePath -Raw | ConvertFrom-Json -ErrorAction Stop
            if ($null -eq $content) {
                Write-Host "❌ Empty or invalid JSON: $filePath" -ForegroundColor Red
                $reportLines += "❌ Empty or invalid JSON: $filePath"
                $summary.Failed++
                continue
            }

            $parsed[$locale] = $content
            $allKeys[$locale] = Get-Keys $content
            $validLocales += $locale
            Write-Host "✅ Valid: $filePath" -ForegroundColor Green
            $reportLines += "✅ Valid: $filePath"
            $summary.Passed++
        }
        catch {
            $errorMessage = $_.Exception.Message
            if ($errorMessage -match "Line (\d+), position (\d+)") {
                $line   = $matches[1]
                $column = $matches[2]
                Write-Host "❌ Error in $filePath at line $line, column $column" -ForegroundColor Red
                $reportLines += "❌ Error in $filePath at line $line, column $column"
            }
            else {
                Write-Host "❌ Error in $filePath: $errorMessage" -ForegroundColor Red
                $reportLines += "❌ Error in $filePath: $errorMessage"
            }
            $summary.Failed++
        }
    }

    if ($validLocales.Count -gt 1) {
        $unionKeys = $allKeys.Values | ForEach-Object { $_ } | Sort-Object -Unique

        foreach ($locale in $validLocales) {
            $missing = Compare-Object -ReferenceObject $unionKeys -DifferenceObject $allKeys[$locale] -PassThru | Where-Object { $_ -in $unionKeys }

            if ($missing) {
                Write-Host "⚠️ Auto-fixing $locale/$file (missing: $($missing -join ', '))" -ForegroundColor Yellow
                $reportLines += "⚠️ Auto-fixing $locale/$file (missing: $($missing -join ', '))"
                $summary.Fixed++

                $json = Get-Content (Join-Path $basePath "$locale\$file") -Raw | ConvertFrom-Json -Depth 100
                foreach ($key in $missing) {
                    $json | Add-Member -NotePropertyName $key -NotePropertyValue "TODO: translate" -Force
                }
                $json | ConvertTo-Json -Depth 100 | Set-Content (Join-Path $basePath "$locale\$file")
            } else {
                Write-Host "🎯 Keys match in $locale/$file" -ForegroundColor Green
                $reportLines += "🎯 Keys match in $locale/$file"
            }
        }
    }
}

# Final summary
Write-Host "`n✨ Validation + Sync complete!" -ForegroundColor Cyan
$reportLines += "`n✨ Validation + Sync complete!"
$reportLines += "📊 Summary:"
$reportLines += "   ✅ Passed : $($summary.Passed)"
$reportLines += "   ⚠️ Fixed  : $($summary.Fixed)"
$reportLines += "   ❌ Failed : $($summary.Failed)"
$reportLines += "   📂 Missing: $($summary.Missing)"

Write-Host "📊 Summary:" -ForegroundColor Magenta
Write-Host "   ✅ Passed : $($summary.Passed)"
Write-Host "   ⚠️ Fixed  : $($summary.Fixed)"
Write-Host "   ❌ Failed : $($summary.Failed)"
Write-Host "   📂 Missing: $($summary.Missing)"

# Save report with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$reportPath = Join-Path $PSScriptRoot "translation-report-$timestamp.txt"
$reportLines | Out-File $reportPath -Encoding UTF8

Write-Host "`n📝 Report saved to: $reportPath" -ForegroundColor Cyan
