import {Image} from 'react-bootstrap';
import React from 'react';
import {Form, Input} from 'antd';
import {Link} from 'react-router-dom';
import {Col, Row, Button} from 'reactstrap';

import './welcome.scss';

const fb = 'content/images/facebook-icon.png';
const inst = 'content/images/instagram-icon.png';
const linkdin = 'content/images/link-icon.png';

const container = {
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  opacity: 1,
  padding: '50px',
  top: '40px'
};

const headingFirstText = {
  font: 'Bold 61px/75px Montserrat',
  textAlign: 'left' as const,
  letterSpacing: '0px',
  color: '#FF7C48',
  textTransform: 'uppercase' as const,
  marginBottom: '20px',
  opacity: 1,
  lineHeight: '50px'
};

const headingText = {
  font: 'Bold 55px/75px Montserrat',
  textAlign: 'left' as const,
  letterSpacing: '0px',
  color: '#FF7C48',
  textTransform: 'uppercase' as const,
  marginBottom: '20px',
  opacity: 1,
  lineHeight: '50px'
};

const headingTextCrew = {
  font: 'Bold 55px/75px Montserrat',
  textAlign: 'center' as const,
  letterSpacing: '0px',
  color: '#FF7C48',
  textTransform: 'uppercase' as const,
  marginBottom: '2px',
  opacity: 1,
  width: '100%',
  borderBottom: '0.1px solid grey',
  lineHeight: '0.1em',
  margin: '10px 0 70px'
};

const teamMemberInfoText = {
  letterSpacing: '0px',
  color: '#FF7C48',
};

const ImageStyle = {
  marginTop: '-120px',
  left: '786px',
  width: '589px',
  height: '589px'
};

const ImageStyle3 = {
  marginTop: '20px',
  marginBottom: '200px',
  left: '786px',
  width: '589px',
  height: '489px'
};

const CrewMemberImageStyle = {
  width: "140px",
  height: "130px",
  border: '1px solid #707070',
  opacity: 1
};

const headingSubText = {
  font: 'Regular 31px/50px Nunito',
  textAlign: 'left' as const,
  letterSpacing: '0px',
  lineHeight: '30px',
  color: '#333333',
  opacity: 1
};

const logo = 'content/images/LOGO.png';

