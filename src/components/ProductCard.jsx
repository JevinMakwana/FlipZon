import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";



export default function ProductCard({ prod }) {
    const isNew = ((Date.now() - new Date(prod.createdAt).getTime()) < (1000*60*60*24));
    
    return(
        <Link href={"/products/" + prod.id} 
            className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
        >
            <figure>
                <Image 
                    src={prod.imageUrl} 
                    alt={prod.name}
                    width={800}
                    height={400}
                    className="h-48 object-cover"
                />
            </figure>  
                <div className="card-body">
                    <h2 className="card-title">
                        {prod.name}
                        {isNew && <div className="badge badge-secondary">NEW</div>}
                    </h2>
                    <p>{prod.description}</p>
                    <PriceTag price={prod.price} />
                </div>
        </Link>
    )
}