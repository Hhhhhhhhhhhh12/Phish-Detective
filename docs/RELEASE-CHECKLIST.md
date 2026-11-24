# Veröffentlichung und Rückfallplan

## Vor dem Merge

- Den genauen Head-Commit und den vollständigen Diff des PR abnehmen.
- Typprüfung, Unit-Tests, beide Builds und Artefaktprüfung müssen zu diesem
  Stand gehören. Keine alten Ergebnisse einem neueren Commit zuschreiben.
- Browserabnahme mit den kritischen Lern-, Speicher- und Resetwegen prüfen.
  Emuliertes WebKit ist keine Prüfung auf einem echten iPhone oder dem Mac.
- Die Grenzen der Demo und die bekannten Restpunkte aus dem Audit akzeptieren.
- Einen Merge erst nach der dazu erteilten Freigabe ausführen.

## Vor der Veröffentlichung

- Den tatsächlich gemergten `main`-Commit erneut feststellen und dessen CI prüfen.
- Den zuletzt erfolgreichen Pages-Lauf samt Commit und URL sichern. Die
  Workflow-Metadaten ersetzen keinen Vergleich der aktuell ausgelieferten Dateien.
- Die Freigabe für diesen Veröffentlichungsstand dokumentieren.
- `Publish training version to GitHub Pages` manuell auf `main` starten.
  Ein Merge startet diesen Workflow nicht.

## Nach der Veröffentlichung

- Der erfolgreiche Lauf muss zum freigegebenen Commit gehören.
- Die Live-Seite im Repository-Unterpfad laden; JavaScript, CSS und alle
  Intro-Medien müssen erreichbar sein. Nach Möglichkeit die ausgelieferten
  Assets mit dem freigegebenen Build-Artefakt vergleichen.
- START/Skip, einen Fall samt Feedback, Fortschritt nach Reload und einen
  Werkzeugfall nachprüfen. Dafür ausschliesslich künstliche Übungsdaten verwenden.
- Live-Probleme und Abweichungen dokumentieren; bei fehlender Evidenz keine
  erfolgreiche Funktionsabnahme behaupten.

## Rückfall

- Bei einer wesentlichen Regression weitere Veröffentlichung stoppen und den
  konkreten Fehler beziehungsweise letzten guten Stand feststellen.
- Bevorzugt einen geprüften Revert als PR vorbereiten. Der manuelle Pages-Workflow
  akzeptiert nur `main`; ein beliebiger alter Branch ist kein Ersatz dafür.
- Nach Freigabe den wiederhergestellten `main`-Stand prüfen und erneut veröffentlichen.
- Bei Datenproblemen keine gespeicherten Browserdaten pauschal löschen. Alte
  Rohdaten nur mit Zustimmung sichern; keine echten Kennwörter oder Nachrichten sammeln.

Diese Checkliste führt selbst keine Aktionen aus. Branchschutz und erforderliche
Prüfungen sind Repository-Einstellungen und müssen gesondert konfiguriert werden.
