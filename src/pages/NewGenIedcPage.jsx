import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/navrachna_images/newgen_projects_banner.png'
import { newgenProjects } from '../data/newgenProjects'
import { slugify } from './NewGenProjectDetailPage'

export function NewGenIedcPage() {
  const [activeYear, setActiveYear] = useState('2023-24')
  const [searchQuery, setSearchQuery] = useState('')

  const years = ['2023-24', '2022-23', '2021-22', '2020-21', '2019-20']

  // Dynamically parse the cohort year from the project category (e.g. "NewGen Projects 2019-20")
  const getYearForProject = (project) => {
    if (!project.category) return '2023-24'
    const yr = project.category.replace('NewGen Projects', '').trim()
    return yr || '2023-24'
  }

  // Filter projects by active tab & search query
  const filteredProjects = newgenProjects.filter(project => {
    const projYear = getYearForProject(project)
    const matchesYear = projYear === activeYear
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (project.mentor && project.mentor.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (project.mentee && project.mentee.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesYear && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased font-normal">
      
      {/* Hero Header */}
      <section className="relative flex min-h-[35vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            NewGenIDEC Programme
          </h1>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-16">
        
        {/* Section 1: About & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* About the Programme */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-[#013759] font-normal">About the Programme</h2>
            <div className="text-xs sm:text-sm text-gray-500 leading-relaxed flex flex-col gap-4 text-justify font-normal">
              <p>
                The New Generation Innovation and Entrepreneurship Development Centre (NewGen IEDC) is a programme launched by the Department of Science & Technology (DST) under the National Science & Technology Entrepreneurship Development Board (NSTEDB), Government of India, in 2018 for a tenure of five years. It is implemented through EDII, Ahmedabad and aims to promote knowledge-based and technology-driven startups by nurturing young innovators within an academic environment.
              </p>
              <p>
                Established within academic institutions, NewGen IEDCs provide mentorship, guidance, and resources to help students transform ideas into startups. The programme provides grant support of up to INR 2.5 Lakhs per project for prototype development. At I.T.S Engineering College, a total grant of <span className="text-[#013759]">₹2.87 Crore</span> has been sanctioned under this programme.
              </p>
            </div>
          </div>

          {/* Objective of NewGen IEDC */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-[#013759] font-normal">Objective of NewGen IEDC</h2>
            <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-gray-500 text-justify font-normal">
              <li className="flex gap-2">
                <span>—</span>
                <span>To harness the knowledge and energy of youth, encouraging them to actively contribute to the nation’s economic growth.</span>
              </li>
              <li className="flex gap-2">
                <span>—</span>
                <span>To foster the development of innovation-led, knowledge-based enterprises and promote self-employment, especially among students.</span>
              </li>
              <li className="flex gap-2">
                <span>—</span>
                <span>To nurture a culture of entrepreneurship driven by innovation and creativity.</span>
              </li>
              <li className="flex gap-2">
                <span>—</span>
                <span>To establish an institutional support system that offers comprehensive guidance, resources, and information for aspiring S&T entrepreneurs.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Section 2: Call for Application Details */}
        <div className="flex flex-col gap-12 border-t border-slate pt-16">
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-[#074887] uppercase tracking-widest font-normal">Opportunity</span>
            <h2 className="text-2xl text-[#013759] font-normal">Call for Application</h2>
            <p className="text-xs text-gray-400 font-normal">
              Supported by: Department of Science & Technology, Government of India, through NewGen Innovation & Entrepreneurship Development Centre (IEDC)
            </p>
          </div>

          {/* Available Support Block */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs text-[#013759] uppercase tracking-wider font-normal">
              Available Support Prototype Grant (Up to Rs.2.5 lakh per project)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-slate-100 py-8">
              <div className="flex flex-col gap-2 border-l-2 border-[#074887] pl-4">
                <span className="text-[#074887] text-base font-normal">Rs. 25,000</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Mentor Support</span>
                <p className="text-xs text-gray-500 font-normal leading-relaxed text-justify mt-1">
                  Professional advisory and technical guidance from domain experts.
                </p>
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-[#074887] pl-4">
                <span className="text-[#074887] text-base font-normal">Rs. 25,000</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Company Registration Support</span>
                <p className="text-xs text-gray-500 font-normal leading-relaxed text-justify mt-1">
                  Dedicated stipend support to facilitate forming a formal legal entity for the mentee.
                </p>
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-[#074887] pl-4">
                <span className="text-[#074887] text-base font-normal">Rs. 200,000</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Materials & Prototyping</span>
                <p className="text-xs text-gray-500 font-normal leading-relaxed text-justify mt-1">
                  Funding for physical items, specialized software components, fabrication, and building tools.
                </p>
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs text-[#013759] uppercase tracking-widest font-normal">Objective</h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify font-normal">
              To empower student-led innovation by providing financial support of up to Rs.2.5 lakh per project for Proof-of-Concept (PoC) or prototype development, while also fostering entrepreneurship through mentorship, capacity building, and commercialization pathways.
            </p>
          </div>

          {/* Additional Funding */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-12">
            <h3 className="text-xs text-[#013759] font-normal uppercase tracking-wider">Additional Funding Opportunities</h3>
            <p className="text-xs text-gray-400 font-normal">Top-performing teams may qualify for:</p>
            <ul className="flex flex-col gap-3 text-xs text-gray-500 font-normal">
              <li className="flex gap-2"><span>—</span> <span>Follow-on grants in the upcoming MSME Hackathons chapter</span></li>
              <li className="flex gap-2"><span>—</span> <span>Incentives under StartinUP initiative</span></li>
            </ul>
          </div>

        </div>

        {/* Section 5: Typographic Projects Directory */}
        <div className="flex flex-col gap-8 border-t border-slate-100 pt-16">
          
          <div className="text-center">
            <h2 className="text-2xl text-[#013759] font-normal">NewGen Funded Projects Directory</h2>
            <p className="text-xs text-gray-400 mt-2">
              Explore the innovative prototypes and products funded through the NewGen-IEDC programme.
            </p>
          </div>

          {/* Filtering Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            
            {/* Year cohort selector tabs */}
            <div className="flex flex-wrap gap-2">
              {years.map(yr => (
                <button
                  key={yr}
                  onClick={() => {
                    setActiveYear(yr)
                    setSearchQuery('')
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
                    activeYear === yr 
                      ? 'bg-[#013759] text-white' 
                      : 'bg-slate-50 text-gray-500 hover:bg-slate-100'
                  }`}
                >
                  {yr} Cohort
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full md:w-64 bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#013759]"
              />
            </div>

          </div>

          {/* Card Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project, idx) => (
              <Link
                key={idx}
                to={`/programs/newgen-iedc/project/${slugify(project.title)}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="h-52 w-full bg-slate-100 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-sm text-[#013759] font-medium leading-snug line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">
                    {project.description}
                  </p>
                  <span className="mt-2 text-xs text-[#074887] group-hover:underline">About Project →</span>
                </div>
              </Link>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-3 py-16 text-center text-xs text-gray-400">
                No funded projects match your search query.
              </div>
            )}
          </div>

        </div>

      </main>

    </div>
  )
}
