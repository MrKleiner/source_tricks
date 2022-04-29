set /P id=Enter id: 
"yt-dlp.exe" %id% --ffmpeg-location "ff" --merge-output-format mp4 --write-subs --embed-subs --embed-metadata --audio-quality 0
REM "E:\Downloaded\ytdl\yt-dlp.exe" %id% --ffmpeg-location "C:\custom\ffmpeg\ffmpeg-N-99728-gd6e903b09b-win64-gpl-shared\bin"