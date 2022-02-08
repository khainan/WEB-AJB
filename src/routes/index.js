import React, { useState, useEffect } from 'react';
import startCase from 'startcase';
import axios from 'axios';
import moment from 'moment';

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
    page: 1,
    gender: 'all',
    sort: 'asc',
  });

  const menus = [{ title: 'Home', key: 'home' }];

  const gender = [
    { title: 'All', value: 'all' },
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
      useSort: true,
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

  const stringifyQuery = (object) => {
    if (!object) {
      return '';
    }

    const listObj = Object.keys(object);
    const createQueryVar = listObj.map((a) => {
      if (Array.isArray(object[a])) {
        const arrayToString = object[a].map((value) => `"${value}"`).toString();

        return `${a}=[${arrayToString}]`;
      }

      return object[a] ? `${a}=${object[a]}` : '';
    });

    return createQueryVar.filter(Boolean).join('&');
  };

  const getListUsers = async (filterValue) => {
    await axios
      .get(`https://randomuser.me/api/?${stringifyQuery(filterValue)}`)
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
      const { name, email, gender, registered } = val || {};
      const number =
        index + 1 === 10
          ? `${filter.page}0`
          : filter.page > 1
          ? `${filter.page - 1}${index + 1}`
          : `${index + 1}`;

      let newUserData = {
        number,
        name: `${name.first} ${name.last}`,
        email,
        gender: startCase(gender),
        registered: moment(registered.date).format('DD-MM-YYYY HH:MM'),
      };

      newData.push(newUserData);
    });

    setListUsers(newData);
  };

  const handleSetFilter = (key, value) => {
    const newFilter = { ...filter, [key]: value };

    setFilter(newFilter);
  };

  const handleClickResetFilter = () => {
    const defaultFilter = {
      results: 10,
      search: '',
      page: 1,
      gender: 'all',
      sort: 'asc',
    };

    setFilter(defaultFilter);
    getListUsers(defaultFilter);
  };

  const handleClickSearch = () => {
    const newFilter = {
      ...filter,
      page: 1,
    };

    setFilter(newFilter);
    getListUsers(newFilter);
  };

  useEffect(() => {
    getListUsers(filter);
  }, [filter.page, filter.sort]);

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
            <Dropdown
              listMenus={gender}
              selectedValue={filter.gender}
              onSelect={(selected) => handleSetFilter('gender', selected)}
            />
            <button className="button" onClick={handleClickSearch}>
              Search
            </button>
            <button className="button" onClick={handleClickResetFilter}>
              Reset Filter
            </button>
          </div>
        </div>
        <div className="dashboard-content-body">
          <Table
            config={tableConfig}
            data={users}
            filterData={filter}
            onChangePagination={(page) => handleSetFilter('page', page)}
            onClickSort={(sort) => handleSetFilter('sort', sort)}
          />
        </div>
      </div>
    </div>
  );
}
