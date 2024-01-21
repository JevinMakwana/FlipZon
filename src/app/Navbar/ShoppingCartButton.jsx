"use client";
import { formatPrice } from "@/lib/format"
import Link from "next/link"

export default function ShoppingCartButton({ cart }){
    function closeDropdown(){
        const elem = document.activeElement
        if(elem){
            elem.blur();
        }
    }
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
                <div className="indicator ">C</div>
                <span className="badge badge-sm indicator-item">
                    {cart?.size || 0}
                </span>
            </label>
            <div 
                tabIndex={0}
                className="card dropdown-content card-comact mt-3 w-52 bg-base-100 shadow z-30"
            >
                <div className="card-body">
                    <span className="text-lg font-bold">{cart?.size || 0} Items</span>
                    <span className="text-info">
                        Subtotal: {formatPrice(cart?.subtotal || 0)}
                    </span>
                    <div className="card-actions">
                        <Link
                            href="/cart"
                            className="btn btn-primary"
                            onClick={closeDropdown}
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

{/* <svg 
                        // xmlns="https://cdn.iconscout.com/icon/free/png-512/free-cart-1438627-1214043.png?f=webp&w=256"
                        xmlns="https://www.w3.org/200/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        
                        <path 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h21.4 2M7 13h1014-8H5.4M7 13L5.4 5M7 131-2.293 "
                        />
                    </svg> */}