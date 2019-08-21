import React from "react";

export default function Bar(props) {
  return (
    <div className="bar" id={ `bar-${props.side}` }>
      { props.children }
    </div>
  )
}
