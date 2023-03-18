import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { HistoryContext } from './atoms/Context'
import { Helmet } from 'react-helmet-async';
function Landing() {
  const { path, setPath } = useContext(HistoryContext)



  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    const link = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/40`
    fetch(link)
      .then((response) => response.json())
      .then((Data) => {
        setData([...data, ...Data.list]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [page])



  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 10
    ) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  function handleClick(e, item) {
    setPath([...path, item])
  }

  
  const dataUI = data ? data.map((item) => {
    return <React.Fragment key={item.id}>
      <Link to={`user/${item.id}`} onClick={(e) => handleClick(e, item)}>
        <div className="user">
          <img src={`${item.imageUrl}?v=${item.id}`} alt="animal" />
          <div className="content">
            <span className='name'><strong>{item.prefix} {item.name} {item.lastName}</strong></span>
            <span className="position">{item.title}</span>
          </div>
        </div>
      </Link>
    </React.Fragment>



  }) : ""


  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
      <Helmet><title>SweeftDigital</title></Helmet>
      <div className="container">
        {dataUI}
      </div>
      {loading ? <div className="lds-facebook">
        <div></div><div></div><div></div>
      </div> : ""}
    </motion.div>
  )
}

export default Landing