import { MONO } from '../SectionHead'

// Scoped by the .tm prefix; plain CSS because the terminal needs nested descendant selectors and :focus-within.
export const css = `
.tm{--bg:#000;--panel:#0e0f12;--line:#1c1f25;--fg:#E3E6EB;--muted:#8B929E;--dim:#5D6470;--acc:#3CCF91;--mono:${MONO};color:var(--fg);margin:clamp(72px,12vh,120px) 0 clamp(40px,8vh,80px)}
.tm *{box-sizing:border-box}
.tm button{font:inherit;color:inherit;cursor:pointer}
.tm :focus-visible{outline:2px solid var(--acc);outline-offset:2px}
.tm-body{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:clamp(16px,3vw,32px);align-items:start}
.tm-rail{display:grid;gap:14px}
.tm-rail h1{margin:0;font-size:clamp(28px,4.4vw,40px);font-weight:800;letter-spacing:-.04em;line-height:1;color:#fff}
.tm-hook{margin:0;font-size:17px;line-height:1.45;color:#C9CBD0}
.tm-lede{margin:0;font-size:13.5px;line-height:1.6;color:var(--muted)}
.tm-links{display:grid;gap:2px;margin:4px 0 0;padding:0;list-style:none;font:13px var(--mono)}
.tm-links li{display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-top:1px solid var(--line)}
.tm-links span{color:var(--dim)}
.tm-links a{color:var(--fg);text-decoration:none;overflow-wrap:anywhere;text-align:right}
.tm-links a:hover{color:var(--acc)}
.tm-term{background:var(--panel);border:1px solid var(--line);border-radius:14px;overflow:hidden;min-width:0;box-shadow:0 30px 60px -30px rgba(0,0,0,.8);transition:border-color .15s ease,box-shadow .15s ease}
.tm-term:focus-within{border-color:var(--acc);box-shadow:0 0 0 3px rgba(60,207,145,.16),0 30px 60px -30px rgba(0,0,0,.8)}
.tm-bar{display:flex;align-items:center;gap:7px;padding:11px 14px;border-bottom:1px solid var(--line);font:12px var(--mono);color:var(--dim)}
.tm-bar i{width:10px;height:10px;border-radius:50%;background:#2A3039}
.tm-bar b{margin-left:8px;font-weight:500}
.tm-out{max-height:min(560px,70vh);min-height:300px;overflow-y:auto;padding:16px 18px 6px;font:13.5px/1.6 var(--mono);scroll-behavior:smooth}
.tm .ln{margin:0 0 4px;white-space:pre-wrap;overflow-wrap:anywhere}
.tm .cmd{color:var(--fg)}.tm .cmd::before{content:"eyakub@dhaka ~ % ";color:var(--acc)}
.tm .mut{color:var(--muted)}.tm .dim{color:var(--dim)}.tm .acc{color:var(--acc)}.tm .err{color:#FF8A80}
.tm .blk{margin:6px 0 14px;animation:tmin .18s ease-out}
@keyframes tmin{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.tm .blk{animation:none}.tm-out{scroll-behavior:auto}.tm-term{transition:none}}
.tm .rows{display:grid;gap:2px}
.tm .row{display:grid;grid-template-columns:12px minmax(0,150px) minmax(0,90px) minmax(0,1fr);gap:12px;align-items:baseline;padding:5px 6px;border-radius:6px;text-align:left;background:none;border:0;width:100%}
.tm .row:hover{background:#151A20}
.tm .row .t{color:var(--fg);font-weight:600}
.tm .row .k,.tm .row .s{color:var(--muted)}
.tm .row .s{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tm .dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--acc)}
.tm .dot.in-development{background:#F2B53A}.tm .dot.open-source{background:#8EA2FF}.tm .dot.archived{background:#7C818B}
.tm .card{display:grid;grid-template-columns:minmax(0,200px) minmax(0,1fr);gap:16px;padding:12px;border:1px solid var(--line);border-radius:10px;background:#0C0F12;margin:4px 0}
.tm .card img{width:100%;aspect-ratio:2/1;object-fit:cover;border-radius:6px;display:block}
.tm .card h4{margin:0 0 2px;font:700 15px Inter,sans-serif;color:#fff}
.tm .card p{margin:0 0 6px;font:13px/1.55 Inter,sans-serif;color:#B9BDC5}
.tm .card .m{font:12px var(--mono);color:var(--dim);margin-bottom:6px}
.tm .card .cols{display:grid;gap:6px;margin:6px 0}
.tm .card .cols b{display:block;font:600 10.5px var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--acc)}
.tm .chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}
.tm .chips span{font:11.5px var(--mono);color:#C4C8CF;border:1px solid #262C35;border-radius:999px;padding:1px 8px}
.tm .open{font:600 12.5px var(--mono);color:var(--acc);text-decoration:none;overflow-wrap:anywhere}
.tm .kv{display:grid;grid-template-columns:minmax(0,110px) minmax(0,1fr);gap:4px 14px}
.tm .kv dt{color:var(--acc)}.tm .kv dd{margin:0;color:#C9CDD3;overflow-wrap:anywhere}
.tm .heat{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,9px);gap:2px;margin:8px 0;width:max-content;max-width:100%;overflow:hidden}
.tm .heat i{width:9px;height:9px;border-radius:2px}
.tm-chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 18px;border-top:1px solid var(--line)}
.tm-chips button{font:12.5px var(--mono);background:#141920;border:1px solid #232A33;border-radius:7px;padding:5px 10px;min-height:32px;color:#C9CDD3}
.tm-chips button:hover{border-color:var(--acc);color:#fff}
.tm-in{display:flex;align-items:center;gap:8px;padding:12px 18px 14px;border-top:1px solid var(--line);font:13.5px var(--mono)}
.tm-in label{color:var(--acc);white-space:nowrap}
.tm .tm-in input:focus-visible{outline:none}
.tm-in input{flex:1;min-width:0;background:none;border:0;color:#fff;font:inherit;caret-color:var(--acc);outline:none;min-height:28px}
.tm-in kbd{font:11px var(--mono);color:var(--dim);border:1px solid var(--line);border-radius:5px;padding:1px 6px}
@media (max-width:760px){
  .tm-body{grid-template-columns:minmax(0,1fr)}
  .tm-links{grid-template-columns:1fr 1fr;column-gap:16px}
}
@media (max-width:520px){
  .tm .row{grid-template-columns:10px minmax(0,1fr) auto}
  .tm .row .s{grid-column:2/-1}
  .tm .card{grid-template-columns:minmax(0,1fr)}
  .tm-links{grid-template-columns:1fr}
  .tm-out{padding:14px 12px 6px;font-size:12.5px}
  .tm-chips,.tm-in{padding-left:12px;padding-right:12px}
  .tm-in kbd{display:none}
  .tm-in label{display:none}
}
`
