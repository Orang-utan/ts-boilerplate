import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const NotFoundHeading = styled.h1`
  font-size: 4rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const HomeLink = styled(Link)`
  display: block;
  font-size: 1.2rem;
  text-align: center;
`;

function NotFoundPage() {
  return (
    <div className="container">
      <NotFoundHeading>
        Not Found{' '}
        <span role="img" aria-labelledby="sad face">
          😕
        </span>
      </NotFoundHeading>
      <HomeLink to="/">Return home</HomeLink>
    </div>
  );
}

export default NotFoundPage;
