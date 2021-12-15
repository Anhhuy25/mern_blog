import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ isAuthenticated, loading, children }) {
  return !isAuthenticated && !loading ? <Navigate to="/login" /> : children;
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
