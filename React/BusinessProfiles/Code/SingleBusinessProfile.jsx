import React from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup";
const SingleBusinessProfile = props => {
  return (
    <React.Fragment>
      <div className="col-sm-12">
        <div className="card b hovercard text-center" style={{ padding: 10 }}>
          <div className="info">
            <div className="row">
              <div className="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                <div className="row">
                  <div className="col-md-6">
                    <div className="ttl-info text-center">
                      <em
                        className="fa-2x mr-2 fas fa-industry"
                        data-toggle="tooltip"
                        title="Business Industry"
                      ></em>
                      <br />
                      <br />
                      <h3 style={{ color: "#d4af37" }}>
                        <h5 style={{ color: "#656565" }}>Industry Type</h5>
                        {props.busProfile.industryTypes.name}
                      </h3>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="ttl-info text-center">
                      <em
                        className="fa-2x mr-2 far fa-handshake"
                        data-toggle="tooltip"
                        title="Years In business"
                      ></em>
                      <br />
                      <br />
                      <h3 style={{ color: "#d4af37" }}>
                        <h5 style={{ color: "#656565" }}>Years in Business</h5>
                        {props.busProfile.yearsInBusiness}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                <div className="user-designation">
                  <div className="title">
                    <h1>{props.busProfile.name}</h1>
                    <img
                      src={props.busProfile.imageUrl}
                      height="100px"
                      width="160px"
                      style={{ objectFit: "contain" }}
                      alt="business profile"
                    />
                  </div>
                  <br />
                  <h5 className="desc mt-2">
                    {props.busProfile.businessTypeId.name}
                  </h5>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                <div className="row">
                  <div className="col-md-6">
                    <div className="ttl-info text-center">
                      <em
                        className="fa-2x icon-graph mr-2"
                        data-toggle="tooltip"
                        title="Business Stage"
                      ></em>
                      <br />
                      <br />
                      <h3 style={{ color: "#d4af37" }}>
                        <h5 style={{ color: "#656565" }}>Business Stage</h5>
                        {props.busProfile.businessStageId.name}
                      </h3>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="ttl-info text-center">
                      <em
                        className="fa-2x icon-location-pin mr-2"
                        data-toggle="tooltip"
                        title="Address"
                      ></em>
                      <br />
                      <br />
                      <h3 style={{ color: "#d4af37" }}>
                        <h5 style={{ color: "#656565" }}>Address</h5>
                        {props.busProfile.addressId}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="follow">
              <div className="row">
                <div className="col-6 text-md-right border-right">
                  <h4 className="follow-num" style={{ color: "#85bb65" }}>
                    <CountUp
                      end={props.busProfile.projectedAnnualBusinessIncome}
                      decimals={2}
                      decimal={"."}
                      prefix={"$"}
                      duration={2}
                      separator=","
                      delay={0}
                    />
                  </h4>
                  <h6>Annual Projected Income</h6>
                </div>
                <div className="col-6 text-md-left">
                  <h4 className="follow-num" style={{ color: "#85bb65" }}>
                    <CountUp
                      end={props.busProfile.annualBusinessIncome}
                      decimals={2}
                      decimal={"."}
                      prefix={"$"}
                      duration={2}
                      separator=","
                      delay={2.2}
                    />
                  </h4>
                  <h6>Actual Annual Income</h6>
                </div>
              </div>
            </div>
            <div style={{ float: "right" }}>
              <button
                className="mb-1 btn btn-outline-primary"
                onClick={() => props.onUpdate(props.busProfile.id)}
              >
                Update
              </button>
            </div>
            <div style={{ float: "left" }}>
              <button
                className="mb-1 btn btn-outline-danger"
                onClick={() => props.onDelete(props.busProfile.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
SingleBusinessProfile.propTypes = {
  busProfile: PropTypes.shape({
    industryTypes: PropTypes.shape({
      name: PropTypes.string
    }),
    businessStageId: PropTypes.shape({
      name: PropTypes.string
    }),
    businessTypeId: PropTypes.shape({
      name: PropTypes.string
    }),
    annualBusinessIncome: PropTypes.number,
    id: PropTypes.number,
    projectedAnnualBusinessIncome: PropTypes.number,
    addressId: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    yearsInBusiness: PropTypes.number
  }),
  dollar: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};
export default SingleBusinessProfile;
