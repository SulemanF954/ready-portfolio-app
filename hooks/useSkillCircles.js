import { useEffect, useRef } from 'react';
import { skillsData } from '../utils/data';

export const useSkillCircles = () => {
  const containerRef = useRef(null);
  const instances = useRef([]);

  const drawCircle = (canvas, percent, color) => {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = 52; // slightly smaller to give more space for inner content
    const startAngle = -0.5 * Math.PI;
    const endAngle = startAngle + (2 * Math.PI * percent / 100);
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const animateSkill = (skillObj, targetPercent, duration = 1200) => {
    if (skillObj.animating) return;
    skillObj.animating = true;
    const startPercent = skillObj.currentPercent;
    const diff = targetPercent - startPercent;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      let progress = Math.min(1, elapsed / duration);
      const newPercent = Math.floor(startPercent + diff * progress);
      if (newPercent >= targetPercent) {
        drawCircle(skillObj.canvas, targetPercent, skillObj.color);
        skillObj.currentPercent = targetPercent;
        if (skillObj.percentSpan) skillObj.percentSpan.innerText = targetPercent + "%";
        skillObj.animating = false;
        return;
      }
      drawCircle(skillObj.canvas, newPercent, skillObj.color);
      if (skillObj.percentSpan) skillObj.percentSpan.innerText = newPercent + "%";
      skillObj.currentPercent = newPercent;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const buildSkills = () => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    instances.current = [];

    skillsData.forEach((skill, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'skill-item text-center w-[150px] relative';
      wrapper.setAttribute('data-skill-idx', idx);

      const canvasDiv = document.createElement('div');
      canvasDiv.className = 'circular-wrapper';
      // Ensure canvasDiv is relative and has fixed dimensions
      canvasDiv.style.position = 'relative';
      canvasDiv.style.width = '130px';
      canvasDiv.style.height = '130px';
      canvasDiv.style.margin = '0 auto';

      const canvas = document.createElement('canvas');
      canvas.width = 130;
      canvas.height = 130;
      canvas.style.display = 'block'; // remove extra spacing
      canvas.style.margin = '0 auto';
      drawCircle(canvas, 0, skill.color);

      const innerDiv = document.createElement('div');
      innerDiv.className = 'skill-inner';
      // Critical inline styles to guarantee centering
      innerDiv.style.position = 'absolute';
      innerDiv.style.top = '50%';
      innerDiv.style.left = '50%';
      innerDiv.style.transform = 'translate(-50%, -50%)';
      innerDiv.style.width = '100%';
      innerDiv.style.textAlign = 'center';
      innerDiv.style.pointerEvents = 'none';
      innerDiv.style.display = 'flex';
      innerDiv.style.flexDirection = 'column';
      innerDiv.style.alignItems = 'center';
      innerDiv.style.justifyContent = 'center';
      innerDiv.style.gap = '4px';

      const iconElem = document.createElement('i');
      iconElem.className = skill.icon;
      iconElem.style.color = skill.color;
      iconElem.style.fontSize = '2rem';
      iconElem.style.lineHeight = '1';

      const percentSpan = document.createElement('span');
      percentSpan.className = 'skill-percent';
      percentSpan.style.fontSize = '0.875rem';
      percentSpan.style.fontWeight = '800';
      percentSpan.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      percentSpan.style.color = 'white';
      percentSpan.style.padding = '2px 8px';
      percentSpan.style.borderRadius = '9999px';
      percentSpan.style.display = 'inline-block';
      percentSpan.innerText = '0%';

      innerDiv.appendChild(iconElem);
      innerDiv.appendChild(percentSpan);
      canvasDiv.appendChild(canvas);
      canvasDiv.appendChild(innerDiv);

      const nameSpan = document.createElement('div');
      nameSpan.className = 'skill-name mt-2 font-semibold text-sm';
      nameSpan.innerText = skill.name;

      wrapper.appendChild(canvasDiv);
      wrapper.appendChild(nameSpan);
      container.appendChild(wrapper);

      instances.current.push({
        canvas,
        targetPercent: skill.percent,
        currentPercent: 0,
        color: skill.color,
        animating: false,
        percentSpan,
        wrapper
      });
    });

    // Intersection Observer to start animations when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = entry.target.getAttribute('data-skill-idx');
          if (idx !== null) {
            const inst = instances.current[parseInt(idx)];
            if (inst && !inst.animating && inst.currentPercent < inst.targetPercent) {
              animateSkill(inst, inst.targetPercent, 1300);
            }
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));
  };

  useEffect(() => {
    buildSkills();
    const handleResize = () => {
      instances.current.forEach(inst => drawCircle(inst.canvas, inst.currentPercent, inst.color));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return containerRef;
};