import React from 'react';
import map from 'lodash.map';
import forEach from 'lodash.foreach';
import classNames from 'classnames';

import './styles.scss';

export default function Table({
  config,
  filterData,
  data,
  onChangePagination,
  onClickSort,
}) {
  const { page } = filterData || {};

  const renderData = (data, config) => {
    const newConfig = {};
    forEach(config, (val, key) => {
      newConfig[key] = data[val];
    });

    return newConfig;
  };

  const nextPage = () => {
    if (page < 5) {
      onChangePagination(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      onChangePagination(page - 1);
    }
  };

  return (
    <>
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              {map(config, (configValue, headKey) => (
                <th key={`th-${headKey}`}>
                  <div className="th-content">
                    {headKey}{' '}
                    {configValue.useSort && (
                      <div className="sort-table">
                        <div
                          className="sort-up"
                          onClick={() => onClickSort('asc')}
                        />
                        <div
                          className="sort-down"
                          onClick={() => onClickSort('desc')}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {map(data, (dataValue, index) => {
              return (
                <tr key={`body-tr-${index}`} data-tr={index}>
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
          disabled={!page}
          className={classNames({ disabled: page === 1 })}
          onClick={previousPage}
        >
          {'<'} Previous Page
        </button>
        <button
          disabled={page > 5}
          className={classNames({ disabled: page > 4 })}
          onClick={nextPage}
        >
          Next Page {'>'}
        </button>
      </div>
    </>
  );
}
