---
name: Rasfalz Studio OS
description: A high-performance dual-OS creative hub merging Chrome OS Flex and Android Material You 3
colors:
  primary-orange: "#FF9C0F"
  primary-orange-hover: "#E08500"
  primary-blue: "#0052F5"
  primary-blue-hover: "#0043CC"
  orange-subtle: "rgba(255, 156, 15, 0.12)"
  orange-glow: "rgba(255, 156, 15, 0.25)"
  blue-subtle: "rgba(0, 82, 245, 0.12)"
  blue-glow: "rgba(0, 82, 245, 0.25)"
  light-bg-main: "#F8F8FF"
  light-bg-surface: "#FFFFFF"
  light-bg-card: "#FFFFFF"
  light-text-primary: "#0A0D17"
  light-text-secondary: "#242A38"
  light-text-muted: "#525B70"
  dark-bg-main: "#191919"
  dark-bg-surface: "#242424"
  dark-bg-surface-elevated: "#2E2E2E"
  dark-bg-card: "#242424"
  dark-text-primary: "#FFFFFF"
  dark-text-secondary: "#E2E2E2"
  dark-text-muted: "#B5B5B5"
  btn-orange-bg: "#A33F00"
  btn-orange-border: "#D95F00"
  btn-blue-bg: "#003099"
  btn-blue-border: "#004BD6"
  btn-green-bg: "#04542C"
  btn-green-border: "#0E9F6E"
  btn-red-bg: "#881414"
  btn-red-border: "#DC2626"
  btn-purple-bg: "#4A1478"
  btn-purple-border: "#9333EA"
typography:
  display:
    fontFamily: "'Creato Display', sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 2.4rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Creato Display', sans-serif"
    fontSize: "clamp(1.4rem, 3vw, 1.8rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Laro Soft', 'Poppins', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Laro Soft', 'Poppins', sans-serif"
    fontSize: "0.74rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "9999px"
  squircle: "24%"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
components:
  button-primary-orange:
    backgroundColor: "{colors.btn-orange-bg}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-primary-blue:
    backgroundColor: "{colors.btn-blue-bg}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-primary-green:
    backgroundColor: "{colors.btn-green-bg}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-primary-red:
    backgroundColor: "{colors.btn-red-bg}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-primary-purple:
    backgroundColor: "{colors.btn-purple-bg}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  glass-panel:
    backgroundColor: "{colors.dark-bg-surface}"
    textColor: "{colors.dark-text-primary}"
    rounded: "{rounded.lg}"
    padding: "20px 22px"
  glass-card:
    backgroundColor: "{colors.dark-bg-card}"
    textColor: "{colors.dark-text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px 20px"
---

# Design System: Rasfalz Studio OS

## Overview

**Creative North Star: "The Dual-OS Creative Engine"**

Rasfalz Studio OS fuses two iconic operating system interfaces—modern Android Material You 3 for mobile devices and Chrome OS Flex with glassmorphism for desktop viewports—into an interactive, high-performance multimedia portfolio. The aesthetic balances creative motion energy with structural precision: dark matte charcoal surfaces (`#191919`), vibrant brand neon accents (Primary Orange `#FF9C0F` and Electric Royal Blue `#0052F5`), tactile solid darkened controls, and crisp `2px` structural outlines.

The interface serves as living proof of craft for Raihan Salman Alfarisy's 10+ years in motion design, 3D art, and visual storytelling. Rather than standard passive templates, visitors interact with a responsive operating system complete with a live system clock, weather radar, draggable window modals, desktop shelf dock, Android status bar, Google universal search pill, and an integrated vinyl record music player with audio visualization.

**Key Characteristics:**
- **Dual-Metaphor Parity:** Authentic Desktop OS (shelf dock, floating window modals, live system tray) and Mobile Android (Pixel status bar, Google search pill, squircle grid, floating navigation dock) with equal visual rigor.
- **Crisp Structural 2px Outlines:** Universal `2px solid` border system providing sharp separation, tactile affordances, and OS window framing.
- **Solid Darkened Buttons:** Confident, saturated solid button fills (`#A33F00` Orange, `#003099` Blue, `#04542C` Green, `#881414` Red) ensuring WCAG AAA legibility with pure white text.
- **Three-Tier Typographic Hierarchy:** Display headlines in geometric `Creato Display`, subheadings & badges in characterful `Laro Soft`, and body/descriptions in clean, legible `Poppins`.
- **Theme Sophistication:** Deep Matte Charcoal Canvas (`#191919`) in dark mode paired with Ghost White (`#F8F8FF`) in light mode, with brightened secondary metadata for strain-free reading.

