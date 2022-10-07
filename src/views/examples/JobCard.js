import React from "react";
import { Card, CardBody, CardHeader, NavItem, FormText, NavLink, Nav, Row, TabPane, TabContent, Table, Label, Col, FormGroup, Input, Button } from "reactstrap";
import textManager from "string/TextManager";
import classnames from "classnames";

export default function JobCard(props) {
    const job = props.job;
    const [tabs, setTabs] = React.useState(1);
    return <Card className="card-coin card-plain" style={{maxWidth: '400px'}}>
        <CardHeader style={{marginTop: '0'}}>
        <h4 className="title">{job.title}</h4>
        </CardHeader>
        <CardBody>
        <Nav
            className="nav-tabs-primary justify-content-center"
            tabs
        >
            <NavItem>
            <NavLink
                className={classnames({
                active: tabs === 1
                })}
                onClick={(e) => {
                e.preventDefault();
                setTabs(1);
                }}
                href="#pablo"
            >
                Info
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({
                active: tabs === 2
                })}
                onClick={(e) => {
                e.preventDefault();
                setTabs(2);
                }}
                href="#pablo"
            >
                History
            </NavLink>
            </NavItem>
        </Nav>
        <TabContent
            className="tab-subcategories"
            activeTab={"tab" + tabs}
        >
            <TabPane tabId="tab1">
            <Row>
                <Col>Level</Col>
                <Col>{job.level}</Col>
            </Row>
            <Row>
                <Col>Duration</Col>
                <Col>{job.duration}</Col>
            </Row>
            <Row>
                <Col>Country</Col>
                <Col>{job.country}</Col>
            </Row>
            </TabPane>
            <TabPane tabId="tab2">
            <Row>
                <Col>Past Employments</Col>
                <Col>{job.employments}</Col>
            </Row>
            <Row>
                <Col>Posts</Col>
                <Col>{job.posts}</Col>
            </Row>
            <Row>
                <Col>Rating</Col>
                <Col>{job.rating}</Col>
            </Row>
            </TabPane>
            <TabPane tabId="tab3">
            <Table className="tablesorter" responsive>
                <thead className="text-primary">
                <tr>
                    <th className="header">Latest Crypto News</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>The Daily: Nexo to Pay on Stable...</td>
                </tr>
                <tr>
                    <td>Venezuela Begins Public of Nation...</td>
                </tr>
                <tr>
                    <td>PR: BitCanna – Dutch Blockchain...</td>
                </tr>
                </tbody>
            </Table>
            </TabPane>
        </TabContent>
        </CardBody>
    </Card>
}