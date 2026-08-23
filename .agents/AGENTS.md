# Workspace Rules & Invariants

## UI & Styling Guidelines

1. **NO EMOJIS EVER**: Never use emojis in code, UI components, HTML text, or markdown headers. Always use clean inline SVG icons or SVG components.
2. **Typography Weight**: Avoid `font-bold` and `font-semibold` in Admin UI; maintain clean `font-normal` typography across all admin screens.
3. **Strict Button Color Contrast**:
   - **Light background buttons** (`bg-white`, `bg-slate-100`, etc.) MUST ALWAYS have **Dark font text** (`text-slate-900`, `style={{ color: '#0f172a' }}`).
   - **Dark background buttons** (`bg-[#074887]`, `bg-slate-[#074887]`, `bg-red-600`, etc.) MUST ALWAYS have **Light font text** (`text-white`, `style={{ color: '#ffffff' }}`).

## Branching & Deployment Invariants

1. **NEVER Push Admin to `main`**: Admin UI / admin code must NEVER be merged or pushed into the `main` branch under any circumstances.

