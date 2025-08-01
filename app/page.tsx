import AppNavbar from "@/components/Navbar"

export default function Home() {
  return (
    <div>
      <AppNavbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to our Ecommerce Store</h1>
        <p>Browse our products and enjoy shopping!</p>
      </main>
    </div>
  )
}