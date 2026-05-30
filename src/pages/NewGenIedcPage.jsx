import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
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
                Established within academic institutions, NewGen IEDCs provide mentorship, guidance, and resources to help students transform ideas into startups. The programme provides grant support of up to INR 2.5 Lakhs per project for prototype development. At ITS Engineering College, a total grant of <span className="text-[#013759]">₹2.87 Crore</span> has been sanctioned under this programme.
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

          {/* Objective & Mentoring & Incubation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs text-[#013759] uppercase tracking-widest font-normal">Objective</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify font-normal">
                To empower student-led innovation by providing financial support of up to Rs.2.5 lakh per project for Proof-of-Concept (PoC) or prototype development, while also fostering entrepreneurship through mentorship, capacity building, and commercialization pathways.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs text-[#013759] uppercase tracking-widest font-normal">Mentoring & Incubation</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify font-normal">
                Access to workshops, mentorship, and startup advisory under our entrepreneurship ecosystem.
              </p>
            </div>
          </div>

          {/* Additional Funding, Evaluation & Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100 pt-12">
            
            {/* Additional Funding */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs text-[#013759] font-normal uppercase tracking-wider">Additional Funding Opportunities</h3>
              <p className="text-xs text-gray-400 font-normal">Top-performing teams may qualify for:</p>
              <ul className="flex flex-col gap-3 text-xs text-gray-500 font-normal">
                <li className="flex gap-2"><span>—</span> <span>Follow-on grants in the upcoming MSME Hackathons chapter</span></li>
                <li className="flex gap-2"><span>—</span> <span>Incentives under StartinUP initiative</span></li>
              </ul>
            </div>

            {/* Evaluation & Selection Process */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs text-[#013759] font-normal uppercase tracking-wider">Evaluation & Selection Process</h3>
              <ul className="flex flex-col gap-3 text-xs text-gray-500 font-normal">
                <li>
                  <span className="text-[#074887]">Initial Shortlisting:</span> Based on innovation, feasibility, and social/commercial potential.
                </li>
                <li>
                  <span className="text-[#074887]">Final Pitch:</span> Presentation In front of expert panel (Incubation team + industry mentors).
                </li>
                <li>
                  <span className="text-[#074887]">Grant Approved:</span> Once the project gets technical approval and the budget is verified.
                </li>
              </ul>
            </div>

            {/* Eligibility Criteria */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs text-[#013759] font-normal uppercase tracking-wider">Eligibility Criteria</h3>
              <ul className="flex flex-col gap-3 text-xs text-gray-500 text-justify font-normal">
                <li className="flex gap-2"><span>—</span> <span>The proposed project should belong to the domain of science, engineering, technology, or allied fields.</span></li>
                <li className="flex gap-2"><span>—</span> <span>The project must be either hardware-based or a hardware-software integrated solution.</span></li>
                <li className="flex gap-2"><span>—</span> <span>This grant is applicable only to those startups or students who have not received funding exceeding ₹2.5 lakhs from any government or private sector organization for their idea.</span></li>
                <li className="flex gap-2"><span>—</span> <span>A maximum of 4 team members is allowed per project, with at least one member being a student of I.T.S Engineering College, Greater Noida.</span></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Section 3: Important Guidelines */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl text-[#013759] font-normal">Important Notes for All Selected Ideas</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-xs sm:text-sm text-gray-500 text-justify font-normal">
            <li className="flex gap-3">
              <span className="text-[#074887]">1.</span>
              <span>Each selected idea must include one mentor and one mentee from I.T.S Engineering College.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#074887]">2.</span>
              <span>Mentees are required to register their company using the company registration support provided under the project.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#074887]">3.</span>
              <span>If the mentee’s company is already registered within 1 year, valid bills/invoices related to the company formation must be submitted.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#074887]">4.</span>
              <span>Upon verification of documents, a reimbursement of up to ₹25,000 will be provided against company incorporation.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#074887]">5.</span>
              <span>The prototype must be completed & should be working, within 6 months after receiving the required materials, & must be duly submitted to Host Institute.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#074887]">6.</span>
              <span>A short delay may be accommodated, but only after committee approval.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#074887]">7.</span>
              <span>Any machinery or non-consumable item purchased under the project must be duly submitted at the time of final project submission.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#074887]">8.</span>
              <span>Monthly progress reports must be submitted in the prescribed format.</span>
            </li>
          </ol>
        </div>

        {/* Section 4: Timeline & Post-Grant Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-slate p-8 rounded-md">
          
          {/* Timeline */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm text-[#013759] uppercase tracking-wider font-normal">Application Timeline</h3>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Submission Deadline</span>
              <span className="text-base text-[#074887] font-normal">10 Aug 2025</span>
            </div>
          </div>

          {/* Post Grant Requirements */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm text-[#013759] uppercase tracking-wider font-normal">Post-Grant Requirements</h3>
            <ul className="flex flex-col gap-2 text-xs text-gray-500 font-normal mt-2">
              <li className="flex gap-2"><span>—</span> <span>Final working prototype submission & demonstration.</span></li>
              <li className="flex gap-2"><span>—</span> <span>Next Stage of Project/Commercialization planning.</span></li>
            </ul>
          </div>

          {/* Download & Presentation info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm text-[#013759] uppercase tracking-wider font-normal">Download Proposal Format</h3>
            <p className="text-xs text-gray-500 font-normal text-justify leading-relaxed">
              Be ready with your presentation in the given format. It will be held the next day after the last date, and the schedule will be emailed to you.
            </p>
            <div className="mt-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Proposal format download link.')
                }}
                className="inline-flex px-4 py-2 border border-[#013759] text-[#013759] hover:bg-[#013759] hover:text-white rounded-lg text-xs transition-all duration-200 cursor-pointer"
              >
                Download Proposal Format
              </a>
            </div>
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

          {/* Typographic Table Directory List */}
          <div className="flex flex-col divide-y divide-slate-100">
            {filteredProjects.map((project, idx) => (
              <div 
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors duration-200 px-4 rounded-xl"
              >
                {/* Left side: Preview & Info */}
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  {project.image && (
                    <div className="h-16 w-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base text-[#013759] font-normal leading-snug truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right side: Editorial text Link */}
                <div className="shrink-0 flex items-center justify-start sm:justify-end">
                  <Link 
                    to={`/programs/newgen-iedc/project/${slugify(project.title)}`}
                    className="text-xs text-[#074887] hover:underline flex items-center gap-1.5"
                  >
                    About Project <span>→</span>
                  </Link>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="py-16 text-center text-xs text-gray-400">
                No funded projects match your search query.
              </div>
            )}
          </div>

        </div>

      </main>

    </div>
  )
}
