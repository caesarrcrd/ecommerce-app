"use client"

import { signIn } from "@/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input, Button, Card, CardBody } from "@nextui-org/react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })
      
      if (result?.error) {
        setError("Invalid credentials")
      } else {
        router.push("/")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md p-6">
        <CardBody>
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p>Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}