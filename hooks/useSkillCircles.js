import { useEffect, useRef } from 'react';
import { skillsData } from '../utils/data';
import { drawCircle, animateProgress } from '../utils/canvas';

export const useSkillCircles = () => {
  const containerRef = useRef(null);
  const instances = useRef([]);

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
      drawCircle(canvas, 0, skill.color, {});

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
              inst.animating = true;
              animateProgress({
                canvas: inst.canvas,
                label: inst.percentSpan,
                startPercent: inst.currentPercent,
                targetPercent: inst.targetPercent,
                color: inst.color,
                duration: 1300,
              });
              inst.currentPercent = inst.targetPercent;
              inst.animating = false;
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
      instances.current.forEach(inst => drawCircle(inst.canvas, inst.currentPercent, inst.color, {}));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return containerRef;
};