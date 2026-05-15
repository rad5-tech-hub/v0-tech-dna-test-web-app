"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils" // optional: if you have a cn utility

const tracks = [
  {
    value: "product-design",
    title: "Product Design (UI/UX Design)",
    description: "Product Design is about creating digital products (like apps and websites) that are easy and enjoyable to use. If you like creativity, problem-solving, and making things beautiful and simple, this path fits you.",
  },
  {
    value: "frontend-development",
    title: "Frontend Development",
    description: "Frontend Development is about building what users see and interact with on websites and apps. It’s like being a digital builder who turns a design into something people can use.",
  },
  {
    value: "backend-development",
    title: "Backend Development",
    description: "Backend Development focuses on the server-side, databases, and application logic. It's the engine that makes the application work and process data.",
  },
  {
    value: "data-analytics",
    title: "Data Analytics",
    description: "Data Analytics is about using numbers to make smart decisions. If you like working with numbers, finding patterns, and making sense of information, this track is for you.",
  },
  {
    value: "digital-marketing",
    title: "Digital Marketing",
    description: "Digital marketing is how businesses promote their products online. If you love creativity, social media, and helping brands reach more people, this is your space.",
  },
  {
    value: "cybersecurity",
    title: "Cybersecurity",
    description: "Cybersecurity is about protecting organizations from online threats. If you enjoy solving puzzles, investigating problems, and keeping things safe, this field is for you.",
  },
  {
    value: "graphics-design",
    title: "Graphics Design",
    description: "Graphic design is the art of visual communication. Designers use typography, imagery, and color to convey messages and create visual impact.",
  },
  {
    value: "video-editing",
    title: "Video Editing",
    description: "Video editing is the process of manipulating and rearranging video shots to create a new work. It’s essential for film, television, and social media content.",
  },
  {
    value: "content-creation",
    title: "Content Creation",
    description: "Content creators produce entertaining or educational material that caters to the interests and challenges of a target audience.",
  },
  {
    value: "product-management",
    title: "Product Management",
    description: "Product managers guide the success of a product and lead the cross-functional team that is responsible for improving it.",
  },
  {
    value: "technical-writing",
    title: "Technical Writing",
    description: "Technical writers prepare instruction manuals, how-to guides, and other supporting documents to communicate complex and technical information more easily.",
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