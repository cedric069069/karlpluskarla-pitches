import { createHash } from 'crypto'

export function makeToken(secret: string) {
  return 'auth_' + createHash('md5').update(secret).digest('hex')
}

export const GATE_CSS = `
  :root{--blue:#0000FE;--k:#000000;--w:#FFFFFF;--g:#F4F4F2;--mute:#666666}
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html,body{min-height:100%}
  body{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Arial,sans-serif;background:var(--g);color:var(--k);display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;-webkit-font-smoothing:antialiased;}
  body::before{content:'';position:fixed;inset:0;z-index:-1;background:radial-gradient(ellipse 80% 60% at 20% 0%,rgba(0,0,254,.05) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 100%,rgba(0,0,0,.03) 0%,transparent 60%);}
  .gate{width:100%;max-width:440px;background:var(--w);border:1px solid rgba(0,0,0,.09);border-radius:3px;padding:48px 44px 44px;box-shadow:0 4px 32px rgba(0,0,0,.07);}
  .gate-wordmark{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Arial,sans-serif;font-weight:700;font-size:15px;letter-spacing:-0.01em;line-height:1;margin-bottom:32px;color:var(--k);}
  .gate-wordmark .plus{color:var(--blue);}
  .gate-badge{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin-bottom:28px;}
  .gate-badge::before{content:'+';font-size:14px;font-weight:700;color:var(--blue);}
  .gate h1{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Arial,sans-serif;font-weight:700;font-size:clamp(48px,10vw,68px);letter-spacing:-.03em;line-height:.92;margin-bottom:6px;color:var(--k);}
  .gate-sub{font-size:13px;color:var(--mute);letter-spacing:.06em;margin-bottom:40px;text-transform:uppercase;}
  .gate-divider{height:1px;background:rgba(0,0,0,.07);margin-bottom:32px;}
  .gate-field{display:flex;flex-direction:column;padding-bottom:28px;}
  .gate-field label{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin-bottom:10px;}
  .gate-field input{background:transparent;border:none;border-bottom:1.5px solid rgba(0,0,0,.12);padding:10px 0;font-size:15px;font-family:inherit;color:var(--k);outline:none;transition:border-color .2s;}
  .gate-field input:focus{border-bottom-color:var(--blue);}
  .gate-field input::placeholder{color:rgba(0,0,0,.2);}
  .gate-submit{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:15px 28px;border-radius:3px;background:var(--blue);color:var(--w);font-size:13px;font-weight:700;letter-spacing:.04em;border:none;font-family:inherit;cursor:pointer;transition:opacity .2s,transform .2s;margin-top:4px;}
  .gate-submit:hover{opacity:.82;transform:translateY(-1px);}
  .gate-error{display:none;margin-top:14px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--w);background:var(--k);padding:10px 16px;border-radius:3px;text-align:center;}
  .gate-error.show{display:block;}
  .gate-footer{margin-top:32px;font-size:11px;color:rgba(0,0,0,.3);letter-spacing:.1em;text-transform:uppercase;text-align:center;}
`

export function loginGateHtml(opts: {
  title: string
  sub: string
  userField: string
  passField: string
  action: string
  showError: boolean
}) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Zugang · Karl+Karla</title>
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#0000FE">
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/favicon.ico">
  <meta name="description" content="Vertrauliches Dokument · Zugang nur für Empfänger.">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Karl+Karla">
  <meta property="og:title" content="Karl+Karla · Vertraulicher Pitch">
  <meta property="og:description" content="Zugang nur für Empfänger.">
  <meta property="og:image" content="https://karlpluskarla.de/opengraph-image">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Karl+Karla · Vertraulicher Pitch">
  <meta name="twitter:description" content="Zugang nur für Empfänger.">
  <meta name="twitter:image" content="https://karlpluskarla.de/opengraph-image">
  <style>${GATE_CSS}</style>
</head>
<body>
  <div class="gate">
    <div class="gate-wordmark">KARL<span class="plus">+</span>KARLA</div>
    <div class="gate-badge">Vertraulich · Nur für Empfänger</div>
    <h1>${opts.title}</h1>
    <p class="gate-sub">${opts.sub}</p>
    <div class="gate-divider"></div>
    <form method="POST" action="${opts.action}">
      <div class="gate-field">
        <label for="user">Benutzername</label>
        <input type="text" id="user" name="${opts.userField}" placeholder="Dein Benutzername" autocomplete="username" required>
      </div>
      <div class="gate-field">
        <label for="pass">Passwort</label>
        <input type="password" id="pass" name="${opts.passField}" placeholder="••••••••" autocomplete="current-password" required>
      </div>
      <button type="submit" class="gate-submit">Pitch öffnen ↗</button>
      <div class="gate-error${opts.showError ? ' show' : ''}">Falscher Benutzername oder Passwort.</div>
    </form>
    <div class="gate-footer">Karl+Karla · Agentur · Vertrauliches Dokument</div>
  </div>
</body>
</html>`
}
