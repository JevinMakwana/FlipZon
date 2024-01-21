import FormSubmitButton from "@/components/FormSubmitButton.jsx";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";



export const metadata = {
    title: "Add Product - Sanivari"
}

async function addProduct(formData){
    "use server";
    // fetch('https://fakestoreapi.com/products',{
    //         method:"POST",
    //         body:JSON.stringify(
    //             {
    //                 title: 'test product',
    //                 price: 13.5,
    //                 description: 'lorem ipsum set',
    //                 image: 'https://i.pravatar.cc',
    //                 category: 'electronic'
    //             }
    //         )
    //     })
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing required fields");
    }

    

    await prisma.product.create({
        data: {name, description, imageUrl, price},
    });

    redirect("/");
}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fadd-product")
    }
    return(
        <div>
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            <form action={addProduct}>
                <input type="text"
                    required
                    name="name"
                    placeholder="Name"
                    className="input-bordered input mb-3 w-full"
                />
                <textarea id="" cols="30" rows="10" 
                    required
                    name="description"
                    placeholder="Description"
                    className="textarea-bordered textarea mb-3 w-full"
                />
                <input type="url"
                    required
                    name="imageUrl"
                    placeholder="Image URL"
                    className="input-bordered input mb-3 w-full"
                />
                <input
                    required
                    name="price"
                    placeholder="Price"
                    type="number"
                    className="input-bordered input mb-3 w-full"
                />
                <FormSubmitButton type="submit" className="btn-block" textContent="Add" />
            </form>
        </div>
    )
}