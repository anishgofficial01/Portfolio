import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ContactLinkProps {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
}

/** Premium text link with subtle arrow — no button chrome */
export function ContactLink({
  href,
  label,
  className,
  external = true,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      data-cursor-hover
      className={cn(
        "contact-link group inline-flex items-center gap-2",
        "font-body text-label-editorial text-[var(--color-text-secondary)]",
        "transition-colors duration-300 hover:text-[var(--color-text-primary)]",
        className
      )}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-500 ease-[var(--ease-premium)] group-hover:w-full" />
      </span>
      <ArrowUpRight
        size={14}
        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}
