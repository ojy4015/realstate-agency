'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';

const Properties = async () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 원하는 페이지로 가기, 한페이지당 아이템수
  // http://localhost:3000/api/properties?page=2&pageSize=3
  const [page, setPage] = useState(1); //default page is 1
  // const [pageSize, setPageSize] = useState(6); //default pageSize is 6
  const [pageSize, setPageSize] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_PAGESIZE
  ); //default pageSize is 6
  const [totalItems, setTotalItems] = useState(0); //default totalItems is 0

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        // console.log("res : ", res);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.totalProperties);
        // {
        //   "totalProperties": 11,
        //   "properties": [
        //     {
        //     },
        //     {
        //     },
        //     {
        // }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  // Sort properties by date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                // Listing 1 : Property Card
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
          {/* Pagination에서 변경된 page를 받음(onPageChange를 통해) */}
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
      <pre>{JSON.stringify(properties, null, 4)}</pre>
    </>
  );
};

export default Properties;
