import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCalendarDays,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import { notifications } from "../data/mockData";

function Notifications() {

  const getIcon = (type) => {
    if (type === "success") {
      return faCircleCheck;
    }

    if (type === "attendance") {
      return faClock;
    }

    return faCalendarDays;
  };

  return (
    <div>

      <div className="page-actions">

        <div>
          <h2 className="section-title">
            Notifications
          </h2>

          <p className="section-description">
            Stay updated with HR activities
          </p>
        </div>

        <button className="secondary-button">
          Mark all as read
        </button>

      </div>

      <div className="panel">

        <div className="notification-list">

          {notifications.map((notification) => (

            <div
              className="notification-item"
              key={notification.id}
            >

              <div className="notification-icon">
                <FontAwesomeIcon
                  icon={getIcon(notification.type)}
                />
              </div>

              <div className="notification-content">

                <strong>
                  {notification.title}
                </strong>

                <p>
                  {notification.message}
                </p>

                <span>
                  {notification.time}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Notifications;