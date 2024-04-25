import React, { useEffect, useState } from "react";
import Car from "./Car";

interface CarProps {
    image: string,
    title: string,
    start_production: number,
    class: string
}

interface ResponseType {
    next?: {
      page: number;
      limit: number;
    };
    previous?: {
      page: number;
      limit: number;
    };
    results: CarProps[];
    total: number;
  }

function Scrol() {
    const [cars, setCars] = useState<CarProps[]>([])
    const [page, setPage] = useState<number>(1) 
    const [fetching, seyFetching] = useState<boolean>(false)

    async function getData(limit: number = 5, page:number) {
        try {
            const response = await fetch(`http://localhost:3000/machines?limit=${limit}&page=${page}`)
            const data: ResponseType = await response.json()
            setCars([...cars, ...data.results])
            setTimeout(() => {
                seyFetching(false)
            }, 500)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       getData(10, page)
    }, [fetching])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  function scrollHandler(e: Event) {
    const target = e.target as HTMLDocument
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 ) {
      setTimeout(() => {
        seyFetching(true)
      }, 500)
      setPage(page + 1)
    }
  }

  return (
    <div className="scroll">
        <div className="page-cards">
        {cars.length > 0 &&
          cars.map((car, index) => (
            <Car
              key={index}
              image={car.image}
              title={car.title}
              start_production={car.start_production}
              class={car.class}
            />
          ))}
        </div>
    </div>
  );
}

export default Scrol;
