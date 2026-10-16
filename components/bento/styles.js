import { MONO } from '../SectionHead'

// Scoped by .mBX / bx-*; every colour is a token on .mBX. Light is the default, dark follows the OS until the toggle sets data-theme.
const DARK = `
  --bx-paper:#0B101B;--bx-surface:#131A28;--bx-sunk:#1A2235;--bx-ink:#EDF1F8;--bx-ink2:#B3BDCF;--bx-ink3:#8B96AB;--bx-rule:#232D44;
  --bx-accent:#86ADFF;--bx-accent-fg:#0B101B;--bx-band:#17264A;--bx-bandfg:#EDF1F8;--bx-bandmuted:#AFC0DE;--bx-bandrule:#34497A;
  --bx-orange:#FFA453;--bx-green:#48D39C;--bx-teal:#45C8D2;--bx-purple:#B998F6;--bx-red:#FF8A80;
  --bx-h0:#1A2235;--bx-h1:#1D3765;--bx-h2:#2A56A5;--bx-h3:#4A84E8;--bx-h4:#A3C4FF;
  --bx-star-bg:#3B2F12;--bx-star-fg:#FFD982;--bx-thumb-rule:rgba(255,255,255,.06);
  --bx-shadow:0 1px 0 rgba(255,255,255,.03) inset,0 16px 32px -22px rgba(0,0,0,.8);
  color-scheme:dark;`
const swap = (root) => `${root} .bx-theme .sun{display:none}${root} .bx-theme .moon{display:block}`

