import React, { useState, useEffect } from 'react';
import startCase from 'startcase';
import axios from 'axios';
import moment from 'moment';

// components
import Dropdown from '../../components/Dropdown';
import HeaderSidebar from '../../components/HeaderSidebar';
import Table from '../../components/Table';

// core
import { stringifyQuery } from '../../core/utils';
import { DEFAULT_FILTER, GENDER } from '../../core/constants';

// icon
import homeIcon from './assets/home-icon.png';
import searchIcon from './assets/search-icon.png';

// styles
import './styles.scss';

export default function Dashboard() {
  const [users, setListUsers] = useState([]);
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  const menus = [{ title: 'Home', key: 'home', icon: homeIcon }];

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
        picture: 'picture',
      },
      useSort: true,
      render: (prop) => {
        const { name, picture } = prop || {};

        return (
          <div className="user-info">
            <img src={picture} /> {name}
          </div>
        );
      },
    },
    email: {
      propData: {
        email: 'email',
      },
      useSort: true,
      render: (prop) => prop.email,
    },
    gender: {
      propData: {
        gender: 'gender',
      },
      useSort: true,
      render: (prop) => prop.gender,
    },
    registered: {
      propData: {
        registered: 'registered',
      },
      useSort: true,
      render: (prop) => prop.registered,
    },
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
      const { name, email, gender, registered, picture } = val || {};
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
        picture: picture.thumbnail,
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
    setFilter(DEFAULT_FILTER);
    getListUsers(DEFAULT_FILTER);
  };

  const handleClickSearch = () => {
    const newFilter = {
      ...filter,
      page: 1,
    };

    setFilter(newFilter);
    getListUsers(newFilter);
  };

  const handleSort = (sortBy, sortOrder) => {
    const newFilter = {
      ...filter,
      sortBy,
      sortOrder,
    };

    getListUsers(newFilter);
  };

  useEffect(() => {
    getListUsers(filter);
  }, [filter.page]);

  return (
    <div id="dashboard" className="dashboard">
      <HeaderSidebar menus={menus} />
      <div className="dashboard-content">
        <div className="dashboard-content-header">
          <div className="dashboard-content-header-title">
            <h1>Dashboard User</h1>
            <p>Search user with <strong>randomuser.me</strong> datas</p>
          </div>
          <div className="dashboard-content-header-action">
            <div className="search-input">
              <img src={searchIcon} className="search-icon" />
              <input
                placeholder="Search..."
                value={filter.search}
                onChange={(e) => handleSetFilter('search', e.target.value)}
              />
            </div>
            <Dropdown
              listMenus={GENDER}
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
            onClickSort={(sortBy, sortOrder) => handleSort(sortBy, sortOrder)}
          />
        </div>
      </div>
    </div>
  );
}
