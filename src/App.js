import React, { useState } from 'react';
import './App.css';
import searchData from './Mock/searchData'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const icons = {
  user: <i className="fa fa-user" aria-hidden="true"></i>,
  messages: <i className="fa fa-comments-o" aria-hidden="true"></i>,
  files: <i className="fa fa-files-o" aria-hidden="true"></i>,
  channel: <i className="fa fa-book" aria-hidden="true"></i>
}
function App() {
  const [search, setSearch] = useState("")
  const [grp, setGrp] = useState("")
  const [open, setOpen] = useState("")
  const [filter, setFitler] = useState([])

  const handleChange = (event) => {
    setSearch(event.target.value)
    if (grp) {
      if (event.target.value.length) {
        setFitler(searchData?.[grp.name].filter(({ name }) => name.toLowerCase().match(event.target.value.toLowerCase())))
      }
      else {
        setFitler([])
      }
    }
    else {
      handleNormalSearch(event.target.value)
    }
  }

  const handleClick = (name) => {
    console.log(name);
    setGrp({
      name: name,
      icon: <i className="fa fa-times" aria-hidden="true"></i>
    })
  }

  const handleNormalSearch = (value) => {
    if (value.length) {
      let initialfilter = []
      let finalFilter = []
      for (let index = 0; index < Object.keys(searchData).length; index++) {
        initialfilter.push(
          Object.values(searchData)[index]
            .filter(({ name }) => name.toLowerCase().match(value.toLowerCase())))
        initialfilter[index].map(name => finalFilter.push(name))
      }
      setFitler(finalFilter)
    }
    else {
      setFitler([])
    }
  }

  return (
    <div className="App">
      <div className="search_wrap">
        <div className="search_icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <input onClick={() => setOpen(!open)} placeholder="Search" className="form-control" />
      </div>
      <div className="user-modal">
        <Modal open={open} onClose={() => setOpen(!open)}>
          <div className="custom-modal">
            <div className="form-control d-flex" >
              {grp?.name}
              {grp?.icon ?
                <div className="ml-2 mr-3" onClick={() => {
                  setGrp("")
                  setFitler([])
                  handleNormalSearch(search)
                }
                }>
                  {grp?.icon}
                </div>
                : null
              }
              <input placeholder="Enter" value={search} onChange={handleChange} autoFocus={true} />
            </div>
            <div className="filter-list">
              {
                filter.map(({ name, icon, user }, index) => {
                  return (
                    <div key={index}>
                      {icons[icon]}
                      {
                        user ?
                          <span className="mr-2">{user}</span> : null
                      }
                      {name}
                    </div>
                  )
                })
              }
            </div>
            {
              grp === "" && filter.length <= 0 ?
                <div className="icon-group-wrap">
                  {
                    Object.keys(icons).map((name, index) => {
                      return (
                        <div className="icon-btn" key={index}>
                          <div className="icon-group" onClick={() => handleClick(name)} >
                            {
                              Object.values(icons)[index]
                            }
                            <span>{name}</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div> : null
            }
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
