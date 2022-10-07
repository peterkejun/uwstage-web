/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import CompanyCard from "./CompanyCard";
import apiClient from "api/ApiClient";
import JobCard from "./JobCard";

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = React.useState(null);
  const [inputFocus, setInputFocus] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState(null);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);
  const handleSearch = async (e) => {
    const results = await apiClient.search(searchQuery);
    // fetch company data
    for (let i = 0; i < results.companies.length; i++) {
        const jobs = await apiClient.findJobsOfCompany(results.companies[i].id);
        results.companies[i].jobs = jobs;
    }
    // fetch job data
    for (let i = 0; i < results.jobs.length; i++) {
        const job = await apiClient.findJob(results.jobs[i].id);
        results.jobs[i].employments = job.employment_count;
        results.jobs[i].posts = job.posts_count;
        results.jobs[i].rating = job.rating;
    }
    console.log(results);
    setSearchResults(results);
  }
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col lg="6" md="6" style={{ display: 'flex', alignItems: 'center' }}>
                <InputGroup
                    className={classnames({
                    "input-group-focus": inputFocus
                    })}
                    style={{ marginBottom: 0 }}
                >
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="fa fa-search" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    placeholder="Search for companies"
                    type="text"
                    onFocus={(e) => setInputFocus(true)}
                    onBlur={(e) => setInputFocus(false)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
                </Col>
                <Col lg="6" md="6">
                    <Button color="default" onClick={handleSearch}>Search</Button>    
                </Col>
            </Row>
            <div style={{marginTop: '10vh'}}></div>
            <Row>
                <Col>
                    <h3 className="mb-3">Companies</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    {searchResults && searchResults.companies && searchResults.companies.map((company, i) => <>
                        <CompanyCard company={company} key={i} />
                    </>)}
                </Col>
            </Row>
            <div style={{marginTop: '10vh'}}></div>
            <Row>
                <Col>
                    <h3 className="mb-3">Jobs</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    {searchResults && searchResults.jobs && searchResults.jobs.map((job, i) => <>
                        <JobCard job={job} key={i} />
                    </>)}
                </Col>
            </Row>
          </Container>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
