import React from 'react'
import useFetch from '../hooks/useFetch';

const FeaturedProperties = () => {
  const {data, loading, error} = useFetch("/hotels?featured=true&limit=4");
  return (
    <div className="fp">
      {loading ? ("loading") : (
        <>{data && data.map((item, i) => (
          <div className="fpItem" key={i}>
            <img
              src={item?.photos[0]}
              alt=""
              className="fpImg"
            />
            <div className="fpName">{item?.name}</div>
            <div className="fpCity">{item?.city}</div>
            <div className="fpPrice">Starting from {item?.cheapestPrice}</div>
            {item?.rating && <div className="fpRating">
              <button>{item?.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
        ))
        }
        </>
      )
        
      }
    </div>
  )
}

export default FeaturedProperties