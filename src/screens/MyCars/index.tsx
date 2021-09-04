import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useTheme } from "styled-components";
import { api } from "../../services/api";

import { CarDTO } from "../../dtos/carDTO";

import { Car } from "../../components/Car";
import { BackButton } from "../../components/BackButton";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { LoadAnimation } from "../../components/LoadAnimation";

interface CarProps {
  id: number;
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars({ navigation }) {
  const theme = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Meus carros alugados
        </Title>

        <SubTitle>Conforto segurança e praticidade</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos Realizados</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
