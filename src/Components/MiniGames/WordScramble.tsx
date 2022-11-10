import {Button, Modal, Input, Text, Tooltip} from "@nextui-org/react";
import {WORDS} from "./assets/Wordlist";
import {randomNumberBetween, shuffleArray} from "../../Utils/Utils";
import {TiArrowShuffle} from "react-icons/ti"
import {MutableRefObject, useEffect, useRef, useState} from "react";

const WordScramble = (props: WordScrambleProps) => {
    const [word, setWord] = useState("");
    const [wordScramble, setWordScramble] = useState<any[]>([]);
    const [triesLeft, setTriesLeft] = useState(3);
    const [hasError, setErorr] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const [guess, setGuess] = useState("");

    const error = () => {
        inputRef.current?.classList.add('errorSlide');
        setErorr(true);
        setTimeout(() => inputRef.current?.classList.remove('errorSlide'), 1000);
    }

    const onSubmit = () => {
        if (guess === word) {
            props.onPass();
        } else {
            setTriesLeft(triesLeft => {
                if (triesLeft > 0) {
                    error();
                    return --triesLeft
                }

                props.onFail();
                return triesLeft;
            });
        }
    }

    const onCancel = () => {
        props.onFail();
    }

    const getNewWord = () => {
        setWord(() => {
            const word = WORDS[randomNumberBetween(0, WORDS.length)]
            let shuffle = shuffleArray(word.split(""));
            while (shuffle.join("") === word) {
                shuffle = shuffleArray(shuffle);
            }
            setWordScramble([...shuffleArray(word.split(""))]);
            return word;
        });
    }


    useEffect(() => {
        if (!word) getNewWord();
    }, [])

    return (
        <>
            <Modal.Header>
                <Text h2>Word Unscramble</Text>
            </Modal.Header>
            <Modal.Body className={"flex-center flex-column"} css={{height: "140px"}}>
                <Text h3 css={{ta: "center"}}>{wordScramble.join(" ")}</Text>
                <Input placeholder={"Unscrambled Word"}
                       bordered
                       size={"lg"}
                       status={hasError ? "error" : "default"}
                       ref={inputRef}
                       helperText={`${triesLeft}/3 tries left`}
                       onChange={(e) => setGuess(e.target.value)}
                       contentLeft={<Tooltip content={"Get new word: -5$"}
                                             placement={"topEnd"}
                                             css={{zIndex: "100000"}}>
                           <Button auto light rounded
                                   onPress={getNewWord}
                                   icon={<TiArrowShuffle size={20}/>}/>
                       </Tooltip>}/>
            </Modal.Body>
            <Modal.Footer>
                <Tooltip content={"Lose some Intelligence"} css={{zIndex: "100000"}} placement={"bottom"}>
                    <Button auto color={"error"} onPress={onCancel}>Cancel</Button>
                </Tooltip>
                <Button auto onPress={onSubmit}>Submit!</Button>
            </Modal.Footer>
        </>
    )
}

interface WordScrambleProps {
    onPass: () => void
    onFail: () => void
}

export default WordScramble
