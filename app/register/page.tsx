"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input, Button, Card, CardBody } from "@nextui-org/react"
import bcrypt from "bcryptjs"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password: hashedPassword })
      })
      
      if (response.ok) {
        router.push("/login")
      } else {
        const data = await response.json()
        setError(data.message || "Registration failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md p-6">
        <CardBody>
          <h1 className="text-2xl font-bold mb-6">Register</h1>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4"
              required
            />
            
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              required
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6"
              required
            />
            
            <Button type="submit" color="primary" fullWidth>
              Register
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}