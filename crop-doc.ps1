Add-Type -AssemblyName System.Drawing
$refPath = "C:\Users\usuario1\.gemini\antigravity\brain\427e2a29-11f3-4656-a074-4fdeed957590\.user_uploaded\media_1791417805391.jpg"
$outPath = "C:\Users\usuario1\Desktop\aurex-studios\demo-dental-perfection\public\assets\doctor-maximo-rabovich.jpg"
$src = [System.Drawing.Bitmap]::FromFile($refPath)

# Exact crop inside card without outer border
$rect = New-Object System.Drawing.Rectangle(502, 597, 131, 88)
$dest = New-Object System.Drawing.Bitmap(600, 480)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$destRect = New-Object System.Drawing.Rectangle(0, 0, 600, 480)
$g.DrawImage($src, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$dest.Dispose()
$src.Dispose()
Write-Host "Perfect doctor portrait saved to $outPath"
