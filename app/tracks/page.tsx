import TrackDetailsAccordion from "@/components/trackdetailsaccordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"


export default function Page() {
  return (
    <main className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="max-w-3xl mx-auto px-6 mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <TrackDetailsAccordion />

      <footer className="mt-16">
        <p className="text-center">All Rights Reserved. <b><a href="https://rad5.com.ng" target="_blank">RAD5 Tech Hub</a></b></p>
      </footer>
    </main>
  )
}