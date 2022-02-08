import React, { useState, useEffect } from 'react';
import axios from 'axios';

// components
import Dropdown from '../components/Dropdown';
import HeaderSidebar from '../components/HeaderSidebar';
import Table from '../components/Table';

// styles
import './styles.scss';

export default function Dashboard() {
  const [users, setListUsers] = useState([]);
  const [filter, setFilter] = useState({
    results: 10,
    search: '',
    page: 0,
    gender: 'all',
  });

  const menus = [{ title: 'Home', key: 'home' }];

  const gender = [
    { title: 'Female', value: 'female' },
    { title: 'Male', value: 'male' },
  ];

  const tableConfig = {
    no: {
      propData: {
        number: 'number',
      },
      render: (prop) => prop.number,
    },
    name: {
      propData: {
        name: 'name',
      },
      render: (prop) => prop.name,
    },
    email: {
      propData: {
        email: 'email',
      },
      render: (prop) => prop.email,
    },
    gender: {
      propData: {
        gender: 'gender',
      },
      render: (prop) => prop.gender,
    },
    registered: {
      propData: {
        registered: 'registered',
      },
      render: (prop) => prop.registered,
    },
  };

  const parseQuery = (subject) => {
    const results = {};
    const parser = /[^&?]+/g;
    let match = parser.exec(subject);

    while (match !== null) {
      const parts = match[0].split('=');

      results[parts[0]] = parts[1];
      match = parser.exec(subject);
    }

    return results;
  };

  const getListUsers = async () => {
    await axios
      .get('https://randomuser.me/api/?results=10')
      .then((res) => {
        const { data } = res;
        const { results } = data || [];
        handleSetData(results);
      })
      .catch((e) => console.log(e));
  };

  const handleSetData = (data) => {
    const newData = [];

    data.map((val, index) => {
      let newUserData = {
        number: `${index < 9 ? filter.page : ''}${index + 1}`,
        name: `${val.name.title} ${val.name.first} ${val.name.last}`,
        email: val.email,
        gender: val.gender,
        registered: val.registered.date,
      };

      newData.push(newUserData);
    });

    setListUsers(newData);
  };

  const handleSetFilter = (key, value) => {
    const newFilter = { ...filter, [key]: value };

    setFilter(newFilter);
  };

  useEffect(() => {
    getListUsers();
  }, []);

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
              <div className="search-icon" />
              <input
                placeholder="Search..."
                value={filter.search}
                onChange={(e) => handleSetFilter('search', e.target.value)}
              />
            </div>
            <Dropdown listMenus={gender} />
            <button className="button">Search</button>
            <button className="button">Reset Filter</button>
          </div>
        </div>
        <div className="dashboard-content-body">
          <Table config={tableConfig} data={users} />
        </div>
      </div>
    </div>
  );
}