## Colors

The color palette is anchored by high-energy dual accents paired with a robust neutral foundation for light and dark environments.

### Primary
- **Energetic Orange** (`#FF9C0F`): Core brand accent representing motion energy, creative warmth, and interactive highlights. Hover state is `#E08500`. Subtle tint is `rgba(255, 156, 15, 0.12)`.
- **Electric Royal Blue** (`#0052F5`): Secondary brand accent projecting technical authority, digital precision, and primary interactive focus. Hover state is `#0043CC`. Subtle tint is `rgba(0, 82, 245, 0.12)`.

### Secondary & Action Tones (Buttons & Badges)
- **Solid Darkened Orange** (`#A33F00` Dark / `#B34A00` Light): Primary call-to-action button fill with `2px solid #D95F00` border.
- **Solid Darkened Blue** (`#003099` Dark / `#0038B8` Light): Secondary action button fill with `2px solid #004BD6` border.
- **Solid Darkened Green** (`#04542C` Dark / `#056636` Light): Success confirmations, store/commercial badges with `2px solid #0E9F6E` border.
- **Solid Darkened Red** (`#881414` Dark / `#991B1B` Light): Danger, high-priority alert badges with `2px solid #DC2626` border.
- **Solid Darkened Purple** (`#4A1478` Dark / `#581C87` Light): Creative showcases and master asset tags with `2px solid #9333EA` border.

