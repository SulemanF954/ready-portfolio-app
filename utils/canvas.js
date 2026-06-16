/**
 * Draw a circular progress arc on a canvas element.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} percent   0–100
 * @param {string} color     stroke colour for the filled arc
 * @param {object} [opts]
 * @param {number} [opts.radius]    defaults to 52
 * @param {number} [opts.lineWidth] defaults to 8
 * @param {string} [opts.trackColor] defaults to "#e2e8f0"
 */
export function drawCircle(canvas, percent, color, opts = {}) {
  const { radius = 52, lineWidth = 8, trackColor = '#e2e8f0' } = opts;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const center = size / 2;
  const startAngle = -0.5 * Math.PI;
  const endAngle = startAngle + (2 * Math.PI * percent) / 100;

  ctx.clearRect(0, 0, size, size);

  // background track
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = trackColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // filled arc
  ctx.beginPath();
  ctx.arc(center, center, radius, startAngle, endAngle);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
}

/**
 * Animate a skill progress circle from `startPercent` to `targetPercent`.
 *
 * @param {object}  params
 * @param {HTMLCanvasElement} params.canvas
 * @param {HTMLElement|null}  params.label   element whose text is updated with "N%"
 * @param {number}  params.startPercent
 * @param {number}  params.targetPercent
 * @param {string}  params.color
 * @param {number}  [params.duration]  ms, defaults to 1200
 * @param {object}  [params.drawOpts]  forwarded to drawCircle
 */
export function animateProgress({
  canvas,
  label,
  startPercent = 0,
  targetPercent,
  color,
  duration = 1200,
  drawOpts = {},
}) {
  const diff = targetPercent - startPercent;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const current = Math.floor(startPercent + diff * progress);

    if (current >= targetPercent) {
      drawCircle(canvas, targetPercent, color, drawOpts);
      if (label) label.textContent = targetPercent + '%';
      return;
    }

    drawCircle(canvas, current, color, drawOpts);
    if (label) label.textContent = current + '%';
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
