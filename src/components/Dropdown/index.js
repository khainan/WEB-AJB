import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

// styles
import './styles.scss';

export default function Dropdown({
  listMenus = [],
  onSelect = () => {},
  selectedValue,
}) {
  const [selected, setSelected] = useState(selectedValue || 'Select filter');
  const [open, setOpen] = useState(false);

  const ref = useRef();

  const handleOpenDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setSelected(value);
    setOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div className="dropdown-select" ref={ref}>
      <div
        className={classNames('dropdown-select-box', { open: open })}
        onClick={handleOpenDropdown}
      >
        {selected}
      </div>
      {open && (
        <div className="dropdown-select-list">
          {listMenus.map((menu, index) => (
            <div
              key={index}
              className="dropdown-select-list-menu"
              onClick={() => handleSelect(menu.value)}
            >
              {menu.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
