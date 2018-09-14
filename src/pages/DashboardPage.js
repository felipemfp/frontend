import React from "react";
import styled from "styled-components";
import {
  Card,
  Button,
  CardSubtitle,
  CardColumns,
  CardBody,
  CardTitle
} from "reactstrap";

import { Link } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";

import * as api from "../api";

class DashboardPage extends React.PureComponent {
  state = { loading: true, datasets: [] };

  componentDidMount = () => {
    api.datasets().then(({ data }) => {
      this.setState(() => ({
        loading: false,
        datasets: data
      }));
    });
  };

  render = () => {
    const { datasets } = this.state;

    return (
      <BaseLayout>
        <h2>Dashboard</h2>

        <CardColumns>
          {datasets.map(dataset => (
            <Card key={dataset.id}>
              <CardBody>
                <Subtitle className="text-muted">Dataset</Subtitle>
                <Title className="text-primary">{dataset.title}</Title>

                <Footer>
                  <Button
                    tag={Link}
                    to={`/environment/${dataset.filename.split(".")[0]}`}
                  >
                    Open
                  </Button>
                  <p className="text-muted">Last used in 3 weeks</p>
                </Footer>
              </CardBody>
            </Card>
          ))}
        </CardColumns>
      </BaseLayout>
    );
  };
}

export default DashboardPage;

const Title = styled(CardTitle)`
  padding: 1rem 0;
  font-size: 2rem;
`;

const Subtitle = styled(CardSubtitle)`
  text-transform: uppercase;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin-bottom: 0;
  }
`;
