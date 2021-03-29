import PropTypes from 'prop-types';
import Button from './Button';
import tvIcon from '../images/tvIcon.png';

const Header = ({ title, subtitle, onAdd, showAdd }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <div className='sub-header'>
        <h3>{subtitle}</h3>
        <img src={tvIcon} alt='tvimage' />
        <Button
          text={showAdd ? 'Close' : 'Add'}
          color={showAdd ? '#D02E5A' : '#40CFC4'}
          onClick={onAdd}
        />
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: 'Must-Watch',
  subtitle: 'Movies and Tv Shows i want to watch',
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Header;
