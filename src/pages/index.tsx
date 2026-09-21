import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import HomeStyles from "../styles/home.module.css";
import { useRef, useState } from "react";
import Workshop from "../components/Workshop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { 
  faEnvelope, 
  faLaptopCode, 
  faTrophy, 
  faCalendarDays,
  faChalkboardUser,
  faShieldHalved,
  faBuildingColumns,
  faArrowRight,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import MeetingDate from "../components/MeetingDate";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const landingContainerRef = useRef<HTMLDivElement | null>(null);
  const [ workshop, setWorkshop ] = useState<string | null>(null);
  const [ selectedArchiveYear, setSelectedArchiveYear ] = useState<string | null>(null);

  const workshops2026_27 = [
    {
      name: "Intro to Python",
      prereq: "Zero Exp / CS21 Friendly",
      teachers: "Ishanya, Parasme, Darsh, Rohan",
      images: ["/sbcsclub/workshops/python.svg"],
      description: "Master Python fundamentals from the ground up! Designed especially for students with zero prior coding experience or taking CS21. Learn syntax, logic, loops, functions, and data structures while building hands-on mini-projects.",
      topics: ["Variables & Conditionals", "Loops & Functions", "Lists & Dictionaries", "Interactive Mini-Games", "Basic Scripting"]
    },
    {
      name: "Finance + Quantitative Computing",
      prereq: "CS21 / Beginner Friendly",
      teachers: "Gowri, Namrata",
      images: ["/sbcsclub/workshops/finance-quant.svg"],
      description: "Discover how computer science powers modern financial markets. Analyze historical stock data, model risk and return, and write algorithmic trading strategies using Python.",
      topics: ["Financial Market Data", "Returns & Volatility", "Technical Indicators", "Risk Metrics", "Strategy Backtesting"]
    },
    {
      name: "Making Music with Python",
      prereq: "CS21 / Python Basics",
      teachers: "Hari, Daksh",
      images: ["/sbcsclub/workshops/music-python.png"],
      description: "Combine music theory with code! Use Python and musicpy to generate melodies, create custom synthesizer waveforms, manipulate MIDI files, and compose generative soundscapes.",
      topics: ["musicpy & Audio Synthesis", "MIDI Track Manipulation", "Algorithmic Composition", "Beats & Chords Generation", "Audio Visualizers"]
    },
    {
      name: "Competitive Programming & Algorithms",
      prereq: "Intermediate / CS21-APCSA",
      teachers: "Abhiram, Nikhil, Aarush, Arav",
      images: ["/sbcsclub/workshops/algorithms.svg"],
      description: "Sharpen your algorithmic problem solving for USACO and coding competitions. Tackle challenging problem sets, master asymptotic complexity, and compete in mock contests.",
      topics: ["Arrays & HashMaps", "Sorting & Binary Search", "Recursion & Backtracking", "Graph Traversal (BFS/DFS)", "Dynamic Programming Basics"]
    },
    {
      name: "Intro to Control Systems",
      prereq: "AP CSA+ / Advanced",
      teachers: "Shubh, Raghuram, Sammy",
      images: ["/sbcsclub/workshops/control-systems.svg"],
      description: "Explore the mathematics and programming behind modern robotics and automation. Learn about feedback control loops, noise filtering, and multi-sensor telemetry integration.",
      topics: ["PID Control Loops", "Kalman Filters", "Sensor Fusion", "Robotics Physics Simulation", "Error Correction"]
    }
  ];

  const pastWorkshops = {
    "2025-26": [
      { name: "AI & Machine Learning", desc: "Neural networks, regression, and model training" },
      { name: "Blender 3D Modeling", desc: "3D asset creation and rendering pipeline" },
      { name: "Circuits & Electronics", desc: "Arduino and embedded hardware development" },
      { name: "Intro to C", desc: "Low-level memory management and systems programming" },
      { name: "Python", desc: "Core Python fundamentals and rapid scripting" }
    ],
    "2024-25": [
      { name: "Art + Animation", desc: "Creative coding and visual shaders" },
      { name: "Cybersecurity", desc: "Network analysis, cryptography, and defensive ops" },
      { name: "Go (Golang)", desc: "Concurrent backend service engineering" },
      { name: "Music + Games", desc: "Audio programming and interactive mini-games" },
      { name: "UI/UX + Web Development", desc: "Modern frontend design and responsive interfaces" }
    ],
    "2023-24": [
      { name: "Cloud Services", desc: "Firebase GCP and Oracle Cloud integration" },
      { name: "Flutter App Development", desc: "Cross-platform mobile application development" },
      { name: "Intro to Rust", desc: "Memory safety and high-performance programming" },
      { name: "Roblox Game Dev", desc: "Lua scripting in Roblox studio engine" },
      { name: "Web Scraping", desc: "HTML parsing and automated data scrapers" }
    ]
  };

  const officers = [
    { name: "Sammy", role: "President", focus: "Club Operations, Hackathons & Control Systems Lead", badge: "Pres" },
    { name: "Parasme", role: "Vice President", focus: "Meeting Management & Python Lead", badge: "VP" },
    { name: "Ishanya", role: "Attendance & Outreach", focus: "Member Engagement, PR & Python Lead", badge: "Officer" },
    { name: "Namrata", role: "Attendance & Outreach", focus: "Club Promotion & Quant Lead", badge: "Officer" },
    { name: "Shubh", role: "Officer & Lead", focus: "Control Systems & Google Classroom Coordinator", badge: "Lead" },
    { name: "Raghuram", role: "Officer & Lead", focus: "Control Systems, Engineering & Web Dev", badge: "Lead" },
    { name: "Rohan", role: "Officer & Lead", focus: "Python Lead & First Meeting Slideshow", badge: "Lead" },
    { name: "Abhiram", role: "Officer & Lead", focus: "Competitive Programming Lead", badge: "Lead" },
    { name: "Nikhil", role: "Officer & Lead", focus: "Competitive Programming Lead", badge: "Lead" },
    { name: "Aarush", role: "Officer & Lead", focus: "Competitive Programming Lead", badge: "Lead" },
    { name: "Arav", role: "Officer & Lead", focus: "Competitive Programming & Python Lead", badge: "Lead" },
    { name: "Darsh", role: "Officer & Lead", focus: "Python Lead & Club Fair Demo", badge: "Lead" },
    { name: "Gowri", role: "Officer & Lead", focus: "Finance & Quantitative Computing Lead", badge: "Lead" },
    { name: "Daksh", role: "Officer & Lead", focus: "Music in Python Lead & Club Supplies", badge: "Lead" },
    { name: "Hari", role: "Officer & Lead", focus: "Making Music with Python Lead", badge: "Lead" }
  ];

  return (
    <>
      <Head>
        <title>SBHS CS Club</title>
        <meta name="description" content="South Brunswick High School Computer Science Club (2026-27). Workshops, hackathons, competitive programming, and robotics." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      <Navbar />
      
      <main className="mx-auto flex min-h-screen overflow-hidden w-full flex-col items-center justify-center bg-[#0a0a0f]">
          
          {/* HERO SECTION */}
          <section id="home" ref={landingContainerRef} className="flex container p-5 relative justify-center lg:flex-row flex-col-reverse items-center w-full min-h-screen pt-24 md:pt-16">
              <div className={`${HomeStyles.gradientBubbleOne}`}></div>
              <div className="flex-1 justify-center z-20 space-y-6 flex flex-col items-start w-full">
                
                {/* Year Pill */}
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#fcc001]/30 bg-[#fcc001]/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs md:text-sm font-mono text-[#fcc001] font-medium tracking-wide">
                    2026-2027 SCHOOL YEAR NOW ACTIVE
                  </span>
                </div>

                <h1
                  style={{ lineHeight: 1.15 }}
                  className="md:text-6xl lg:text-7xl text-4xl font-semibold text-white tracking-tight">
                    South Brunswick <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#fcc001]"
                      style={{ backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #fffdf0 55%, #fcc001 100%)' }}>
                      CS Club
                    </span>
                </h1>
                
                <h2 className="md:text-xl text-base text-white/75 font-light max-w-2xl leading-relaxed">
                  A student community at South Brunswick High School to learn coding, build cool projects, and compete in hackathons. Open to everyone, no prior experience needed.
                </h2>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://classroom.google.com/c/ODg1MjMwOTgxMDg4?cjc=b2bvgeri" rel="noopener noreferrer nofollow" target={"_blank"}>
                    <button className="bg-white text-black font-semibold text-sm md:text-base transition-all hover:bg-[#fcc001] hover:scale-105 rounded-full px-6 py-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
                      <span>Join Google Classroom</span>
                      <FontAwesomeIcon icon={faArrowRight} width={14} />
                    </button>
                  </a>
                  <a href="#workshops">
                    <button className="transition-all border border-white/20 hover:border-white/50 text-white font-medium text-sm md:text-base rounded-full px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                      Explore 2026-27 Tracks
                    </button>
                  </a>
                  <a href="#firstmeeting">
                    <button className="transition-all border border-[#77deff]/30 text-[#77deff] hover:text-white hover:bg-[#77deff]/20 font-medium text-sm md:text-base rounded-full px-5 py-3">
                      First Meeting (10/6)
                    </button>
                  </a>
                </div>

                <div className="my-2 px-1 h-8 w-full relative flex items-center space-x-6 pt-4">
                  <a href={"https://www.instagram.com/sbcsclub/"} target="_blank" rel="noopener noreferrer nofollow" className="text-white/70 hover:text-pink-400 transition-colors" title="Instagram">
                    <FontAwesomeIcon icon={faInstagram} height={30} />
                  </a>
                  <a href={"mailto:csclub@sbschools.org"} target="_blank" rel="noopener noreferrer nofollow" className="text-white/70 hover:text-yellow-300 transition-colors" title="Email Us">
                    <FontAwesomeIcon icon={faEnvelope} height={30} />
                  </a>
                </div>
              </div>

              <div className="flex-1 flex mt-8 lg:mt-0 relative justify-center max-h-[800px] items-center">
                <div className="relative w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] lg:scale-[1.38] z-10 drop-shadow-[0_0_60px_rgba(252,192,1,0.22)]">
                  <Image 
                    src={"/sbcsclub/code.png"} 
                    quality={100} 
                    objectFit="contain" 
                    layout="fill"
                    alt="Coding Workspace Graphic"
                    priority
                  />
                </div>
              </div>
          </section>

          {/* OVERVIEW & MEETING DATES SECTION */}
          <section id="overview" className="min-h-[500px] my-20 items-center flex flex-col-reverse lg:flex-row max-w-7xl px-6 md:px-3 w-full">
            <div className="flex-1 relative flex flex-col md:flex-row justify-center items-center gap-6 w-full mt-10 lg:mt-0">
              <div className={`${HomeStyles.gradientBubbleOne}`}></div>
              
              {/* Semester 1 */}
              <div className="flex-col flex space-y-3 w-full sm:w-auto z-10">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-[#fcc001] font-semibold text-lg flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} width={16} />
                    1st Semester (2026)
                  </h3>
                  <span className="text-xs font-mono text-white/50">Tuesdays</span>
                </div>
                <MeetingDate date="October 6th, 2026" note="First Meeting!" isHighlighted={true} />
                <MeetingDate date="October 27th, 2026" />
                <MeetingDate date="November 24th, 2026" />
                <MeetingDate date="December 8th, 2026" />
                <MeetingDate date="January 5th, 2027" />
                <MeetingDate date="January 26th, 2027" note="Mid-Year Review" />
              </div>

              {/* Semester 2 */}
              <div className="flex-col flex space-y-3 w-full sm:w-auto z-10">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-[#77deff] font-semibold text-lg flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} width={16} />
                    2nd Semester (2027)
                  </h3>
                  <span className="text-xs font-mono text-white/50">Tuesdays</span>
                </div>
                <MeetingDate date="February 16th, 2027" />
                <MeetingDate date="March 2nd, 2027" note="Hackathon Prep" />
                <MeetingDate date="March 30th, 2027" />
                <MeetingDate date="April 13th, 2027" />
                <MeetingDate date="April 27th, 2027" note="Final Demos" isHighlighted={true} />
              </div>
            </div>

            <div className="flex-1 my-6 lg:my-0 space-y-6 z-10 lg:pl-10">
              <h2 className="text-sm uppercase font-mono tracking-widest text-[#fcc001]">
                About Our Community
              </h2>
              <h1
                style={{ lineHeight: 1.1 }}
                className="md:text-6xl text-4xl font-semibold text-white tracking-tight">
                 Club Overview
              </h1>
              <p className="md:text-lg text-base text-white/80 font-light leading-relaxed">
                Our mission is to empower South Brunswick students with practical computer science, software engineering, and problem-solving skills. We require&nbsp;
                <span className="text-[#4ade80] font-semibold">Zero prior experience</span>&nbsp;- whether you are in CS21, AP CSA, or exploring coding for the first time, everyone is welcome!
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fcc001]"></span>
                    Bi-Monthly Meetings
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Held on selected Tuesdays after school from 2:20 PM to 4:00 PM.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#77deff]"></span>
                    Club Credit & Dues
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Maintain at least 50% attendance, Pay-to-Participate on Community Pass, and submit $10 club dues.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-[#fcc001]">
                  <FontAwesomeIcon icon={faChalkboardUser} width={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Advisors</h4>
                  <p className="text-white/60 text-xs">
                    Proudly advised by Mr. Schiff, Ms. Robles, and Mr. Trainor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2026-27 WORKSHOPS SECTION */}
          <section id="workshops" className="min-h-screen my-16 flex-col space-y-6 flex max-w-7xl w-full px-4 relative justify-center items-center">
            <div className={`${HomeStyles.gradientBubbleTwo}`}></div>
            
            <div className="text-center space-y-3 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#fcc001]">
                Interactive Hands-On Tracks
              </span>
              <h1
                style={{ lineHeight: 1.1 }}
                className="md:text-6xl text-4xl font-semibold text-white">
                  2026-27 <span className={`${HomeStyles.proHighlight}`}>Workshops</span>
              </h1>
              <h2 className="md:text-lg text-sm text-white/70 font-light">
                Choose your focus area for this school year. Each workshop features student leads, structured lessons, and tangible showcase projects.
              </h2>
            </div>

            <div className="flex w-full flex-wrap justify-center items-center pt-6">
              {workshops2026_27.map((w, idx) => (
                <Workshop 
                  key={idx}
                  setWorkshop={setWorkshop}
                  workshop={workshop}
                  name={w.name}
                  prereq={w.prereq}
                  teachers={w.teachers}
                  images={w.images}
                  description={w.description}
                  topics={w.topics}
                />
              ))}
            </div>

            {/* Past Workshop Archives */}
            <div className="w-full max-w-4xl mt-12 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-white font-semibold text-lg">Workshop Archives</h3>
                  <p className="text-white/50 text-xs">Explore topics taught in previous CS Club school years</p>
                </div>
                <div className="flex gap-2">
                  {(["2025-26", "2024-25", "2023-24"] as const).map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedArchiveYear(selectedArchiveYear === year ? null : year)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        selectedArchiveYear === year 
                          ? "bg-white text-black font-semibold shadow-md" 
                          : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {selectedArchiveYear && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
                  {pastWorkshops[selectedArchiveYear as keyof typeof pastWorkshops]
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((pw, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="text-white font-medium text-sm">{pw.name}</h4>
                        <p className="text-white/60 text-xs mt-1">{pw.desc}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>

          {/* COMPETITIONS & EVENTS SECTION */}
          <section id="events" className="my-16 max-w-7xl w-full px-6 flex flex-col items-center">
            <div className="text-center space-y-3 max-w-3xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[#77deff]">
                Beyond The Classroom
              </span>
              <h1 className="md:text-6xl text-4xl font-semibold text-white">
                Competitions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e8f0] to-[#77deff]">Events</span>
              </h1>
              <p className="md:text-lg text-sm text-white/70 font-light">
                Expand your horizons through high-energy hackathons, capture-the-flag battles, and competitive USACO programming.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 w-full">
              
              {/* Event 1: Hackathon */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-[#fcc001]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#fcc001]/10 text-[#fcc001] flex items-center justify-center mb-4 text-xl">
                    <FontAwesomeIcon icon={faLaptopCode} width={22} />
                  </div>
                  <span className="text-xs font-mono uppercase text-[#fcc001] tracking-wide">Flagship Event</span>
                  <h3 className="text-white font-semibold text-xl mt-1 mb-2">SBHS Annual Hackathon</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    Our biggest annual 24-hour sprint. Build cutting-edge applications with fellow students, connect with tech sponsors, and compete for prizes.
                  </p>
                  
                  {/* Food & Refreshments Highlight */}
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUtensils} width={14} />
                    <span>Free meals, pizza, snacks & drinks provided for all hackers!</span>
                  </div>
                </div>
              </div>

              {/* Event 2: CTF & Cybersecurity */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-[#77deff]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#77deff]/10 text-[#77deff] flex items-center justify-center mb-4 text-xl">
                    <FontAwesomeIcon icon={faShieldHalved} width={22} />
                  </div>
                  <span className="text-xs font-mono uppercase text-[#77deff] tracking-wide">Cybersecurity</span>
                  <h3 className="text-white font-semibold text-xl mt-1 mb-2">Garden State CTF</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Represent SBHS in inter-school cybersecurity Capture The Flag competitions. Solve cryptography, reverse engineering, and web vulnerability challenges.
                  </p>
                </div>
              </div>

              {/* Event 3: Competitive Programming & USACO */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-[#fcc001]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#fcc001]/10 text-[#fcc001] flex items-center justify-center mb-4 text-xl">
                    <FontAwesomeIcon icon={faTrophy} width={22} />
                  </div>
                  <span className="text-xs font-mono uppercase text-[#fcc001] tracking-wide">Competitive Coding</span>
                  <h3 className="text-white font-semibold text-xl mt-1 mb-2">USACO & Competitions</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Tackle algorithmic challenges and prepare for official USACO contest windows (Bronze, Silver, Gold, Platinum). Practice problem sets and compete in club mock contests.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* FIRST MEETING & CLUB FAIR GUIDE */}
          <section id="firstmeeting" className="my-16 max-w-7xl w-full px-6 flex flex-col items-center">
            <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#fcc001]/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-3xl space-y-4 mb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#fcc001] px-3 py-1 rounded-full border border-[#fcc001]/30 bg-[#fcc001]/10 inline-block">
                    Mark Your Calendar
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-white">
                  First Meeting: <span className="text-[#fcc001]">October 6th, 2026</span>
                </h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Join us for our official 2026-27 kickoff meeting after school at 2:20 PM. Meet the entire board, discover workshop tracks, meet leads, and lock in your registration.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                  <div className="text-[#fcc001] font-mono text-xs font-bold mb-1">2:20 - 2:30 PM</div>
                  <h4 className="text-white font-semibold text-sm mb-1">Arrival & Check-in</h4>
                  <p className="text-white/60 text-xs">Find a seat, meet club members, and join Google Classroom (b2bvgeri).</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                  <div className="text-[#77deff] font-mono text-xs font-bold mb-1">2:30 - 2:45 PM</div>
                  <h4 className="text-white font-semibold text-sm mb-1">Intro Slideshow</h4>
                  <p className="text-white/60 text-xs">Overview of requirements, meeting calendar, events, and opportunities.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                  <div className="text-[#4ade80] font-mono text-xs font-bold mb-1">2:45 - 3:10 PM</div>
                  <h4 className="text-white font-semibold text-sm mb-1">Workshop Pitches</h4>
                  <p className="text-white/60 text-xs">Each workshop lead presents syllabus, topics, and project demos.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                  <div className="text-[#fcc001] font-mono text-xs font-bold mb-1">3:10 - 3:55 PM</div>
                  <h4 className="text-white font-semibold text-sm mb-1">Icebreaker & Signups</h4>
                  <p className="text-white/60 text-xs">Fun CS trivia game, talk with leads, and submit your workshop ranking form.</p>
                </div>
              </div>

              <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-white/10 text-white">
                    <FontAwesomeIcon icon={faBuildingColumns} width={18} />
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm">Club Fair Details</h5>
                    <p className="text-white/60 text-xs">Day 1 (9/22 B Day Annex) &amp; Day 2 (9/23 A Day) all lunches. Grab an info card!</p>
                  </div>
                </div>
                <a 
                  href="https://classroom.google.com/c/ODg1MjMwOTgxMDg4?cjc=b2bvgeri" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#fcc001] transition-colors"
                >
                  Join Google Classroom
                </a>
              </div>
            </div>
          </section>

          {/* LEADERSHIP & BOARD SECTION */}
          <section id="leadership" className="my-16 max-w-7xl w-full px-6 flex flex-col items-center">
            <div className="text-center space-y-3 max-w-3xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[#fcc001]">
                Leadership Team
              </span>
              <h1 className="md:text-6xl text-4xl font-semibold text-white">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#fcc001]">2026-27 Board</span>
              </h1>
              <p className="md:text-lg text-sm text-white/70 font-light">
                Dedicated student officers, developers, and workshop leads leading South Brunswick CS Club this year.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
              {officers.map((officer, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <h3 className="text-white font-semibold text-base tracking-tight">{officer.name}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        officer.badge === "Pres" ? "border-[#fcc001]/40 bg-[#fcc001]/10 text-[#fcc001]" :
                        officer.badge === "VP" ? "border-[#77deff]/40 bg-[#77deff]/10 text-[#77deff]" :
                        "border-white/10 bg-white/5 text-white/70"
                      }`}>
                        {officer.badge}
                      </span>
                    </div>
                    <h4 className="text-[#fcc001] text-xs font-medium mb-1.5">{officer.role}</h4>
                    <p className="text-white/60 text-xs leading-relaxed">{officer.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

      </main>
      <Footer />
    </>
  );
};

export default Home; 
