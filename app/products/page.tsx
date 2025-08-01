import AppNavbar from "@/components/Navbar"
import { PrismaClient } from "@prisma/client"
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function ProductsPage() {
  const products = await prisma.product.findMany()

  return (
    <div>
      <AppNavbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button as={Link} href="/products/new" color="primary">
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Card key={product.id} shadow="sm">
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={product.name}
                  className="w-full object-cover h-[140px]"
                  src={product.image || "/placeholder.jpg"}
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg">{product.name}</h2>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>
                  <p className="mt-2">{product.description?.slice(0, 100)}...</p>
                </div>
              </CardBody>
              <CardFooter className="justify-between">
                <Button as={Link} href={`/products/${product.id}`} size="sm" color="primary">
                  View Details
                </Button>
                <Button as={Link} href={`/products/${product.id}/edit`} size="sm" variant="flat">
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}