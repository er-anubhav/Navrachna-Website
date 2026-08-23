import React, { useState, useEffect } from 'react'
import { getFaqsByContext } from '../../services/faqsService'

const COMPREHENSIVE_FAQS = [
  {
    category: 'Incubation & Programs',
    question: 'Who can apply for incubation at Navrachna Foundation?',
    answer: 'Students, faculty members, independent researchers, innovators, and early-stage entrepreneurs from across India can apply. Whether you are at the concept stage or have a working prototype, Navrachna offers tailored program tracks to support your venture.'
  },
  {
    category: 'Incubation & Programs',
    question: 'What is the StartInUP program and how does it support startups?',
    answer: 'StartInUP is the official startup initiative under the UP Startup Policy 2020. Approved startups can receive up to ₹17,500/month as a sustenance allowance for 1 year, prototype grants up to ₹5 Lakhs, and seed capital up to ₹7.5 Lakhs for commercialization.'
  },
  {
    category: 'Incubation & Programs',
    question: 'What is the DST NewGen-IEDC Scheme?',
    answer: 'NewGen-IEDC is supported by the National Science & Technology Entrepreneurship Development Board (NSTEDB), DST, Government of India. It provides student-led projects with prototype development grants up to ₹2.5 Lakhs along with dedicated Fab Lab facilities and technical mentoring.'
  },
  {
    category: 'MSME & Grants',
    question: 'How does the MSME Business Incubator (MSME-BI) scheme work?',
    answer: 'As an approved MSME Business Incubator host institute, Navrachna assists innovators in securing financial assistance up to ₹15 Lakhs per idea under the MSME Innovative scheme for prototype development and commercial testing.'
  },
  {
    category: 'MSME & Grants',
    question: 'What are MSME Hackathons and who is eligible?',
    answer: 'MSME Hackathons are national innovation challenges hosted by the Ministry of MSME where selected ideas receive direct prototype funding up to ₹15 Lakhs. Engineering students, startups, and MSME units can submit solutions through Navrachna as their host institute.'
  },
  {
    category: 'Facilities & Labs',
    question: 'What facilities are available to incubatees?',
    answer: 'Incubatees get access to state-of-the-art facilities including high-speed 3D printers, PCB design & fabrication labs, CNC plasma cutters, high-end AI GPU workstations, electronics testing gear, dedicated co-working space, and conference rooms.'
  },
  {
    category: 'Facilities & Labs',
    question: 'Can startups access the incubator facilities after regular office hours?',
    answer: 'Yes! Approved incubation teams receive extended workspace passes allowing 24/7 access to co-working desks, high-speed Wi-Fi, and lab equipment to maintain their building velocity.'
  },
  {
    category: 'Eligibility & Process',
    question: 'Do I need a registered Section 8 or Private Limited company to apply?',
    answer: 'No. You can apply at the ideation stage as an individual or team. Once selected, our team will guide you through formal company incorporation, legal structure, and registration on Startup India & StartInUP portals.'
  },
  {
    category: 'Eligibility & Process',
    question: 'Does Navrachna take equity in early-stage startups?',
    answer: 'Grant support (like DST NewGen-IEDC and StartInUP prototype grants) is 100% equity-free. For formal incubation and long-term scaling support, standard incubation terms apply based on the specific program track.'
  },
  {
    category: 'Eligibility & Process',
    question: 'How long does the selection and onboarding process take?',
    answer: 'Initial application screening is completed within 48 hours. Eligible applicants are invited for a pitch presentation before our screening committee, and onboarding usually takes 7 to 10 working days.'
  }
]

const CATEGORIES = ['All', 'Incubation & Programs', 'MSME & Grants', 'Facilities & Labs', 'Eligibility & Process']

export function FaqPage() {
  const [faqsList, setFaqsList] = useState(COMPREHENSIVE_FAQS)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchFaqs() {
      const { data } = await getFaqsByContext('general')
      const formattedDynamic = (data || []).map(item => ({
        category: item.category || 'Incubation & Programs',
        question: item.question,
        answer: item.answer
      }))

      // Combine dynamic and static FAQs and deduplicate by question text
      const combined = [...formattedDynamic, ...COMPREHENSIVE_FAQS]
      const seen = new Set()
      const uniqueFaqs = []

      for (const item of combined) {
        const key = item.question ? item.question.toLowerCase().trim() : ''
        if (key && !seen.has(key)) {
          seen.add(key)
          uniqueFaqs.push(item)
        }
      }

      setFaqsList(uniqueFaqs)
    }
    fetchFaqs()
  }, [])

  // Filter logic
  const filteredFaqs = faqsList.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header Banner */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>
        
        <div className="relative w-full text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-sky-100 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Everything you need to know about our incubation programs, grants, prototyping facilities, and application procedures.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g., grants, MSME, Fab Lab)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main FAQ Content Section */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-200">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategory(cat)
                setOpenIndex(null)
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#074887] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}</span>
          {searchQuery && <span>Filter: "{searchQuery}"</span>}
        </div>

        {/* FAQ Accordions List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-base font-medium text-slate-800 mb-1">No matching questions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">Try adjusting your search terms or selecting a different category tab.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-lg bg-slate-100 text-xs text-slate-700 hover:bg-slate-200 font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div 
                  key={idx}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-xs ${
                    isOpen ? 'border-sky-300 ring-1 ring-sky-200 shadow-md' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <span className="inline-block text-[10px] font-semibold text-[#074887] uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-md w-fit border border-sky-100">
                        {faq.category}
                      </span>
                      <h3 className={`text-sm sm:text-base font-normal tracking-tight leading-snug transition-colors ${
                        isOpen ? 'text-[#013759]' : 'text-slate-800'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    <span className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 mt-1 ${
                      isOpen ? 'rotate-180 bg-[#074887] text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 mt-1">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Contact Support CTA Box */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-lg font-normal text-[#013759] tracking-tight mb-1">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">Can't find the answer you're looking for? Reach out directly to our incubation team.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <a 
              href="tel:+919540527700" 
              className="px-6 py-3.5 rounded-xl bg-black text-sm font-normal text-white! hover:bg-slate-800 shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Call +91 9540527700</span>
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl bg-black text-sm font-normal text-white! hover:bg-slate-800 shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Contact Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}