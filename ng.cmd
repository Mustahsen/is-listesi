@IF EXIST "node\node.exe" (
  "node\node.exe"  "node_modules\@angular\cli\bin\ng" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@angular\cli\bin\ng" %*
)