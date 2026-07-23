import React, { useState, useEffect, useRef } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import programsBg from '../assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp'
import spaceCoworking from '../assets/navrachna_images/spaces/coworking.jpg'
import spaceBoardroom from '../assets/navrachna_images/spaces/boardroom.jpg'
import spaceLaserCutting from '../assets/navrachna_images/spaces/laser_cutting.jpg'
import spacePlasmaCutting from '../assets/navrachna_images/spaces/plasma_cutting.jpg'
import space3DPrinting from '../assets/navrachna_images/spaces/3d_printing.jpg'
import spaceDesignSystem from '../assets/navrachna_images/spaces/design_system.jpg'
import spaceReception from '../assets/navrachna_images/spaces/reception.jpg'
import { HeaderV1 } from '../components/HeaderV1'
import { FooterV1 } from '../components/FooterV1'
import CircularGallery from '../components/CircularGallery'
import Stack from '../components/Stack'
import BorderGlow from '../components/BorderGlow'

import client1 from '../assets/navrachna_images/ArunChaudhary-1.png'
import client2 from '../assets/navrachna_images/DIGIERA-PRIVATE-LIMITED.png'
import client3 from '../assets/navrachna_images/JagmagLights-1.png'
import client4 from '../assets/navrachna_images/MyLyfCare-1.png'
import client5 from '../assets/navrachna_images/TripoSaints-1.png'
import client6 from '../assets/navrachna_images/UPROI-1-scaled.png'
import client7 from '../assets/navrachna_images/VerdantLogo-1.png'
import client8 from '../assets/navrachna_images/Weaclim-1.png'
import client9 from '../assets/navrachna_images/indus-1.jpg'
import client10 from '../assets/navrachna_images/intelliginetia-1.jpg'

import leaderChairman from '../assets/navrachna_images/leader_chairman.png'
import leaderViceChairman from '../assets/navrachna_images/leader_vicechairman.png'
import leaderDirector from '../assets/navrachna_images/leader_director.png'
import leaderAdvisor from '../assets/navrachna_images/leader_advisor.png'

const LEADERSHIP = [
  {
    role: "Chairman, I.T.S The Education Group",
    title: "Shri B.L. Gupta",
    photo: leaderChairman,
    message: "Our vision at Navrachna Foundation is to foster an ecosystem where youthful ambition meets strategic support. We are committed to building an environment that transforms innovative student ideas into sustainable business models that drive economic progress."
  },
  {
    role: "Vice Chairman, I.T.S The Education Group",
    title: "Shri Sohil Gupta",
    photo: leaderViceChairman,
    message: "At Navrachna Foundation, we bridge the gap between academic research and commercial reality. By pairing cutting-edge labs with seasoned industry leaders, we equip our founders with the execution speed needed to win."
  },
  {
    role: "Director, I.T.S Engineering College",
    title: "Dr. Manish Sharma",
    photo: leaderDirector,
    message: "Engineering excellence is the cornerstone of technical innovation. Navrachna Foundation provides the precise multidisciplinary platform, prototyping infrastructure, and technical mentorship needed to scale deep-tech ventures."
  },
  {
    role: "Advisor / In-Charge, Navrachna Foundation",
    title: "Prof. (Dr.) Sanjay Yadav",
    photo: leaderAdvisor,
    message: "Navrachna Foundation is built ground-up to serve founders. From government grant assistance to fabrication support, our hands-on incubation framework ensures that no promising idea fails for lack of guidance or capital."
  }
];

const CLIENTS = [
  { src: client1, name: "E4A Technologies", bgDark: true },
  { src: client2, name: "Cyberkida Digiera Private Limited", bgDark: true },
  { src: client3, name: "Jagmag Lights", bgDark: false },
  { src: client4, name: "MyLyfCare", bgDark: false },
  { src: client5, name: "TripoSaints", bgDark: false },
  { src: client6, name: "UPROI", bgDark: false },
  { src: client7, name: "Verdant Solutions", bgDark: false },
  { src: client8, name: "Weaclim", bgDark: false },
  { src: client9, name: "Indus AI", bgDark: false },
  { src: client10, name: "Intelliginetia", bgDark: false },
];

const UPDATES = [
  {
    tag: "Competition",
    text: "Applications are now open for the Annual Logo Design Competition. Submit your creative portfolios today."
  },
  {
    tag: "MSME Hackathon",
    text: "Join the upcoming MSME Hackathons to solve real-world industry challenges and secure seed funding."
  },
  {
    tag: "Incubation",
    text: "Discover funding and incubation opportunities through our specialized Startin-Up and NewGen-IEDC programs."
  },
  {
    tag: "Labs & Infra",
    text: "Access our state-of-the-art Fabrication Lab and High-End Compute resources to accelerate your prototyping."
  }
];

const STATS = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#013759]"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    stat: "20+",
    badge: "Fabrication Lab",
    desc: "Concurrent Prototyping Workstations"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#013759]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    stat: "48",
    badge: "3D Printers",
    desc: "Types of Supported Resins & Materials"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#013759]"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    stat: "128GB",
    badge: "Compute Systems",
    desc: "High-End AI & Simulation Workstations"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#013759]"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    stat: "23",
    badge: "Co-Working Area",
    desc: "Seating Capacity with Plug 'n' Play"
  }
];

