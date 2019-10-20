import React, { Component } from "react";
import * as businessProfilesService from "../../services/businessProfilesService";
import SingleBusinessProfile from "./SingleBusinessProfile";
import Pagination from "rc-pagination";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class PaginatedBusinessProfile extends Component {
  state = {
    busProfile: [],
    mappedProfile: [],
    pageIndex: 0,
    pageSize: 6,
    totalCount: 10,
    totalPages: 0
  };
  componentDidMount() {
    this.getAllBusProfile();
  }
  getAllBusProfile = () => {
    businessProfilesService
      .getPaginated(this.state.pageIndex, this.state.pageSize)
      .then(this.paginateSuccess)
      .catch(this.paginateError);
  };
  paginateSuccess = data => {
    const busProfile = data.item.pagedItems;
    this.setState(() => {
      return {
        busProfile,
        mappedProfile: busProfile.map(this.mapBusProfile)
      };
    });
  };
  mapBusProfile = busProfile => {
    return (
      <SingleBusinessProfile
        busProfile={busProfile}
        key={busProfile.id}
        dollar={this.currencyFormat}
        onUpdate={this.onEdit}
        onDelete={this.onDelete}
      />
    );
  };
  onDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          businessProfilesService
            .deleteBusProf(id)
            .then(this.onDeleteSuccess)
            .catch(this.onDeleteError)
        );
      }
    });
  };
  onDeleteSuccess = id => {
    const busProfile = this.state.busProfile.filter(
      busProfile => busProfile.id !== id
    );
    this.setState({
      busProfile,
      mappedProfile: busProfile.map(this.mapBusProfile)
    });
  };
  currencyFormat = num => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  onChange = current => {
    let paged = current - 1;
    this.setState(
      {
        pageIndex: current + 1
      },
      () => this.getNextPage(paged)
    );
  };
  getNextPage = paged => {
    businessProfilesService
      .getPaginated(paged, this.state.pageSize)
      .then(this.nextSuccess)
      .catch(this.nextFail);
  };
  nextSuccess = response => {
    this.setState({
      busProfile: response.item.pagedItems,
      mappedProfile: response.item.pagedItems.map(this.mapBusProfile),
      pageIndex: response.item.pageIndex,
      pageSize: response.item.pageSize,
      totalCount: response.item.totalCount,
      totalPages: response.item.totalPages
    });
  };
  onEdit = id => {
    this.props.history.push(`/business/${id}/edit`);
  };
  addBusiness = () => {
    this.props.history.push(`/business/new`);
  };
  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div>
            <em
              className="fa-2x mr-2 fas fa-plus"
              onClick={this.addBusiness}
              style={{ float: "right", cursor: "pointer", color: "#d4af37" }}
              data-toggle="tooltip"
              title="Add Business"
            ></em>
          </div>
          <div className="content-heading">
            <div>
              Business Profiles
              <small>List of Business</small>
            </div>
          </div>
          <div style={{ display: "contents" }}>{this.state.mappedProfile}</div>
          <div style={{ float: "right" }}>
            <Pagination
              onChange={this.onChange}
              currentPage={this.state.pageIndex}
              total={this.state.totalCount}
              pageSize={this.state.pageSize}
              locale={localeInfo}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
PaginatedBusinessProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  })
};
export default PaginatedBusinessProfile;
