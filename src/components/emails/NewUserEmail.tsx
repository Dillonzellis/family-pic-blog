import {
  Body,
  render,
  Heading,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewUserEmailProps {
  userFirstname?: string;
  href: string;
}

export const NewUserEmail = ({ userFirstname, href }: NewUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Walking After Midnight Verify Account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Walking After Midnight</Heading>
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Thanks for joining Walking After Midnight! Please click the button
              and verify your email address.
            </Text>
            <Button style={button} href={href}>
              Verify Email Address
            </Button>
            <Text style={text}>
              If you didn&apos;t request this, just ignore and delete this
              message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
            <Text style={text}>Thank you!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const NewUserEmailTemplate = (props: NewUserEmailProps) =>
  render(<NewUserEmail {...props} />, { pretty: true });

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#18181B",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
