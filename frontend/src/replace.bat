@echo off
echo Replacing localhost with production URL...
powershell -Command "$files = Get-ChildItem -Recurse -Include *.jsx; foreach ($file in $files) { $content = Get-Content $file.FullName -Raw; $content = $content -replace 'http://localhost:10000', 'https://belgaum-homes-2.onrender.com'; Set-Content $file.FullName -Value $content }"
echo Done!
pause