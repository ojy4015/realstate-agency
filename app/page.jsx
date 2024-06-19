// Github download from
// our homepage
// sever component

import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {
  // console.log(process.env.MONGODB_URI);

  return (
    <div>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

export default HomePage;

//--------------------------------------------------------------------------------
// to connect database from the server component
// import connectDB from '@/config/database';
// const HomePage = async() => {

//     await connectDB();

// };
