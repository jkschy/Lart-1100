import {Button, Input, Modal, Text, Tooltip} from "@nextui-org/react";
import {WORDS} from "./assets/Wordlist";
import {randomNumberBetween, shuffleArray} from "../../Utils/Utils";
import {TiArrowShuffle} from "react-icons/ti"
import React, {useEffect, useRef, useState} from "react";
import Player from "../../Models/Player";
import {toast} from "react-toastify";
import {Karma} from "../../Utils/Enums";

const WordScramble = (props: WordScrambleProps) => {
    const [word, setWord] = useState("");
    const [wordScramble, setWordScramble] = useState<any[]>([]);
    const [triesLeft, setTriesLeft] = useState(3);
    const [hasError, setError] = useState(false);

    const [isCheating, setIsCheating] = useState(false);
    const [blurAmount, setBlurAmount] = useState(6);

    const inputRef = useRef<HTMLInputElement>(null);

    const [guess, setGuess] = useState("");
    const [timer, setTimer] = useState<NodeJS.Timeout>()

    useEffect(() => {
        let highNum = 100;

        if (blurAmount === 3) {
            highNum = 10;
        }

        if (blurAmount === 2) {
            highNum = 3;
        }

        if (blurAmount === 1) {
            highNum = 1;
        }

        if (randomNumberBetween(0, highNum) === 0) {
            props.updatePlayer(player => player?.updateKarma(Karma.integrity, -randomNumberBetween(3,8)).caught())
            props.onFail();
            toast("You Were Caught.", {type: "warning"})
        }
    }, [blurAmount])



    const error = () => {
        inputRef.current?.classList.add('errorSlide');
        setGuess("");
        setError(true);
        setTimeout(() => inputRef.current?.classList.remove('errorSlide'), 1000);
    }

    const onSubmit = () => {
        if (guess === word && guess && word ) {
            props.onPass();
        } else {
            setTriesLeft(triesLeft => {
                if (triesLeft > 1) {
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

    const buyNewWord = () => {
        props.updatePlayer(player => player?.addMoney(-5));
        getNewWord();
    }

    const incrementBlur = () => {
        setBlurAmount(blur => --blur);
        startCheating();
    }

    const startCheating = () => {
        setIsCheating(true);
        setTimer(setTimeout(incrementBlur, 1000));
    }

    const stopCheating = () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(undefined);
        }

        setIsCheating(false);
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
    }, []);

    return (
        <>
            <Modal.Header>
                <Text h2>Word Unscramble</Text>
            </Modal.Header>
            <Modal.Body className={"flex-center flex-column"} css={{height: "140px"}}>
                <Text h3 css={{m: "0", filter:`blur(${blurAmount}px)`, color: "white"}}
                      className={"unselectable transition-blur"}>{isCheating ? word.split("").join(" ") : ""}</Text>
                <Text h3 css={{ta: "center"}}>{wordScramble.join(" ")}</Text>
                <Input placeholder={"Unscrambled Word"}
                       bordered
                       value={guess}
                       size={"lg"}
                       status={hasError ? "error" : "default"}
                       ref={inputRef}
                       helperText={`${triesLeft}/3 tries left`}
                       onKeyDown={(e) => {if (e.key === "Enter") onSubmit()}}
                       onChange={(e) => {setGuess(e.target.value)}}
                       contentLeft={<Tooltip content={"Get new word: -5$"}
                                             placement={"topEnd"}
                                             css={{zIndex: "100000"}}>
                           <Button auto light rounded
                                   onPress={buyNewWord}
                                   icon={<TiArrowShuffle size={20}/>}/>
                       </Tooltip>}/>
            </Modal.Body>
            <Modal.Footer>
                <Tooltip content={"Lose some Integrity"} css={{marginRight: "auto", zIndex:"100000"}} placement={"bottom"}>
                    <Button size={"xs"}
                            auto
                            color={"secondary"}
                            onPointerLeave={stopCheating}
                            onPointerDown={startCheating}
                            onPointerUp={stopCheating}
                            css={{float: "left"}}>Cheat</Button>
                </Tooltip>
                <Tooltip content={"Lose some Intelligence"} css={{zIndex: "100000"}} placement={"bottom"}>
                    <Button auto color={"error"} onPress={onCancel}>Cancel</Button>
                </Tooltip>
                <Button auto onPress={onSubmit}>Submit!</Button>
            </Modal.Footer>
        </>
    )
}

export interface WordScrambleProps {
    onPass: () => void,
    onFail: () => void,
    updatePlayer: React.Dispatch<React.SetStateAction<Player | undefined>>,
}

export default WordScramble
