import React from "react";
import clsx from "clsx";
import Toolbar from "react-big-calendar/lib/Toolbar";

class CustomToolbar extends Toolbar {
  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;
    // CD Add our List
    messages.list = "List";

    if (viewNames.length > 1) {
      return viewNames.map((name) => (
        <button
          type="button"
          key={name}
          className={clsx({ "rbc-active": view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ));
    }
  }
}

export default CustomToolbar;
