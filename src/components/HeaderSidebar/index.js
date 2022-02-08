import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

// icon
import hamburgerIcon from './assets/hamburger-icon.png';

// styles
import './styles.scss';

export default function Header({ menus }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleOpenSidebar = () => {
    setOpen((sidebar) => !sidebar);
  };

  const handleOutsideClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <div className="dashboard-header-sidebar" ref={ref}>
      <div className="dashboard-header">
        <div className="dashboard-header-logo">
          <img
            className="hamburger-icon"
            src={hamburgerIcon}
            alt=""
            onClick={handleOpenSidebar}
          />
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-header-user">
          <p>
            Hello, <span>{'User Name'}</span>
          </p>
          <div />
        </div>
      </div>
      <div className={classNames('dashboard-sidebar', { open: open })}>
        {(menus || []).map((menu, index) => (
          <div
            className={classNames('dashboard-sidebar-menu', {
              active: menu.key === 'home',
            })}
            key={index}
          >
            <div />
            <p>{menu.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
