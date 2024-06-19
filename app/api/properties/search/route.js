// app>api>properties/search-results>page.jsx에서 불려짐

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    // get search query from web browser url
    // http://localhost:3000/api/properties/search?location=Boston&propertyType=All

    // from app>properties>search-results>page.jsx
    // const res = await fetch(
    //   `/api/properties/search?location=${location}&propertyType=${propertyType}`
    // );

    // searchParams = location=Boston&propertyType=All
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    // console.log("location, propertyType: ", location, propertyType);

    const locationPattern = new RegExp(location, 'i'); // case insensitive

    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };

    // Only check for propertyType if it is not 'All'
    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i'); // case insensitive

      // Match propertyType pattern against database fields
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    // app>api>properties/search-results>page.jsx로 결과 보냄
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
