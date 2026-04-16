import { useEffect, useRef } from 'react'

const SkillsCanvas = () => {
  const skillsData = [
    { name: "HTML", percent: 90, icon: "fab fa-html5", color: "#E44D26" },
    { name: "CSS", percent: 85, icon: "fab fa-css3-alt", color: "#264DE4" },
    { name: "Tailwind CSS", percent: 85, icon: "fab fa-css3", color: "#06B6D4" },
    { name: "React.js", percent: 80, icon: "fab fa-react", color: "#61DAFB" },
    { name: "Next.js", percent: 75, icon: "fab fa-node-js", color: "#000000" },
    { name: "Git/GitHub", percent: 80, icon: "fab fa-git-alt", color: "#F05032" }
  ]

  const skillRefs = useRef([])
  const observerRef = useRef(null)

  const drawCircleOnCanvas = (canvas, percent, color) => {
    const ctx = canvas.getContext('2d')
    const size = canvas.width
    const center = size / 2
    const radius = 54
    const startAngle = -0.5 * Math.PI
    const endAngle = startAngle + (2 * Math.PI * percent / 100)
    ctx.clearRect(0, 0, size, size)
    ctx.beginPath()
    ctx.arc(center, center, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 10
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(center, center, radius, startAngle, endAngle)
    ctx.strokeStyle = color
    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.stroke()
  }

  const animateSkillProgress = (canvas, percentSpan, targetPercent, color, duration = 1200) => {
    let startPercent = 0
    const startTime = performance.now()
    function step(now) {
      const elapsed = now - startTime
      let progress = Math.min(1, elapsed / duration)
      const newPercent = Math.floor(startPercent + (targetPercent - startPercent) * progress)
      if (newPercent >= targetPercent) {
        drawCircleOnCanvas(canvas, targetPercent, color)
        percentSpan.textContent = targetPercent + "%"
        return
      }
      drawCircleOnCanvas(canvas, newPercent, color)
      percentSpan.textContent = newPercent + "%"
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

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
            animateSkillProgress(canvas, percentSpan, skill.percent, skill.color)
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