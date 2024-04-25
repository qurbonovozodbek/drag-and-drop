import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Car from "./Car";

interface CarType {
  image: string;
  name: string;
  start_production: number;
  class: string;
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
  results: CarType[];
  total: number;
}

function Paginationn() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  async function getData(limit: number, page: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/machines?limit=${limit}&page=${page}`
      );
      const data: ResponseType = await response.json();
      setCars(data.results);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData(limit, currentPage);
  }, [limit, currentPage]);

  function handleChange(event: React.ChangeEvent<unknown>, page: number) {
    event.preventDefault();
    setCurrentPage(page);
  }

  return (
    <div>
      <h1>Pagination</h1>
      <div className="page-cards">
        {cars.length > 0 &&
          cars.map((car, index) => (
            <Car
              key={index}
              image={car.image}
              title={car.name}
              start_production={car.start_production}
              class={car.class}
            />
          ))}
      </div>
      <div className="page-footer">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          shape="rounded"
        />
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={60}>60</option>
        </select>
      </div>
    </div>
  );
}

export default Paginationn;
