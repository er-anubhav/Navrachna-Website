import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import iicLogo from '../assets/navrachna_images/iic_logo.png'

export function IicItsecPage() {
  const pillarsList = [
    "Inspiring Spaces",
    "Vibrant Community",
    "Modern Amenities",
    "Strategic Location",
    "Flexible Solutions",
    "Most Affordable"
  ]

  const menteeList = [
    "Galgotias University, Gr. Noida",
    "Noida Institute of Engineering & Technology-Pharmacy Institute, Gr. Noida",
    "Vishveshwaraiya Group of Institutions, Dadari",
    "4Mangalmay Institutes of Management & Technology, Gr. Noida",
    "Dr. M.C. Saxena College of Engineering & Technology, Lucknow",
    "Institute of Management Studies Ghaziabad",
    "I.T.S College Of Pharmacy, Muradnagar",
    "Vishveshwarya Group of Institutions Dadari",
    "I.T.S Dental College Hospital & Research Centre Gr. Noida",
    "Mangalmay Institute of Engineering and Technology"
  ]

  const objectivesList = [
    "To motivate students, faculty and staff members to get an innovative solution for real life problems",
    "To develop better cognitive ability among student, faculty members and staff.",
    "To foster the culture of innovation in the campus",
    "To establish a functional ecosystem for scouting ideas and pre-incubation of ideas.",
    "To provide a pre-incubation, incubation, and acceleration facility for innovators.",
    "To create a start-up supporting mechanism in the campus.",
    "To support the institute for NIRF ranking and accreditation."
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-700 antialiased font-normal">
      
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
            Institution’s Innovation Council I.T.S Engineering College Greater Noida (IIC-ITSEC)
          </h1>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-8">
        
        {/* Card 1: About IIC-ITSEC */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xs">
          <h2 className="text-2xl text-[#013759] font-normal mb-6">
            About IIC-ITSEC
          </h2>
          <div className="text-sm text-gray-500 leading-relaxed flex flex-col gap-4 text-justify font-normal">
            <p>
              Institution’s Innovation Council (IIC) program of Ministry of Education Innovation Cell (MIC) aims at functioning IIC in I.T.S Engineering College (ITSEC) to streamline and strengthen the I&E ecosystem in the campus and foster the culture of Innovation among students, faculty and staff members through multitudinous modes leading to an innovation promotion in the campuses. ITSEC had established Institution Innovation Council (IIC) as per the norms of Innovation Cell, Ministry of Education, Government of India, during IIC Calendar year 2018-19. ITSEC had been rated with 3 Star Rating by MHRD & AICTE for conducting various activities prescribed by Innovation Cell, Ministry of HRD, Govt. of India to promote Innovation and Startup ecosystem in campus during the IIC calendar year 2018-19. ITSEC had been rated with 5 Star Rating and 4 Star Rating by MOE & AICTE for conducting various activities prescribed by Innovation Cell, Ministry of Education, Govt. of India to promote Innovation and Start-up ecosystem in campus during the IIC calendar year 2019-20 and 2020-21 respectively.
            </p>
            <p>
              ITSEC was recognized in the band “EXCELLENT” under the category “Colleges/Institutes (Private / Self Financed) (Technical)” in Atal Ranking of Institutions on Innovation Achievement(ARIIA) 2020-2021, a flagship program of the Ministry of Education, Government of India.
            </p>
            <p>
              Institution’s Innovation Council (IIC) of I.T.S Engineering College Greater Noida again rated as Highest Star Rating (4 Star) and received a Letter of Appreciation by Ministry of Education Innovation Cell (MIC) and AICTE for the continuous support and contribution towards building the innovation and entrepreneurship culture development in the campus and also extending support to help other Mentee IIC institutions towards growth of the IIC network during the academic year 2021-22.
            </p>
          </div>
        </div>

        {/* Card 2: Vision & Mission & Logo Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Vision */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl text-[#013759] font-normal mb-4">Vision</h3>
              <p className="text-xs text-gray-500 leading-relaxed text-justify font-normal">
                To make I.T.S Engineering College a global hub for pre-incubation, incubation and acceleration ecosystem to promote innovation, start-up and entrepreneurship.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl text-[#013759] font-normal mb-4">Mision</h3>
              <p className="text-xs text-gray-500 leading-relaxed text-justify font-normal">
                Institution’s Innovation Council (IIC) of I.T.S Engineering College Greater Noida, a program of Ministry of Education Innovation Cell in collaboration with AICTE, aims to systematically foster the culture of innovation, start-up and entrepreneurship ecosystem in the campus.
              </p>
            </div>
          </div>

          {/* Logo Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex items-center justify-center">
            <img 
              src={iicLogo} 
              alt="IIC ITSEC Logo" 
              className="max-h-24 object-contain max-w-full"
            />
          </div>

        </div>

        {/* Card 3: Session 2022-23 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xs">
          <h3 className="text-xl text-[#013759] font-normal mb-4">
            In the session 2022-23, ITSEC
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed text-justify font-normal">
            In the session 2022-23, ITSEC was again recognized as one of the best private institutes in the country, got 4 star rating and received letter of appreciation by MIC & AICTE. College was positioned in the Band of 151-300 in the Innovation Category and received Certificate of NIRF-Innovation 2023. .In the session 2023-24, ITSEC is once again the proud recipient of the IIC mentor-mentee scheme with funding support assistance from MIC & AICTE.
          </p>
        </div>

        {/* Card 4: Value Pillars list */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {pillarsList.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/50 border border-slate-50">
                <span className="text-xs text-gray-500 font-normal">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: Objective */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xs">
          <h3 className="text-xl text-[#013759] font-normal mb-6">Objective</h3>
          <ul className="flex flex-col gap-3 font-normal text-xs text-gray-500">
            {objectivesList.map((obj, idx) => (
              <li key={idx} className="flex gap-3 leading-relaxed">
                <span>—</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 6: Mentee Institutions List */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xs">
          <h3 className="text-xl text-[#013759] font-normal mb-6">
            The list of our mentee institutions/universities was as follows:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menteeList.map((inst, idx) => (
              <div key={idx} className="flex gap-3 text-xs text-gray-500 leading-normal font-normal">
                <span>{idx + 1}.</span>
                <span>{inst}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  )
}
