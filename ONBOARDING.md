# Pitch-Seiten erstellen — Anleitung fürs Team

So legst du eigene Pitch-Seiten an und bearbeitest bestehende — **ganz ohne
Programmierkenntnisse**. Claude Code macht die ganze Technik für dich, du sagst
ihm nur auf Deutsch, was du willst.

Das Setup machst du **einmal**. Danach dauert ein neuer Pitch wenige Minuten.

---

## Einmaliges Setup (ca. 15 Min)

### 1. Claude Code installieren
Folge der offiziellen Anleitung: <https://docs.claude.com/claude-code>
Danach hast du den Befehl `claude` im Terminal.

### 2. GitHub-Zugang
- Du brauchst einen GitHub-Account. Sag **Finnian** Bescheid mit deinem
  GitHub-Benutzernamen — er gibt dir Zugriff auf das Repo
  `karlpluskarla-pitches`.

### 3. GitHub CLI installieren & einloggen
Im Terminal (Mac):
```bash
brew install gh
gh auth login
```
Bei `gh auth login`: wähle **GitHub.com** → **HTTPS** → **Login with a web
browser**, und folge den Schritten im Browser. Das regelt gleichzeitig den
Zugang fürs Hochladen — du musst nie ein Passwort eintippen.

### 4. Das Projekt herunterladen
```bash
cd ~/Documents
gh repo clone finnianlnkx/karlpluskarla-pitches
```
Jetzt liegt der Ordner `karlpluskarla-pitches` in deinen Dokumenten.

---

## Einen Pitch erstellen

1. Terminal öffnen, ins Projekt wechseln und Claude Code starten:
   ```bash
   cd ~/Documents/karlpluskarla-pitches
   claude
   ```
2. Tippe:
   ```
   /neuer-pitch
   ```
   (oder sag einfach: „Erstelle einen Pitch für [Kunde] über [Thema]".)
3. Claude Code fragt nach Name, Slug (der Teil hinter der URL) und Passwort und
   baut dir die Seite. Du bekommst am Ende eine **Vorschau-Link** — den kannst
   du ansehen und im Team oder mit dem Kunden teilen.
4. Wenn alles passt, sag:
   ```
   veröffentliche
   ```
   Nach ~1 Minute ist der Pitch live unter
   `pitch.karlpluskarla.de/<dein-slug>`.

## Einen Pitch bearbeiten

Gleicher Start (`cd … && claude`), dann:
```
/pitch-bearbeiten
```
oder: „Ändere im Condor-Pitch die Überschrift zu …". Wieder: erst Vorschau,
dann „veröffentliche".

---

## Wichtig zu wissen

- **Immer erst Claude Code starten** und es machen lassen — du tippst selbst
  keine Befehle wie `git`.
- **Mehrere Leute gleichzeitig:** Kein Problem, solange ihr an
  *verschiedenen* Pitches arbeitet. Am selben Pitch sollte immer nur eine
  Person gleichzeitig arbeiten.
- **Nichts geht kaputt:** Ein Pitch wird erst live, wenn du „veröffentliche"
  sagst. Und selbst ein fehlerhafter Pitch betrifft nur seine eigene Seite.
- **Passwort vergessen / Vorschau testen:** Hänge `?logout` an die URL, um den
  Login-Screen erneut zu sehen.

Bei Problemen: Frag Claude Code direkt („Ich hänge fest bei …") oder melde dich
bei Finnian.
