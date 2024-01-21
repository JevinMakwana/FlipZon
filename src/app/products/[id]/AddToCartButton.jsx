"use client";

import { useState, useTransition } from "react"

import { getServerSessionWrapper } from "../../Credentials"
import { redirect, useRouter } from "next/navigation";

async function isLoggedin() {
    const session = await getServerSessionWrapper();
    return session;
}
export default function AddToCartButton({ productId, incrementProductQuantity }){
    const [isPending, startTrancsition] = useTransition();
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    return(
        <div className="flex items-center gap-2">
            <button 
                className="btn btn-primary "
                onClick={async ()=>{
                    const session = await isLoggedin();
                    if (!session) {
                        router.push(`/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fproducts/${productId}`);
                        return;
                    }
                    setSuccess(false);
                    startTrancsition(async () => {
                        await incrementProductQuantity(productId);
                        setSuccess(true);
                    })
                }}
            >
                Add To Cart
            </button>
            {isPending && <span className="loading loading-spinner loading-md" />}
            {!isPending && success && <span className="text-success">Added to cart</span>}
        </div>
    )
}