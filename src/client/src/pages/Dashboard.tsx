import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../components/AuthContext';
import { fetchMe } from '../api/userApi';
import { useQuery } from 'react-query';

const ContentContainer = styled.div`
  text-align: center;
  margin: 5%;
`;

interface APIResponse {
  success: boolean;
}

interface MyProfileResponse extends APIResponse {
  data: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const {
    isLoading,
    isError,
    data: myProfile,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: any;
    error: any;
  } = useQuery(['fetchMe', { accessToken: authState.accessToken! }], fetchMe);

  const MyProfile = (res: MyProfileResponse) => {
    const { data: myProfile } = res;

    return (
      <div>
        <h3 className="title is-3">
          Hey {myProfile.firstName}! Welcome to your dashboard.
        </h3>

        <p>Here are some of your information.</p>
        <ul>
          <li>
            {myProfile.firstName} {myProfile.lastName}
          </li>

          <li>{myProfile.email}</li>
          <li>{myProfile._id}</li>
        </ul>
      </div>
    );
  };

  return (
    <ContentContainer>
      {isLoading && <div>Loading...</div>}
      {myProfile && MyProfile(myProfile)}
    </ContentContainer>
  );
};

export default Dashboard;
