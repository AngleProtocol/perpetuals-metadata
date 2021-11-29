function generateSVG(
  perpetualID: number,
  stablecoinName: string,
  stablecoinAddress: string,
  collateralName: string,
  collateralAddress: string,
  date: string,
  entryRate: number,
  margin: number,
  leverage: number
): string {
  const colors = ["#ef7875", "#f7cea4", "#eb2955", "#24363c", "#90bc97"];

  function convertLetterToNumber(str: string): number {
    var out = 0,
      len = str.length;
    for (let pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
    }
    return out;
  }

  // Using a seed to have something random but deterministic for a given perpetual.
  let seed =
    perpetualID +
    convertLetterToNumber(stablecoinName) +
    convertLetterToNumber(collateralName);

  function random() {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function getRandomInt(max: number) {
    return Math.floor(random() * max);
  }

  const color1 = colors[getRandomInt(colors.length)];
  const color2 = colors[getRandomInt(colors.length)];
  const color3 = colors[getRandomInt(colors.length)];
  const color4 = colors[getRandomInt(colors.length)];

  const bg1 = Buffer.from(
    `<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'>
        <rect width='290px' height='500px' fill='${color1}' />
    </svg>`
  ).toString("base64");

  const bg2 = Buffer.from(
    `<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='${100 + getRandomInt(300)}' cy='${
      40 + getRandomInt(210)
    }' r='120px' fill='${color2}' />
    </svg>`
  ).toString("base64");

  const bg3 = Buffer.from(
    `<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='${100 + getRandomInt(300)}' cy='${
      40 + getRandomInt(210)
    }' r='120px' fill='${color3}' />
    </svg>`
  ).toString("base64");

  const bg4 = Buffer.from(
    `<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='${100 + getRandomInt(300)}' cy='${
      40 + getRandomInt(210)
    }' r='120px' fill='${color4}' />
    </svg>`
  ).toString("base64");

  const svg = `<svg width="290" height="500" viewBox="0 0 290 500" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink='http://www.w3.org/1999/xlink'>
    <defs>
        <filter id="f1">
            <feImage result="p0" href="data:image/svg+xml;base64,${bg1}" />
            <feImage result="p1" href="data:image/svg+xml;base64,${bg2}" />
            <feImage result="p2" href="data:image/svg+xml;base64,${bg3}" />
            <feImage result="p3" href="data:image/svg+xml;base64,${bg4}" />
            <feBlend mode="overlay" in="p0" in2="p1" />
            <feBlend mode="exclusion" in2="p2" />
            <feBlend mode="overlay" in2="p3" result="blendOut" />
            <feGaussianBlur in="blendOut" stdDeviation="42" />
        </filter>
        <clipPath id="corners">
            <rect width="290" height="500" rx="42" ry="42" />
        </clipPath>
        <path id="minimap" d="M234 444C234 457.949 242.21 463 253 463" />
        <filter id="top-region-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" />
        </filter>
        <linearGradient id="grad-up" x1="1" x2="0" y1="1" y2="0">
            <stop offset="0.0" stop-color="white" stop-opacity="1" />
            <stop offset=".9" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="grad-down" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0.0" stop-color="white" stop-opacity="1" />
            <stop offset="0.9" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="fade-up" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="url(#grad-up)" />
        </mask>
        <mask id="fade-down" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="url(#grad-down)" />
        </mask>
        <mask id="none" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="white" />
        </mask>
        <linearGradient id="grad-symbol">
            <stop offset="0.7" stop-color="white" stop-opacity="1" />
            <stop offset=".95" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="fade-symbol" maskContentUnits="userSpaceOnUse">
            <rect width="290px" height="200px" fill="url(#grad-symbol)" />
        </mask>
    </defs>
    <g clip-path="url(#corners)">
        <rect fill="c02aaa" x="0px" y="0px" width="290px" height="500px" />
        <rect style="filter: url(#f1)" x="0px" y="0px" width="290px" height="500px" />
        <g style="filter:url(#top-region-blur); transform:scale(1.5); transform-origin:center top;">
            <rect fill="none" x="0px" y="0px" width="290px" height="500px" />
            <ellipse cx="50%" cy="0px" rx="180px" ry="120px" fill="#000" opacity="0.85" />
        </g>
        <rect x="0" y="0" width="290" height="500" rx="42" ry="42" fill="rgba(0,0,0,0)"
            stroke="rgba(255,255,255,0.2)" />
    </g>
    
    <text text-rendering="optimizeSpeed">
        <path id="text-path-a"
            d="M40 12 H250 A28 28 0 0 1 278 40 V460 A28 28 0 0 1 250 488 H40 A28 28 0 0 1 12 460 V40 A28 28 0 0 1 40 12 z" />
        <textPath startOffset="-100%" fill="white" font-family="'Darker Grotesque', monospace" font-size="10px"
            xlink:href="#text-path-a">${stablecoinName} • ${stablecoinAddress}
            <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s"
                repeatCount="indefinite" />
        </textPath>
        <textPath startOffset="0%" fill="white" font-family="'Darker Grotesque', monospace" font-size="10px"
            xlink:href="#text-path-a">${stablecoinName} • ${stablecoinAddress}
            <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s"
                repeatCount="indefinite" />
        </textPath>
        <textPath startOffset="50%" fill="white" font-family="'Darker Grotesque', monospace" font-size="10px"
            xlink:href="#text-path-a">${collateralName} • ${collateralAddress}
            <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s"
                repeatCount="indefinite" />
        </textPath>
        <textPath startOffset="-50%" fill="white" font-family="'Darker Grotesque', monospace" font-size="10px"
            xlink:href="#text-path-a">${collateralName} • ${collateralAddress}
            <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s"
                repeatCount="indefinite" />
        </textPath>
    </text>

    <g mask="url(#fade-symbol)">
        <rect fill="none" x="0px" y="0px" width="290px" height="200px" /> 
        <text y="80px"
            x="32px" fill="white" font-family="'Darker Grotesque', monospace" font-weight="200" font-size="30px">#${perpetualID} ${collateralName}-${stablecoinName.slice(
    2
  )}</text>
    </g>

    <g transform="rotate(${getRandomInt(360)} 145 210)">
        <g transform="translate(5px, 0px)">
            <line x1="140" y1="150" x2="220" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="140;120;140;160;140" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="220;120;60;160;220" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="180" y1="270" x2="220" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="180;120;100;160;180" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="220;120;60;160;220" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="180" y1="270" x2="140" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="180;120;100;160;180" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="140;120;140;160;140" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="270" x2="140" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="100;120;180;160;100" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="140;120;140;160;140" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="270" x2="60" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="100;120;180;160;100" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="60;120;220;160;60" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="140" y1="150" x2="60" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="140;120;140;160;140" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="60;120;220;160;60" dur="10s" repeatCount="indefinite" />
            </line>


            <line x1="140" y1="150" x2="220" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="140;160;140;120;140" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="220;160;60;120;220" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="180" y1="270" x2="220" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="180;160;100;120;180" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="220;160;60;120;220" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="180" y1="270" x2="140" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="180;160;100;120;180" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="140;160;140;120;140" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="270" x2="140" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="100;160;180;120;100" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="140;160;140;120;140" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="270" x2="60" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="100;160;180;120;100" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="60;160;220;120;60" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="140" y1="150" x2="60" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="140;160;140;120;140" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="60;160;220;120;60" dur="10s" repeatCount="indefinite" />
            </line>


            <line x1="140" y1="150" x2="140" y2="150" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="140;160;140;120;140" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="140;120;140;160;140" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="220" y1="230" x2="220" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="220;160;60;120;220" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="220;120;60;160;220" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="180" y1="270" x2="180" y2="270" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="180;160;100;120;180" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="180;120;100;160;180" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="140" y1="230" x2="140" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="140;160;140;120;140" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="140;120;140;160;140" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="270" x2="100" y2="270" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="100;160;180;120;100" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="100;120;180;160;100" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="60" y1="230" x2="60" y2="230" stroke="#FAF1E7" stroke-width="2">
                <animate attributeName="x1" values="60;160;220;120;60" dur="10s" repeatCount="indefinite" />
                <animate attributeName="x2" values="60;120;220;160;60" dur="10s" repeatCount="indefinite" />
            </line>
        </g>
    </g>

    <rect x="16" y="16" width="258" height="468" rx="26" ry="26" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.5)" />
    <g style="transform:translate(29px, 324px)">
        <rect width="232px" height="26px" rx="8px" ry="8px" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.5)"/><text x="12px" y="17px"
            font-family="'Darker Grotesque', monospace" font-size="12px" fill="white">
            <tspan fill="rgba(255,255,255,0.9)">CREATION: </tspan>${date}
        </text>
    </g>
    <g style="transform:translate(29px, 354px)">
        <rect width="232px" height="26px" rx="8px" ry="8px" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.5)"/><text x="12px" y="17px"
            font-family="'Darker Grotesque', monospace" font-size="12px" fill="white">
            <tspan fill="rgba(255,255,255,0.9)">ENTRY RATE: </tspan>${collateralName}/${stablecoinName.slice(
    2
  )} ${entryRate}
        </text>
    </g>
    <g style="transform:translate(29px, 384px)">
        <rect width="232px" height="26px" rx="8px" ry="8px" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.5)"/><text x="12px" y="17px"
            font-family="'Darker Grotesque', monospace" font-size="12px" fill="white">
            <tspan fill="rgba(255,255,255,0.9)">INITIAL MARGIN: </tspan>${margin} ${collateralName}
        </text>
    </g>
    <g style="transform:translate(29px, 414px)">
        <rect width="232px" height="26px" rx="8px" ry="8px" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.5)"/><text x="12px" y="17px"
            font-family="'Darker Grotesque', monospace" font-size="12px" fill="white">
            <tspan fill="rgba(255,255,255,0.9)">INITIAL LEVERAGE: </tspan>${leverage}
        </text>
    </g>
  </svg>`;

  return svg;
}

export default generateSVG;
