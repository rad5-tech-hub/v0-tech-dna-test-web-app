import TrackDetailsAccordion from "@/components/trackdetailsaccordion"


export default function Page() {
  return (
    <main className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/5 py-12">
      <TrackDetailsAccordion />

      <footer className="mt-16">
        <p className="text-center">All Rights Reserved. <b><a href="https://rad5.com.ng" target="_blank">RAD5 Tech Hub</a></b></p>
      </footer>
    </main>
  )
}