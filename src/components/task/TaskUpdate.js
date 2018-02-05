import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { readTaskForUpdate, updateTask, changeTaskUpdate } from '../../actions';
import Loading from '../shared/Loading';
import Footer from '../footer/Footer';

class TaskUpdate extends Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleDoneChange = this.handleDoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.readTaskForUpdate(this.props.match.params.Id);
  }

  handleNameChange(event) {
    this.props.changeTaskUpdate({ ...this.props, Name: event.target.value });
  }

  handleDateChange(event) {
    this.props.changeTaskUpdate({ ...this.props, Date: event.target.value });
  }

  handleOwnerChange(event) {
    this.props.changeTaskUpdate({ ...this.props, Owner: event.target.value });
  }

  handleDoneChange(event) {
    this.props.changeTaskUpdate({ ...this.props, Done: event.target.checked });
  }

  handleSubmit(event) {
    this.props.updateTask(this.props.match.params.Id, this.props, () => {
      this.props.history.push({
        pathname: '/task'
      });
    });
    event.preventDefault();
  }

  render() {
    if (this.props.loading) {
      return (
        <Loading />
      );
    }

    return (
      <div className="container body-content">
          <h2>Edit</h2>
          <form onSubmit={this.handleSubmit}>
              <div className="form-horizontal">
                  <h4>Task</h4>
                  <hr />
                  <div className="form-group">
                      <label className="control-label col-md-2">Name</label>
                      <div className="col-md-10">
                          <input className="form-control text-box single-line" type="text" value={this.props.Name} onChange={this.handleNameChange}/>
                          <span className="field-validation-valid text-danger">
                            <span>{this.props.validation.nameRequiredOk ? "" : "The Name field is required."}</span>
                          </span>
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="control-label col-md-2">Date</label>
                      <div className="col-md-10">
                          <input className="form-control text-box single-line" type="date" value={this.props.Date} onChange={this.handleDateChange}/>
                          <span className="field-validation-valid text-danger">
                            <span>{this.props.validation.dateRequiredOk ? "" : "The Date field is required."}</span>
                          </span>
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="control-label col-md-2">Owner</label>
                      <div className="col-md-10">
                          <input className="form-control text-box single-line" type="text" value={this.props.Owner} onChange={this.handleOwnerChange}/>
                          <span className="field-validation-valid text-danger"></span>
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="control-label col-md-2">Done</label>
                      <div className="col-md-10">
                          <div className="checkbox">
                              <input className="check-box" type="checkbox" checked={this.props.Done} onChange={this.handleDoneChange}/>
                              <span className="field-validation-valid text-danger"></span>
                          </div>
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="col-md-offset-2 col-md-10">
                          <input value="Save" className="btn btn-default" type="submit" />
                      </div>
                  </div>
              </div>
          </form>
          <div>
              <Link to='/task'>
                Back to List
              </Link>
          </div>
          <hr />
          <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, oldState) => {
  return state.taskUpdate;
};

export default connect(mapStateToProps,{ readTaskForUpdate, updateTask, changeTaskUpdate })(TaskUpdate);
