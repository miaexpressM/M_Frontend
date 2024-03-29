import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Layout, Icon } from 'antd';

import { makeSelectUser } from 'global.selectors';

function Header(props) {
  const userId = props.user ? props.user.id : 'unknown';
  const permisssion = props.user ? props.user.permissions : 'unknown';

  const version = 'v2.5.2';

  return (
    <Layout.Header style={{ height: '48px', lineHeight: '48px', padding: '0 30px' }}>
      <Link to="/">
        <span style={{ lineHeight: '48px', fontWeight: 'bold', fontSize: 'medium' }}>
          <Icon type="layout" /> Mia Express
        </span>
      </Link>
      <span
        level={4}
        style={{
          lineHeight: '48px',
          float: 'right',
          color: 'rgba(255, 255, 255, 0.65)',
          display: props.user ? 'initial' : 'none',
        }}
      >
        <Icon type="user" /> {`Permission: ${permisssion} Id: ${userId} Version: ${version}`}
      </span>
    </Layout.Header>
  );
}

Header.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(Header);
