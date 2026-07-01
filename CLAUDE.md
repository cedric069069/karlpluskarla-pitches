# Karl+Karla Pitches — Anleitung für Claude Code

Dieses Repo enthält die passwortgeschützten Pitch-Seiten unter
**pitch.karlpluskarla.de**. Die Leute, die hier arbeiten, sind **nicht
technisch** — DU (Claude Code) erledigst alle Git-Schritte für sie. Sie tippen
nie selbst `git`. Erkläre auf Deutsch, in einfachen Worten, was du tust.

## Goldene Regeln

1. **Immer zuerst aktualisieren.** Vor JEDER Arbeit: `git checkout main && git pull`.
2. **Nie direkt auf `main` committen.** Jeder Pitch entsteht auf einem eigenen Branch.
3. **Ein Pitch = ein Branch.** Branch-Name: `pitch/<slug>` (neu) bzw. `edit/<slug>` (Änderung).
4. **Live geht nur über Merge** — erst nach Bestätigung der Person ("veröffentliche").
5. Am Ende **immer die Vorschau-URL nennen**, damit die Person den Pitch ansehen kann.

## Was ist ein Pitch?

Ein Pitch besteht aus **genau zwei Dateien** in `lib/pitches/`, beide nach dem
Slug benannt:

```
lib/pitches/<slug>.html   ← die Pitch-Seite (selbst-enthaltenes HTML)
lib/pitches/<slug>.json   ← Titel, Untertitel, Login
```

**Slug-Regeln:** nur Kleinbuchstaben, Zahlen, Bindestriche (z. B. `condor-illombardia`).
Die `.html`- und `.json`-Dateinamen müssen exakt gleich heißen. Der Pitch ist
danach erreichbar unter `pitch.karlpluskarla.de/<slug>`.

**Die `.json`-Datei** hat immer diese Form:

```json
{
  "title": "Il Lombardia<br>2026",
  "sub": "Condor · Pitch · Karl+Karla",
  "user": "admin",
  "pass": "ein-passwort"
}
```

- `title` — groß auf dem Login-Screen (`<br>` = Zeilenumbruch, optional)
- `sub` — die kleine Zeile darunter
- `user` — fast immer `admin`
- `pass` — das Passwort, das der Kunde zum Öffnen bekommt

Die HTML-Datei ist **selbst-enthalten**: ein einziges File mit allem (Styles
inline, Bilder als Daten-URL oder von externen URLs). Das ist der Normalfall und
am einfachsten.

> **Sonderfall kompilierte SPA:** Manche ältere Pitches (z. B. condor) laden
> JS/CSS aus `public/assets/<slug>/`. Wenn du so etwas anlegst oder migrierst,
> müssen diese Asset-Dateien mit ins Repo, sonst gibt es einen weißen
> Bildschirm. Für NEUE Pitches: immer selbst-enthaltenes HTML bevorzugen.

## Ablauf: NEUEN Pitch anlegen

1. `git checkout main && git pull`
2. Frag die Person nach: Kunde/Name, gewünschtem Slug (oder schlage einen vor),
   Passwort (oder schlage eins vor). Kläre kurz Inhalt/Stil des Pitches.
3. `git checkout -b pitch/<slug>`
4. Erzeuge `lib/pitches/<slug>.html` (die eigentliche Pitch-Seite — hochwertig,
   markenstark, selbst-enthalten) und `lib/pitches/<slug>.json`.
5. `git add lib/pitches/<slug>.* && git commit -m "pitch: <slug>"`
6. `git push -u origin pitch/<slug>`
7. PR öffnen: `gh pr create --fill --base main`
8. Warte ~30 s, dann `gh pr view --comments`, lies die **Vercel-Vorschau-URL**
   aus dem Kommentar und gib sie der Person:
   „Vorschau: <url>/<slug> — Login: admin / <pass>"

## Ablauf: bestehenden Pitch BEARBEITEN

1. `git checkout main && git pull`
2. `git checkout -b edit/<slug>`
3. Bearbeite `lib/pitches/<slug>.html` und/oder `.json` wie gewünscht.
4. commit → `git push -u origin edit/<slug>` → `gh pr create --fill --base main`
5. Vorschau-URL aus den PR-Kommentaren nennen.

## Ablauf: VERÖFFENTLICHEN (live schalten)

Erst wenn die Person bestätigt ("veröffentliche", "ist gut so"):

```
gh pr merge --squash --delete-branch
```

Danach ist der Pitch in ~1 Minute live unter `pitch.karlpluskarla.de/<slug>`.
Sag der Person Bescheid, wenn es durch ist.

## Mehrere Leute gleichzeitig

- Verschiedene Pitches stören sich **nie** (eigene Dateien).
- Bevor du einen Pitch bearbeitest: prüf mit `gh pr list`, ob jemand schon einen
  offenen PR für denselben Slug hat. Falls ja, sag der Person Bescheid, damit
  sich nicht zwei gleichzeitig an denselben Pitch setzen.

## Hinweise

- Passwörter stehen im Klartext in den `.json`-Dateien. Das ist OK — es sind
  Zugangs-Passwörter für Kunden, keine echten Geheimnisse.
- Ein kaputter Pitch betrifft immer nur seine **eigene** Seite, nie die anderen.
- Logout/Test eines Gates: `pitch.karlpluskarla.de/<slug>?logout`
