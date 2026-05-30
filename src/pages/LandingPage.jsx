import React, { useState, useEffect, useRef } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import programsBg from '../assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp'
import spaceImg1 from '../assets/navrachna_images/image-RHC5QKD-e1734675533295.jpg'
import spaceImg2 from '../assets/navrachna_images/image-JJL9YTX-e1734675480258.jpg'
import spaceImg3 from '../assets/navrachna_images/image-KJ66VQB-e1734675565430.jpg'
import spaceImg4 from '../assets/navrachna_images/image-A2SAUCS-e1734675593163.jpg'
import { HeaderV1 } from '../components/HeaderV1'
import { FooterV1 } from '../components/FooterV1'

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

const CLIENTS = [client1, client2, client3, client4, client5, client6, client7, client8, client9, client10];

const UPDATES = [
  "Applications are now open for the Annual Logo Design Competition. Submit your creative portfolios today.",
  "Join the upcoming MSME Hackathons to solve real-world industry challenges and secure seed funding.",
  "Discover funding and incubation opportunities through our specialized Startin-Up and NewGen-IEDC programs.",
  "Access our state-of-the-art Fabrication Lab and High-End Compute resources to accelerate your prototyping."
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
    link: "#"
  },
  {
    title: "NewGen-IEDC",
    description: "The NewGen IEDC program helps students develop entrepreneurial skills, test startup ideas, and connect with investors. We provide a dynamic and collaborative workspace that empowers you.",
    link: "#"
  },
  {
    title: "MSME-BI",
    description: "Participate in MSME Hackathons to solve real-world industry challenges and secure seed funding. A direct approach towards solving your startup problems with 1 to 1 mentorship.",
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
    answer: "Navrachna Foundation for Entrepreneurship Development is a subsidiary of I.T.S. Engineering College that supports young entrepreneurs in commercializing their technologies and launching startups."
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
    title: "Acceleration Programs",
    description: "Access tailored incubation modules, prototype funding, venture mentorship, and investor matchmaking pipelines to scale your early-stage startup.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Mentorship & Expert Guidance",
    description: "Work shoulder-to-shoulder with veteran entrepreneurs, technology experts, and IP advisors to accelerate product-market fit.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Co-working Space & Infrastructure",
    description: "Scale in our premium co-working facility, featuring plug-and-play seating, smart meeting rooms, high-end compute systems, and prototyping labs.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Fabrication & Tool Room",
    description: "Build deep prototypes using precision machinery, including CNC CO2 Laser Cutters, Plasma Cutters, and advanced manual prototyping tools.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "3D Printing Facility",
    description: "Bring design concepts to life with professional FDM, SLA, and resin 3D printers, supporting over 40 types of specialized engineering filaments.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "AI & Simulations Grid",
    description: "Leverage state-of-the-art compute hardware on a flexible compute-rental basis for intensive AI model training and engineering simulations.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Premium Meeting Rooms",
    description: "Host presentations, pitch panels, and board reviews in modern rooms featuring integrated AV gear, screen casting, and high-speed Wi-Fi.",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80"
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
    <div className="relative min-h-screen w-full bg-[#111111]">

      {/* Top Announcement Bar */}
      <div className="relative z-40 flex h-10 w-full items-stretch border-b border-white/10 bg-[#111111]">
        <div className="flex items-center bg-[#074887] px-4 py-2 text-xs tracking-wider text-white sm:px-6 sm:text-sm">
          Announcements
        </div>
        <div className="relative flex flex-1 items-center overflow-hidden px-4">
          {UPDATES.map((update, index) => (
            <div
              key={index}
              className={`absolute left-4 right-4 flex items-center transition-all duration-700 ease-in-out ${
                index === currentUpdate
                  ? 'translate-y-0 opacity-100 z-10'
                  : 'translate-y-4 opacity-0 z-0 pointer-events-none'
              }`}
            >
              <span className="text-xs font-medium text-white sm:text-sm">
                {update}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className="relative flex min-h-[85vh] md:min-h-[90vh] py-20 w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black/65 pointer-events-none"></div>
        </div>

        <div className="relative z-10 flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-7xl mt-12 tracking-tighter text-white drop-shadow-lg">
            <span className='font-serif text-6xl tracking-tighter'>Where Ideas, Take Flight</span></h1>
          <p className="mt-6 max-w-2xl text-md text-white sm:text-md">
            A premium co-working and incubation experience <br /> designed for clarity, momentum, and exceptional founder conversion.
          </p>
          <span className="mb-2 mt-8 rounded-md border border-white/20 px-4 py-1.5 text-sm tracking-wider text-white backdrop-blur-md">
            Navrachna Foundation for Entrepreneurship Development
          </span>
          
          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-md bg-[#074887] px-4 py-4 font-semibold text-white shadow-[0_0_20px_rgba(7,72,135,0.4)] transition-all hover:bg-[#013759] hover:shadow-[0_0_30px_rgba(7,72,135,0.6)] hover:-translate-y-1">
              Join the Workspace
            </button>
            <button className="rounded-md border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-1">
              Explore Programs
            </button>
          </div>
        </div>
      </section>

      {/* NFED Section */}
      <section id="about" className="relative w-full bg-white py-24 overflow-hidden border-b border-gray-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Staggered Rounded Cards */}
          <div className="w-full lg:w-[48%] flex items-center justify-center h-[520px] relative">
            {/* Elevated Left Card */}
            <div className="w-[46%] h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white absolute left-4 top-4 transform -translate-y-8 hover:-translate-y-10 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#013759]">
              <img 
                src={heroImage} 
                alt="Navrachna Incubator Facility" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Lower Right Card */}
            <div className="w-[46%] h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white absolute right-4 bottom-4 transform translate-y-8 hover:translate-y-6 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#074887]">
              <img 
                src={programsBg} 
                alt="Co-working workspace desks" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Informational Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <h2 className="mb-6 text-4xl md:text-5xl tracking-tight text-[#013759] leading-tight">
              Navrachna Foundation for
              Entrepreneurship 
              Development
            </h2>

            <div className="text-gray-600 text-md font-normal leading-relaxed space-y-6 text-justify mb-8">
              <p>
                Navrachna Foundation for Entrepreneurship Development (NFED) is an autonomous, sector-agnostic startup incubator and premium co-working ecosystem registered under the societies registration framework to empower founders with early-stage velocity and institutional support.
              </p>
              <p>
                NFED nurtures innovation-driven startups by providing seamless physical incubation infrastructure, high-fidelity mentoring channels, deep access to institutional and private seed funds, fabrication assets, and business matchmaking. Operated under the aegis of I.T.S. Engineering College, Greater Noida, NFED serves as the strategic regional node for transforming research and raw academic ideas into high-conversion, venture-backed startups.
              </p>
            </div>

            <button className="rounded-lg bg-black px-8 py-3.5 font-bold text-white shadow-lg hover:bg-[#074887] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal Values Strip */}
      <section className="relative w-full bg-white py-10 border-y border-[#074887]/10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#074887]/10">
            {/* Value 1 — PDF: 96+ Projects Developed */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">96+</span>
              <span className="text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">Projects Developed</span>
            </div>
            {/* Value 2 — PDF: ₹2.87 Cr DST Grant */}
            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">₹2.87 Cr</span>
              <span className="text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">DST Grant Received</span>
            </div>
            {/* Value 3 — PDF: ₹1.59 Cr MSME Grant */}
            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">₹1.59 Cr</span>
              <span className="text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">MSME Grant Received</span>
            </div>
            {/* Value 4 — PDF: 66+ Patents Filed */}
            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">66+</span>
              <span className="text-xs font-normal text-[#074887] uppercase tracking-wider mt-2">Patents Filed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative w-full bg-[#f8fafc] py-20 border-b border-gray-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 lg:gap-16">
            
            {/* Vision - Left Side */}
            <div className="flex-1 flex flex-col items-start text-left">
              <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#10b981]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#10b981] uppercase">
                Our Vision
              </span>
              <h2 className="mb-6 text-3xl md:text-4xl font-normal tracking-tight text-[#013759]">
                Vision
              </h2>
              <p className="text-gray-600 text-base md:text-md leading-relaxed text-justify font-normal">
                To create an innovative workspace and sector-agnostic startup incubator that nurtures passionate entrepreneurs, fosters highly collaborative creativity, and accelerates early-stage startup success into prominent global market leaders.
              </p>
            </div>

            {/* Vertical Divider Line */}
            <div className="hidden md:block w-px bg-gray-250 self-stretch my-2 shrink-0"></div>

            {/* Mission - Right Side */}
            <div className="flex-1 flex flex-col items-start text-left">
              <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#3b82f6]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#3b82f6] uppercase">
                Our Purpose
              </span>
              <h2 className="mb-6 text-3xl md:text-4xl font-normal tracking-tight text-[#013759]">
                Mission
              </h2>
              <p className="text-gray-600 text-base md:text-md leading-relaxed text-justify font-normal">
                To provide a dynamic, world-class collaborative workspace that empowers young founders and student innovators with seed prototype funding, high-fidelity mentoring frameworks, state-of-the-art labs, and a robust investor matchmaking pipeline.
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
      <section className="relative w-full bg-white py-24 border-t border-gray-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
              Services Offered
            </span>
            <h2 className="mb-6 font-normal text-3xl md:text-5xl tracking-tight text-[#013759]">
              Our <span className="inline-block"><span className="text-[#10b981]">S</span><span className="text-[#ec4899]">p</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">c</span><span className="text-[#ef4444]">e</span><span className="text-[#8b5cf6]">s</span></span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              We provide dynamic workspaces, expert mentorship, networking opportunities, and business support services to help startups and entrepreneurs thrive.
            </p>
            {/* Scroll Navigation Controls */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => scroll('left')}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#074887]/5 border border-[#074887]/10 text-[#013759] hover:bg-[#074887] hover:text-white hover:border-[#074887] transition-all duration-300 active:scale-95 shadow-md cursor-pointer"
                aria-label="Scroll Left"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#074887]/5 border border-[#074887]/10 text-[#013759] hover:bg-[#074887] hover:text-white hover:border-[#074887] transition-all duration-300 active:scale-95 shadow-md cursor-pointer"
                aria-label="Scroll Right"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Custom style to completely hide the scrollbar dynamically */}
          <style dangerouslySetInnerHTML={{__html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}} />

          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 no-scrollbar flex-nowrap w-full lg:justify-start snap-x snap-mandatory -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
          >
            {OUR_SPACES.map((space, idx) => (
              <div 
                key={idx} 
                className="w-[320px] sm:w-[360px] md:w-[380px] h-[450px] shrink-0 snap-start relative overflow-hidden rounded-[2rem] group shadow-md hover:shadow-xl border border-gray-100/30 transition-all duration-500 ease-out hover:-translate-y-2"
              >
                {/* Background Image */}
                <img 
                  src={space.image} 
                  alt={space.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette Overlay for initial view readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10"></div>

                {/* Top Right Action Arrow Link */}
                <div className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white transition-all duration-300 group-hover:bg-[#fbbf24] group-hover:text-[#013759] group-hover:rotate-45">
                  <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>

                {/* Bottom Left Title (Initial State - hides on hover) */}
                <div className="absolute bottom-8 left-8 right-8 z-20 text-left transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-4">
                  <h3 className="text-2xl font-normal tracking-tight text-white leading-snug">
                    {space.title}
                  </h3>
                </div>

                {/* Hover Details Panel (Slides up and fades in on hover) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#013759]/95 to-[#074887]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-30 flex flex-col justify-end p-8 text-left">
                  {/* Detailed Title inside Hover State */}
                  <h3 className="text-2xl font-normal tracking-tight text-white mb-4 leading-snug">
                    {space.title}
                  </h3>
                  {/* Description */}
                  <p className="text-sm font-normal text-white/90 leading-relaxed mb-8">
                    {space.description}
                  </p>
                  {/* Action Call to Action Button */}
                  <button className="w-full py-3.5 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-[#013759] font-semibold text-sm transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500 delay-100 shadow-lg">
                    Explore Program
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schemes & Programs Section */}
      <section className="relative w-full bg-white py-24 border-t border-gray-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column - Info & Action */}
          <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
            <h2 className="text-4xl md:text-5xl font-normal text-[#013759] tracking-tight leading-[1.15] mb-6">
              Explore Our <span className="inline-block"><span className="text-[#10b981]">F</span><span className="text-[#ec4899]">l</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">g</span><span className="text-[#ef4444]">s</span><span className="text-[#8b5cf6]">h</span><span className="text-[#06b6d4]">i</span><span className="text-[#3b82f6]">p</span></span> <br /> Schemes and Programmes
            </h2>
            <p className="text-gray-600 text-base md:text-md leading-relaxed text-justify mb-8 font-normal">
              At Navrachna Foundation (NFED), we coordinate flagship incubation schemes that nurture entrepreneurs across every stage of their startup journey. These structured programs combine equity-free prototype grants, monthly fellowship stipends, intensive commercial scaling pipelines, and institutional resources to ensure early-stage ventures gain the right strategic assets to succeed.
            </p>
            <button className="rounded-xl bg-black px-8 py-3.5 font-medium text-white shadow-lg hover:bg-gray-800 transition-all duration-300 active:scale-95 cursor-pointer">
              View all Program
            </button>
          </div>

          {/* Right Column - Scrollable Cards */}
          <div className="w-full lg:w-[58%]">
            {/* Custom Vertical Scrollbar Styling */}
            <style dangerouslySetInnerHTML={{__html: `
              .custom-v-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-v-scrollbar::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 9999px;
              }
              .custom-v-scrollbar::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 9999px;
              }
              .custom-v-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
              }
            `}} />

            <div className="h-[480px] overflow-y-auto pr-3 space-y-4 custom-v-scrollbar scroll-smooth">
              {SCHEMES.map((scheme, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl border border-sky-100/40 bg-[#f0f9ff] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Left Side Graphic Badge */}
                  <div className={`w-full sm:w-[180px] h-[110px] rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br ${scheme.gradient} shadow-md`}>
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      <div className="w-full py-2 px-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-inner">
                        <span className="text-sm font-semibold tracking-wide text-white uppercase block leading-tight">
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
                    <h3 className="text-xl font-normal tracking-tight text-[#013759]">
                      {scheme.title}
                    </h3>
                    <p className="text-sm font-normal text-gray-600 leading-relaxed mt-2 text-justify">
                      {scheme.description}
                    </p>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#074887] hover:text-[#fbbf24] transition-colors duration-300 mt-4 group/link"
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
      <section className="relative w-full bg-white py-20 border-t border-gray-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header row with punchy h2 and discover more button */}
          <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
                Top-Notch Setup
              </span>
              <h2 className="mb-4 font-normal text-3xl md:text-5xl tracking-tight text-[#013759]">
                Our <span className="inline-block"><span className="text-[#10b981]">F</span><span className="text-[#ec4899]">a</span><span className="text-[#3b82f6]">c</span><span className="text-[#f59e0b]">i</span><span className="text-[#ef4444]">l</span><span className="text-[#8b5cf6]">i</span><span className="text-[#06b6d4]">t</span><span className="text-[#3b82f6]">i</span><span className="text-[#ec4899]">e</span><span className="text-[#10b981]">s</span></span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify font-normal">
                We provide a well-equipped, elite workspace designed to boost productivity and rapid prototyping. Select a workspace tab below to view our advanced specifications.
              </p>
            </div>
          </div>

          {/* Interactive Tab Switcher Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {FACILITIES_SPECS.map((spec, idx) => {
              const isActive = activeFacility === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveFacility(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs tracking-wide transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#000000] text-white shadow-md shadow-sky-900/20 scale-[1.02]' 
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-[#013759]'
                  }`}
                >
                  {spec.title}
                </button>
              );
            })}
          </div>

          {/* Active Facility Content Display */}
          {(() => {
            const spec = FACILITIES_SPECS[activeFacility];
            // Consistent, premium icons & subtitles for each facility tab
            const details = [
              {
                subtitle: 'Advanced Prototyping & Fabrication Assets',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              },
              {
                subtitle: 'High-Fidelity SLA & FDM Materials Systems',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              },
              {
                subtitle: 'High-Performance AI & Machine Learning Nodes',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
              },
              {
                subtitle: 'Premium Collaboration Desks & Plug-n-Play Stations',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              }
            ];
            const activeDetail = details[activeFacility % details.length];

            return (
              <div className="w-full flex flex-col lg:flex-row gap-0 overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm">

                {/* Left: dark identity panel */}
                <div className="bg-[#013759] px-8 py-10 flex flex-col justify-between lg:w-64 shrink-0">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300/70 mb-3">
                      {activeDetail.subtitle}
                    </p>
                    <h3 className="text-2xl font-normal tracking-tight text-white leading-snug">{spec.title}</h3>
                  </div>
                  <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sky-300 border border-white/10">
                    {activeDetail.icon}
                  </div>
                </div>

                {/* Right: plain spec list with dividers */}
                <div className="flex-1 bg-white px-8 py-6">
                  <ul className="divide-y divide-slate-100">
                    {spec.specs.map((item, i) => (
                      <li key={i} className="flex items-start gap-5 py-4">
                        <span className="mt-0.5 text-[10px] font-bold text-[#013759]/40 w-5 shrink-0 text-right">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <a href="/facilities" className="text-xs font-semibold text-[#013759] hover:underline">
                      Explore all facilities →
                    </a>
                  </div>
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-[#f8fafc] py-24 border-t border-slate-100/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
              FOUNDATION ADVANTAGE
            </span>
            <h2 className="mb-4 font-normal text-3xl md:text-5xl font-normal tracking-tight text-[#013759] sm:text-5xl">
              Why <span className="inline-block"><span className="text-[#10b981]">C</span><span className="text-[#ec4899]">h</span><span className="text-[#3b82f6]">o</span><span className="text-[#f59e0b]">o</span><span className="text-[#ef4444]">s</span><span className="text-[#8b5cf6]">e</span></span> Us
            </h2>
            <p className="text-sm font-normal text-gray-500 max-w-2xl mx-auto">
              Discover the exclusive benefits, technical facilities, and robust investment opportunities that make Navrachna Foundation the elite partner for modern startups.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...BENEFITS_COL1, ...BENEFITS_COL2, ...BENEFITS_COL3].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 text-left shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/5 text-[#013759] shadow-inner mb-6 transition-all duration-300 group-hover:bg-[#013759]/5">
                  {React.cloneElement(item.icon, { className: 'text-[#013759] w-6 h-6', strokeWidth: 2 })}
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="mb-2 text-lg font-normal tracking-tight text-[#013759] transition-colors duration-300 group-hover:text-black">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Clients Carousel Section */}
      <section className="w-full bg-white py-24 border-t border-slate-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-normal tracking-widest text-[#074887] mb-4 block">OUR ECOSYSTEM</span>
            <h2 className="text-3xl md:text-5xl font-normal text-black tracking-tight">
              Our Portfolio <span className="inline-block"><span className="text-[#10b981]">S</span><span className="text-[#ec4899]">t</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">r</span><span className="text-[#ef4444]">t</span><span className="text-[#8b5cf6]">u</span><span className="text-[#06b6d4]">p</span><span className="text-[#3b82f6]">s</span></span>
            </h2>
          </div>
          
          <div className="relative w-full overflow-hidden">
            {/* Left and Right Fade Overlays */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-marquee-infinite">
              {[...CLIENTS, ...CLIENTS].map((logo, idx) => {
                const borderColors = [
                  'border-sky-100/90 hover:border-sky-200',      // Light blue
                  'border-orange-100/90 hover:border-orange-200',  // Light orange/peach
                  'border-lime-100/90 hover:border-lime-200',      // Light yellow-green/lime
                  'border-rose-100/90 hover:border-rose-200',      // Light pink/rose
                  'border-teal-100/90 hover:border-teal-200',      // Light teal
                  'border-purple-100/90 hover:border-purple-200'   // Light purple
                ];
                const borderClass = borderColors[idx % borderColors.length];
                return (
                  <div key={idx} className="flex h-36 w-64 shrink-0 items-center justify-center px-4">
                    <div className={`w-full h-full bg-white rounded-[2rem] flex items-center justify-center p-6 shadow-sm border-4 ${borderClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
                      <img 
                        src={logo} 
                        alt={`Client Logo ${idx}`} 
                        className="max-h-full max-w-full object-contain transition-all duration-300" 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
              COMMON QUERIES
            </span>
            <h2 className="mb-4 font-normal text-3xl md:text-5xl font-normal tracking-tight text-[#013759] sm:text-5xl">
              Frequently Asked <span className="inline-block"><span className="text-[#10b981]">Q</span><span className="text-[#ec4899]">u</span><span className="text-[#3b82f6]">e</span><span className="text-[#f59e0b]">s</span><span className="text-[#ef4444]">t</span><span className="text-[#8b5cf6]">i</span><span className="text-[#06b6d4]">o</span><span className="text-[#3b82f6]">n</span><span className="text-[#ec4899]">s</span></span>
            </h2>
            <p className="text-sm font-normal text-gray-500 max-w-2xl mx-auto">
              Find clear, simple answers to common questions about the Navrachna Foundation setup and application process.
            </p>
          </div>

          <div className="space-y-4">
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
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className={`text-base md:text-lg tracking-tight transition-colors duration-300 ${openFaq === idx ? 'text-[#013759]' : 'text-gray-700'}`}>
                    {faq.question}
                  </span>
                  <span className={`shrink-0 transition-transform duration-300 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#013759] shadow-inner ${openFaq === idx ? 'rotate-180 text-emerald-600' : 'text-[#013759]'}`}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-6 text-sm font-normal text-gray-500 leading-relaxed pt-2">
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

