"use client";

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Loader } from "@/components/loader";
import { SiteNav } from "@/components/layout";
import { PageEnter, ScrollRefresh } from "@/components/motion";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";
import { LoaderProvider } from "@/context/LoaderContext";

export function HomePage() {
  return (
    <LoaderProvider>
      <ScrollRefresh />
      <Loader />
      <SiteNav />
      <PageEnter>
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Timeline />
          <Contact />
        </main>
      </PageEnter>
    </LoaderProvider>
  );
}
