'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// default profile image if google doesn't have profile image
import profileDefault from '@/assets/images/profile.png';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  // getting user from the session in the client
  const { data: session } = useSession();

  // session {user: id: "fdjgjsdl.."}

  // console.log('session in ProfilePage : ', session);
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) return;

      try {
        // app>api>properties>user>userId의 GET 으로부터 response를 받음
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json(); // data(properties)는 name: "young property" 상태
          // console.log("data --->", data);
          setProperties(data);
        }
      } catch (error) {
        console.log('Error fetching user properties', error);
      } finally {
        setLoading(false);
      }
    };

    // call fetchUserProperties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session?.user?.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    // console.log(propertyId);
    const confirmed = window.confirm(
      'Are you sure you want to delete this property?'
    );

    if (!confirmed) return;

    // make a request to our API route to delete
    try {
      // DELETE /api/properties/:id
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        // Remove the property from state
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);
        toast.success('Property Deleted');
      } else {
        toast.error('Failed to delete property');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete property');
    }
  };

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    //   src="/images/profile.png"
                    src={profileImage || profileDefault}
                    width={100}
                    height={100}
                    alt="User"
                  />
                </div>
                <h2 className="text-2xl mb-4">
                  <span className="font-bold block">Name: </span> {profileName}
                </h2>
                <h2 className="text-2xl">
                  <span className="font-bold block">Email: </span>{' '}
                  {profileEmail}
                </h2>
              </div>

              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                {/* {console.log("properties ----> ", properties)} */}
                {!loading && properties?.length === 0 && (
                  <p>You have no property listings</p>
                )}
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  properties.map((property) => (
                    <div key={property._id} className="mb-10">
                      <Link href={`/properties/${property._id}`}>
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          alt=""
                          width={500}
                          height={100}
                          priority={true}
                        />
                      </Link>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">{property.name}</p>
                        <p className="text-gray-600">
                          Address: {property.location.street}{' '}
                          {property.location.city} {property.location.state}{' '}
                        </p>
                      </div>
                      <div className="mt-2">
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <pre>{JSON.stringify(properties, null, 4)}</pre>
    </>
  );
};

export default ProfilePage;