const About = props => (
  <div style={container}>
    <Row>
      <Col span={8}>
        <p style={headingFirstText}>
          KNOW SOMETHING
          <br/>
          MORE ABOUT US!
        </p>

        <p style={headingSubText}>
          We are a medical supply marketplace designed to disrupt the current medical supply chain using advanced
          analytics to efficiently
          and dynamically match supply and demand to ensure we never have the shortage of 2020 again.
        </p>
      </Col>
      <Col span={16}>
        <Image src="../../../content/images/office-pane.svg" style={ImageStyle}/>
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <Image src="../../../content/images/our-story.svg" style={ImageStyle}/>
      </Col>
      <Col span={8}>
        <p style={headingText}>OUR STORY</p>
        <p style={headingSubText}>
          <p>
            <i>
              <strong>When Covid hit - we got anxious .. and instead of stirring we got busy! </strong>
            </i>
          </p>
          <p>
            After hours of late night web scrolling, we found ourselves in the citizen response (Plan C) group Open
            Source Medical Supplies
            (OSMS) - which lead us to Helpful Engineering and were working with a group of Canadians. We entered the WHO
            Hackathon in late
            March and partnered with a group of Americans and Europeans (CROWN), followed by the EUvsVirus Hackathon
            (the BIGGEST Hackathon
            ever!), then the MIT Hackathon, Helpful Engineering Hackathon and Taiwan Hackathon .. picking up new people
            all along the way.
            So here we are, 5 hackathons later and with a team of 30, we have built a supply-demand exchange platform -
            from manufacturer to
            consumer - we do any size, and specialize in large exchanges!
            <br/> Always keeping in mind helping people, making a difference, the future of product exchange and other
            people based needs
            that help - and put people first and put profit as an essential, and on equal footing to the environment and
            human needs. This
            for us is the new internet .. how to order, exchange and procure - and we’re doing it for the makers and
            buyers - so it’s easy,
            an anti-amazon for product exchange for medical supply - where YOU are in the driving seat! And thank you
            for being on this
            journey of having the world work with us!
          </p>
        </p>
      </Col>
    </Row>
    <Row style={{marginTop: '100px'}}>
      <Col span={8}>
        <p style={headingText}>HOW WE DO IT?</p>

        <p style={headingSubText}>
          <p>
            We are an innovative medical supply marketplace that uses predictive analytics, Demand/Supply matching,
            quality matching, and a
            decentralized supply chain procurement and ordering model to combat inefficiency in medical supplies
            logistics networks.
          </p>
          <p style={{color: '#FF7C48', textAlign: 'center'}}>
            <i>
              <b>MISSION - Medical Supplies For All People, Forever.</b>
            </i>
          </p>
          <p>
            We will match all manufacturers and brokers to purchasers by providing never before seen insights by using
            cutting edge
            predictive analytics and machine learning to get ahead of medical supply needs and flatten the biggest
            curves. Building off of
            the success we had bridging supply gaps during the COVID-19 pandemic, our team will become a worldwide
            leader in open data and
            decentralized medical supply chain management.
          </p>
        </p>
      </Col>
      <Col span={16}>
        <Image src="../../../content/images/why-us.svg" style={ImageStyle3}/>
      </Col>
    </Row>

    <Row>
      <Col span={24}>
        <p style={headingTextCrew}>
          <span style={{background: '#fff', padding: '0 10px'}}>THE CREW</span>
        </p>
      </Col>
    </Row>
    <Row>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/landonogardner/">
          <Image style={CrewMemberImageStyle} src="content/images/team/LandonGardner.jpg"/>
          <p style={teamMemberInfoText}>Landon Gardner<br/>Project Manager, Deliverer<br/>Toronto, Ontario, Canada</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/iyshwarya-gundabolu-productenthusiast/">
          <Image style={CrewMemberImageStyle} src="content/images/team/IyshwaryaGundabolu.jpeg"/>
          <p style={teamMemberInfoText}>Iyshwarya Gundabolu<br/>Product Manager<br/>Atlanta, US</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/ani-utkin-a1382014a/">
          <Image style={CrewMemberImageStyle} src="content/images/team/AniUtkin.jpeg"/>
          <p style={teamMemberInfoText}>Ani Utkin<br/>Lead Front End Developer<br/>New York, US</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/ajiferuke-oluwatomiwa-513335166/">
          <Image style={CrewMemberImageStyle} src="content/images/team/AjiferukeOluwatomiwa.jpg"/>
          <p style={teamMemberInfoText}>Ajiferuke Oluwatomiwa<br/>Front End Developer<br/>Nigeria</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/lindy-merwin/">
          <Image style={CrewMemberImageStyle} src="content/images/team/LindyMerwin.png"/>
          <p style={teamMemberInfoText}>Lindy Merwin<br/>Front End Developer<br/>San Diego, California, US</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/shashankcomputers/">
          <Image style={CrewMemberImageStyle} src="content/images/team/ShashankSabniveesu.jpeg"/>
          <p style={teamMemberInfoText}>Shashank Sabniveesu<br/>DevOps Architect<br/>Pittsburgh, Pennsylvania, US</p>
        </a>
      </Col>
    </Row>
    <br/>
    <br/>
    <Row>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/pavlos-zakkas/">
          <Image style={CrewMemberImageStyle} src="content/images/team/PavlosZakkas.jpg"/>
          <p style={teamMemberInfoText}>Pavlos Zakkas<br/>Software Engineer<br/>Athens, Greece</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/bob-yuan-0a1234162/">
          <Image style={CrewMemberImageStyle} src="content/images/team/BobYuan.png"/>
          <p style={teamMemberInfoText}>Bob Yuan<br/>Back End Developer<br/>Palo Alto, California</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/a-urbanska-dogra/">
          <Image style={CrewMemberImageStyle} src="content/images/team/OlaDogra.png"/>
          <p style={teamMemberInfoText}>Aleksandra Dogra<br/>User Experience Designer<br/>Mountain View, US</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/xiaolan-liao-b401a553/">
          <Image style={CrewMemberImageStyle} src="content/images/team/XiaolanLiao.jpg"/>
          <p style={teamMemberInfoText}>Xiaolan Liao<br/>Statistician, Data scientist<br/>Oklahoma, US</p>
        </a>
      </Col>
      <Col span={3}>
        <a href="https://www.linkedin.com/in/punita-sharma-1169b31b2/ ">
          <Image style={CrewMemberImageStyle} src="content/images/team/PunitaSharma.png"/>
          <p style={teamMemberInfoText}>Punita Sharma<br/>QA Analyst<br/>Toronto, Ontario, Canada</p>
        </a>
      </Col>
      <Col span={3}>
      </Col>
    </Row>
    <footer className="mt-0 pt-0 my-md-5 pt-0">
      <div className="row">
        <div className="col-md-2">
          {/* <h4>Legal</h4> */}
          <img src={logo} alt="" className="cw-footer-logo"/>
          <ul className="list-unstyled text-small footer-date">
            <li>
              (C) 2020 needmoremed <br/>
              All Rights Reserved
            </li>
            <li>designed by bhanuprathap</li>
          </ul>
        </div>
        <div className="col-8 col-md">
          <h4 className="footer-header">
            Medical Supplies <br/>
            for All People, Forever
          </h4>

          <Form name="horizontal_login" layout="inline">
            <Form.Item
              className="subscribe"
              style={{
                background: 'transparent url("content/images/Rectangle-34.svg")  0% 0% no-repeat padding-box',
                border: '2px solid #707070',
                borderRadius: '11px',
                opacity: 1,
                width: '215px'
              }}
            >
              <Input placeholder="Email Address"/>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderColor: '#FF7C48',
                  background: '#FF7C48 0% 0% no-repeat padding-box',
                  borderRadius: '7px',
                  opacity: 1
                }}
              >
                SUBSCRIBE NOW
              </Button>
            </Form.Item>
          </Form>

          <ul className="list-unstyled text-small row ml-1">
            <li>
              <Link className="text-muted text-gray-1 span6 footer-links" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="text-muted text-gray-1 ml-2 footer-links ml-4" to="/buyer-journey">
                Request
              </Link>
            </li>
            <li>
              <Link className="text-muted text-gray-1 ml-2 footer-links ml-4" to="/seller-journey">
                Supply
              </Link>
            </li>
            <li>
              <Link className="text-muted text-gray-1 ml-2 footer-links ml-4" to="/support">
                Support Us
              </Link>
            </li>
            {/* <li><Link className="text-muted text-gray-1" to="/">Another one</Link></li>
                            <li><Link className="text-muted text-gray-1" to="/">Last time</Link></li> */}
          </ul>
        </div>

        <div className="col-md-3 ">
          <h4 className="text-gray-2 footer-right-heading">Start a conversation</h4>
          <ul className="list-unstyled text-small footer-right">
            <li className="text-muted text-gray-1">Email: info@needmoremed.com</li>
            <li className="text-muted text-gray-1">Address: Toronto, Canada</li>
            <li className='mt-2 mb-2'>
              <a href='https://www.instagram.com/needmoremed'><img src={inst} style={{
                width: '60px',
                height: '60px',
                padding: '10px'
              }}/></a>
              <a href='https://www.facebook.com/NeedMoreMed'><img src={fb} style={{width: '35px', height: '35px'}}/></a>
              <a href='https://linkedin.com/company/NeedMoreMed'><img src={linkdin} style={{
                width: '60px',
                height: '60px',
                padding: '10px'
              }}/></a>
            </li>
            <a href="/policy">
              <li className="text-muted text-gray-1">Terms and Policy</li>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);

export default About;
