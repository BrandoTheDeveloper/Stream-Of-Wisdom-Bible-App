import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Paper from '@mui/material/Paper';
import BibleView from '../components/BibleView'; // Import your components
import VideosView from '../components/VideosView';
import LibraryView from '../components/LibraryView';
import AudioBible from '../components/AudioBible'; // Import the AudioBible component
import Genesis from "../data/Genesis";  
import Exodus from "../data/Exodus";
import Leviticus from "../data/Leviticus";
import Numbers from "../data/Numbers";
import Deuteronomy from "../data/Deuteronomy";
import Joshua from "../data/Joshua";
import Judges from "../data/Judges";
import Ruth from "../data/Ruth";
import OneSamuel from "../data/1 Samuel";
import TwoSamuel from "../data/2 Samuel";
import OneKings from "../data/1 Kings";
import TwoKings from "../data/2 Kings";
import OneChronicles from "../data/1 Chronicles";
import TwoChronicles from "../data/2 Chronicles";
import Ezra from "../data/Ezra";
import Nehemiah from "../data/Nehemiah";
import Esther from "../data/Esther";
import Job from "../data/Job";
import Psalms from "../data/Psalms";
import Proverbs from "../data/Proverbs";
import Ecclesiastes from "../data/Ecclesiastes";
import SongOfSolomon from "../data/SongOfSolomon";
import Isaiah from "../data/Isaiah";
import Jeremiah from "../data/Jeremiah";
import Lamentations from "../data/Lamentations";
import Ezekiel from "../data/Ezekiel";
import Daniel from "../data/Daniel";
import Hosea from "../data/Hosea";
import Joel from "../data/Joel";
import Amos from "../data/Amos";
import Obadiah from "../data/Obadiah";
import Jonah from "../data/Jonah";
import Micah from "../data/Micah";
import Nahum from "../data/Nahum";
import Habakkuk from "../data/Habakkuk";
import Zephaniah from "../data/Zephaniah";
import Haggai from "../data/Haggai";
import Zechariah from "../data/Zechariah";
import Malachi from "../data/Malachi";
import OneEdras from "../data/1 Esdras";
import TwoEdras from "../data/2 Esdras";
import Tobit from "../data/Tobit";
import Judith from "../data/Judith";
import WisdomOfSolomon from "../data/Wisdom of Solomon";
import Sirach from "../data/Sirach";
import Baruch from "../data/Baruch";
import LetterOfJeremiah from "../data/Letter of Jeremiah";
import PrayerOfAzariah from "../data/Prayer of Azariah";
import Susanna from "../data/Susanna";
import BelAndTheDragon from "../data/Bel and the Dragon";
import PrayerOfManasseh from "../data/Prayer of Manasseh";
import OneMaccabees from "../data/1 Maccabees";
import TwoMaccabees from "../data/2 Maccabees";
import Matthew from "../data/Matthew";
import Mark from "../data/Mark";
import Luke from "../data/Luke";
import John from "../data/John";
import Acts from "../data/Acts";
import Romans from "../data/Romans";
import OneCorinthians from "../data/1 Corinthians";
import TwoCorinthians from "../data/2 Corinthians";
import Galatians from "../data/Galatians";
import Ephesians from "../data/Ephesians";
import Philippians from "../data/Philippians";
import Colossians from "../data/Colossians";
import OneThessalonians from "../data/1 Thessalonians";
import TwoThessalonians from "../data/2 Thessalonians";
import OneTimothy from "../data/1 Timothy";
import TwoTimothy from "../data/2 Timothy";
import Titus from "../data/Titus";
import Philemon from "../data/Philemon";
import Hebrews from "../data/Hebrews";
import James from "../data/James";
import OnePeter from "../data/1 Peter";
import TwoPeter from "../data/2 Peter";
import OneJohn from "../data/1 John";
import TwoJohn from "../data/2 John";
import ThreeJohn from "../data/3 John";
import Jude from "../data/Jude";
import Revelation from "../data/Revelation";

const bibleBooks = {
  Genesis: Genesis,
  Exodus: Exodus,
  Leviticus: Leviticus,
  Numbers: Numbers,
  Deuteronomy: Deuteronomy,
  Joshua: Joshua,
  Judges: Judges,
  Ruth: Ruth,
  "1 Samuel": OneSamuel,
  "2 Samuel": TwoSamuel,
  "1 Kings": OneKings,
  "2 Kings": TwoKings,
  "1 Chronicles": OneChronicles,
  "2 Chronicles": TwoChronicles,
  Ezra: Ezra,
  Nehemiah: Nehemiah,
  Esther: Esther,
  Job: Job,
  Psalms: Psalms,
  Proverbs: Proverbs,
  Ecclesiastes: Ecclesiastes,
  "Song of Solomon": SongOfSolomon,
  Isaiah: Isaiah,
  Jeremiah: Jeremiah,
  Lamentations: Lamentations,
  Ezekiel: Ezekiel,
  Daniel: Daniel,
  Hosea: Hosea,
  Joel: Joel,
  Amos: Amos,
  Obadiah: Obadiah,
  Jonah: Jonah,
  Micah: Micah,
  Nahum: Nahum,
  Habakkuk: Habakkuk,
  Zephaniah: Zephaniah,
  Haggai: Haggai,
  Zechariah: Zechariah,
  Malachi: Malachi,
  "1 Esdras": OneEdras,
  "2 Esdras": TwoEdras,
  Tobit: Tobit,
  Judith: Judith,
  WisdomOfSolomon: WisdomOfSolomon,
  Sirach: Sirach,
  Baruch: Baruch,
  "Letter of Jeremiah": LetterOfJeremiah,
  "Prayer of Azariah": PrayerOfAzariah,
  Susanna: Susanna,
  "Bel and the Dragon": BelAndTheDragon,
  "Prayer of Manasseh": PrayerOfManasseh,
  "1 Maccabees": OneMaccabees,
  "2 Maccabees": TwoMaccabees,
  Matthew: Matthew,
  Mark: Mark,
  Luke: Luke,
  John: John,
  Acts: Acts,
  Romans: Romans,
  "1 Corinthians": OneCorinthians,
  "2 Corinthians": TwoCorinthians,
  Galatians: Galatians,
  Ephesians: Ephesians,
  Philippians: Philippians,
  Colossians: Colossians,
  "1 Thessalonians": OneThessalonians,
  "2 Thessalonians": TwoThessalonians,
  "1 Timothy": OneTimothy,
  "2 Timothy": TwoTimothy,
  Titus: Titus,
  Philemon: Philemon,
  Hebrews: Hebrews,
  James: James,
  "1 Peter": OnePeter,
  "2 Peter": TwoPeter,
  "1 John": OneJohn,
  "2 John": TwoJohn,
  "3 John": ThreeJohn,
  Jude: Jude,
  Revelation: Revelation,
};

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const renderComponent = () => {
    switch (value) {
      case 0:
        return <BibleView bibleBooks={bibleBooks} />;
      case 1:
        return <VideosView />;
      case 2:
        return <LibraryView />;
      case 3:
        return <AudioBible bibleBooks={bibleBooks} />;
      default:
        return <BibleView bibleBooks={bibleBooks} />;
    }
  };

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      {renderComponent()}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Bible" icon={<MenuBookIcon />} />
          <BottomNavigationAction label="Videos" icon={<OndemandVideoIcon />} />
          <BottomNavigationAction label="Library" icon={<DescriptionIcon />} />
          <BottomNavigationAction label="Audio Bible" icon={<AudiotrackIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}