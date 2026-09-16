@echo off
title Gujarat Corridor Daily Lead Harvester
echo =======================================================
echo   GUJARAT CORRIDOR DAILY AUTOMATED LEAD HARVESTER
echo =======================================================
echo Running daily discovery pass for NH-48 corridor...
python "%~dp0auto_daily_harvester.py"
echo.
echo Syncing updates to live website on GitHub...
git -C "%~dp0" add -A
git -C "%~dp0" commit -m "Manual/Scheduled Daily Leads Sync [%date%]"
git -C "%~dp0" push origin main
echo.
echo [OK] Live website updated: https://dhruvtutorials.github.io/gujarat-b2b-dashboard/
pause
