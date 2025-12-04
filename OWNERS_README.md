# Project Owners Section - Customization Guide

## Overview
The About page now includes a "Project Owners" section displaying team member profiles with photos, names, roles, and bios.

## Current Implementation
- **Location**: `components/AboutView.tsx`
- **Translation Keys**: `ownersSectionTitle`, `ownersSectionSubtitle` in `localization/translations.ts`
- **Placeholder Images**: `public/assets/team/owner1.svg`, `owner2.svg`, `owner3.svg`

## How to Customize

### 1. Replace Placeholder Photos
Replace the SVG placeholder files with actual team photos:

**Recommended Image Specifications:**
- Format: JPG or PNG (WebP for better performance)
- Size: 400x400 pixels (minimum)
- Aspect Ratio: Square (1:1)
- File Size: < 500KB per image

**Steps:**
1. Save your team photos to `public/assets/team/`
2. Name them: `owner1.jpg`, `owner2.jpg`, `owner3.jpg` (or use PNG)
3. Update the photo paths in `components/AboutView.tsx` if using different extensions

### 2. Update Owner Information
Edit `components/AboutView.tsx` around line 35-54:

```tsx
const owners: Owner[] = [
  {
    name: 'Your Actual Name',
    role: 'Your Role/Title',
    bio: 'Brief bio (2-3 sentences about expertise and contribution)',
    photo: '/assets/team/owner1.jpg'  // or .png
  },
  // Add or remove owners as needed
];
```

### 3. Add or Remove Team Members
- **To add more owners**: Add another object to the `owners` array
- **To remove**: Delete the corresponding object
- The grid will automatically adjust (1 column mobile, 2 tablet, 3 desktop)

### 4. Localize Owner Information (Optional)
If you want owner names/roles/bios in multiple languages:

1. Add translation keys to `localization/translations.ts`:
```typescript
owner1Name: {
  en: 'John Doe',
  kn: 'ಜಾನ್ ಡೋ',
  // ... other languages
},
```

2. Update `AboutView.tsx` to use `t('owner1Name')` instead of hardcoded strings

## Styling
The owner cards use:
- **Container**: `glass-card` (glassmorphism effect)
- **Avatar**: Rounded with green border
- **Name**: Green text (`text-green-300`)
- **Role**: Gray text (`text-gray-400`)
- **Bio**: Lighter gray (`text-gray-300`)

To modify styles, edit the `OwnerCard` component in `components/AboutView.tsx`.

## Example with Real Data
```tsx
const owners: Owner[] = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Chief Data Scientist',
    bio: 'PhD in Agricultural AI with 10+ years experience in crop disease detection systems.',
    photo: '/assets/team/priya-sharma.jpg'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Full Stack Developer',
    bio: 'Passionate about creating accessible technology for rural farmers.',
    photo: '/assets/team/rajesh-kumar.jpg'
  }
];
```

## Build After Changes
After updating owner information or photos, rebuild the project:
```bash
npm run build
```

## Questions?
Refer to the main `README.md` for general project setup and contribution guidelines.
