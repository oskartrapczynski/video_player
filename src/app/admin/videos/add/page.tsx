'use client';
import { BackButton, VideoAdd } from '@/components';
import { Video } from '@/interfaces/index';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { Types } from 'mongoose';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

const AddPage = () => {
  const handleInsert = async () => {
    const dbVideos: Video[] = [
      {
        _id: new Types.ObjectId('5573b1150804493456e584f8'),
        title: 'NAPOLEONXXXXXXXX',
        genre: ['Biograficzny'],
        director: 'Ridley Scott',
        length: '2:34',
        rate: 5,
        description:
          'Napoleon Bonaparte pnie się po kolejnych szczeblach władzy.',
        actors: [
          'Joaquin Phoenix',
          'Vanessa Kirby',
          'Ben Miles',
          'Ludivine Sagnier',
        ],
        releasedAt: 1678406400000,
        isAvailable: false,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e584f9'),
        title: 'MARVELS',
        genre: ['Akcja'],
        director: 'Nia DaCosta',
        length: '1:55',
        rate: 3,
        description:
          'Choć Carol Danvers, znana jako Kapitan Marvel, wyzwoliła się spod despotycznej kontroli Kree i zemściła na Najwyższej Inteligencji, wciąż nie ma chwili odpoczynku we wszechświecie rozdartym licznymi konfliktami. W czasie kolejnej misji dochodzi do komplikacji - dziwacznym zbiegiem okoliczności bohaterka przekracza kosmiczny portal powiązany z rasą Kree. W efekcie moce Carol zostają splecione z nadludzkimi zdolnościami jej największej fanki, Kamali Khan (znanej jako Miss Marvel), oraz dawno niewidzianej przyszywanej siostrzenicy, astronautki Moniki Rambeau, obecnie służącej na S.Z.A.B.L.I. Cała trójka musi połączyć siły, by ponownie ocalić wszechświat jako grupa o nazwie Marvels.',
        actors: [
          'Brie Larson',
          'Teyonah Parris',
          'Iman Vellani',
          'Samuel L. Jackson',
        ],
        releasedAt: 1696291200000,
        isAvailable: false,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e584fa'),
        title: 'IGRZYSKA ŚMIERCI: BALLADA PTAKÓW I WĘŻY',
        genre: ['Akcja'],
        director: 'Francis Lawrence',
        length: '3:01',
        rate: 1,
        description:
          'Każda saga ma swój początek, a każdy bunt potrzebuje pierwszej iskry. Oto Dziesiąte Głodowe Igrzyska. W Kapitolu osiemnastoletni Coriolanus Snow zamierza skorzystać z szansy, jaką jest rola mentora i zdobyć sławę. Potężny niegdyś ród Snowów podupadł i przyszłość Coriolanusa zależy od tego, czy zdoła pokonać konkurentów. Tyle że fortuna nie bardzo mu sprzyja, bo otrzymuje poniżające zadanie. Zostaje mentorem Lucy Gray Baird, dziewczyny z Dystryktu Dwunastego, najbiedniejszego z biednych. Ich losy będą od teraz nierozerwalnie ze sobą splecione – każda decyzja, którą podejmie Snow, może prowadzić do sukcesu lub porażki, triumfu lub klęski. Na arenie rozgrywa się walka na śmierć i życie. Poza areną w Coriolanusie zaczyna budzić się współczucie dla skazanej na zgubę trybutki... Czy warto przestrzegać zasad, gdy liczy się tylko przetrwanie za wszelką cenę?',
        actors: ['Tom Blyth', 'Rachel Zegler', 'Hunter Schafer'],
        releasedAt: 1675382400000,
        isAvailable: false,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e584fb'),
        title: 'THE PALACE',
        genre: ['Dramat'],
        director: 'Roman Polański',
        length: '1:38',
        rate: 3,
        description:
          'W ekskluzywnym hotelu w szwajcarskich Alpach, egzotyczna mieszanka zamożnych gości, rozpieszczanych przez obsługę hotelową, stawia czoła ostatniemu dniu mijającego milenium. Niektórzy boją się końca świata, inni nie mogą doczekać się świtu nowej, wspaniałej przyszłości.',
        actors: [
          'Fortunato Cerlino',
          'Luca Barbareschi',
          'Oliver Masucci',
          'Fanny Ardant',
          'Joaquim de Almeida',
          'John Cleese',
          'Mickey Rourke',
          'Bronwyn James',
        ],
        releasedAt: 1686441600000,
        isAvailable: true,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e584fc'),
        title: 'PRZEJŚCIA',
        genre: ['Melodramat'],
        director: 'Ira Sachs',
        length: '1:50',
        rate: 4,
        description:
          'Dwóch mężczyzn spędza razem 15 lat życia, gdy nagle jeden z nich zakochuje się w kobiecie.',
        actors: [
          'Franz Rogowski',
          'Ben Whishaw',
          'Adèle Exarchopoulos',
          'Erwan Kepo Falé',
          'Arcadi Radeff',
          'Léa Boublil',
          'Théo Cholbi',
          'William Nadylam',
        ],
        releasedAt: 1675209600000,
        isAvailable: true,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e584fd'),
        title: 'HOW TO HAVE SEX',
        genre: ['Dramat'],
        director: 'Molly Manning Walker',
        length: '2:08',
        rate: 9,
        description:
          'Trzy nastolatki wyruszają na wakacje pełne alkoholu, klubów i seksu.',
        actors: ['Mia McKenna-Bruce', 'Shaun Thomas', 'Lara Peake'],
        releasedAt: 1691625600000,
        isAvailable: true,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e584fe'),
        title: 'LĘK',
        genre: ['Dramat'],
        director: 'Sławomir Fabicki',
        length: '1:27',
        rate: 2,
        description: 'Film opraty o niewyjaśnionym lęku',
        actors: [
          'Magdalena Cielecka',
          'Marta Nieradkiewicz',
          'Sabine Timoteo',
          'Adrian Kłos',
          'Maciej Kosiacki',
        ],
        releasedAt: 1683936000000,
        isAvailable: true,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e584ff'),
        title: 'ŻYCZENIE',
        genre: ['Animacja'],
        director: 'Chris Buck',
        length: '1:17',
        rate: 2,
        description:
          'Nastoletnia Asha z pomocą przyjaciół oraz magicznej gwiazdy z nieba stawia czoła złemu władcy, by ocalić swoją społeczność.',
        actors: ['Ariana DeBose', 'Alan Tudyk', 'Chris Pine'],
        releasedAt: 1678838400000,
        isAvailable: true,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e58500'),
        title: 'INWESTORZY AMATORZY',
        genre: ['Animacja'],
        director: 'Chris Buck',
        length: '2:01',
        rate: 4,
        description:
          'Nastoletnia Asha z pomocą przyjaciół oraz magicznej gwiazdy z nieba stawia czoła złemu władcy, by ocalić swoją społeczność.',
        actors: ['Ariana DeBose', 'Alan Tudyk', 'Chris Pine'],
        releasedAt: 1695427200000,
        isAvailable: true,
      },
      {
        _id: new Types.ObjectId('5573b1150804493456e58501'),
        title: 'SIOSTRZEŃSTWO ŚWIĘTEJ SAUNY',
        genre: ['Dokumentalny'],
        director: 'Anna Hints',
        length: '3:02',
        rate: 3,
        description:
          'W bujnym, zielonym lesie w południowej Estonii grupa kobiet zbiera się w tradycyjnej saunie, żeby wspólnie dzielić najgłębsze sekrety, przemyślenia i czerpać z siły swojej wspólnoty. Otoczone dymem i żarem obnażają nie tylko ciała, ale i emocje. Wypędzają z siebie lęki i wstyd, żeby odzyskać siłę i energię do życia. Film portretuje ten intymny rytuał, który odbywa się w ciasnej i ciemnej przestrzeni nasyconej oddechem i parą. Gorąc i pot są tu namacalne równie mocno, jak cielesność. Obserwujemy ciała i twarze skąpane w mroku w procesie wspólnotowego oczyszczania. Dowiadujemy się, czego doświadczyły w swoim życiu.',
        actors: ['Anna Hints', 'Juliette Cazanave', 'Tushar Prakash'],
        releasedAt: 1689724800000,
        isAvailable: true,
      },
    ];
    const {
      data: { info, type },
    } = await axios.post('/api/admin/videos', dbVideos);
    enqueueSnackbar(info, {
      variant: type,
    });
    console.log(info);
  };

  // title: 'NAPOLEON',
  //       genre: ['Biograficzny'],
  //       director: 'Ridley Scott',
  //       length: '2:34',
  //       rate: 5,
  //       description:
  //         'Napoleon Bonaparte pnie się po kolejnych szczeblach władzy.',
  //       actors: [
  //         'Joaquin Phoenix',
  //         'Vanessa Kirby',
  //         'Ben Miles',
  //         'Ludivine Sagnier',
  //       ],
  //       releasedAt: 1678406400000,
  return (
    <Box sx={{ p: 2 }}>
      <BackButton />
      <Button variant="contained" color="success" onClick={handleInsert}>
        Importuj filmy
      </Button>
      <VideoAdd />
    </Box>
  );
};

export default AddPage;
