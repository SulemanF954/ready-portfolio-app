import { useEffect, useRef } from 'react'
import { skillsData } from '../utils/data'
import { drawCircle, animateProgress } from '../utils/canvas'

const CANVAS_DRAW_OPTS = { radius: 54, lineWidth: 10 };

const SkillsCanvas = () => {
  const skillRefs = useRef([])
  const observerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.skillIndex
          const skill = skillsData[index]
          const canvas = entry.target.querySelector('canvas')
          const percentSpan = entry.target.querySelector('.skill-percent')
          if (canvas && percentSpan && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true'
            animateProgress({
              canvas,
              label: percentSpan,
              startPercent: 0,
              targetPercent: skill.percent,
              color: skill.color,
              drawOpts: CANVAS_DRAW_OPTS,
            })
          }
        }
      })
    }, { threshold: 0.5 })

    observerRef.current = observer

    skillRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.skillIndex = index
        observer.observe(ref)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {skillsData.map((skill, index) => (
        <div
          key={skill.name}
          ref={el => skillRefs.current[index] = el}
          className="text-center w-40 relative"
        >
          <div className="relative w-32 h-32 mx-auto">
            <canvas width="130" height="130" className="block"></canvas>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <i className={`${skill.icon} text-3xl`} style={{ color: skill.color, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}></i>
              <span className="skill-percent text-sm font-bold mt-1 bg-black/60 text-white px-2 py-1 rounded-full">0%</span>
            </div>
          </div>
          <div className="mt-3 font-semibold text-base">{skill.name}</div>
        </div>
      ))}
    </div>
  )
}

export default SkillsCanvas