const PROGRAMS = [
  {
    title: "Startin-Up",
    description: "Discover funding and incubation opportunities through our specialized Startin-Up program, designed to assist and enable young entrepreneurs to initiate commercial exploitation of their technologies.",
    link: "/startin-up"
  },
  {
    title: "NewGen-IEDC",
    description: "The NewGen IEDC program helps students develop entrepreneurial skills, test startup ideas, and connect with investors. We provide a dynamic and collaborative workspace that empowers you.",
    link: "/programs/newgen-iedc"
  },
  {
    title: "MSME-BI",
    description: "Participate in MSME Hackathons to solve real-world industry challenges and secure seed funding. A direct approach towards solving your startup problems with 1 to 1 mentorship.",
    link: "/msme-bi"
  },
  {
    title: "Kartavyam Initiative",
    description: "Empowering 300+ school students across 40+ partner schools through early STEM innovation, social responsibility, and youth entrepreneurship development.",
    link: "#"
  }
];

const BENEFITS_COL1 = [
  {
    title: "Direct Mentorship",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
    desc: "A more direct approach towards solving your startup problems. We offer 1 to 1 mentorship for your entrepreneurial journey."
  },
  {
    title: "Lab Support",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    desc: "Providing a comprehensive lab support to your startup's prototyping needs, with a variety of tools and machineries."
  },
  {
    title: "Free Unlimited High-Speed Internet",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
    desc: "Stay connected with our reliable and fast internet connection"
  }
];

const BENEFITS_COL2 = [
  {
    title: "Rich Ecosystem",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    desc: "At the heart of our rich ecosystem lies a culture of inclusivity and shared success helping founders accelerate their journey with funding guidance, market connections, and continuous capacity building."
  },
  {
    title: "Strategic Location",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    desc: "Provide easy accessibility, connectivity, and a thriving business environment for entrepreneurs and startups."
  },
  {
    title: "Access to Funding & Investment Opportunities",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    desc: "We connect you with various government grants equity and non-equity based funding potential investors, venture capitalists, and funding opportunities."
  }
];

const BENEFITS_COL3 = [
  {
    title: "Flexible Solutions",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/></svg>,
    desc: "Your business requirements, ensuring productivity and growth."
  },
  {
    title: "Most Affordable",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    desc: "We offer cost-effective workspace solutions without compromising on quality, ensuring that startups and entrepreneurs"
  },
  {
    title: "IT Support",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#fbbf24]"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    desc: "If you’re looking for additional IT services tailored to your specific needs, we specialize in comprehensive IT solutions, ensuring that your business runs smoothly and securely. Learn more about our services here."
  }
];

const FAQS = [
  {
    question: "What is Navrachna Foundation for Entrepreneurship Development?",
    answer: "Navrachna Foundation for Entrepreneurship Development is a subsidiary of I.T.S Engineering College that supports young entrepreneurs in commercializing their technologies and launching startups."
  },
  {
    question: "Who can benefit from the foundation?",
    answer: "Students, faculty, and staff looking to develop their entrepreneurial skills, test startup ideas, and connect with investors can benefit from the foundation."
  },
  {
    question: "What resources does the foundation provide?",
    answer: "The foundation offers mentorship, funding opportunities, networking support, and business development resources to help startups grow."
  },
  {
    question: "How does the foundation help bridge the gap between inventors and venture capitalists?",
    answer: "It connects innovators with industry experts, investors, and mentors to transform ideas into viable businesses."
  }
];

const OUR_SPACES = [
  {
    title: "Co-Working Space",
    description: "Scale in our premium co-working facility, featuring plug-and-play seating, smart meeting rooms, high-end compute systems, and prototyping labs.",
    image: spaceCoworking
  },
  {
    title: "NewGen Board Room",
    description: "Host pitch presentations, investor panels, and executive reviews in our high-tech boardrooms equipped with smart displays and AV suites.",
    image: spaceBoardroom
  },
  {
    title: "Laser Cutting Machine",
    description: "High-precision CO2 CNC laser cutting & engraving for acrylic, wood, sheet metals, and complex industrial components.",
    image: spaceLaserCutting
  },
  {
    title: "Plasma Cutting Machine",
    description: "Heavy-duty metal cutting and structural fabrication powered by automated CNC Plasma cutting machinery.",
    image: spacePlasmaCutting
  },
  {
    title: "PLA & SLA 3D Printing Machines",
    description: "Bring hardware concepts to life with professional FDM & SLA 3D printers supporting over 40 technical materials.",
    image: space3DPrinting
  },
  {
    title: "Designing System (CAD & Simulation)",
    description: "High-end compute systems dedicated to CAD designing, 3D modeling, finite element analysis, and structural simulations.",
    image: spaceDesignSystem
  },
  {
    title: "Reception Area",
    description: "Modern welcome desk and startup lounge providing a professional front for visiting founders, investors, and mentors.",
    image: spaceReception
  }
];

const FACILITIES_FEATURES = [
  { title: "High-Speed Internet", desc: "Reliable and fast connectivity for uninterrupted work." },
  { title: "Ergonomic Workspaces", desc: "Comfortable seating and well-designed desks for maximum efficiency." },
  { title: "Fully Equipped Meeting Rooms", desc: "Professional spaces with AV support for seamless discussions and presentations." },
  { title: "24/7 Access", desc: "Work at your convenience with round-the-clock facility access." },
  { title: "Security & Surveillance", desc: "Safe and secure environment with CCTV monitoring." },
  { title: "On-Site Refreshments", desc: "Cafeteria and pantry services to keep you energized." },
  { title: "Printing & Office Supplies", desc: "Essential business tools readily available." }
];

