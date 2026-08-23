import React, { useState, useEffect } from 'react'
import { getPublishedAnnouncements } from '../../services/announcementsService'
import { UPDATES } from '../../data/landingData'

export function AnnouncementsTicker() {
  const [currentUpdate, setCurrentUpdate] = useState(0)
  const [showAnnouncementsModal, setShowAnnouncementsModal] = useState(false)
  const [announcements, setAnnouncements] = useState(UPDATES)

  useEffect(() => {
    async function fetchAnnouncements() {
      const { data } = await getPublishedAnnouncements()
      if (data && data.length > 0) {
        const formatted = data.map(a => ({
          tag: a.tag || 'Notice',
          text: a.content || a.title
        }))
        setAnnouncements(formatted)
      }
    }
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % (announcements.length || 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [announcements.length])

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="relative z-40 flex min-h-14 sm:min-h-13 py-1.5 sm:py-0 w-full items-center border-b border-white/15 bg-[#0a192f] overflow-hidden shadow-md">
        <div className="flex items-center shrink-0 bg-[#074887] px-3 sm:px-6 py-3 text-xs sm:text-sm font-bold tracking-widest text-white uppercase shadow-sm">
          <span className="hidden sm:inline">Announcements</span>
          <span className="sm:hidden flex items-center gap-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.684A1.76 1.76 0 013 12V9a1.76 1.76 0 012.436-1.684l.033.016 5.531 2.766v3.836l-5.531 2.766-.033.016z" />
            </svg>
          </span>
        </div>
        <div 
          onClick={() => setShowAnnouncementsModal(true)}
          className="relative flex flex-1 items-center overflow-hidden px-3 sm:px-5 min-h-14 sm:min-h-13 cursor-pointer hover:bg-white/5 transition-colors"
          title="Click to view all announcements"
        >
          {announcements.map((update, index) => (
            <div
              key={index}
              className={`absolute left-3 right-3 sm:left-5 sm:right-5 flex items-center transition-all duration-700 ease-in-out ${
                index === currentUpdate
                  ? 'translate-y-0 opacity-100 z-10'
                  : 'translate-y-4 opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="text-xs sm:text-base font-medium text-white leading-snug sm:leading-normal line-clamp-2 sm:truncate w-full flex items-center gap-2">
                <span className="inline-block text-sky-300 font-semibold text-xs bg-sky-950/90 px-2 py-0.5 rounded-md border border-sky-400/40 shrink-0">
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
          title={`View all ${announcements.length} announcements`}
          aria-label="View announcements"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md animate-pulse">
            {announcements.length}
          </span>
        </button>
      </div>

      {/* All Announcements Modal */}
      {showAnnouncementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col font-sans">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-[#013759] flex items-center gap-2.5 tracking-tight">
                <span>Announcements & Updates</span>
              </h3>
              <button 
                onClick={() => setShowAnnouncementsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-xs font-semibold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Tabular Announcements View */}
            <div className="overflow-y-auto overflow-x-auto flex-1 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-50 text-[#074887] uppercase font-semibold text-xs tracking-wider sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="py-3 px-3.5 sm:px-5 w-28 sm:w-36 font-semibold bg-slate-50">Category</th>
                    <th scope="col" className="py-3 px-3.5 sm:px-5 font-semibold bg-slate-50">Announcement Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 bg-white">
                  {announcements.map((item, idx) => (
                    <tr key={idx} className="hover:bg-sky-50/50 transition-colors">
                      <td className="py-3.5 px-3.5 sm:px-5 align-top whitespace-nowrap">
                        <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#074887] bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                          {item.tag}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 sm:px-5 align-top leading-relaxed text-slate-800 font-normal text-xs sm:text-base">
                        {item.text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 pt-3.5 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs sm:text-sm text-slate-600 font-normal">
                Showing {announcements.length} announcement{announcements.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setShowAnnouncementsModal(false)}
                className="px-5 py-2 bg-[#074887] text-white text-xs sm:text-sm font-normal rounded-lg hover:bg-[#013759] transition-colors cursor-pointer shadow-xs"
                style={{ color: '#ffffff' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
