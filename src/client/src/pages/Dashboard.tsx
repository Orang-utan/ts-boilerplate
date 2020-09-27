import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import auth from '../api/core/auth';
import { fetchMe } from '../api/userApi';
import Sidebar from '../components/Sidebar';

const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  margin: 5%;
`;

interface MyProfileResponse extends IAPIResponse {
  data: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const Dashboard = () => {
  const profileQuery = useQuery(
    ['fetchMe', { accessToken: auth.getAccessToken() }],
    fetchMe,
    {
      refetchOnWindowFocus: false,
    }
  );

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
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        {profileQuery.isLoading && <div>Loading...</div>}
        {profileQuery.data && MyProfile(profileQuery.data as any)}
        <button
          className="button is-primary"
          style={{ margin: '10px 0px' }}
          onClick={() => {
            profileQuery.clear();
            profileQuery.refetch();
          }}
        >
          Clear Cache and Reload
        </button>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Dashboard;
