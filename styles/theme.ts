import { cn } from "@/lib/utils";
import { colors, gradients, ui, form, borders } from "./colors";

/**
 * Theme utility functions to provide easy access to styled class names
 * This makes it simpler to apply consistent styling throughout the application
 */

// Button variants
export const button = {
  // Primary button
  primary: (className?: string) => cn(
    ui.button.primary.base,
    ui.button.primary.hover,
    className
  ),
  
  // Outline button
  outline: (className?: string) => cn(
    ui.button.outline.base,
    ui.button.outline.hover,
    className
  ),
  
  // Gradient button
  gradient: (className?: string) => cn(
    gradients.button.tealEmerald,
    gradients.button.tealEmeraldHover,
    "text-white",
    className
  ),
};

// Text styling
export const text = {
  // Primary text color
  primary: (className?: string) => cn(
    ui.text.primary,
    className
  ),
  
  // Heading with gradient
  gradientHeading: (className?: string) => cn(
    gradients.text.tealEmerald,
    "bg-clip-text text-transparent",
    className
  ),
  
  // Body text
  body: (className?: string) => cn(
    ui.text.body,
    className
  ),
  
  // Section heading
  heading: (className?: string) => cn(
    ui.text.heading,
    className
  ),
};

// Badge variants
export const badge = {
  // Primary badge
  primary: (className?: string) => cn(
    ui.badge.primary.base,
    ui.badge.primary.hover,
    className
  ),
  
  // Outline badge
  outline: (className?: string) => cn(
    ui.badge.outline.base,
    className
  ),
  
  // Tag style badge (like the ones used in headers)
  tag: (className?: string) => cn(
    ui.badge.tag.base,
    className
  ),
};

// Background variants
export const background = {
  // Primary gradient background (dark)
  primary: (className?: string) => cn(
    gradients.background.primary,
    className
  ),
  
  // Page background
  page: (className?: string) => cn(
    gradients.background.page,
    className
  ),
  
  // Teal light background
  tealLight: (className?: string) => cn(
    gradients.background.tealLight,
    className
  ),
};

// Card styling
export const card = {
  // Base card with shadow and border
  base: (className?: string) => cn(
    "bg-white/80 backdrop-blur-sm shadow-lg",
    borders.light,
    className
  ),
  
  // Content section styling
  content: (className?: string) => cn(
    "p-6 md:p-8",
    className
  ),
};

// Form element styling
export const formElements = {
  // Input focus styling
  inputFocus: cn(
    form.focus
  ),
  
  // Switch styling
  switch: cn(
    form.switch
  ),
  
  // Checkbox styling
  checkbox: cn(
    form.checkbox
  ),
}; 