import { HomeProps } from '@/utils';
import { fuels, yearsOfProduction } from '@/utils';
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from '@/components';
import { CarProps } from '@/components/CarCard';

const car: CarProps = {
  type: 'Essence',
  model: 'Audi A4',
  mode: 'Automatic',
  brand: 'Audi',
  date: '2019',
  duration: '1 year',
  imgPath: '/audi-RS3.jpeg',
  price: 100,
};

export default async function Home({ searchParams }: HomeProps) {
  const isDataEmpty = false;

  return (
    <main className='overflow-hidden'>
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
              <CarCard car={car} />
              <CarCard car={car} />
              <CarCard car={car} />
              {/* {allCars?.map((car) => (
                <CarCard car={car} />
              ))} */}
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
