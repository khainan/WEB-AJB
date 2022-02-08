import React from 'react';
import map from 'lodash.map';
import forEach from 'lodash.foreach';

import './styles.scss';

export default function Table({ config, data }) {
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
  };

  const defaultData = [
    {
      number: 1,
      name: 'Name',
      email: 'name@mail.com',
      gender: 'Female',
      registered: 'name',
    },
    {
      number: 2,
      name: 'Name',
      email: 'name@mail.com',
      gender: 'Female',
      registered: 'name',
    },
    {
      number: 3,
      name: 'Name',
      email: 'name@mail.com',
      gender: 'Female',
      registered: 'name',
    },
  ];

  function renderData(data, config) {
    const newConfig = {};
    forEach(config, (val, key) => {
      newConfig[key] = data[val];
    });

    return newConfig;
  }

  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          {map(tableConfig, ({}, headKey) => (
            <th key={`th-${headKey}`}>
              <div className="th-content">{headKey}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {map(defaultData, (dataValue, index) => {
          return (
            <tr data-tr={index}>
              {map(tableConfig, (config, bodyKey) => (
                <td key={`td-${bodyKey}`} data-td={bodyKey}>
                  <div className="td-content">
                    {config.render
                      ? config.render(renderData(dataValue, config.propData))
                      : '-'}
                  </div>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
