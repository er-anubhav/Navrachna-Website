import React from 'react'
import { AnnouncementBanner } from './blocks/AnnouncementBanner'
import { PageHero }           from './blocks/PageHero'
import { TextBlock }          from './blocks/TextBlock'
import { StatsRow }           from './blocks/StatsRow'
import { CardGrid }           from './blocks/CardGrid'
import { FAQAccordion }       from './blocks/FAQAccordion'
import { CallToAction }       from './blocks/CallToAction'
import { LogoScroller }       from './blocks/LogoScroller'
import { ProgramCards }       from './blocks/ProgramCards'
import { ImageCarousel }      from './blocks/ImageCarousel'
import { FacilityTabs }       from './blocks/FacilityTabs'
import { NfedAbout }          from './blocks/NfedAbout'
import { ECellInitiative }    from './blocks/ECellInitiative'
import { VisionMission }      from './blocks/VisionMission'
import { getVisibilityClass } from './blocks/utils'

// Registry: maps block type strings → React components
const BLOCK_REGISTRY = {
  AnnouncementBanner,
  PageHero,
  TextBlock,
  StatsRow,
  CardGrid,
  FAQAccordion,
  CallToAction,
  LogoScroller,
  ProgramCards,
  ImageCarousel,
  FacilityTabs,
  NfedAbout,
  ECellInitiative,
  VisionMission,
}

/**
 * BlockRenderer
 * Renders a single block from its config object.
 *
 * Props:
 *  - block:      The block config object { id, type, content, style, layout, visibility }
 *  - isEditing:  True when rendered inside the Admin Page Builder
 *  - isSelected: True when this block is the currently selected block in the builder
 *  - onSelect:   Callback when block is clicked in edit mode (receives block.id)
 *  - dimHidden:  In admin mode, dim (not hide) blocks that are flagged as hidden on a device
 */
export function BlockRenderer({
  block,
  isEditing  = false,
  isSelected = false,
  onSelect   = () => {},
  dimHidden  = false,
}) {
  if (!block || !block.type) return null

  const Component = BLOCK_REGISTRY[block.type]
  if (!Component) {
    console.warn(`[BlockRenderer] Unknown block type: "${block.type}"`)
    return null
  }

  const visibilityClass = !isEditing
    ? getVisibilityClass(block.visibility ?? {})
    : '' // In admin, never hide — use dimming instead

  const isDimmed = isEditing && dimHidden && (
    block.visibility?.hideOnMobile ||
    block.visibility?.hideOnTablet ||
    block.visibility?.hideOnDesktop
  )

  return (
    <div
      className={[
        visibilityClass,
        isEditing ? 'cursor-pointer relative group' : '',
        isSelected ? 'ring-2 ring-sky-500 ring-offset-2 rounded-sm' : '',
        isDimmed   ? 'opacity-40' : '',
        'transition-all duration-150',
      ].filter(Boolean).join(' ')}
      onClick={() => isEditing && onSelect(block.id)}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Admin selection indicator */}
      {isEditing && (
        <div
          className={[
            'absolute top-0 left-0 z-20 px-2 py-0.5 text-[10px] font-bold text-white rounded-br-lg pointer-events-none transition-opacity',
            isSelected ? 'opacity-100 bg-sky-500' : 'opacity-0 group-hover:opacity-100 bg-slate-600',
          ].join(' ')}
        >
          {block.type}
        </div>
      )}

      <Component
        {...(block.content || {})}
        style={block.style || {}}
        layout={block.layout || {}}
      />
    </div>
  )
}

// Export registry so Admin can enumerate available block types
export { BLOCK_REGISTRY }
