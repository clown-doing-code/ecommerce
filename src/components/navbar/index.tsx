import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import Link from "next/link";
import React, { Suspense } from "react";
import ShoppingCartButton from "../global/shopping-cart-btn";
import UserButton from "../global/user-btn";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collection";
import MainNavigation from "./main-nav";
import SearchField from "./search-field";
import MobileMenu from "./mobile-menu";

export default async function Navbar() {
  const wixClient = await getWixServerClient();
  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <header className="border-b bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Suspense>
              <MobileMenu
                collections={collections}
                loggedInMember={loggedInMember}
              />
            </Suspense>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center lg:justify-start">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Ecommerce</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
            <MainNavigation
              collections={collections}
              className="flex space-x-4"
            />
          </div>

          {/* Search, User, and Cart */}
          <div className="flex items-center justify-end space-x-4">
            <div className="hidden lg:block">
              <SearchField />
            </div>
            <UserButton
              loggedInMember={loggedInMember}
              className="hidden lg:inline-flex"
            />
            <ShoppingCartButton initialData={cart} />
          </div>
        </div>
      </div>
    </header>
  );
}
