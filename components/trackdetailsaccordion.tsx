"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils" // optional: if you have a cn utility

const tracks = [
  {
    value: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Cybersecurity is about protecting people and organizations from online threats. Think of it like being a digital security guard who helps prevent hackers from stealing information or damaging systems. If you enjoy solving puzzles, investigating problems, and keeping things safe, this field might be for you. You can work as a security analyst, ethical hacker, or cybersecurity engineer.",
  },
  {
    value: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Digital marketing is how businesses promote their products or services online. It’s about getting the right message to the right people using platforms like Google, Instagram, Facebook, TikTok, and email. If you love creativity, social media, and helping brands reach more people, this is your space. You can become a social media manager, content marketer, or ads specialist.",
  },
  {
    value: "product-design",
    title: "Product Design (UI/UX Design)",
    description:
      "Product Design is about creating digital products (like apps and websites) that are easy and enjoyable to use. UI means the “look,” which includes colors, buttons, and layout. UX means the “feel,” which focuses on how people move through the app or website. If you like creativity, problem-solving, and making things beautiful and simple, this path fits you. You can work as a UI/UX designer or product designer.",
  },
  {
    value: "data-analytics",
    title: "Data Analytics",
    description:
      "Data Analytics is about using numbers to make smart decisions. Companies have a lot of information (data), but they need people to interpret it, like detectives turning numbers into insights. If you like working with numbers, finding patterns, and making sense of information, this track is for you. You can become a data analyst, business analyst, or data visualization expert.",
  },
  {
    value: "frontend-development",
    title: "Frontend Development",
    description:
      "Frontend Development is about building what users see and interact with on websites and apps. It’s like being a digital builder who turns a design into something people can click, scroll, and use. If you enjoy logic, creativity, and bringing ideas to life through code, this is for you. You can work as a frontend developer or web developer.",
  },
]

export default function TrackDetailsAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
        Explore Our Tech Tracks
      </h1>

      <Accordion.Root type="single" collapsible className="space-y-3">
        {tracks.map((track) => (
          <Accordion.Item
            key={track.value}
            value={track.value}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className={cn(
                  "flex w-full items-center justify-between px-5 py-4 text-left font-medium text-foreground hover:bg-blue-300",
                  "transition-all",
                  "group"
                )}
              >
                <span className="text-lg">{track.title}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-200",
                    "group-data-[state=open]:rotate-180"
                  )}
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              {track.description}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}