export const css = `
.bx-wrap{container-type:inline-size;flex:1;width:100%}
.mBX{
  --bx-paper:#F2F4F8;--bx-surface:#FFFFFF;--bx-sunk:#E8ECF3;--bx-ink:#131B2C;--bx-ink2:#435069;--bx-ink3:#5C677F;--bx-rule:#D6DCE6;
  --bx-accent:#1A5FC4;--bx-accent-fg:#FFFFFF;--bx-band:#131B2C;--bx-bandfg:#F2F4F8;--bx-bandmuted:#B9C3D6;--bx-bandrule:#35425E;
  --bx-orange:#B85F00;--bx-green:#0B7A4B;--bx-teal:#0E7C86;--bx-purple:#7347B5;--bx-red:#C4302F;
  --bx-h0:#E3E8F0;--bx-h1:#C7D7F1;--bx-h2:#8AB0E8;--bx-h3:#4482D9;--bx-h4:#1A5FC4;
  --bx-star-bg:#FFF1CC;--bx-star-fg:#6B4A00;--bx-thumb-rule:rgba(19,27,44,.08);
  --bx-shadow:0 1px 2px rgba(19,27,44,.05),0 12px 28px -20px rgba(19,27,44,.28);
  color-scheme:light;background:var(--bx-paper);color:var(--bx-ink);
  min-height:100vh;font-size:16px;line-height:1.5;
  transition:background-color .25s ease,color .25s ease
}
.mBX[data-theme="dark"]{${DARK}}
${swap('.mBX[data-theme="dark"]')}
@media (prefers-color-scheme:dark){
  .mBX:not([data-theme]){${DARK}}
  ${swap('.mBX:not([data-theme])')}
}
.mBX *{box-sizing:border-box}
.mBX a{color:var(--bx-accent)}
.mBX :is(a,button):focus-visible{outline:2px solid var(--bx-accent);outline-offset:2px;border-radius:8px}
.mBX :is(.bx-t,.bx-btn,.bx-theme,.bx-heat i,.bx-track,.bx-track i){transition:background-color .25s ease,border-color .25s ease,color .25s ease}

.bx-nav{display:flex;align-items:center;gap:8px 18px;padding:16px clamp(14px,3cqi,32px);max-width:1280px;margin:0 auto}
.bx-nav .bx-brand{text-decoration:none;font-weight:700;font-stretch:87.5%;font-size:19px;color:var(--bx-ink);letter-spacing:-.005em}
.bx-nav nav{display:flex;gap:2px;margin-left:auto}
.bx-nav nav a{color:var(--bx-ink2);text-decoration:none;font-weight:600;padding:8px 10px;border-radius:999px}
.bx-nav nav a:hover{color:var(--bx-ink);background:var(--bx-sunk)}
.bx-theme{flex:none;width:40px;height:40px;border-radius:50%;border:1px solid var(--bx-rule);background:var(--bx-surface);color:var(--bx-ink);display:grid;place-items:center;cursor:pointer}
.bx-theme:hover{border-color:var(--bx-ink3)}
.bx-theme .moon{display:none}
.mBX[data-theme="dark"] .bx-theme .sun{display:none}
.mBX[data-theme="dark"] .bx-theme .moon{display:block}

.bx-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:14px;padding:0 clamp(12px,3cqi,32px) clamp(16px,3cqi,32px);max-width:1280px;margin:0 auto}
.bx-t{grid-column:span 4;min-width:0;background:var(--bx-surface);border:1px solid var(--bx-rule);border-radius:20px;padding:clamp(16px,2cqi,24px);display:grid;gap:12px;align-content:start;box-shadow:var(--bx-shadow)}
.bx-label{margin:0;font:500 11.5px ${MONO};letter-spacing:.12em;text-transform:uppercase;color:var(--bx-ink3)}
.bx-t h3,.bx-t h2{margin:0;font-weight:700;font-stretch:87.5%;line-height:1.12;letter-spacing:-.005em;color:var(--bx-ink)}
.bx-t h3{font-size:22px}
.bx-t p{margin:0;color:var(--bx-ink2)}
.bx-link{display:inline-flex;align-items:center;gap:6px;font-weight:600;text-decoration:none}
.bx-link:hover{text-decoration:underline}

/* hero */
.bx-hero{grid-column:span 7;align-content:space-between;gap:28px;padding:clamp(22px,3.2cqi,40px)}
.bx-hero h1{margin:8px 0 0;font-size:clamp(54px,8.6cqi,116px);font-weight:800;font-stretch:75%;line-height:.86;letter-spacing:-.012em;color:var(--bx-ink)}
.bx-line{font-size:clamp(21px,2.3cqi,29px) !important;line-height:1.28 !important;color:var(--bx-ink) !important;max-width:27ch;font-weight:500;letter-spacing:-.01em;text-wrap:balance}
.bx-line u{text-decoration:none;background:linear-gradient(transparent 62%,color-mix(in srgb,var(--k) 28%,transparent) 62%);padding:0 .06em;border-radius:2px}
.bx-lede{max-width:56ch;font-size:15.5px}
.bx-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.bx-btn{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 18px;border-radius:999px;background:var(--bx-ink);color:var(--bx-paper) !important;font-weight:600;font-size:16px;text-decoration:none;border:1px solid var(--bx-ink)}
.bx-btn--ghost{background:transparent;color:var(--bx-ink) !important;border-color:var(--bx-rule)}
.bx-btn--ghost:hover{border-color:var(--bx-ink3)}

/* receipts */
.bx-receipts{grid-column:span 8}
.bx-big{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px}
.bx-big b{font-size:56px;font-weight:800;font-stretch:75%;line-height:.9;font-variant-numeric:tabular-nums;color:var(--bx-ink)}
.bx-big span{color:var(--bx-ink2);max-width:38ch}
.bx-big em{font-style:normal;color:var(--bx-ink);font-weight:600}
.bx-months,.bx-heat{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:3px}
.bx-months{height:14px;font:10.5px/14px ${MONO};color:var(--bx-ink3)}
.bx-months span{min-width:0;white-space:nowrap;overflow:visible}
.bx-heat{grid-template-rows:repeat(7,auto)}
.bx-heat i{aspect-ratio:1;border-radius:2px;background:var(--bx-h0)}
.mBX .l1{background:var(--bx-h1) !important}.mBX .l2{background:var(--bx-h2) !important}.mBX .l3{background:var(--bx-h3) !important}.mBX .l4{background:var(--bx-h4) !important}
.bx-foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;font:11.5px ${MONO};color:var(--bx-ink3)}
.bx-legend{display:inline-flex;align-items:center;gap:4px}
.bx-legend i{width:10px;height:10px;border-radius:2px;background:var(--bx-h0)}

/* rallo */
.bx-rallo{grid-column:span 4}
.bx-panda{display:flex;gap:14px;align-items:center}
.bx-panda img{width:64px;height:64px;flex:none;object-fit:contain}
.bx-stars{font:600 13.5px ${MONO};color:var(--bx-star-fg);background:var(--bx-star-bg);border-radius:999px;padding:3px 10px;white-space:nowrap}
.bx-tags{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none}
.bx-tags li{font-size:13.5px;font-weight:600;color:var(--bx-ink2);border:1px solid var(--bx-rule);border-radius:999px;padding:2px 10px}

/* how I build */
.bx-build{grid-column:span 5}
.bx-steps{list-style:none;margin:0;padding:0;display:grid;gap:0}
.bx-steps li{display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;padding-block:10px;border-top:1px solid var(--bx-rule)}
.bx-steps li:first-child{border-top:0;padding-top:2px}
.bx-n{font:600 12px/22px ${MONO};color:var(--bx-accent)}
.bx-steps b{display:block;font-weight:700;font-stretch:87.5%;font-size:16.5px;line-height:1.2;color:var(--bx-ink)}
.bx-steps span{font-size:14.5px;line-height:1.38;color:var(--bx-ink2)}

/* case */
.bx-case{grid-column:span 12}
.bx-case .bx-tags{align-self:end}
.bx-cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px 20px}
.bx-cols h4{margin:0 0 4px;font:500 11px ${MONO};letter-spacing:.1em;text-transform:uppercase;color:var(--bx-accent)}
.bx-cols p{font-size:14.5px;line-height:1.42}
.bx-case .bx-tags{margin-top:2px}

/* experience to scale */
.bx-exp{grid-column:span 12}
.bx-gantt{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.bx-gantt li,.bx-axisrow{display:grid;grid-template-columns:minmax(0,15rem) minmax(0,1fr);gap:16px;align-items:center}
.bx-role b{display:block;font-weight:700;font-stretch:87.5%;font-size:16px;line-height:1.15;color:var(--bx-ink)}
.bx-role span{font-size:13.5px;color:var(--bx-ink3)}
.bx-track{position:relative;height:22px;border-radius:6px;background:var(--bx-sunk);background-image:linear-gradient(90deg,var(--bx-rule) 1px,transparent 1px);background-size:12.5% 100%}
.bx-track i{position:absolute;top:4px;bottom:4px;min-width:6px;border-radius:4px;background:var(--k)}
.bx-track i.open{background:linear-gradient(90deg,var(--k) 70%,color-mix(in srgb,var(--k) 25%,transparent))}
.bx-axis{position:relative;height:16px;font:11px ${MONO};color:var(--bx-ink3)}
.bx-axis span{position:absolute;top:0}

/* contact band */
.bx-contact{grid-column:span 12;background:var(--bx-band);border-color:var(--bx-band);color:var(--bx-bandfg);grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:16px 28px;padding:clamp(22px,3cqi,34px)}
.bx-contact h2{font-size:clamp(30px,4cqi,48px);font-stretch:75%;font-weight:800;line-height:.98;max-width:18ch;color:var(--bx-bandfg)}
.bx-contact p{color:var(--bx-bandmuted);margin-top:8px}
.bx-contact .bx-row{justify-content:flex-end}
.bx-contact .bx-mail{font:500 15px ${MONO};color:var(--bx-band);background:var(--bx-bandfg);border-radius:999px;padding:11px 18px;text-decoration:none;overflow-wrap:anywhere}
.bx-contact .bx-mail:hover{background:var(--bx-accent);color:var(--bx-accent-fg)}
.bx-contact .bx-btn--ghost{color:var(--bx-bandfg) !important;border-color:var(--bx-bandrule)}
.bx-contact .bx-btn--ghost:hover{border-color:var(--bx-bandmuted)}

/* R3 big words */
.bx-words{grid-column:span 5;position:relative;align-content:center;gap:4px;overflow:hidden}
.bx-words ul{list-style:none;margin:0;padding:0;display:grid}
.bx-words li+li{border-top:1px solid var(--bx-rule)}
.bx-words a{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:4px 12px;padding:12px 4px;text-decoration:none;color:var(--bx-ink)}
.bx-words .w{font-size:clamp(38px,5.4cqi,68px);font-weight:800;font-stretch:75%;line-height:.92;letter-spacing:-.01em;transition:color .2s ease,transform .25s ease}
.bx-words .p{font:500 12.5px ${MONO};color:var(--bx-ink3);text-align:right;white-space:nowrap}
.bx-words a:hover .w,.bx-words a:focus-visible .w{color:var(--k);transform:translateX(6px)}
.bx-words .inl{display:none}
.bx-float{position:absolute;left:0;top:0;width:min(62%,300px);aspect-ratio:2/1;object-fit:cover;border-radius:12px;pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.9) rotate(-3deg);transition:opacity .2s ease,transform .25s ease;box-shadow:0 24px 50px -20px rgba(0,0,0,.45);z-index:2}
.bx-float.on{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(-3deg)}
@media (hover:none){.bx-float{display:none}.bx-words .inl{display:block;grid-column:1/-1;width:100%;aspect-ratio:2/1;object-fit:cover;border-radius:10px;margin-top:6px}}

/* fit */
.bx-fit{grid-column:span 7}
.bx-presets{display:flex;flex-wrap:wrap;gap:6px}
.bx-presets button{min-height:38px;padding:0 13px;border-radius:999px;border:1px solid var(--bx-rule);background:transparent;color:var(--bx-ink2);font:600 14.5px inherit;font-family:inherit;cursor:pointer}
.bx-presets button[aria-pressed="true"]{background:var(--bx-ink);border-color:var(--bx-ink);color:var(--bx-paper)}
.bx-score{font-size:17px;font-weight:700;font-stretch:87.5%;color:var(--bx-ink) !important}
.bx-fitrows{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 22px}
.bx-fitrows li{display:grid;grid-template-columns:minmax(0,1fr) 84px;gap:3px 10px;align-items:center}
.bx-fitrows b{font-size:15.5px;font-weight:700;font-stretch:87.5%;line-height:1.2;color:var(--bx-ink)}
.bx-fitrows small{grid-column:1/-1;font-size:13.5px;line-height:1.35;color:var(--bx-ink3)}
.bx-meter{display:grid;gap:3px;justify-items:end}
.bx-meter span{font:500 10.5px ${MONO};text-transform:uppercase;letter-spacing:.06em;color:var(--bx-ink3)}
.bx-meter i{display:block;width:84px;height:6px;border-radius:3px;background:var(--bx-sunk);position:relative;overflow:hidden}
.bx-meter i::after{content:"";position:absolute;inset:0 auto 0 0;width:var(--w);background:var(--mc);border-radius:3px;transition:width .4s ease}

@container (max-width:980px){
  .bx-hero,.bx-words,.bx-receipts,.bx-case,.bx-exp,.bx-contact,.bx-fit{grid-column:span 12}
  .bx-rallo,.bx-build{grid-column:span 6}
  .bx-contact{grid-template-columns:1fr}
  .bx-contact .bx-row{justify-content:flex-start}
}
@container (max-width:620px){
  .bx-grid>*{grid-column:span 12 !important}
  .bx-nav nav{display:none}
  .bx-theme{margin-left:auto}
  .bx-fitrows{grid-template-columns:1fr}
  .bx-months .old,.bx-heat .old{display:none}
  .bx-cols{grid-template-columns:1fr}
  .bx-gantt li,.bx-axisrow{grid-template-columns:1fr;gap:4px}
  .bx-axisrow>span{display:none}
  .bx-big b{font-size:46px}
}
@media (prefers-reduced-motion:reduce){.mBX,.mBX *{transition:none !important}.bx-words a:hover .w,.bx-words a:focus-visible .w{transform:none}}
`
