import { useState, useRef } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
// Import the data for the Bible books
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

function BibleView() {
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

    const [currentBook, setCurrentBook] = useState("Genesis");
    const [currentChapter, setCurrentChapter] = useState(1);
    const containerRef = useRef(null);

    const handleNextBook = () => {
        const books = Object.keys(bibleBooks);
        const currentIndex = books.indexOf(currentBook);
        if (currentIndex < books.length - 1) {
            setCurrentBook(books[currentIndex + 1]);
            setCurrentChapter(1);
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePreviousBook = () => {
        const books = Object.keys(bibleBooks);
        const currentIndex = books.indexOf(currentBook);
        if (currentIndex > 0) {
            setCurrentBook(books[currentIndex - 1]);
            setCurrentChapter(1);
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNextChapter = () => {
        const currentBookData = bibleBooks[currentBook];
        if (currentChapter < currentBookData.chapters.length) {
            setCurrentChapter(currentChapter + 1);
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePreviousChapter = () => {
        if (currentChapter > 1) {
            setCurrentChapter(currentChapter - 1);
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBookChange = (event) => {
        setCurrentBook(event.target.value);
        setCurrentChapter(1);
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChapterChange = (event) => {
        setCurrentChapter(Number(event.target.value));
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const currentBookData = bibleBooks[currentBook];
    const currentChapterData = currentBookData.chapters.find((chapter) => chapter.chapter === currentChapter);

    return (
        <Container maxWidth="md" ref={containerRef}>
            <Typography variant="h5" component="h3" gutterBottom>
                {currentBook} {currentChapter}
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="book-select-label">Book</InputLabel>
                    <Select
                        labelId="book-select-label"
                        value={currentBook}
                        onChange={handleBookChange}
                        label="Book"
                    >
                        {Object.keys(bibleBooks).map((book) => (
                            <MenuItem key={book} value={book}>{book}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box width={16} />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="chapter-select-label">Chapter</InputLabel>
                    <Select
                        labelId="chapter-select-label"
                        value={currentChapter}
                        onChange={handleChapterChange}
                        label="Chapter"
                    >
                        {currentBookData.chapters.map((chapter) => (
                            <MenuItem key={chapter.chapter} value={chapter.chapter}>{chapter.chapter}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {currentChapterData.verses.map((verse) => (
                <Typography key={verse.verse} variant="body1" paragraph>
                    <strong>Verse {verse.verse}:</strong> {verse.text}
                </Typography>
            ))}

            <Box mt={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePreviousBook}
                            startIcon={<ArrowBackIosIcon />}
                            fullWidth
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            Previous Book
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePreviousChapter}
                            startIcon={<ArrowBackIcon />}
                            fullWidth
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            Previous Chapter
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextChapter}
                            endIcon={<ArrowForwardIcon />}
                            fullWidth
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            Next Chapter
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextBook}
                            endIcon={<ArrowForwardIosIcon />}
                            fullWidth
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            Next Book
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box pb={7} /> {/* Add padding at the bottom */}
        </Container>
    );
}

export default BibleView;