# bodily-sensation-maps (BSM)
Die Bodily Sensation Maps sind ein Befragungsinterface zur Erfassung der Körperwahrnehmung. Die BSM stellen dem Nutzer eine anklickbare Körpersilhouette zur Verfügung, mit Klick auf einen Körperteil öffnet sich ein Schieberegler über den Probanden die Intensität ihrer Wahrnehmung angeben können. Das Tool kann für verschiedene Zwecke eingesetzt werden: Hierzu zählen bspw. die Erfassung der körperlichen Aktivierung von Besuchern eines Konzerts aber auch die Erfassung von Schmerzintensitäten nach Unfällen. 

## Beispiel
Eine beispielhafte Befragung kann unter https://clemenskommerell.de/bsm getestet werden.

## Setup
### Voraussetzungen
Die BSM sind für die Nutzung auf einem herkömmlichen Webspace ausgerichtet. Dabei werden eine Php-Umgebung sowie MySQL-Datenbank mit Schreibrechten vorausgesetzt.

### Konfiguration
Das Repository beinhaltet eine vorkonfigurierte Version mit einer fertigen App im dist-Folder. Für die Nutzung müssen dann nur in der Datei db/config.php entsprechende Eintragungen für die Datenbankverbindung vorgenommen werden sowie die Textelemente in der text/texts.json angepasst werden. Anschließend kann das Tool auf einem Webspace hinterlegt werden. Eine Tabelle (bsm) in der angegebenen Datenbank wird automatisch erstellt.
Wer möchte kann natürlich das Repository clonen und die Dateien beliebig anpassen, alle Dependencies sind in der package.json angegeben und können bspw. über npm install installiert werden. Die main.js im dist-Folder wird aus den Dateien im src-Folder über Webpack generiert (npm run build).  