const FACILITIES_SPECS = [
  {
    title: "Fabrication Lab",
    specs: [
      "20 Workstations",
      "CNC Plasma Tooling",
      "Non-Metallic CNC Laser",
      "Manual Power Tools"
    ]
  },
  {
    title: "3D Printers",
    specs: [
      "02 FDM Printers (PLA/ABS/TPU)",
      "FormLabs SLA Printer (Form 3B+)",
      "48 Advanced Resins Supported",
      "Medical & Rigid Engineering Grade"
    ]
  },
  {
    title: "High End Compute Systems",
    specs: [
      "02 Simulation Nodes (RTX 3060)",
      "01 AI Superstation (RTX 3090 x2)",
      "Intel i9-12th Gen Computing",
      "128GB High-Speed DDR5 RAM"
    ]
  },
  {
    title: "Co-Working Area",
    specs: [
      "23 Premium Co-Working Seats",
      "06 Plug-n-Play ready Nodes",
      "High-Speed Gigabit Internet"
    ]
  }
];

const SCHEMES = [
  {
    code: "Startin-Up",
    subCode: "Commercial exploitation",
    title: "Startin-Up",
    description: "Discover funding and incubation opportunities through our specialized Startin-Up program, designed to assist and enable young entrepreneurs to initiate commercial exploitation of their technologies.",
    gradient: "from-indigo-950 via-purple-900 to-fuchsia-800"
  },
  {
    code: "NewGen IEDC",
    subCode: "Entrepreneurial skills",
    title: "NewGen-IEDC",
    description: "The NewGen IEDC program helps students develop entrepreneurial skills, test startup ideas, and connect with investors. We provide a dynamic and collaborative workspace that empowers you.",
    gradient: "from-emerald-950 via-green-800 to-yellow-600"
  },
  {
    code: "MSME-BI",
    subCode: "Hackathon & Mentorship",
    title: "MSME-BI",
    description: "Participate in MSME Hackathons to solve real-world industry challenges and secure seed funding. A direct approach towards solving your startup problems with 1 to 1 mentorship.",
    gradient: "from-rose-950 via-red-800 to-orange-600"
  }
];

