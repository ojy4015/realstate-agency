const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all data(properties) from API
// async function fetchProperties() {
//   try {
//     // Handle the case where the domain is not available yet
//     if (!apiDomain) {
//       return [];
//     }

//     const res = await fetch(`${apiDomain}/properties`, { cache: "no-store" });

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     return res.json();
//     // return result object
//     // {
//     //   "totalProperties": 11,
//     //   "properties": [
//     //     {
//     //     },
//     //     {
//     //     },
//     //     {
//     // }
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// fetch all data(properties) from API
// showFeatured가 true이면 새로운 경로를 갖음(/api/properties/featured)
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
    // return result object
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
    return [];
  }
}

// fetch single property from API
async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
