import React, { useState } from 'react';
import map from 'lodash.map';
import forEach from 'lodash.foreach';
import classNames from 'classnames';

import './styles.scss';

export default function Table({ config, filterData, data }) {
  const { page } = filterData || {};
  const [currentPage, setCurrentPage] = useState(page || 0);

  const renderData = (data, config) => {
    const newConfig = {};
    forEach(config, (val, key) => {
      newConfig[key] = data[val];
    });

    return newConfig;
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

  return (
    <>
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              {map(config, ({}, headKey) => (
                <th key={`th-${headKey}`}>
                  <div className="th-content">{headKey}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {map(data, (dataValue, index) => {
              return (
                <tr data-tr={index}>
                  {map(config, (config, bodyKey) => (
                    <td key={`td-${bodyKey}`} data-td={bodyKey}>
                      <div className="td-content">
                        {config.render
                          ? config.render(
                              renderData(dataValue, config.propData)
                            )
                          : '-'}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </>
  );
}