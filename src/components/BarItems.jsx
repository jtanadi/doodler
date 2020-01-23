import React from "react";

export default function BarItems(props) {
  // items is an object: { action: icon }
  const {
    items,
    selectedItem,
    itemClass,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onClick,
  } = props;

  return (
    Object.keys(items).map(key => {
      const className = (key === selectedItem)
        ? `${itemClass} selected`
        : `${itemClass}`

      return (
        <div
          key={key}
          className={className}
          id={key}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          <span>{items[key]}</span>
        </div>
      )
    })
  )
}

