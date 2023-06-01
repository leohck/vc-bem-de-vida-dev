import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../store/userinfo/userInfoSlice";
import {injectReducer} from "../../store/index";
import reducer from "../../store/userinfo";

injectReducer('userInfo', reducer)
const Dashboard2 = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userInfo.userInfoState);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, []);

    return (
        <div>
            <h2>List of Users</h2>
            <br />

            {user.loading && <div>Loading ...</div>}

            {!user.loading && user.error ? <div>Error: {user.error}</div> : null}

            {!user.loading && user.currentUser ? <div>
                <p>Id: {user.currentUser.id}</p>
                <p>Name: {user.currentUser.name}</p>
                <p>Marital Status: {user.currentUser.marital_status}</p>
                <p>Age: {user.currentUser.age}</p>
            </div> : null}
        </div>
    );
};

export default Dashboard2;
