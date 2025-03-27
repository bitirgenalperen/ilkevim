# Project Styling System

This directory contains the styling system for the project, providing a centralized way to manage colors, gradients, and UI element styling.

## Files

- `colors.ts` - Contains all color definitions, gradients, and UI element color combinations
- `theme.ts` - Provides utility functions to apply consistent styling throughout the application

## How to Use

### Importing Styles

```tsx
// Import specific style categories
import { badge, button, text } from "@/styles/theme";

// Or import all styles
import * as theme from "@/styles/theme";
```

### Using Theme Styles

The theme utilities provide functions that return className strings with the appropriate styling:

```tsx
// Buttons
<Button className={button.primary()}>Primary Button</Button>
<Button className={button.outline()}>Outline Button</Button>
<Button className={button.gradient()}>Gradient Button</Button>

// Text
<h1 className={text.gradientHeading()}>Gradient Heading</h1>
<p className={text.body()}>Regular body text</p>

// Badges
<Badge className={badge.primary()}>Primary Badge</Badge>
<Badge className={badge.outline()}>Outline Badge</Badge>
<Badge className={badge.tag()}>Tag Badge</Badge>

// Add additional classes
<Button className={button.primary("mt-4 w-full")}>Primary Button with More Classes</Button>
```

### Raw Color Values

If you need the raw color values, you can import them directly:

```tsx
import { colors, gradients, ui } from "@/styles/colors";

// Using raw color values
<div style={{ backgroundColor: colors.teal[500] }}>Colored Div</div>
```

## Benefits

- **Consistency** - All UI elements use the same color palette
- **Maintainability** - Color changes can be made in one place
- **Readability** - Code is more semantic and clearer about its purpose
- **Reusability** - Common styling patterns are easy to reuse 