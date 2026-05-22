export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export const navigationItems: readonly NavItem[] = [
  { id: "hero", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "skills", label: "Skills", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;
