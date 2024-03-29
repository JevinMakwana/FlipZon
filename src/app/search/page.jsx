import ProductCard from "@/components/ProductCard"


export default async function SearchPage({searchParams: {query}}){
    const  products = await prisma.product.findMany({
        where:{
            OR: [
                {name: {contains: query, mode:"insensitive"}},
                {description: {contains: query, mode:"insensitive"}},
            ]
        },
        orderBy: {id: "desc"}
    })
    if(products.length === 0 ){
        return <div className="text-center">No products found</div>
    }

    return ( 
        <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {products.map(product => (
                <ProductCard prod={product} key={product.id} />
            ))}
        </div>
    )
}