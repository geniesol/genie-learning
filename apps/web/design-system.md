# Genie Learning Design System

## 🎨 Color Palette (HSL Modern)
- **Primary**: `hsl(250 89% 60%)` - Royal Electric Indigo. Used for main actions, active states, and focus.
- **Accent**: `hsl(45 100% 50%)` - Golden Zenith. Used for "WOW" markers, highlights, and growth indicators.
- **Surface**: `hsl(222 47% 98%)` - Soft Slate Cloud. The base background for light mode.
- **Dark Surface**: `hsl(222 47% 4%)` - Deep Midnight Slate. The base for high-contrast dark mode.

## ✨ Visual Textures
- **Glassmorphism**: `backdrop-blur-xl` with semi-transparent borders. Used for sidebar, header, and floating cards.
- **Gradients**: Diagonals from Primary to Accent. Used sparingly for high-value text and hero signals.
- **Shadows**: Soft, multi-layered ambient shadows (`0 8px 32px`).

## 🛠️ Motion & Interactions
- **Reveal**: `animate-reveal` (Subtle slide-up + fade). Applied to page content on entry.
- **Floating**: `animate-float` (Smooth Y-axis oscillation). Used for AI icons and secondary visual elements.
- **Hover Transitions**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`.

## 📐 Layout Principles
- **Radius**: `1rem` (16px) for rounded, friendly, yet professional containers.
- **Grid**: 12-column dynamic grid with standard `max-w-7xl` centering.
- **Spacing**: Geometric progression (4, 8, 16, 24, 32, 64px) for rhythms.
