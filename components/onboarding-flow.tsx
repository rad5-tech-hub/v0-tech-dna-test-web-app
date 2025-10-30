"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster, toast } from "sonner"

interface OnboardingFlowProps {
  onComplete: (name: string, gender: string, email: string) => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [countdown, setCountdown] = useState<number | null>(null)
  const [showCountdown, setShowCountdown] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (countdown === null || countdown < 0) return

    const timer = setTimeout(() => {
      if (countdown === 0) {
        onComplete(name.trim(), gender, email.trim())
      } else {
        setCountdown((c) => (c !== null ? c - 1 : c))
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, name, gender, email, onComplete])

  // simple email validator (RFC-compliant regex are huge; this is a reasonable practical check)
  const isValidEmail = (value: string) => {
    if (!value) return false
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    return re.test(value.trim())
  }

  // validate live as user types
  useEffect(() => {
    if (!email) {
      setEmailError(null)
      return
    }
    setEmailError(isValidEmail(email) ? null : "Please enter a valid email address")
  }, [email])

  const handleStartTest = () => {
    // require name + gender
    if (!name.trim() || !gender) {
      toast.error("Please provide your name and select a gender.")
      return
    }

    // if user provided an email, validate it — otherwise allow empty
    if (email.trim() && !isValidEmail(email.trim())) {
      // use sonner to show the message per your request
      toast.error("Invalid email address. Please correct it or leave it empty.")
      return
    }

    setShowCountdown(true)
    setCountdown(3)
  }

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <div className="mb-4">
              <div className="inline-block bg-primary/10 rounded-lg p-3 mb-4 transform transition-transform duration-500 hover:scale-105">
                <div className="text-3xl font-bold text-primary">RAD5</div>
              </div>
            </div>
            <CardTitle className="text-3xl">TechDNA Test</CardTitle>
            <CardDescription className="text-base mt-2">Discover Your Digital Career Path</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!showCountdown ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                    <Input
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email (Optional if you want your report emailed to you)
                    </label>
                    <Input
                      placeholder="Enter your Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    />
                    {emailError && <p className="mt-2 text-sm text-destructive">{emailError}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Gender</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Male", "Female", "Other"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setGender(option)}
                          className={`py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 transform ${
                            gender === option
                              ? "bg-primary text-primary-foreground scale-105 shadow-md"
                              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-102"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 transition-all duration-300 hover:bg-secondary/15">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    This test will take approximately <strong>15–20 minutes</strong>. Answer as honestly as possible.
                    There are no right or wrong answers.
                  </p>
                </div>

                <Button
                  onClick={handleStartTest}
                  disabled={!name.trim() || !gender}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
                  size="lg"
                >
                  Start Test
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div
                  className={`text-6xl font-bold text-primary mb-4 transition-all duration-300 transform ${
                    countdown === 0 ? "scale-150 opacity-0" : "scale-100 opacity-100"
                  }`}
                >
                  {countdown}
                </div>
                <p className="text-muted-foreground">Get ready...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sonner Toaster (ensure this is present once) */}
      <Toaster position="top-center" />
    </>
  )
}
