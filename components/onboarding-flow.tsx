"use client"

import { useEffect, useState } from "react"
import { Select } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Toaster, toast } from "sonner"
import { Info } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"

export interface OnboardingFlowProps {
  onComplete: (
    name: string,
    gender: string,
    email: string,
    phone: string,
    intendedTrack?: string
  ) => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [countdown, setCountdown] = useState<number | null>(null)
  const [intendedTrack, setIntendedTrack] = useState("")
  const [showCountdown, setShowCountdown] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [emailError, setEmailError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (countdown === null || countdown < 0) return

    const timer = setTimeout(() => {
      if (countdown === 0) {
        onComplete(name.trim(), gender, email.trim(), phone.trim(), intendedTrack)
      } else {
        setCountdown((c) => (c !== null ? c - 1 : c))
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, name, gender, email, phone, onComplete, intendedTrack])

  const isValidEmail = (value: string) => {
    if (!value) return true
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    return re.test(value.trim())
  }

  const isValidPhone = (value: string) => {
    if (!value.trim()) return false
    const digits = value.replace(/\D/g, "")
    return digits.length >= 7
  }

  useEffect(() => {
    if (!email) {
      setEmailError(null)
      return
    }
    setEmailError(isValidEmail(email) ? null : "Please enter a valid email address")
  }, [email])

  const handleStartTest = () => {
    setPhoneError(null)

    if (!name.trim() || !gender || !phone.trim()) {
      toast.error("Please provide your name, gender, and phone number.")
      if (!phone.trim()) setPhoneError("Phone number is required")
      return
    }

    if (!isValidPhone(phone)) {
      setPhoneError("Please enter a valid phone number (e.g., +234… or 080…)")
      toast.error("Please enter a valid phone number.")
      return
    }

    if (email.trim() && !isValidEmail(email.trim())) {
      toast.error("Invalid email address. Please correct it or leave it empty.")
      return
    }

    setShowCountdown(true)
    setCountdown(3)
  }

  const isFormReady = name.trim() && gender && isValidPhone(phone)

  return (
    <Tooltip.Provider>
      <div
        className={`min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-secondary/5 p-4 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <div className="mb-4">
              <div className="inline-block bg-primary/10 rounded-lg p-3 mb-4 transform transition-transform duration-500 hover:scale-105">
                <Image src={"logo.png"} alt="RAD5 Logo" width={100} height={100} />
              </div>
            </div>
            <CardTitle className="text-3xl">TechDNA Test</CardTitle>
            <CardDescription className="text-base mt-2">
              Discover Your Digital Career Path
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!showCountdown ? (
              <>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email (Your result will be emailed to you)
                    </label>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-destructive">{emailError}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number *
                    </label>
                    <Input
                      placeholder="e.g. +234 801 234 5678"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    />
                    {phoneError && (
                      <p className="mt-2 text-sm text-destructive">{phoneError}</p>
                    )}
                  </div>

                  {/* Intended Track with Tooltip */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block lg:flex items-center justify-between">
                      What track do you intend on going for?
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground hover:scale-1.2 transition-colors cursor-pointer"
                          >
                            <Link href="/tracks"><Info className="h-4 w-4"/></Link>
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-popover text-popover-foreground text-xs rounded-md px-3 py-2 shadow-lg border border-border max-w-xs animate-in fade-in-0 zoom-in-95"
                            sideOffset={5}
                          >
                            Gain more insight about the stated courses
                            <Tooltip.Arrow className="fill-popover" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </label>

                    <Select.Root
                      defaultValue="default"
                      onValueChange={setIntendedTrack}
                    >
                      <Select.Trigger className="w-full!" />
                      <Select.Content className="w-full!" position="popper">
                        <Select.Group>
                          <Select.Item value="default" disabled>
                            Select an intended track
                          </Select.Item>
                          {[
                            "Data Analytics",
                            "Cybersecurity",
                            "Web Development",
                            "Product Design",
                            "Digital Marketing",
                          ].map((item) => (
                            <Select.Item key={item} value={item}>
                              {item}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Gender *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Male", "Female", "Other"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setGender(option)}
                          className={`py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 transform cursor-pointer ${
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
                    This test will take approximately{" "}
                    <strong>5–10 minutes</strong>. Answer as honestly as
                    possible. There are no right or wrong answers.
                  </p>
                </div>

                <Button
                  onClick={handleStartTest}
                  disabled={!isFormReady}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 cursor-pointer"
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

      <Toaster position="top-center" />
    </Tooltip.Provider>
  )
}