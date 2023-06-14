// src/Event.js

import React, { Component } from "react";


class Event extends Component {
    state = { collapsed: true };
    handleClick = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed,
        }));
    };
    

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
        <div className="event">
            <h1 className="eventHeader">
                {event.summary}
            </h1>
            <p className="eventLocation">
                {`${event.summary} | ${event.location}`}
            </p>
            <p className="eventStart">
                {new Date(event.start.dateTime).toString()}    
            </p>
            
            {!collapsed && (
                <div className="eventDetails">
                    <h2 className="details">Details:</h2>
                    <a
                        className="link"
                        href={event.htmlLink}
                    >See details on Google Calendar</a>
                    <p className="description">{event.description}</p>
                </div>
            )}
            <button
            type="button"
            className="expand"
            onClick={() => this.handleClick()}
            >{collapsed ? "show" : "hide"} Details: </button>
        </div>
    );
  }
}
export default Event;