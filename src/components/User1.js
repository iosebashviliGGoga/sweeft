import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { HistoryContext } from './atoms/Context'
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'

function User1() {
  const { id } = useParams();
  
  const { path } = useContext(HistoryContext)
  const { setPath } = useContext(HistoryContext)
 

  function handleClick(e, item) {
    setPath([...path, item])
  }


  const [item, setItem] = useState({})

  useEffect(() => {
    const link = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setItem(data)
      })
      .catch((error) => {
        console.log(error);
      });



  }, [])



  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const link = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/40`
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
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(page + 1);
    }
  }


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);


  const dataUI = data ? data.map((item) => {
    
    if(!(item.id == id)){
      return <React.Fragment key={item.id}>
      <Link to={`/user/${item.id}`} onClick={(e) => handleClick(e, item)}>
        <div className="user">
          <img src={`${item.imageUrl}?v=${item.id}`} alt="kitty" />
          <div className="content">
            <span className='name'><strong>{item.prefix} {item.name} {item.lastName}</strong></span>
            <span className="position">{item.title}</span>
          </div>
        </div>
      </Link>
    </React.Fragment>
      
    }
   



  }) : ""

  return (
    <motion.div
    intial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}>
      <div className="exact-container" style={{ border: '1px solid #ccc' }}>
        <div className="exact-user">
          {Object.entries(item).length ? <img src={`${item.imageUrl}?v=${item.id}`} alt="" /> : ""}
          <Helmet><title> {Object.entries(item).length ? `${item.prefix} ${item.name} ${item.lastName}` : "loading"}</title></Helmet>
          <fieldset>
            <legend>Info</legend>
            <div className="exact-name">
              <div>
                <strong>
                  {Object.entries(item).length ? [item.prefix, ' ', item.name, ' ', item.lastName] : ""}
                </strong>
              </div>
              <div><i>{Object.entries(item).length ? item.title : ""}</i></div>
            </div>
            <br />
            <div className="exact-content">
              <span>Email</span>: {Object.entries(item).length ? item.email : ""}
            </div>
            <div className="exact-content">
              <span>Ip Address</span>: {Object.entries(item).length ? item.ip : ""}
            </div>
            <div className="exact-content">
              <span>Job Description</span> :  {Object.entries(item).length ? item.jobDescriptor : ""}
            </div>
            <div className="exact-content">
              <span>Job Area</span>:  {Object.entries(item).length ? item.jobArea : ""}
            </div>
            <div className="exact-content">
              <span>Job Type</span>:  {Object.entries(item).length ? item.jobType : ""}
            </div>

          </fieldset>
          <fieldset>
            <legend>Address</legend>
            <div className="exact-name">
              <div><strong> {Object.entries(item).length ? [item.company.name, '  ', item.company.suffix] : ""}</strong></div>
            </div>
            <div className="exact-content">
              <span>City</span>: {Object.entries(item).length ? item.address.city : ""}
            </div>
            <div className="exact-content">
              <span>Country</span>: {Object.entries(item).length ? item.address.country : ""}
            </div>
            <div className="exact-content">
              <span>State</span>: {Object.entries(item).length ? item.address.state : ""}
            </div>
            <div className="exact-content">
              <span>Street Address</span>: {Object.entries(item).length ? item.address.streetAddress : ""}
            </div>

            <div className="exact-content">
              <span>ZIP</span>: {Object.entries(item).length ? item.address.zipCode : ""}
            </div>

          </fieldset>
        </div>
        <div className="breadcrumbs">
          {path.length ? path.map((data, i) => {
            return <React.Fragment key={i}>
              {i !== 0 ? ' >' : ""} <Link to={`/user/${data.id}`}>{data.prefix} {data.name} {data.lastName}</Link>
                    </React.Fragment>
          }) : ""}
        </div>
        <h2>Friends:</h2>
        <div className="container">
          {dataUI}
        </div>
        {loading ? <div className="lds-facebook">
          <div></div><div></div><div></div>
        </div> : ""}
      </div>
    </motion.div>
  )
}
export default User1