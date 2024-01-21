import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/logo.png"
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCarts } from "@/lib/db/cart";
import UserMenuButtons from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function searchProducts(formData) {
    "use server";
    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {
    const session = await getServerSession(authOptions)
    const cart = await getCarts();
    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-uto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl normal-case">
                        <Image src={logo} height={40} width={40} alt="Flipzon-logo" />
                        FlipZon
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input type="text" name="searchQuery" placeholder="Search" className="input input-bordered w-full min-w-[100px]" />
                        </div>
                    </form>
                    <div className="tooltip tooltip-bottom tooltip-primary" data-tip="Cart">
                        <ShoppingCartButton cart={cart} />
                    </div>
                        <UserMenuButtons session={session} />
                </div>
            </div>
        </div>
    )
}