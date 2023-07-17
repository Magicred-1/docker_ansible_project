import { HomeProps } from '@/utils';
import { fuels, yearsOfProduction } from '@/utils';
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from '@/components';
import { VehicleProps } from '@/components/VehicleCard';

const vehicle: VehicleProps = {
  vehicleType: 'Car',
  type: 'Essence',
  model: 'Audi A4',
  mode: 'Automatic',
  brand: 'Audi',
  date: '2019',
  duration: '1 year',
  imgPath: '/audi-RS3.jpeg',
  price: 100,
};

const getAllCars = async () => {
  const allCars = await fetch(
    `http://localhost:${process.env.PORT}/vehicules`,
    {
      method: 'GET',
      next: { revalidate: 20 },
    }
  );
  return allCars.json();
};

export default async function Home({ searchParams }: HomeProps) {
  const isDataEmpty = false;
  const allCars = await getAllCars();

  return (
    <main className='overflow-hidden' data-theme='light'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((vehicle: VehicleProps) => (
                <CarCard vehicle={vehicle} />
              ))}
            </div>

            {/*  <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            /> */}
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
