/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { Company } from '../../react-app-env';
import { Card } from 'react-bootstrap';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{company.name}</Card.Title>
        <Card.Text>{company.company_address}</Card.Text>
        <Card.Text>
          {company.company_phone}
          <br />
          {company.company_email}
          <br />
          {company.company_website}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;
