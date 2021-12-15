import React from "react";
import { Link } from "react-router-dom";

function ProfilesItem({ profile }) {
  const {
    user: { username, avatar },
    skills,
    status,
    company,
    location,
  } = profile;

  return (
    <div className="profile bg-light">
      <img src={avatar} alt={username} className="round-img" />
      <div>
        <h2>{username}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to="/edit-profile" className="btn btn-primary">
          Edit Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfilesItem;