### Neutral
**Dark Mode (#191919 Canvas):**
- **Matte Charcoal Canvas** (`#191919`): Main root background. Rich, glare-free dark canvas.
- **Surface Elevated** (`#242424` / `#2E2E2E`): Cards, OS widgets, top system bar, and window modal surfaces.
- **Text Primary** (`#FFFFFF`): Headings, active labels, and primary body content.
- **Text Secondary** (`#E2E2E2`): High-legibility secondary descriptions and metadata.
- **Text Muted** (`#B5B5B5`): Timestamps, captions, and supporting labels with WCAG AAA contrast.
- **Border Medium** (`#3D3D3D`): Default `2px solid` border for cards, windows, widgets, and buttons.
- **Border Subtle** (`#2F2F2F`): Dividers, inner container strokes, and secondary separators.

**Light Mode (#F8F8FF Canvas):**
- **Ghost White Canvas** (`#F8F8FF`): Crisp, modern page canvas.
- **Surface Clean** (`#FFFFFF`): Pure white elevated card and widget backgrounds.
- **Text Primary** (`#0A0D17`): Deep obsidian for maximum reading contrast.
- **Text Secondary** (`#242A38`): Slate charcoal for comfortable paragraph reading.
- **Text Muted** (`#525B70`): Balanced slate for metadata and captions.
- **Border Medium** (`#D8DFEE`): Light-theme `2px solid` border stroke.
- **Border Subtle** (`#E6EAF4`): Light-theme inner divider line.

### Named Rules
**The Accent Restraint Rule.** Primary Orange and Electric Blue are applied with deliberate restraint. Neither accent should exceed 10% of any screen viewport. Rarity preserves the high-energy focal punch.

**The Pure Solid Button Rule.** All interactive buttons must use solid, slightly darkened background colors with white text and `2px` borders. Semi-transparent button fills that wash out against complex backgrounds are prohibited.

## Typography

**Display Font:** `Creato Display` (Bold 800, Extra Bold 900)
**Subheading & Badge Font:** `Laro Soft` (Medium 500, Bold 700, Extra Bold 800)
**Body & UI Font:** `Poppins` (Regular 400, Medium 500, SemiBold 600, Bold 700)
**Mono Font:** `JetBrains Mono` (Regular 400, Bold 700)

**Character:** A modern, three-tier typographic engine. `Creato Display` delivers monumental, geometric headline confidence; `Laro Soft` introduces tactile, rounded warmth for subheadings and badge tags; `Poppins` provides rhythmic, highly legible body copy and UI descriptions.

### Hierarchy
- **Display / H1** (800 weight, `clamp(1.8rem, 4vw, 2.4rem)`, line-height: 1.2, letter-spacing: -0.025em): Major section hero headers and window titles.
- **Headline / H2** (800 weight, `clamp(1.4rem, 3vw, 1.8rem)`, line-height: 1.2, letter-spacing: -0.02em): Section headers and card titles.
- **Title / H3** (800 weight, `clamp(1.15rem, 2.5vw, 1.35rem)`, line-height: 1.2, letter-spacing: -0.02em): Subsection headers and widget titles.
- **Subheading / H4–H6** (`Laro Soft`, 700 weight, `0.82rem–1.05rem`, line-height: 1.3): Card categories, module headers, and badge pill titles.
- **Body / Paragraph** (`Poppins`, 400 weight, `0.92rem`, line-height: 1.6, color: `var(--text-secondary)`): Main descriptive and narrative content.
- **Small / Text-SM** (`Poppins`, 500 weight, `0.82rem`, line-height: 1.5, color: `var(--text-muted)`): Metadata, author info, and technical parameters.
- **Caption / Meta-Text** (`Poppins`, 600 weight, `0.75rem`, line-height: 1.45, color: `var(--text-muted)`): Timestamps, micro-tags, and status indicators.

### Named Rules
**The Three-Tier Rule.** Headings use `Creato Display`, subheadings/badges use `Laro Soft`, and body text uses `Poppins`. Mixing random fonts outside this triad is strictly forbidden.

**The Crisp Caption Rule.** All micro text (`< 0.85rem`) must use brightened muted tokens (`#B5B5B5` in dark mode, `#525B70` in light mode) with line-height ≥ 1.45 to prevent reading fatigue.

## Layout

The spatial system uses an 8-point geometric scale (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`).

**Desktop OS Workspace (Viewport > 860px):**
- Workspace container with `24px 36px 96px 36px` padding and custom slim scrollbar.
- Row 1: 3-column widget grid (`310px 1fr 310px`) for Clock/Weather, Creator Hero, and Calendar Agenda.
- Row 2: 2-column media grid (`360px 1fr`) for Vinyl Music Player and News/Portfolio Hub.
- Fixed bottom shelf floating dock (`height: ~54px`, `border-radius: 24px`, `border: 2px solid var(--border-medium)`).

**Mobile Android Experience (Viewport ≤ 860px):**
- Sticky Android fluid status bar (`min-height: 42px`, `border-bottom: 2px solid var(--border-subtle)`).
- Pixel At-A-Glance date & live weather strip.
- Large Android Hero Digital Clock with gradient digits.
- Google Universal Search Pill with instant voice/camera triggers.
- Compact Vinyl Music mini-widget and 4-column squircle application grid.
- Fixed floating glassmorphic bottom dock (`max-width: 380px`, `border: 2px solid var(--border-medium)`).

## Elevation & Depth

**Philosophy:** Layered glassmorphism with backdrop filters (`16px–28px` blur) supported by structured `2px` borders and ambient depth shadows.

### Shadow Vocabulary
- **Shadow SM** (`0 2px 8px rgba(0, 0, 0, 0.35)` Dark / `0 2px 8px rgba(0, 15, 60, 0.04)` Light): Subtle elevation for cards and buttons at rest.
- **Shadow MD** (`0 8px 24px rgba(0, 0, 0, 0.45)` Dark / `0 8px 24px rgba(0, 20, 80, 0.06)` Light): Interactive hover elevation for cards and OS widgets.
- **Shadow LG / Window** (`0 20px 60px rgba(0, 0, 0, 0.45)`): Fullscreen OS window modals and overlay sheets.
- **Shadow Dock** (`0 16px 44px rgba(0, 0, 0, 0.55)`): Fixed bottom shelf and Android dock elevation.
- **Glow Orange** (`0 4px 18px rgba(255, 156, 15, 0.35)`): Hover aura for primary orange interactive controls.
- **Glow Blue** (`0 6px 18px rgba(0, 82, 245, 0.35)`): Focus outline and hover aura for blue interactive controls.

### Named Rules
**The 2px Border Anchor Rule.** Every floating or elevated surface (cards, modals, docks, search bars) must be bounded by a `2px solid` border (`var(--border-medium)` or `var(--border-subtle)`). Shadows alone do not define boundaries.

## Shapes

The geometric form language is consistent across components:
- **Pill Form (9999px):** Buttons, badges, filter tabs, search pills, and status tags.
- **Squircle (24% / 18px radius):** App launcher icons and creator avatar wraps.
- **Large Curve (20px–28px):** OS widgets, cards, and modal window containers.
- **Medium Curve (12px–16px):** System trays, stat cards, and inner preview capsules.
- **Subtle Curve (8px):** Compact badges and tooltips.

## Components

### Buttons
- **Shape:** Rounded pill (`border-radius: 9999px`), `2px solid` border.
- **Primary Orange:** Background `var(--btn-orange-bg)` (`#A33F00` / `#B34A00`), border `2px solid #D95F00`, text `#FFFFFF`, shadow `0 4px 16px rgba(0,0,0,0.45)`. On hover: translates up `2px` with orange glow.
- **Primary Blue:** Background `var(--btn-blue-bg)` (`#003099` / `#0038B8`), border `2px solid #004BD6`, text `#FFFFFF`.
- **Secondary Glass:** Background `var(--btn-glass-bg)` (`#262626` / `#E6E9F2`), border `2px solid var(--btn-glass-border)`. On hover: border shifts to orange with orange text.
- **Sizes:** Small (`6px 14px`, `0.82rem`), Default (`9px 18px`, `0.88rem`), Large (`12px 24px`, `1rem`).

### Badges & Pill Tags
- **Structure:** Inline-flex, padding `4px 11px`, pill shape (`9999px`), font `Laro Soft` 800 weight, uppercase, `2px solid` border.
- **Fills:** Solid darker gradients (`--badge-orange-bg`, `--badge-blue-bg`, `--badge-green-bg`, `--badge-purple-bg`, `--badge-red-bg`).
- **Text:** Pure white (`#FFFFFF`) with subtle text shadow for high legibility.

### Glass Cards & OS Widgets
- **Structure:** Background `var(--bg-surface)` / `var(--bg-card)`, `backdrop-filter: blur(24px)`, `border: 2px solid var(--border-medium)`, `border-radius: 24px`.
- **Hover State:** `transform: translateY(-2px)`, border shifts to `var(--color-orange)`, shadow expands to `var(--shadow-md)`.

### Search Bars
- **Desktop Search:** `padding: 9px 16px`, `border: 2px solid var(--border-medium)`, `border-radius: 9999px`, background `var(--bg-input)`.
- **Mobile Search Pill:** `padding: 10px 14px`, `border: 2px solid var(--border-medium)`, `border-radius: 16px`, integrated Google logo and action icons.

### Bottom Docks & Shelf
- **Desktop Shelf:** Frosted glass bar (`background: var(--bg-dock)`, `backdrop-filter: blur(28px)`, `border: 2px solid var(--border-medium)`, `border-radius: 24px`, `padding: 6px 10px`).
- **Mobile Dock:** Fixed bottom dock (`border: 2px solid var(--border-medium)`, `border-radius: 24px`, 4 navigation items with active orange indicators).

## Do's and Don'ts

### Do:
- **Do** maintain universal `2px solid` borders across all cards, widgets, buttons, badges, and modals.
- **Do** use solid slightly darkened button fills (`#A33F00`, `#003099`, etc.) with white text for all interactive triggers.
- **Do** respect the 3-tier font hierarchy: `Creato Display` (H1–H3), `Laro Soft` (H4–H6 & badges), `Poppins` (body & descriptions).
- **Do** keep dark mode canvas at Matte Charcoal `#191919` and light mode at Ghost White `#F8F8FF`.
- **Do** ensure all micro-text and captions use brightened muted tokens (`#B5B5B5` dark / `#525B70` light) for WCAG AAA legibility.
- **Do** preserve the dual-OS metaphor with complete feature parity between Desktop (Chrome OS) and Mobile (Android Material You).

### Don't:
- **Don't** use `1px` or `1.5px` borders anywhere; the entire design system is anchored on `2px`.
- **Don't** use washed-out semi-transparent button backgrounds.
- **Don't** mix random sans-serif or serif fonts outside of `Creato Display`, `Laro Soft`, `Poppins`, and `JetBrains Mono`.
- **Don't** use pure black (`#000000`) for the canvas background in dark mode; use `#191919`.
- **Don't** overcrowd screens with neon accents; keep primary orange and blue under 10% of viewport area.
- **Don't** degrade the mobile experience into a stripped-down view; keep all interactive widgets accessible.
