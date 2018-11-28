import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import {addLike, deletePost, removeLike} from "../../actions/postActions";
import classnames from "classnames";


class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {post, auth} = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a>
                            <img src={post.avatar} alt="" className="rounded-circle d-none-d-md-block"/>
                        </a>
                        <br/>
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        <button onClick={this.onLikeClick.bind(this, post._id)} type="button"
                                className="btn btn-light mr-1">
                            <i
                                className={classnames('fas fa-thumbs-up', {
                                    'text-info': this.findUserLike(post.likes)
                                })}
                            />
                            {/*className="text-info "*/}
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button"
                                className="btn btn-light mr-1">
                            <i className="fas fa-thumbs-down"/>
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>
                        {post.user === auth.user.id ? (
                            <button onClick={this.onDeleteClick.bind(this, post._id)} type="button"
                                    className="btn btn-danger mr-1">
                                <i className="fas fa-times"/>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);