import React, { useState } from "react";
import { StatusBar } from "react-native";
import { format } from "date-fns";

import { useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { getPlatformDate } from "../../utils/getPlatformDate";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";

import { CarDTO } from "../../dtos/carDTO";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDatesProps,
} from "../../components/Calendar";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling({ navigation }) {
  const theme = useTheme();
  const route = useRoute();

  const { car } = route.params as Params;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const [rentalPeriod, setRentalPeiod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const handleConfirmRental = () => {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const object = Object.keys(interval);

    const firstDate = object[0];
    const endDate = object[object.length - 1];

    setRentalPeiod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  };

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
          Escolha uma{"\n"}data de início e{"\n"}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
