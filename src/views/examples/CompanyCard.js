import React from "react";
import { Card, CardBody, CardHeader, NavItem, FormText, NavLink, Nav, Row, TabPane, TabContent, Table, Label, Col, FormGroup, Input, Button } from "reactstrap";
import textManager from "string/TextManager";
import classnames from "classnames";

export default function CompanyCard(props) {
    const company = props.company;
    const [tabs, setTabs] = React.useState(1);
    console.log(company);
    return <Card className="card-coin card-plain" style={{maxWidth: '300px'}}>
        <CardHeader style={{marginTop: '0'}}>
        <h4 className="title">{company.name}</h4>
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
                Jobs
            </NavLink>
            </NavItem>
        </Nav>
        <TabContent
            className="tab-subcategories"
            activeTab={"tab" + tabs}
        >
            <TabPane tabId="tab1">
            <Table className="tablesorter" responsive>
                <thead className="text-primary">
                <tr>
                    <th className="header">COIN</th>
                    <th className="header">AMOUNT</th>
                    <th className="header">VALUE</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>BTC</td>
                    <td>7.342</td>
                    <td>48,870.75 USD</td>
                </tr>
                <tr>
                    <td>ETH</td>
                    <td>30.737</td>
                    <td>64,53.30 USD</td>
                </tr>
                <tr>
                    <td>XRP</td>
                    <td>19.242</td>
                    <td>18,354.96 USD</td>
                </tr>
                </tbody>
            </Table>
            </TabPane>
            <TabPane tabId="tab2">
            {company.jobs && company.jobs.slice(0, 5).map((job, i) => <>
                <Row key={i}>
                    <Col>{job.title}</Col>
                </Row>
            </>)}
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