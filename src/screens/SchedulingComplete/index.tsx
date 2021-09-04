import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { ConfirmButton } from "../../components/ConfirmButton";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSVG from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";

export function SchedulingComplete({ navigation }) {
  const { width } = useWindowDimensions();

  const handleConfirm = () => {
    navigation.navigate("Home");
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSVG width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir{"\n"}
          até a concessionaria da RENTX{"\n"}
          pegar seu automóvel.
        </Message>

        <Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </Footer>
      </Content>
    </Container>
  );
}
