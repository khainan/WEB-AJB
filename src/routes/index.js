import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';

// components
import Dropdown from '../components/Dropdown';
import HeaderSidebar from '../components/HeaderSidebar';

// styles
import './styles.scss';

export default function Dashboard() {
  const [users, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const menus = [
    { title: 'Home', key: "home" },
  ];

  const gender = [
    {title: "Female", value: "female"},
    {title: "Male", value: "male"},
  ]


  const getListUsers = async () => {
    await axios
      .get('https://randomuser.me/api/?results=5')
      .then((res) => {
        const { data } = res;
        const { results } = data || [];
        setListUsers(results);
      })
      .catch((e) => console.log(e));
  };

  const nextPage = () => {
    if (currentPage < 5) {
      setCurrentPage((page) => page + 1);
    }
  };

  const previousPage = () => {
    if (currentPage) {
      setCurrentPage((page) => page - 1);
    }
  };

  const searchUser = async () => {
    await axios
      .get(`https://randomuser.me/api/?results=1&name="${search}"`)
      .then((res) => {
        const { data } = res;
        const { results } = data || [];
        setListUsers(results);
      })
      .catch((e) => console.log(e));
  };

  const handleSearch = (event) => {
    const { code, target } = event || {};
    const { value } = target || {};

    setSearch(value);

    if (code === 'Enter' && search) {
      searchUser();
    }
  };

  useEffect(() => {
    getListUsers();
  }, [currentPage]);

  return (
    <div id="dashboard" className="dashboard">
      <HeaderSidebar menus={menus} />
      <div className="dashboard-content">
        <div className="dashboard-content-header">
          <div className="dashboard-content-header-title">
            <h1>User Search</h1>
            <p>Search someone.</p>
          </div>
          <div className="dashboard-content-header-action">
            <div className="search-input">
              <div className="search-icon" onClick={searchUser} />
              <input
                placeholder="Search..."
                value={search}
                onKeyPress={handleSearch}
              />
            </div>
            <Dropdown listMenus={gender} />
          </div>
        </div>
        <div className="dashboard-content-body">
        </div>
        <div className="dashboard-pagination">
          <button
            disabled={!currentPage}
            className={classNames({ disabled: !currentPage })}
            onClick={previousPage}
          >
            {'<'} Previous Page
          </button>
          <button
            disabled={currentPage > 5}
            className={classNames({ disabled: currentPage > 4 })}
            onClick={nextPage}
          >
            Next Page {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
