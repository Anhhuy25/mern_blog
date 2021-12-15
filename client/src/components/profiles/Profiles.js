import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Loading from "../layout/Loading";
import ProfilesItem from "./ProfilesItem";

function Profiles({ getProfiles, profile: { profiles, loading } }) {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {profiles.map((profile) => {
        return <ProfilesItem key={profile._id} profile={profile} />;
      })}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  getProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
