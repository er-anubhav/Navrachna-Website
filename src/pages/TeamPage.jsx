import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

// Import Localized Team Member Portraits
import teamMishra from '../assets/navrachna_images/team_mishra.png'
import teamSudhanshu from '../assets/navrachna_images/team_sudhanshu.png'
import teamShashwat from '../assets/navrachna_images/team_shashwat.png'
import teamShubham from '../assets/navrachna_images/team_shubham.png'
import teamSamiruddin from '../assets/navrachna_images/team_samiruddin.png'
import teamAlpana from '../assets/navrachna_images/team_alpana.png'

export function TeamPage() {
  const TEAM_MEMBERS = [
    {
      name: "Dr. S P Mishra",
      role: "Advisor, I.T.S Education Group",
      expertise: [
        "Team Management",
        "Researcher",
        "Organizational Development",
        "Entrepreneurship Development",
        "Leadership"
      ],
      tag: "Advisor",
      image: teamMishra
    },
    {
      name: "Mr. Sudhanshu Ranjan",
      role: "Head of Incubation",
      expertise: [
        "Startup Selection",
        "Commercialization",
        "Technology Transfer",
        "Business Assessment",
        "Market Survey",
        "Event Management",
        "Networking",
        "Branding & Marketing",
        "Financial & Budgeting"
      ],
      tag: "Head of Incubation",
      image: teamSudhanshu
    },
    {
      name: "Mr. Shashwat Panday",
      role: "Business Plan, Software Developer",
      expertise: [
        "AI & ML Systems",
        "AR and VR Environments",
        "Deep Tech Prototyping",
        "Product Survey",
        "Market Survey"
      ],
      tag: "Deep Tech",
      image: teamShashwat
    },
    {
      name: "Mr. Shubham Kumar",
      role: "Assistant Operations Manager",
      expertise: [
        "Financials & Budgeting",
        "Electricals & IoT",
        "Product Designing",
        "Engineering Concepts",
        "3D Modeling & Animation"
      ],
      tag: "Operations Manager",
      image: teamShubham
    },
    {
      name: "Md. Samiruddin Ansari",
      role: "Assistant Portfolio Manager",
      expertise: [
        "Embedded Expert",
        "Industrial IoT (IIoT)",
        "Electrical & Electronics",
        "PoC to Product Lifecycle",
        "Project Management"
      ],
      tag: "Portfolio Manager",
      image: teamSamiruddin
    },
    {
      name: "Ms. Alpana Chaudhary",
      role: "Office Executive",
      expertise: [
        "Documentation & Compliance",
        "Event Management",
        "Program Moderator"
      ],
      tag: "Executive Support",
      image: teamAlpana
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      
      {/* Hero Header Section */}
      <section className="relative flex min-h-[35vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            Our Team
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            The advisors, engineers, and incubation experts behind the technology entrepreneurs of the Navrachna Foundation.
          </p>
        </div>
      </section>

      {/* Team Member Cards Grid */}
      <section className="w-full py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div>
                  {/* Full Top Image Header */}
                  <div className="relative h-80 w-full overflow-hidden bg-slate-50 border-b border-slate-50">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-semibold text-[#074887] tracking-wider uppercase bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-xs">
                        {member.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl text-[#013759] font-normal leading-tight mb-1">{member.name}</h3>
                    <p className="text-xs text-gray-400 font-medium mb-5">{member.role}</p>
                    
                    {/* Expertise Badges */}
                    <div>
                      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">Expertise Focus</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((exp, eIdx) => (
                          <span 
                            key={eIdx} 
                            className="text-[10px] bg-slate-50 border border-slate-100 text-gray-500 px-2 py-0.5 rounded-md"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
