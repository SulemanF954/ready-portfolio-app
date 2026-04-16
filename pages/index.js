import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import { jsPDF } from 'jspdf'

export default function Home() {
  const [menuActive, setMenuActive] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [cvLoading, setCvLoading] = useState(false)
  const skillsContainerRef = useRef(null)
  const skillInstances = useRef([])

  // Dark mode initialization and toggle
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedMode === 'true' || (savedMode === null && prefersDark)
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Count-up animation
  useEffect(() => {
    const animateNumber = (element, target, suffix = '+') => {
      let start = 0
      const duration = 1500
      const step = Math.ceil(target / (duration / 20))
      let current = 0
      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          element.innerText = target + suffix
          clearInterval(timer)
        } else {
          element.innerText = current + suffix
        }
      }, 20)
    }

    const expElement = document.getElementById('expCount')
    const projectElement = document.getElementById('projectCount')
    const clientElement = document.getElementById('clientCount')
    const statsSection = document.getElementById('statsContainer')
    let statsAnimated = false

    const startStatsAnimation = () => {
      if (statsAnimated) return
      if (expElement) animateNumber(expElement, 2, '+')
      if (projectElement) animateNumber(projectElement, 20, '+')
      if (clientElement) animateNumber(clientElement, 15, '+')
      statsAnimated = true
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startStatsAnimation()
          statsObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.4 })

    if (statsSection) statsObserver.observe(statsSection)

    // Scroll reveal observer
    const revealElements = document.querySelectorAll('.scroll-reveal, .stagger-reveal')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('stagger-reveal')) {
            entry.target.classList.add('visible')
            const children = entry.target.children
            for (let i = 0; i < children.length; i++) {
              const child = children[i]
              const delay = i * 80
              setTimeout(() => {
                child.style.opacity = '1'
                child.style.transform = 'translateX(0)'
              }, delay)
            }
          } else {
            entry.target.classList.add('visible')
          }
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2, rootMargin: "0px 0px -20px 0px" })

    revealElements.forEach(el => revealObserver.observe(el))

    // Contact form handler
    const contactForm = document.getElementById('contactForm')
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = document.getElementById('contactName').value
        if (name.trim()) alert(`Thanks ${name}! I'll get back to you soon.`)
        else alert("Please enter your name.")
        e.target.reset()
      })
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href')
        if (targetId === "#") return
        const target = document.querySelector(targetId)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth' })
          setMenuActive(false)
        }
      })
    })

    const hireMeBtn = document.getElementById('hireMeBtn')
    if (hireMeBtn) {
      hireMeBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
      })
    }

    document.querySelectorAll('.hire-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
      })
    })

    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 120
      setShowScrollTop(isAtBottom)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Circular skills drawing
  const skillsData = [
    { name: "HTML", percent: 90, icon: "fab fa-html5", color: "#E44D26" },
    { name: "CSS", percent: 85, icon: "fab fa-css3-alt", color: "#264DE4" },
    { name: "Tailwind CSS", percent: 85, icon: "fab fa-css3", color: "#06B6D4" },
    { name: "React.js", percent: 80, icon: "fab fa-react", color: "#61DAFB" },
    { name: "Next.js", percent: 75, icon: "fab fa-node-js", color: "#000000" },
    { name: "Git/GitHub", percent: 80, icon: "fab fa-git-alt", color: "#F05032" }
  ]

  const drawCircle = (canvas, percent, color) => {
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

  const animateSkill = (skillObj, targetPercent, duration = 1200) => {
    if (skillObj.animating) return
    skillObj.animating = true
    const startPercent = skillObj.currentPercent
    const diff = targetPercent - startPercent
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      let progress = Math.min(1, elapsed / duration)
      const newPercent = Math.floor(startPercent + diff * progress)
      if (newPercent >= targetPercent) {
        drawCircle(skillObj.canvas, targetPercent, skillObj.color)
        skillObj.currentPercent = targetPercent
        if (skillObj.percentSpan) skillObj.percentSpan.innerText = targetPercent + "%"
        skillObj.animating = false
        return
      }
      drawCircle(skillObj.canvas, newPercent, skillObj.color)
      if (skillObj.percentSpan) skillObj.percentSpan.innerText = newPercent + "%"
      skillObj.currentPercent = newPercent
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const buildSkills = () => {
    const container = skillsContainerRef.current
    if (!container) return
    container.innerHTML = ''
    skillInstances.current = []
    skillsData.forEach((skill, idx) => {
      const wrapper = document.createElement('div')
      wrapper.className = 'skill-item text-center w-[150px] relative'
      wrapper.setAttribute('data-skill-idx', idx)
      const canvasDiv = document.createElement('div')
      canvasDiv.className = 'circular-wrapper relative w-[130px] h-[130px] mx-auto'
      const canvas = document.createElement('canvas')
      canvas.width = 130
      canvas.height = 130
      drawCircle(canvas, 0, skill.color)
      const innerDiv = document.createElement('div')
      innerDiv.className = 'skill-inner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none flex flex-col items-center justify-center'
      const iconElem = document.createElement('i')
      iconElem.className = skill.icon
      iconElem.style.color = skill.color
      iconElem.style.fontSize = '2rem'
      const percentSpan = document.createElement('span')
      percentSpan.className = 'skill-percent text-sm font-extrabold mt-1 bg-black/60 text-white px-2 py-0.5 rounded-full inline-block'
      percentSpan.innerText = '0%'
      innerDiv.appendChild(iconElem)
      innerDiv.appendChild(percentSpan)
      canvasDiv.appendChild(canvas)
      canvasDiv.appendChild(innerDiv)
      const nameSpan = document.createElement('div')
      nameSpan.className = 'skill-name mt-2 font-semibold text-sm'
      nameSpan.innerText = skill.name
      wrapper.appendChild(canvasDiv)
      wrapper.appendChild(nameSpan)
      container.appendChild(wrapper)
      skillInstances.current.push({
        canvas,
        targetPercent: skill.percent,
        currentPercent: 0,
        color: skill.color,
        animating: false,
        percentSpan,
        wrapper
      })
    })
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = entry.target.getAttribute('data-skill-idx')
          if (idx !== null) {
            const inst = skillInstances.current[parseInt(idx)]
            if (inst && !inst.animating && inst.currentPercent < inst.targetPercent) {
              animateSkill(inst, inst.targetPercent, 1300)
            }
          }
        }
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.skill-item').forEach(el => obs.observe(el))
  }

  useEffect(() => {
    buildSkills()
    const handleResize = () => {
      skillInstances.current.forEach(inst => drawCircle(inst.canvas, inst.currentPercent, inst.color))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

 // Generate Professional CV PDF with Your Profile Picture
  const generateCV = async () => {
    try {
      setCvLoading(true)

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Professional color scheme
      const beigeBackground = [250, 245, 235]
      const darkBrown = [139, 115, 85]
      const brownText = [102, 77, 45]
      const sectionBg = [155, 130, 105]
      const textColor = [70, 70, 70]
      const white = [255, 255, 255]

      // Page background
      doc.setFillColor(...beigeBackground)
      doc.rect(0, 0, 210, 297, 'F')

      // Top decorative section
      doc.setFillColor(220, 195, 155)
      doc.rect(0, 0, 210, 85, 'F')

      // Profile Image
      try {
        const imgUrl = darkMode ? '/profile-dark.png' : '/profile-light.png'
        doc.addImage(imgUrl, 'PNG', 25, 12, 55, 60)
      } catch (imgError) {
        console.log('Profile image could not be loaded')
      }

      // Name
      doc.setFontSize(34)
      doc.setTextColor(...brownText)
      doc.setFont(undefined, 'bold')
      doc.text('SULEMAN', 90, 30)
      doc.text('FAROOQ', 90, 48)

      // Professional title box
      doc.setFillColor(...sectionBg)
      doc.roundedRect(90, 55, 95, 12, 2, 2, 'F')

      doc.setFontSize(11)
      doc.setTextColor(...white)
      doc.setFont(undefined, 'normal')
      doc.text('Frontend Web Developer | Student', 95, 63)

      // Divider line
      doc.setDrawColor(...darkBrown)
      doc.setLineWidth(0.8)
      doc.line(20, 95, 190, 95)

      let yPosLeft = 105
      let yPosRight = 105

      // Bio Section
      doc.setFontSize(9)
      doc.setTextColor(...textColor)
      doc.setFont(undefined, 'normal')
      const bioText = 'Second-year student and aspiring Frontend Web Developer with strong skills in modern web technologies. Passionate about building responsive, user-friendly applications using React and Next.js. Eager to gain hands-on experience in a professional development environment.'
      const bioLines = doc.splitTextToSize(bioText, 170)
      doc.text(bioLines, 20, yPosLeft)
      yPosLeft += (bioLines.length * 5) + 8
      yPosRight = yPosLeft

      // LEFT COLUMN - CONTACT Section
      doc.setFillColor(...sectionBg)
      doc.roundedRect(20, yPosLeft, 80, 8, 1.5, 1.5, 'F')
      doc.setTextColor(...white)
      doc.setFont(undefined, 'bold')
      doc.text('CONTACT', 25, yPosLeft + 5.5)

      yPosLeft += 12
      doc.setFontSize(8.5)
      doc.setTextColor(...brownText)
      doc.text('+92307-6315295', 25, yPosLeft)
      yPosLeft += 6
      doc.text('Multan, Pakistan', 25, yPosLeft)
      yPosLeft += 6
      doc.text('sulemanfarooq954@gmail.com', 25, yPosLeft)

      // EDUCATION Section
      yPosLeft += 12
      doc.setFillColor(...sectionBg)
      doc.roundedRect(20, yPosLeft, 80, 8, 1.5, 1.5, 'F')
      doc.setTextColor(...white)
      doc.setFont(undefined, 'bold')
      doc.text('EDUCATION', 25, yPosLeft + 5.5)

      yPosLeft += 12
      doc.setTextColor(...brownText)
      doc.setFont(undefined, 'bold')
      doc.text('Nishat College', 25, yPosLeft)
      yPosLeft += 5
      doc.setFont(undefined, 'normal')
      doc.setTextColor(...textColor)
      doc.text('Second Year Student', 25, yPosLeft)
      yPosLeft += 4
      doc.text("Bachelor's Degree (In Progress)", 25, yPosLeft)

      // SKILLS Section
      yPosLeft += 12
      doc.setFillColor(...sectionBg)
      doc.roundedRect(20, yPosLeft, 80, 8, 1.5, 1.5, 'F')
      doc.setTextColor(...white)
      doc.setFont(undefined, 'bold')
      doc.text('SKILLS', 25, yPosLeft + 5.5)

      yPosLeft += 12
      const categories = [
        { t: 'Frontend:', i: 'HTML, CSS, Tailwind CSS, Bootstrap' },
        { t: 'Languages:', i: 'JavaScript, TypeScript' },
        { t: 'Frameworks:', i: 'React.js, Next.js' },
        { t: 'Tools:', i: 'Git, GitHub, VS Code' }
      ]

      categories.forEach(cat => {
        doc.setFont(undefined, 'bold')
        doc.setTextColor(...brownText)
        doc.text(cat.t, 25, yPosLeft)
        doc.setFont(undefined, 'normal')
        doc.setTextColor(...textColor)
        doc.text('• ' + cat.i, 38, yPosLeft)
        yPosLeft += 6
      })

      // RIGHT COLUMN - EXPERIENCES Section
      doc.setFillColor(...sectionBg)
      doc.roundedRect(110, yPosRight, 85, 8, 1.5, 1.5, 'F')
      doc.setTextColor(...white)
      doc.setFont(undefined, 'bold')
      doc.text('EXPERIENCES', 115, yPosRight + 5.5)

      yPosRight += 12
      doc.setTextColor(...brownText)
      doc.setFont(undefined, 'bold')
      doc.text('Web Developer & Designer', 115, yPosRight)
      yPosRight += 5
      doc.setFont(undefined, 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(...textColor)
      doc.text('Autofixia | Aug 2024 - Present (1.5 years)', 115, yPosRight)

      yPosRight += 7
      const exps = [
        'Designed and developed responsive websites using HTML, CSS, Tailwind, JS, TS',
        'Built interactive web applications using React.js and Next.js',
        'Collaborated with design team for UI/UX interfaces',
        'Implemented cross-browser compatibility and mobile optimization',
        'Maintained version control using Git/GitHub',
        'Focused on clean code and performance optimization'
      ]

      exps.forEach(exp => {
        const lines = doc.splitTextToSize('• ' + exp, 80)
        doc.text(lines, 115, yPosRight)
        yPosRight += (lines.length * 4) + 1
      })

      // Footer
      doc.setFontSize(7)
      doc.setTextColor(180, 160, 140)
      doc.text('© Suleman Farooq - Professional Portfolio', 20, 285)

      doc.save('Suleman_Farooq_Resume.pdf')
      setCvLoading(false)
      console.log('CV generated successfully')

    } catch (error) {
      console.error('Error generating CV:', error)
      setCvLoading(false)
      alert('Failed to generate CV. Error: ' + error.message)
    }
  }

  const projects = [
    { name: "Bug Tracking Dashboard", category: "QA Tool", bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=260&fit=crop" },
    { name: "E-commerce Platform", category: "React / Next.js", bg: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=260&fit=crop" },
    { name: "Test Case Manager", category: "QA Testing", bg: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=260&fit=crop" },
    { name: "Portfolio 2025", category: "Frontend", bg: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=260&fit=crop" },
    { name: "Analytics Dashboard", category: "UI/UX", bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=260&fit=crop" },
    { name: "Mobile App UI", category: "App Design", bg: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&h=260&fit=crop" }
  ]

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Head>
        <title>Suleman Farooq | QA Tester & Frontend Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navbar */}
     <nav className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-black/5 dark:border-white/10">
  <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center flex-wrap">
    <a href="#home" className="flex items-center gap-2.5 no-underline">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25 transition-transform hover:scale-105">
        <span className="text-xl font-bold text-white leading-none">SF</span>
      </div>
      <div className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent">
        Suleman<span className="font-medium text-purple-600 dark:text-purple-400">farooq</span>
      </div>
    </a>

    <div className="hidden md:flex gap-8 items-center">
      <a href="#home" className="font-medium hover:text-blue-600 transition-colors">Home</a>
      <a href="#services" className="font-medium hover:text-blue-600 transition-colors">Services</a>
      <a href="#about" className="font-medium hover:text-blue-600 transition-colors">About me</a>
      <a href="#portfolio" className="font-medium hover:text-blue-600 transition-colors">Portfolio</a>
      <a href="#contact" className="font-medium hover:text-blue-600 transition-colors">Contact me</a>
      <a href="#contact" className="hire-btn px-6 py-2.5 rounded-3xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/20 hover:shadow-none transition-all hover:-translate-y-0.5">Hire Me</a>
      <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
        <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-600 dark:text-slate-300'} text-lg`}></i>
      </button>
    </div>

    <div className="flex md:hidden gap-4 items-center">
      <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
        <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-600 dark:text-slate-300'} text-lg`}></i>
      </button>
      <div className="text-2xl cursor-pointer" onClick={() => setMenuActive(!menuActive)}>
        <i className="fas fa-bars text-slate-900 dark:text-slate-100"></i>
      </div>
    </div>

    {menuActive && (
      <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/10 flex flex-col gap-4 p-4 z-50">
        <a href="#home" onClick={() => setMenuActive(false)} className="font-medium hover:text-blue-600 transition-colors">Home</a>
        <a href="#services" onClick={() => setMenuActive(false)} className="font-medium hover:text-blue-600 transition-colors">Services</a>
        <a href="#about" onClick={() => setMenuActive(false)} className="font-medium hover:text-blue-600 transition-colors">About me</a>
        <a href="#portfolio" onClick={() => setMenuActive(false)} className="font-medium hover:text-blue-600 transition-colors">Portfolio</a>
        <a href="#contact" onClick={() => setMenuActive(false)} className="font-medium hover:text-blue-600 transition-colors">Contact me</a>
        <a href="#contact" onClick={() => setMenuActive(false)} className="hire-btn px-6 py-2.5 rounded-3xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-center">Hire Me</a>
      </div>
    )}
  </div>
</nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="scroll-reveal reveal-left text-5xl font-extrabold leading-tight">Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Suleman Farooq</span></h1>
                <div className="subtitle scroll-reveal reveal-right text-slate-600 dark:text-slate-300 text-lg my-4">QA Tester | Software Quality Enthusiast & Frontend Developer</div>
                <div className="social-icons scroll-reveal reveal-up flex gap-5 my-6">
                  <a href="https://www.linkedin.com/in/suleman-farooq-99254b18b/" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://github.com/SulemanF954" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-github"></i></a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-instagram"></i></a>
                </div>
                <div className="btn-group scroll-reveal reveal-zoom flex gap-4 my-4">
                  <button id="hireMeBtn" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:-translate-y-1 transition">Hire Me</button>
                  <button onClick={generateCV} disabled={cvLoading} className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-full font-semibold hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {cvLoading ? 'Generating...' : 'Download CV'}
                  </button>
                </div>
                <div id="statsContainer" className="stats stagger-reveal flex gap-6 mt-6">
                  <div className="stat-card bg-white dark:bg-slate-800 p-4 rounded-2xl text-center min-w-[110px] shadow"><div className="stat-number text-3xl font-extrabold text-blue-600" id="expCount">0</div><div>Experience (yrs)</div></div>
                  <div className="stat-card bg-white dark:bg-slate-800 p-4 rounded-2xl text-center min-w-[110px] shadow"><div className="stat-number text-3xl font-extrabold text-blue-600" id="projectCount">0</div><div>Projects done</div></div>
                  <div className="stat-card bg-white dark:bg-slate-800 p-4 rounded-2xl text-center min-w-[110px] shadow"><div className="stat-number text-3xl font-extrabold text-blue-600" id="clientCount">0</div><div>Happy Clients</div></div>
                </div>
              </div>
              <div className="hero-right scroll-reveal reveal-zoom flex justify-center">
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-blue-100 to-slate-300 dark:from-blue-900 dark:to-slate-700 rounded-[40%_60%_30%_70%/50%_40%_60%_50%] flex items-center justify-center shadow-xl backdrop-blur-sm">
                  <img src={darkMode ? "/profile-dark.png" : "/profile-light.png"} alt="Suleman Farooq" className="w-[90%] h-[90%] object-cover rounded-[30%_70%_40%_60%/50%_40%_60%_50%] border-4 border-white dark:border-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="section-title scroll-reveal reveal-up text-4xl font-bold text-center mb-4">Services</h2>
            <div className="section-sub scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Empowering digital experiences with quality & creativity</div>
            <div className="services-grid stagger-reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "fas fa-laptop-code", title: "Web Design", desc: "Modern, responsive websites with pixel-perfect UI." },
                { icon: "fas fa-code", title: "Frontend Development", desc: "React, Next.js, and interactive interfaces." },
                { icon: "fas fa-bug", title: "QA Testing", desc: "Manual testing, test cases, bug reports, regression." },
                { icon: "fas fa-paint-brush", title: "UI/UX Design", desc: "User-centric design & prototyping." },
                { icon: "fas fa-mobile-alt", title: "Responsive Design", desc: "Flawless on all devices." },
                { icon: "fas fa-chart-line", title: "Bug Tracking", desc: "Detailed analysis & quality assurance." }
              ].map((service, idx) => (
                <div key={idx} className="service-card p-8 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow hover:-translate-y-2 hover:bg-white dark:hover:bg-slate-700 transition">
                  <i className={`${service.icon} text-4xl text-blue-600 mb-4`}></i>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="scroll-reveal reveal-left">
                <img src={darkMode ? "/profile-dark.png" : "/profile-light.png"} alt="About me" className="rounded-2xl shadow-2xl" />
              </div>
              <div className="scroll-reveal reveal-right">
                <h2 className="text-4xl font-bold mb-4">About Me</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">I’m Suleman Farooq, a QA Tester with 1.5 years of hands-on experience, currently transitioning into Frontend Development. I specialize in manual testing, creating detailed test cases, identifying critical bugs, and ensuring high product quality across applications.

Alongside my QA expertise, I actively build responsive and user-friendly interfaces using modern technologies like React and Next.js. I bring a unique perspective by combining quality assurance with development, allowing me to create applications that are both functional and reliable.

I’m passionate about continuous learning, improving user experience, and staying aligned with industry best practices. I thrive in environments where I can solve real-world problems, collaborate with teams, and contribute to building impactful digital products.

Currently, I’m seeking opportunities where I can grow as a Frontend Developer while leveraging my QA background to deliver high-quality solutions.</p>
                <button onClick={generateCV} disabled={cvLoading} className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                  {cvLoading ? 'Generating...' : 'Download CV'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Mastery */}
        <section id="skills" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="section-title scroll-reveal reveal-up text-4xl font-bold text-center mb-4">Technical Mastery</h2>
            <div className="section-sub scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Colorful icons & animated progress on scroll</div>
            <div className="skills-container stagger-reveal flex flex-wrap justify-center gap-8" ref={skillsContainerRef}></div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="section-title scroll-reveal reveal-up text-4xl font-bold text-center mb-4">Portfolio</h2>
            <div className="section-sub scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Creative projects, real impact</div>
            <div className="portfolio-grid stagger-reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="project-card relative rounded-2xl overflow-hidden h-64 bg-cover bg-center transition hover:scale-[1.02]" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${proj.bg})` }}>
                  <div className="project-overlay absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition text-white text-center p-4">
                    <h3 className="text-2xl font-bold">{proj.name}</h3>
                    <p>{proj.category}</p>
                    <i className="fas fa-eye mt-2"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with Left Animated Card + Right Form */}
        <section id="contact" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="section-title scroll-reveal reveal-up text-4xl font-bold text-center mb-4">Contact me</h2>
            <div className="section-sub scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Cultivating Connections: Reach Out And Connect With Me</div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Side - Animated Contact Card */}
              <div className="scroll-reveal reveal-left">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                  <div className="mb-6">
                    <div className="text-sm uppercase tracking-[0.3em] text-blue-200/80">Get in touch</div>
                    <h3 className="text-3xl font-bold mt-4">Let's connect</h3>
                    <p className="mt-2 text-blue-100/90">I'm always excited to work on new projects and collaborations.</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Name</p>
                      <p className="mt-2 text-lg font-semibold">Suleman Farooq</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Email</p>
                      <p className="mt-2 text-lg font-semibold break-all">sulemanfarooq954@gmail.com</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Phone</p>
                      <p className="mt-2 text-lg font-semibold">+92 307 6315295</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Availability</p>
                      <p className="mt-2 text-lg font-semibold">✅ Freelance & Remote Work</p>
                      <p className="text-sm text-blue-100/80">Open for full-time opportunities as well</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Address</p>
                      <p className="mt-2 text-lg font-semibold">Multan, Pakistan</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-4 justify-start">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition">
                      <i className="fab fa-linkedin-in"></i>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition">
                      <i className="fab fa-github"></i>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition">
                      <i className="fab fa-twitter"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="contact-form scroll-reveal reveal-zoom bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
                <form id="contactForm">
                  <div className="form-group mb-4"><input type="text" placeholder="Your Name" required id="contactName" className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" /></div>
                  <div className="form-group mb-4"><input type="email" placeholder="Your Email" required id="contactEmail" className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" /></div>
                  <div className="form-group mb-4"><input type="tel" placeholder="Your Phone" id="contactPhone" className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" /></div>
                  <div className="form-group mb-4"><select id="serviceInterest" className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"><option>Web Development</option><option>QA Testing</option><option>UI/UX Design</option><option>Frontend Dev</option></select></div>
                  <div className="form-group mb-4"><input type="text" placeholder="Timeline (e.g., 2 weeks)" id="timeline" className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" /></div>
                  <div className="form-group mb-4"><textarea rows="4" placeholder="Project Details..." id="projectDetails" className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"></textarea></div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/30 transition-transform hover:-translate-y-1 hover:bg-blue-700">
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-10 mt-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="footer-content stagger-reveal flex flex-col justify-between items-center gap-6">
            <div className="footer-logo flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">SF</span></div><div className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Sulemanfarooq</div></div>
            <div className="footer-nav flex gap-6"><a href="#home" className="hover:text-white">Home</a><a href="#services" className="hover:text-white">Services</a><a href="#about" className="hover:text-white">About</a><a href="#portfolio" className="hover:text-white">Portfolio</a><a href="#contact" className="hover:text-white">Contact</a></div>
            <div className="footer-social flex gap-4 text-2xl"><a href="https://www.linkedin.com/in/sulemanfarooq" className="hover:text-white"><i className="fab fa-linkedin"></i></a><a href="https://github.com/SulemanF954" className="hover:text-white"><i className="fab fa-github"></i></a><a href="https://www.facebook.com/sulemanfarooq" className="hover:text-white"><i className="fab fa-facebook"></i></a><a href="https://www.instagram.com/sulemanfarooq" className="hover:text-white"><i className="fab fa-instagram"></i></a></div>
            <div className="footer-contact flex gap-4"><p><i className="far fa-envelope"></i> sulemanfarooq954@gmail.com</p><p><i className="fas fa-phone-alt"></i> +92307-6315295</p></div>
          </div>
          <div className="copyright scroll-reveal reveal-up text-center text-sm border-t border-slate-800 pt-6 mt-6">Designed by @Suleman Farooq — QA Tester & Frontend Developer</div>
        </div>
      </footer>
    </div>
  )
}