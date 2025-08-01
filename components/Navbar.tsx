"use client"

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"

export default function AppNavbar() {
  const { data: session } = useSession()

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">Ecommerce App</Link>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        {session ? (
          <>
            <NavbarItem>
              <Link href="/products">Products</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/cart">Cart</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/orders">Orders</Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="danger" variant="flat" onClick={() => signOut()}>
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}