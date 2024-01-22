import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";

const renderDescriptionWithLinks = (description) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return description.replace(urlRegex, (url) => {
    console.log("url>>",url);
    return <a href={url} target="_blank" rel="noopener noreferrer">
      {JSON.stringify(url)}
    </a>
    });
};

export default function ProductCard({ prod }) {
  const isNew = ((Date.now() - new Date(prod.createdAt).getTime()) < (1000*60*60*24));
  const convertUrlsToLinks = (text) => {
    return text.replace(/(https?:\/\/\S+)/g, '<p class="text-purple-600" target="_blank">LINK</p>');
  };
  return (
    <Link href={"/products/" + prod.id} className="card w-full bg-base-100 hover:shadow-xl transition-shadow">
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
        {/* Render description with clickable links */}
        <p dangerouslySetInnerHTML={{ __html: convertUrlsToLinks(prod.description) }} />
        <PriceTag price={prod.price} />
      </div>
    </Link>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import PriceTag from "./PriceTag";


// export default function ProductCard({ prod }) {
//     const isNew = ((Date.now() - new Date(prod.createdAt).getTime()) < (1000*60*60*24));
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     prod.description =  prod.description.replace(urlRegex, (url) => {
//         console.log(url)
//         return <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-green-400">
//             url
//         </a>
//     })
//     return(
//         <Link href={"/products/" + prod.id} 
//             className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
//         >
//             <figure>
//                 <Image 
//                     src={prod.imageUrl} 
//                     alt={prod.name}
//                     width={800}
//                     height={400}
//                     className="h-48 object-cover"
//                 />
//             </figure>  
//                 <div className="card-body">
//                     <h2 className="card-title">
//                         {prod.name}
//                         {isNew && <div className="badge badge-secondary">NEW</div>}
//                     </h2>
//                     <p>{prod.description}</p>
//                     <PriceTag price={prod.price} />
//                 </div>
//         </Link>
//     )
// }
