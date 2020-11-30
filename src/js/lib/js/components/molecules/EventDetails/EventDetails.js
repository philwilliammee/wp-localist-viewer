import React, { useContext } from "react";
import EventsContext from "../../../context/EventsContext";
import PropTypes from "prop-types";
import {
  getEventTypeString,
  getEventDate,
  getEventFullTime,
  getEventDepartmentsString,
} from "../../../helpers/displayEvent";
import AddCal from "../addCal";
import { EventImg } from "../partials";
import truncateUrl from "truncate-url";
import Grid from "../../atoms/Grid";
import "./EventStyle.scss";

const AgendaInner = (props) => {
  let { event } = props;
  const { events } = useContext(EventsContext);
  // Get the full event details
  event = events.find((e) => e.event.id === event.id).event;

  if (!event) {
    return "";
  }

  const deptWebsite = event.custom_fields.dept_web_site
    ? event.custom_fields.dept_web_site
    : "";

  const eventType = getEventTypeString(event);

  return (
    <section className="event-details">
      <div className="cwd-component">
        <div className="cwd-events-style">
          <div className="field title">
            <h3>{event.title}</h3>
          </div>
          <span>
            {getEventDate(event)} @ {getEventFullTime(event)}
          </span>
          <span className="inline-events-type">
            {event.location_name ? event.location_name : event.experience}
          </span>
          <div className="field field-name-summary summary">
            <div>
              <div style={{ float: "left", paddingRight: "15px" }}>
                <EventImg
                  photoUrl={event.photo_url}
                  title={event.title}
                  hideimages={"false"}
                  photoCrop="big"
                />
              </div>
              <span dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
          </div>
          <div className="cwd-more-info">
            <Grid container>
              <Grid col={12}>
                <h4>Details</h4>
              </Grid>
              <Grid col={6}>
                {eventType ? (
                  <>
                    <h5>Event Type</h5>
                    <p>{eventType}</p>
                  </>
                ) : (
                  ""
                )}
                <h5>Departments</h5>
                <p>{getEventDepartmentsString(event)}</p>
                {event.tags.length > 0 ? (
                  <>
                    <h5>Tags</h5>
                    <p>{event.tags.join(", ")}</p>
                  </>
                ) : (
                  ""
                )}

                <h5>Website</h5>
                <p>
                  <a href={event.url}>{truncateUrl(event.url, 60)}</a>
                </p>
              </Grid>
              {/* <Grid col={4}>
                <h4>Group</h4>
                <p>{event.group_name}</p>
                <h5>Website</h5>
                <p>The website url</p>
              </Grid> */}
              <Grid col={6}>
                <h5>Group</h5>
                <p>{event.group_name}</p>
                {event.hashtag ? (
                  <>
                    <h5>HashTag</h5>
                    <p>#{event.hashtag}</p>
                  </>
                ) : (
                  ""
                )}

                <h5>Contact E-Mail</h5>
                <p>
                  <a href={`mailto:${event.custom_fields.contact_email}`}>
                    {event.custom_fields.contact_email}
                  </a>
                </p>
                <h5>Contact Name</h5>
                <p>{event.custom_fields.contact_name}</p>
                {deptWebsite ? (
                  <>
                    <h5>Dept. Web Site</h5>
                    <p>
                      <a href={deptWebsite}>{truncateUrl(deptWebsite, 60)}</a>
                    </p>
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </div>

          {/* <div className="cwd-more-info secondary">
            <Grid container>
              <Grid col={4}>
                <h4>Venue</h4>
                <h5>The venue</h5>
              </Grid>
            </Grid>
          </div> */}
          <p>
            {/* <a href="/#" className="link-button">
              Register link
            </a> */}

            <AddCal event={event} hideaddcal="false" />
          </p>
        </div>
      </div>
    </section>
  );
};

AgendaInner.propTypes = {
  event: PropTypes.object.isRequired,
};

export default AgendaInner;
