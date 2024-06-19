// server side operations is going to go in the API routes

import connectDB from '@/config/database';
import Property from '@/models/Property';

import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    // http://localhost:3000/api/properties?page=2&pageSize=3
    const page = request.nextUrl.searchParams.get('page') || 1; // default page is 1
    // const pageSize = request.nextUrl.searchParams.get('pageSize') || 6; // default page is 6

    const pageSize =
      request.nextUrl.searchParams.get('pageSize') ||
      process.env.NEXT_PUBLIC_DEFAULT_PAGESIZE; // default page is 6

    const skip = (page - 1) * pageSize;

    const totalProperties = await Property.countDocuments({});
    // console.log(totalProperties);

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    // return new Response("Hello hyung", { status: 200 });
    // return new Response(JSON.stringify(properties), {
    //   status: 200,
    // });

    const result = {
      totalProperties,
      properties,
    };

    // return new Response
    return new Response(JSON.stringify(result), {
      status: 200,
    });
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
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser(); // from the backend

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // get the form data
    const formData = await request.formData();
    // console.log(formData.get("name")); // 'name' is name of any field

    // Access all values from amenities and images because they are arrays
    const amenities = formData.getAll('amenities');
    // if you don't upload image, then the form will send an empty string causing error in Cloudinary
    // 1. select images from the form
    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    // console.log("amenities : ", amenities);
    // console.log("images : ", images);

    // Create propertyData object for database (still need to include the owner)
    const propertyData = {
      name: formData.get('name'),
      type: formData.get('type'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        nightly: formData.get('rates.nightly'),
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
      // images,
    };

    // process of uploading images
    // 1. select images from the form
    // 2. turn them into an array Buffer
    const imageUploadPromises = [];

    for (const image of images) {
      const imagebuffer = await image.arrayBuffer();
      // convert Uint8array
      const imageArray = Array.from(new Uint8Array(imagebuffer));
      // 3. get the data from array Buffer
      const imageData = Buffer.from(imageArray);
      // Convert the image data to base64
      const imageBase64 = imageData.toString('base64');
      // 4. Make request to upload the data to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'propertypulse', // folder you want images save into
        }
      );
      // 5. Cloudinary give us back a Response with a URL
      // 6. put that URL in the images array
      imageUploadPromises.push(result.secure_url);
      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // Add uploaded images to the propertyData object
      propertyData.images = uploadedImages;
    }

    // console.log("propertyData : ", propertyData);

    // save propertyData into the database
    const newProperty = new Property(propertyData);
    await newProperty.save();

    // return new Response("Hello hyung", { status: 200 });
    // return new Response(JSON.stringify({ MESSAGE: "Success" }), {
    //   status: 200,
    // });

    // redirect from the server to the actual property page
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.log(error);
    return new Response('Failed to add property', {
      status: 500,
    });
  }
};
