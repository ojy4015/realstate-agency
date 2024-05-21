"use client";
import { useEffect, useState } from "react";
// we need to get it directly from this URL
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";

import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  // http://localhost:3000/properties/search-results?location=Boston&propertyType=Studio

  //   console.log(searchParams.get("location"));
  const location = searchParams.get("location"); //Boston
  const propertyType = searchParams.get("propertyType"); //Studio

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log("Error searching property", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  //   console.log(properties);

  // search 결과 받은 properties를 표시함
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowAltCircleLeft className="mr-2" /> Back To Properties
            </Link>
            <h1 className="text-2xl mb-4">Search Results</h1>
            {properties.length === 0 ? (
              <p>No search fetchSearchResults found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                  // Listing 1 : Property Card
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default SearchResultsPage;

// each property page

// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { fetchProperty } from "@/utils/requests";
// import PropertyHeaderImage from "@/components/PropertyHeaderImage";
// import Link from "next/link";
// import PropertyDetails from "@/components/PropertyDetails";
// import { FaArrowLeft } from "react-icons/fa";
// import Spinner from "@/components/Spinner";
// import PropertyImages from "@/components/PropertyImages";
// import BookmarkButton from "@/components/BookmarkButton";
// import ShareButton from "@/components/ShareButton";
// import PropertyContactForm from "@/components/PropertyContactForm";

// const PropertyPage = () => {
//   const { id } = useParams();

//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPropertyData = async () => {
//       if (!id) return;

//       try {
//         const property = await fetchProperty(id);
//         setProperty(property);
//       } catch (error) {
//         console.log("Error fetching property", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (property === null) {
//       fetchPropertyData();
//     }
//   }, [id, property]);

//   if (!property && !loading) {
//     return (
//       <h1 className="text-center text-2xl font-bold mt-10">
//         Property Not Found
//       </h1>
//     );
//   }

//   return (
//     <>
//       {loading && <Spinner loading={loading} />}
//       {!loading && property && (
//         <>
//           <PropertyHeaderImage image={property.images[0]} />
//         </>
//       )}
//       <section>
//         <div className="container m-auto py-6 px-6">
//           <Link
//             href="/properties"
//             className="text-blue-500 hover:text-blue-600 flex items-center"
//           >
//             <FaArrowLeft className="mr-2" /> Back to Properties
//           </Link>
//         </div>
//       </section>
//       <section className="bg-blue-50">
//         <div className="container m-auto py-10 px-6">
//           <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
//             <PropertyDetails property={property} />
//             {/* Sidebar */}
//             <aside className="space-y-4">
//               <BookmarkButton property={property} />
//               <ShareButton property={property} />
//               {/* Contact Form */}
//               <PropertyContactForm property={property} />
//             </aside>
//           </div>
//         </div>
//         {/* <pre>{JSON.stringify(property, null, 4)}</pre> */}
//       </section>
//       {/* passing in entire images array */}
//       <PropertyImages images={property?.images} />
//     </>
//   );
// };

// export default PropertyPage;
