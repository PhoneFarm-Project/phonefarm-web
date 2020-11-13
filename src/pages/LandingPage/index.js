import React, { useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import homeMobile from './images/Dual-Phone.gif';
import telegram from './images/telegram.svg';
import twitter from './images/twitter.svg';
import medium from './images/medium.svg';
import discord from './images/discord.svg';
import github from './images/github.svg';
import serviceShape1 from './images/service-shape-1.png';
import serviceShape2 from './images/service-shape-2.png';
import serviceShape3 from './images/service-shape-3.png';
import logo from 'assets/images/logo.png';
import logoIcon from 'assets/images/logo-icon.png';
import { DollarOutlined, GiftOutlined, MobileOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

import './style.scss';

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let [mainmenuArea, setMainmenuArea] = useState('');
  useEffect(() => {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 75) {
        setMainmenuArea('mainmenu-area');
      } else {
        setMainmenuArea('');
      }
    });
  });
  return (
    <div className='landing-page-style'>
      <BackTop />
      <Navbar light expand='md' className={`navbar-menu ${mainmenuArea}`}>
        <div className='container'>
          <NavbarBrand href='/'>
            <img src={logo} alt='logo' title='logo' className='style-logo' />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto menu-landing-page' navbar>
              <NavItem></NavItem>
              <NavItem></NavItem>
              <NavItem></NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <div className='header-area'>
        <div className='vcenter'>
          <div className='container'>
            <div className='row row-middle'>
              <div className='col-12 col-sm-8 col-md-7 left-header-area'>
                <p className='text-error wow fadeInUp'>
                  A very remarkable event will be announced this month!
                </p>
                <h1 className='headline wow fadeInUp'>Get your coolest iPhone today!</h1>
                <p className='wow fadeInUp'>
                  Bring iPhone to NFT world. Let's wait for good gifts before the product launch
                  date.
                </p>
                <div className='space-30 hidden-xs'></div>
                <a className='btn-icon wow fadeIn' href='/phone'>
                  <span className='btn-content'>
                    <span className='icon'>
                      <img src={logoIcon} alt='app-store' />
                    </span>
                    <small>Get your iPhone</small>
                    <strong>Open App !</strong>
                  </span>
                </a>
              </div>
              <div className='col-12 col-sm-8 col-md-5 box-image-mobile'>
                <img src={homeMobile} className='home-mobile' alt='home-mobile'></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='section-padding-top feature-area'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h2 className='page-title'> Features</h2>
              <div className='space-60'></div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-sm-6 col-md-4'>
              <div className='feature-box service-box-two'>
                <div className='feature-icon' style={{ backgroundImage: `url(${serviceShape1})` }}>
                  <DollarOutlined />
                </div>
                <h3 className='feature-title'>PHONE Token</h3>
                <p>
                  PHONE is a token used for Staking. User needs to buy PHONE to put it in pools,
                  it's like raw materials.
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4'>
              <div className='feature-box service-box-two'>
                <div className='feature-icon' style={{ backgroundImage: `url(${serviceShape2})` }}>
                  <GiftOutlined />
                </div>
                <h3 className='feature-title'>Staking Receive Rewards</h3>
                <p>
                  Staker will receive rewards through each block. This reward will be paid by iPhone
                  token (ERC-20).
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4'>
              <div className='feature-box service-box-two'>
                <div className='feature-icon' style={{ backgroundImage: `url(${serviceShape3})` }}>
                  <MobileOutlined />
                </div>
                <h3 className='feature-title'>Mint NFTS</h3>
                <p>
                  With iPhone token, we can use it to mint new iPhone NFT cards, which can be used
                  to change your phone looks on home page, and also you can list those on NTF
                  markets, too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className='footer'>
        <div className='container'>
          <div className='row justify-content-end'>
            <div className='col-12 col-md-6 name-team'>
              <div className='footer-copyright'>© 2020 - PhoneFarm Project</div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='icons row justify-content-center'>
                <div className='col-1 icon'>
                  <a href='https://t.me/phonefarmfinance'>
                    <img src={telegram} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://discord.com/invite/aBApkPx'>
                    <img src={discord} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://twitter.com/PhonefarmF'>
                    <img src={twitter} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://phonefarm-finance.medium.com'>
                    <img src={medium} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://github.com/PhoneFarm-Project'>
                    <img src={github} alt='' width='36px' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