export function LandingPage() {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [showAnnouncementsModal, setShowAnnouncementsModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFacility, setActiveFacility] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector('.snap-start');
      const cardWidth = firstCard ? firstCard.offsetWidth : 380;
      const gap = 32; // gap-8 is 32px
      const step = cardWidth + gap;
      
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - step 
        : scrollLeft + step;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const firstCard = scrollRef.current.querySelector('.snap-start');
        const cardWidth = firstCard ? firstCard.offsetWidth : 380;
        const gap = 32; // gap-8 is 32px
        const step = cardWidth + gap;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 50) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollTo({ left: scrollLeft + step, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % UPDATES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#111111] overflow-x-hidden max-w-full">

      {/* Top Announcement Bar */}
      <div className="relative z-40 flex min-h-[56px] sm:min-h-[52px] py-1.5 sm:py-0 w-full items-center border-b border-white/15 bg-[#0a192f] overflow-hidden shadow-md">
        <div className="flex items-center shrink-0 bg-[#074887] px-3 sm:px-6 py-3 text-xs sm:text-sm font-bold tracking-widest text-white uppercase shadow-sm">
          <span className="hidden sm:inline">Announcements</span>
          <span className="sm:hidden flex items-center gap-1">
            📢
          </span>
        </div>
        <div 
          onClick={() => setShowAnnouncementsModal(true)}
          className="relative flex flex-1 items-center overflow-hidden px-3 sm:px-5 min-h-[56px] sm:min-h-[52px] cursor-pointer hover:bg-white/5 transition-colors"
          title="Click to view all announcements"
        >
          {UPDATES.map((update, index) => (
            <div
              key={index}
              className={`absolute left-3 right-3 sm:left-5 sm:right-5 flex items-center transition-all duration-700 ease-in-out ${
                index === currentUpdate
                  ? 'translate-y-0 opacity-100 z-10'
                  : 'translate-y-4 opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="text-xs sm:text-base font-medium text-white leading-snug sm:leading-normal line-clamp-2 sm:truncate w-full flex items-center gap-2">
                <span className="inline-block text-sky-300 font-semibold text-[11px] sm:text-xs bg-sky-950/90 px-2 py-0.5 rounded-md border border-sky-400/40 shrink-0">
                  {update.tag}
                </span>
                <span className="text-white/95">{update.text}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAnnouncementsModal(true)}
          className="relative shrink-0 mr-2 sm:mr-4 p-2 text-sky-200 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer flex items-center justify-center"
          title="View all 4 announcements"
          aria-label="View announcements"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md animate-pulse">
            4
          </span>
        </button>
      </div>

      {/* All Announcements Modal */}
      {showAnnouncementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-4 sm:p-5 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="text-sm sm:text-base font-normal text-[#013759] flex items-center gap-2">
                <span>📢</span> Announcements & Updates
              </h3>
              <button 
                onClick={() => setShowAnnouncementsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer text-xs"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Announcements List — compact horizontal layout */}
            <div className="overflow-y-auto space-y-2 flex-1">
              {UPDATES.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#074887]/20 transition-all"
                >
                  <span className="shrink-0 text-[9px] sm:text-[10px] font-normal uppercase tracking-wider text-[#074887] bg-[#074887]/10 px-2 py-1 rounded mt-0.5 whitespace-nowrap">
                    {item.tag}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowAnnouncementsModal(false)}
                className="px-4 py-1.5 bg-[#074887] text-white text-xs font-normal rounded-lg hover:bg-[#013759] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="relative flex min-h-[50vh] md:min-h-[70vh] lg:min-h-[85vh] xl:min-h-[90vh] py-12 md:py-20 lg:py-28 w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black/65 pointer-events-none"></div>
        </div>

        <div className="relative z-10 flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mt-2 sm:mt-4 font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white leading-tight drop-shadow-lg">
            Where Ideas, Take Flight
          </h1>
          <p className="mt-3 sm:mt-5 max-w-2xl text-xs sm:text-base md:text-lg text-white leading-relaxed font-normal">
            Empowering visionary founders with world-class incubation, <br className="hidden sm:inline" /> state-of-the-art labs, and direct capital access.
          </p>
          <span className="mt-5 sm:mt-6 mb-2 inline-block rounded-full border border-white/30 px-2.5 py-0.5 sm:px-5 sm:py-1.5 text-[10px] sm:text-sm tracking-wider text-white backdrop-blur-md max-w-full text-center font-medium">
            Navrachna Foundation for Entrepreneurship Development
          </span>
          
          <div className="mt-4 sm:mt-6 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <a 
              href="/contact" 
              className="group rounded-xl bg-[#074887] px-4 py-2 sm:px-7 sm:py-3.5 text-[12px] sm:text-sm font-semibold text-white shadow-lg shadow-[#074887]/30 transition-all duration-300 hover:bg-[#013759] hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span className="text-white">Launch your startup</span>
              <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a 
              href="/services" 
              className="group rounded-xl border border-white/35 bg-white/10 px-4 py-2 sm:px-7 sm:py-3.5 text-[12px] sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span className="text-white">Explore ecosystem</span>
              <svg className="w-4 h-4 text-white opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Navrachna Foundation Section */}
      <section id="about" className="relative w-full bg-white py-10 sm:py-24 overflow-hidden border-b border-gray-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
          
          {/* Left Column: Image Layout */}
          <div className="w-full lg:w-[48%] flex sm:block flex-row items-center justify-center gap-3 sm:gap-0 h-[220px] sm:h-[450px] lg:h-[520px] relative">
            {/* First Card */}
            <div className="w-1/2 sm:w-[46%] h-full sm:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl sm:border-4 sm:border-white sm:absolute sm:left-4 sm:top-8 lg:top-4 transform sm:-translate-y-6 lg:-translate-y-8 sm:hover:-translate-y-8 lg:hover:-translate-y-10 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#013759]">
              <img 
                src={heroImage} 
                alt="Navrachna Incubator Facility" 
                className="w-full h-full object-cover object-center"
                />
            </div>
            {/* Second Card */}
            <div className="w-1/2 sm:w-[46%] h-full sm:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl sm:border-4 sm:border-white sm:absolute sm:right-4 sm:bottom-8 lg:bottom-4 transform sm:translate-y-6 lg:translate-y-8 sm:hover:translate-y-4 lg:hover:translate-y-6 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#074887]">
              <img 
                src={programsBg} 
                alt="Co-working workspace desks" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Informational Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <h2 className="mb-3 sm:mb-6 text-xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#013759] leading-snug sm:leading-tight">
              Navrachna Foundation for Entrepreneurship Development
            </h2>

            <div className="text-gray-600 text-xs sm:text-base font-normal leading-relaxed tracking-normal space-y-3 sm:space-y-5 text-left md:text-justify mb-4 sm:mb-8">
              <p>
                Navrachna Foundation for Entrepreneurship Development, a subsidiary of I.T.S. Engineering College, Greater Noida, is a dedicated platform committed to empowering the next generation of entrepreneurs. It enables students, faculty, and aspiring innovators to transform their ideas into impactful ventures by supporting the commercialization of technologies and fostering a strong startup culture.
              </p>
              <p>
                As the driving force behind the Startup Incubation Center, the foundation collaborates with the Government of Uttar Pradesh and is supported under the UP Startup Policy 2020, along with associations with key national bodies like Department of Science & Technology (DST - GOI) and Ministry of Micro, Small and Medium Enterprises (MSME). At its core, Navrachna focuses on nurturing innovation, validating ideas, and bridging the gap between inventors and investors—creating startups that contribute meaningfully to society and economic growth.
              </p>
            </div>

            <a 
              href="/about" 
              className="rounded-lg bg-black px-5 py-2 sm:px-8 sm:py-3.5 text-xs sm:text-base font-bold !text-white text-white shadow-lg hover:bg-[#074887] hover:!text-white hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 inline-block cursor-pointer"
            >
              <span className="text-white">Read More</span>
            </a>
          </div>
        </div>
      </section>

      {/* Key Impact Metrics Strip */}
      <section className="relative w-full bg-white py-10 border-y border-[#013759]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center lg:divide-x divide-[#074887]/10">
            {/* Stat 1 — Ideas Screened */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">1,276+</span>
              <span className="text-[11px] sm:text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">Ideas Screened</span>
            </div>
            {/* Stat 2 — Startups Incubated */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">60+</span>
              <span className="text-[11px] sm:text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">Startups Incubated</span>
            </div>
            {/* Stat 3 — Prototypes Supported */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">110+</span>
              <span className="text-[11px] sm:text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">Prototypes Built</span>
            </div>
            {/* Stat 4 — IPs & Patents Filed */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">70+</span>
              <span className="text-[11px] sm:text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">IPs Filed (10 Granted)</span>
            </div>
            {/* Stat 5 — Grants Mobilized */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">₹7 Cr+</span>
              <span className="text-[11px] sm:text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">Grants Mobilized</span>
            </div>
            {/* Stat 6 — Industry Mentors */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">48+</span>
              <span className="text-[11px] sm:text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">Industry Mentors</span>
            </div>
          </div>
          
          {/* Subtle Grant Breakdown Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-500 font-normal">
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">DST-NewGen: ₹2.87 Cr</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">StartInUP: ₹2.5 Cr</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">MSME Grant: ₹1.59 Cr</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">DST Training: ₹40 L</span>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative w-full bg-[#f8fafc] py-8 sm:py-20 border-b border-[#013759]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-12 lg:gap-16">
            
            {/* Vision - Left Side */}
            <div className="flex-1 flex flex-col items-start text-left">

              <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#013759]">
                Vision
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-md leading-tight sm:leading-relaxed text-justify font-normal">
                To build a vibrant and inclusive incubation ecosystem where ideas evolve into impactful ventures, creativity is nurtured, and entrepreneurs are empowered to thrive. Our vision is to become a globally recognized and Asia’s leading hub of innovation and entrepreneurship, where education, research, and real-world problem-solving come together seamlessly. We strive to cultivate competent, forward-thinking, and socially responsible innovators by providing the right mentorship, infrastructure, and opportunities—enabling students and faculty alike to experiment, prototype, and transform their ideas into sustainable solutions that contribute meaningfully to society and the future.
              </p>
            </div>

            {/* Divider Line (Horizontal on Mobile, Vertical on Desktop) */}
            <div className="w-full md:w-px h-px md:h-auto bg-gray-200 self-stretch my-2 shrink-0"></div>

            {/* Mission - Right Side */}
            <div className="flex-1 flex flex-col items-start text-left">

              <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#013759]">
                Mission
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-md leading-tight sm:leading-relaxed text-justify font-normal">
                To create a dynamic and collaborative incubation ecosystem that empowers entrepreneurs with the right resources, mentorship, and networks to grow. We aim to foster a student-first culture rooted in experiential learning, ethical innovation, and sustainability, while also supporting faculty through research and global collaboration. Our mission is to nurture socially responsible, future-ready innovators and build a self-sustaining platform that enables ideas of national and global importance to evolve into impactful startups.
              </p>
            </div>

          </div>
        </div>
      </section>





      {/* Social Sidebar */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col z-50 shadow-2xl hidden sm:flex border border-white/10 bg-black/40 backdrop-blur-md rounded-l-xl overflow-hidden">
        <a href="#" className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors border-b border-white/10">
           <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
          <a href="#" className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors border-b border-white/10">
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors border-b border-white/10">
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors border-b border-white/10">
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4l11.73 16h5L9 4z"></path></svg>
          </a>
          <a href="#" className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors">
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </a>
      </div>

      {/* Our Spaces Section */}
      <section className="relative w-full bg-white py-8 sm:py-24 border-b border-[#013759]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left md:text-center mb-4 md:mb-12">

            <h2 className="mb-2 sm:mb-6 font-normal text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#013759]">
              Our <span className="inline-block"><span className="text-[#10b981]">S</span><span className="text-[#ec4899]">p</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">c</span><span className="text-[#ef4444]">e</span><span className="text-[#8b5cf6]">s</span></span>
            </h2>
            <p className="md:mx-auto max-w-3xl text-gray-600 text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed mb-4 md:mb-8">
              We provide dynamic workspaces, expert mentorship, networking opportunities, and business support services to help startups and entrepreneurs thrive.
            </p>
          </div>

          {/* Interactive Card Stack for Desktop & Mobile */}
          <div className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[540px] h-[360px] sm:h-[460px] md:h-[540px] ml-0 md:mx-auto my-4 md:my-8 relative">
            <Stack
              randomRotation={true}
              sensitivity={160}
              sendToBackOnClick={true}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              cards={OUR_SPACES.map((space, idx) => (
                <div key={idx} className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 bg-[#013759] group">
                  <img src={space.image} alt={space.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 md:p-8 flex flex-col justify-end text-left">
                    <h3 className="text-lg md:text-2xl font-semibold text-white leading-snug">{space.title}</h3>
                    <p className="text-xs md:text-sm text-white/85 line-clamp-2 md:line-clamp-3 mt-1 md:mt-2 font-normal leading-tight md:leading-relaxed">{space.description}</p>
                  </div>
                </div>
              ))}
            />
          </div>
        </div>
      </section>

      {/* Schemes & Programs Section */}
      <section className="relative w-full bg-white py-10 lg:py-24 border-t border-gray-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Column - Info & Action */}
          <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#013759] tracking-tight leading-[1.15] mb-4 lg:mb-6">
              Explore Our Schemes and <br /> <span className="inline-block"><span className="text-[#10b981]">F</span><span className="text-[#ec4899]">l</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">g</span><span className="text-[#ef4444]">s</span><span className="text-[#8b5cf6]">h</span><span className="text-[#06b6d4]">i</span><span className="text-[#3b82f6]">p</span></span>  Programmes
            </h2>
            <p className="text-gray-600 text-sm md:text-md leading-relaxed text-justify mb-6 lg:mb-8 font-normal">
              At Navrachna Foundation, we coordinate incubation schemes that nurture entrepreneurs across every stage of their startup journey. These structured programs combine equity-free prototype grants, monthly fellowship stipends, intensive commercial scaling pipelines, and institutional resources to ensure early-stage ventures gain the right strategic assets to succeed.
            </p>
            <button className="rounded-xl bg-black px-6 py-2.5 sm:px-8 sm:py-3.5 font-medium text-xs sm:text-base text-white shadow-lg hover:bg-gray-800 transition-all duration-300 active:scale-95 cursor-pointer">
              View all Program
            </button>
          </div>

          {/* Right Column - Horizontal Scroll on Mobile / Vertical Scroll on Desktop */}
          <div className="w-full lg:w-[58%] overflow-hidden">
            {/* Custom Scrollbar Styling */}
            <style dangerouslySetInnerHTML={{__html: `
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
                height: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 9999px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 9999px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
              }
            `}} />

            <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto snap-x snap-mandatory gap-4 lg:gap-0 lg:space-y-4 pb-4 lg:pb-0 h-auto lg:h-[480px] pr-0 lg:pr-3 custom-scrollbar scroll-smooth">
              {SCHEMES.map((scheme, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 w-[82vw] sm:w-[340px] lg:w-full snap-start flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-sky-100/40 bg-[#f0f9ff] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Left Side Graphic Badge */}
                  <div className={`w-full sm:w-[180px] h-[100px] sm:h-[110px] rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br ${scheme.gradient} shadow-md`}>
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      <div className="w-full py-2 px-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-inner">
                        <span className="text-xs sm:text-sm font-semibold tracking-wide text-white uppercase block leading-tight">
                          {scheme.code}
                        </span>
                        <span className="text-[7.5px] text-white/80 block uppercase tracking-normal font-normal mt-0.5 leading-none">
                          {scheme.subCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Text Contents */}
                  <div className="flex-1 text-left flex flex-col items-start justify-center">
                    <h3 className="text-lg sm:text-xl font-normal tracking-tight text-[#013759]">
                      {scheme.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-normal text-gray-600 leading-relaxed mt-1.5 sm:mt-2 text-justify">
                      {scheme.description}
                    </p>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#074887] hover:text-[#fbbf24] transition-colors duration-300 mt-3 sm:mt-4 group/link"
                    >
                      Read More
                      <svg className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Facilities Section */}
      <section className="relative w-full bg-white py-10 lg:py-24 border-y border-[#013759]/30">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left Column - Info & Action */}
          <div className="w-full lg:w-[42%] flex flex-col items-start text-left lg:sticky lg:top-28">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#013759] tracking-tight leading-[1.15] mb-4 lg:mb-6">
              Advanced Incubation <br /> & Prototyping <span className="inline-block"><span className="text-[#10b981]">F</span><span className="text-[#ec4899]">a</span><span className="text-[#3b82f6]">c</span><span className="text-[#f59e0b]">i</span><span className="text-[#ef4444]">l</span><span className="text-[#8b5cf6]">i</span><span className="text-[#06b6d4]">t</span><span className="text-[#3b82f6]">i</span><span className="text-[#ec4899]">e</span><span className="text-[#10b981]">s</span></span>
            </h2>
            <p className="text-gray-600 text-sm md:text-md leading-relaxed text-justify mb-6 lg:mb-8 font-normal">
              We provide a well-equipped, engineering-grade workspace designed to accelerate hardware prototyping, deep tech computing, and startup scaling. Explore detailed specifications across all technical domains.
            </p>
            <button className="rounded-xl bg-black px-6 py-2.5 sm:px-8 sm:py-3.5 font-medium text-xs sm:text-base text-white shadow-lg hover:bg-gray-800 transition-all duration-300 active:scale-95 cursor-pointer">
              Book a Lab Tour
            </button>
          </div>

          {/* Right Column - Accordion List */}
          <div className="w-full lg:w-[58%] space-y-3">
            {FACILITIES_SPECS.map((spec, idx) => {
              const isOpen = activeFacility === idx;
              const details = [
                {
                  icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                },
                {
                  icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                },
                {
                  icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
                },
                {
                  icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                }
              ];
              const detail = details[idx % details.length];

              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setActiveFacility(isOpen ? -1 : idx)}
                    className="w-full py-3 px-4 sm:py-3.5 sm:px-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#013759] text-white flex items-center justify-center shrink-0 shadow-xs">
                        {detail.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-normal text-[#013759] leading-tight">
                          {spec.title}
                        </h3>
                        <span className="text-[11px] text-gray-500 font-normal">
                          {spec.specs.length} key specifications
                        </span>
                      </div>
                    </div>

                    <div className={`h-7 w-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content Body */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-3.5 pt-2 border-t border-slate-100 bg-[#fafafa]">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-0.5">
                        {spec.specs.map((item, i) => (
                          <li 
                            key={i} 
                            className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-normal leading-snug"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#074887] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-[#f8fafc] py-8 md:py-24 border-t border-slate-100/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left md:text-center mb-6 md:mb-16">

            <h2 className="mb-2 md:mb-4 font-normal text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#013759]">
              Why <span className="inline-block"><span className="text-[#10b981]">C</span><span className="text-[#ec4899]">h</span><span className="text-[#3b82f6]">o</span><span className="text-[#f59e0b]">o</span><span className="text-[#ef4444]">s</span><span className="text-[#8b5cf6]">e</span></span> Us
            </h2>
            <p className="text-xs sm:text-sm font-normal text-gray-500 max-w-2xl mx-0 md:mx-auto">
              Discover the exclusive benefits, technical facilities, and robust investment opportunities that make Navrachna Foundation the elite partner for modern startups.
            </p>
          </div>

          {/* Modern Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-5 lg:gap-6">
            
            {/* Hero Bento Card 1: Funding & Capital (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-[#013759] to-[#074887] p-5 sm:p-8 text-left text-white shadow-md relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 flex items-center justify-center shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal tracking-tight text-white leading-snug">
                      Access to Funding & Investment Opportunities
                    </h3>
                  </div>
                  <span className="text-[11px] font-normal tracking-wider text-sky-200 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md shrink-0">
                    Capital & Seed Grants
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal max-w-xl">
                  We connect incubated ventures directly with government seed grants, equity/non-equity funding schemes, angel networks, and venture capital partners to secure early velocity.
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-200">
                <span>Government Grants & VC Network</span>
                <a href="#contact" className="text-white font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                  Apply for Funding &rarr;
                </a>
              </div>
            </div>

            {/* Standard Bento Card: Direct Mentorship */}
            <div className="col-span-1 rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 text-left shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-[#013759]/5 text-[#013759] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-normal tracking-tight text-[#013759] leading-snug">
                    Direct Mentorship
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  1-on-1 strategic guidance from industry veterans, successful founders, and technical advisors to solve critical startup challenges.
                </p>
              </div>
            </div>

            {/* Standard Bento Card: Lab Support */}
            <div className="col-span-1 rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 text-left shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-[#013759]/5 text-[#013759] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-normal tracking-tight text-[#013759] leading-snug">
                    Lab Support
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Comprehensive prototyping equipment, 3D printing facilities, CNC tooling, and fabrication labs to build hardware prototypes.
                </p>
              </div>
            </div>

            {/* Hero Bento Card 2: High-Speed Internet & IT Support (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-[#013759] to-[#074887] p-5 sm:p-8 text-left text-white shadow-md relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 flex items-center justify-center shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal tracking-tight text-white leading-snug">
                      High-Speed Internet, IT & Cloud Support
                    </h3>
                  </div>
                  <span className="text-[11px] font-normal tracking-wider text-sky-200 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md shrink-0">
                    Gigabit Infrastructure & IT Services
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal max-w-xl">
                  Stay connected with ultra-reliable 1 Gbps gigabit Wi-Fi and ethernet connectivity. Includes dedicated IT helpdesk support, cloud infrastructure credits, server rack hosting, and cybersecurity guidance.
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-200">
                <span>1 Gbps Fiber Backhaul & IT Support</span>
                <a href="#services" className="text-white font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                  View IT Specs &rarr;
                </a>
              </div>
            </div>

            {/* Hero Bento Card 3: Rich Ecosystem (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-[#013759] to-[#074887] p-5 sm:p-8 text-left text-white shadow-md relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute left-0 bottom-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 flex items-center justify-center shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal tracking-tight text-white leading-snug">
                      Rich Ecosystem & Corporate Network
                    </h3>
                  </div>
                  <span className="text-[11px] font-normal tracking-wider text-sky-200 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md shrink-0">
                    Collaborative Hub
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal max-w-xl">
                  Immerse your venture in a thriving culture of shared success. Gain corporate matchmaking, market access channels, and continuous capacity building.
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-200">
                <span>10+ Incubated Ventures & Industry Partners</span>
                <a href="#about" className="text-white font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                  Explore Ecosystem &rarr;
                </a>
              </div>
            </div>

            {/* Standard Bento Card: Flexible Solutions (Placed beside Rich Ecosystem) */}
            <div className="col-span-1 rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 text-left shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-[#013759]/5 text-[#013759] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/></svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-normal tracking-tight text-[#013759] leading-snug">
                    Flexible Solutions
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Customized workspace arrangements tailored to single founders and expanding startup teams with scalable desk options.
                </p>
              </div>
            </div>

            {/* Standard Bento Card: Strategic Location */}
            <div className="col-span-1 rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 text-left shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-[#013759]/5 text-[#013759] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-normal tracking-tight text-[#013759] leading-snug">
                    Strategic Location
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Prime location in Knowledge Park 3, Greater Noida with seamless NCR transport accessibility and connectivity.
                </p>
              </div>
            </div>

            {/* Hero Bento Card 4: Most Affordable & Cost Effective (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-[#013759] to-[#074887] p-5 sm:p-8 text-left text-white shadow-md relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 flex items-center justify-center shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal tracking-tight text-white leading-snug">
                      Most Affordable Incubation & Co-Working
                    </h3>
                  </div>
                  <span className="text-[11px] font-normal tracking-wider text-sky-200 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md shrink-0">
                    Founder-Friendly Rates
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal max-w-xl">
                  We offer highly cost-effective seat plans, subsidized lab credits, and zero hidden overhead costs—ensuring early-stage founders maximize their financial runway.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-sky-200">
                <span>Subsidized Seats & Lab Access</span>
                <a href="#contact" className="text-white font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View Pricing Plans &rarr;
                </a>
              </div>
            </div>


          </div>
        </div>
      </section>





      {/* Clients Carousel Section */}
      <section className="w-full bg-white py-8 md:py-24 border-t border-slate-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 md:mb-16 text-left md:text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-black tracking-tight">
            Our Portfolio <span className="inline-block"><span className="text-[#10b981]">S</span><span className="text-[#ec4899]">t</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">r</span><span className="text-[#ef4444]">t</span><span className="text-[#8b5cf6]">u</span><span className="text-[#06b6d4]">p</span><span className="text-[#3b82f6]">s</span></span>
          </h2>
        </div>
        
        {/* Desktop Marquee Carousel (Visible on Desktop >= 768px) */}
        <div className="max-md:hidden relative w-full overflow-hidden py-2">
          {/* Left and Right Fade Overlays */}
          <div className="absolute top-0 left-0 h-full w-24 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-24 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-marquee-infinite">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((item, idx) => {
              const borderColors = [
                'border-sky-100/90 hover:border-sky-200',      // Light blue
                'border-orange-100/90 hover:border-orange-200',  // Light orange/peach
                'border-lime-100/90 hover:border-lime-200',      // Light yellow-green/lime
                'border-rose-100/90 hover:border-rose-200',      // Light pink/rose
                'border-teal-100/90 hover:border-teal-200',      // Light teal
                'border-purple-100/90 hover:border-purple-200'   // Light purple
              ];
              const logoIndex = idx % CLIENTS.length;
              const borderClass = borderColors[logoIndex % borderColors.length];
              const cardStyle = item.bgDark 
                ? 'bg-black border-slate-800 hover:border-slate-700' 
                : `bg-white ${borderClass}`;
              return (
                <div key={idx} className="flex flex-col items-center justify-center w-64 shrink-0 px-4 group">
                  <div className={`w-full h-32 rounded-[2rem] flex items-center justify-center p-5 shadow-sm border-4 ${cardStyle} transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                    <img 
                      src={item.src} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain transition-all duration-300" 
                    />
                  </div>
                  <span className="mt-2.5 text-xs font-medium tracking-wide text-slate-600 text-center truncate max-w-full">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Grid Layout (Visible on Mobile < 768px) */}
        <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CLIENTS.map((item, idx) => {
              const borderColors = [
                'border-sky-100/90',
                'border-orange-100/90',
                'border-lime-100/90',
                'border-rose-100/90',
                'border-teal-100/90',
                'border-purple-100/90'
              ];
              const borderClass = borderColors[idx % borderColors.length];
              const cardStyle = item.bgDark 
                ? 'bg-black border-slate-800' 
                : `bg-white ${borderClass}`;
              return (
                <div key={idx} className="flex flex-col items-center w-full">
                  <div className={`w-full h-24 rounded-2xl flex items-center justify-center p-3 shadow-xs border-2 ${cardStyle}`}>
                    <img 
                      src={item.src} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <span className="mt-2 text-[11px] font-medium tracking-wide text-slate-600 text-center truncate max-w-full">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Messages from Our Leaders */}
      <section className="w-full py-8 sm:py-14 md:py-20 bg-[#f8fafc] border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header - Left Aligned on Mobile, Centered on Desktop */}
          <div className="mb-6 sm:mb-12 text-left md:text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#013759] tracking-tight mb-2 sm:mb-3">
              Messages from Our <span className="inline-block"><span className="text-[#10b981]">L</span><span className="text-[#ec4899]">e</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">d</span><span className="text-[#ef4444]">e</span><span className="text-[#8b5cf6]">r</span><span className="text-[#06b6d4]">s</span></span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl mx-0 md:mx-auto font-normal">
              Guiding the vision of Navrachna Foundation — insights from the leaders who inspire and drive the foundation.
            </p>
          </div>

          {/* Leaders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col gap-3.5 sm:gap-5 hover:shadow-lg transition-all duration-300"
              >
                {/* Header row */}
                <div className="flex items-center gap-3.5 sm:gap-5">
                  <div className="shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-[#013759]/15 bg-slate-50">
                    <img
                      src={leader.photo}
                      alt={leader.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs sm:text-base font-normal text-[#013759]">
                      {leader.title}
                    </h3>
                    <div className="text-[10px] sm:text-xs tracking-wide text-gray-500 font-normal mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100" />

                {/* Quote */}
                <div className="relative">
                  <span
                    className="absolute -top-2 -left-1 text-3xl sm:text-5xl leading-none select-none pointer-events-none"
                    style={{ color: '#013759', opacity: 0.08 }}
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-left md:text-justify pl-2 font-normal">
                    {leader.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-8 md:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-left md:text-center mb-6 md:mb-16">

            <h2 className="mb-2 md:mb-4 font-normal text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#013759]">
              Frequently Asked <span className="inline-block"><span className="text-[#10b981]">Q</span><span className="text-[#ec4899]">u</span><span className="text-[#3b82f6]">e</span><span className="text-[#f59e0b]">s</span><span className="text-[#ef4444]">t</span><span className="text-[#8b5cf6]">i</span><span className="text-[#06b6d4]">o</span><span className="text-[#3b82f6]">n</span><span className="text-[#ec4899]">s</span></span>
            </h2>
            <p className="text-xs sm:text-sm font-normal text-gray-500 max-w-2xl mx-0 md:mx-auto">
              Find clear, simple answers to common questions about the Navrachna Foundation setup and application process.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl border transition-all duration-300 shadow-sm ${
                  openFaq === idx 
                    ? 'border-slate-200 bg-slate-50/20 shadow-md' 
                    : 'border-slate-100 bg-slate-50/40 hover:bg-white hover:border-slate-200'
                }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none"
                >
                  <span className={`text-sm sm:text-base md:text-lg tracking-tight leading-snug transition-colors duration-300 pr-2 ${openFaq === idx ? 'text-[#013759]' : 'text-gray-700'}`}>
                    {faq.question}
                  </span>
                  <span className={`shrink-0 transition-transform duration-300 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/5 text-[#013759] shadow-inner ${openFaq === idx ? 'rotate-180 text-emerald-600' : 'text-[#013759]'}`}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm font-normal text-gray-500 leading-relaxed pt-1 sm:pt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

