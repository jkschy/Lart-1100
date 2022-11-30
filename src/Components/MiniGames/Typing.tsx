import {Button, Modal, Input, Text, Tooltip} from "@nextui-org/react";
import {WORDS} from "./assets/Wordlist";
import {randomNumberBetween} from "../../Utils/Utils";
import {useEffect, useRef, useState} from "react";

const Typing = (props: TypingProps) => {
    const [words, setWords] = useState<string[]>([]);
    const [guess, setGuess] = useState("");
    const [startTime, setStartTime] = useState<Date>(new Date());

    const inputRef = useRef<HTMLInputElement>(null);

    const POINTS_LOST_PER_ERROR = 5;
    const POINTS_LOST_PER_SECOND = 2;

    const submit = () => {
        const endTime = new Date();
        let diff = endTime.getTime() - startTime.getTime();
        diff /= 1000;
        const seconds = Math.round(diff);

        const answerChars = words.join(" ").split("");
        const guessChars = guess.split("");

        const res = answerChars.map((answerChar, index) => {
            return answerChar === guessChars[index];
        })

        const errors = res.filter((entry) => !entry);
        props.onPass((errors.length * POINTS_LOST_PER_ERROR) + (seconds * POINTS_LOST_PER_SECOND));
    }

    const getNewWords = () => {
        setStartTime(new Date());

        const newWords = [];
        for (let i = 0; i <= 5; i++) {
            let word = WORDS[randomNumberBetween(0, WORDS.length)];

            while (words.includes(word)) {
                word = WORDS[randomNumberBetween(0, WORDS.length)];
            }

            newWords.push(word);
        }

        setWords([...newWords]);
    }

    const onCancel = () => {
        props.onFail();
    }

    useEffect(() => {
        if (words.length === 0) getNewWords();
        }, [])

    return (
        <>
            <Modal.Header>
                <Text h2>Typing Test</Text>
            </Modal.Header>
            <Modal.Body className={"flex-center flex-column"} css={{height: "140px"}}>
                <Text h5 css={{ta: "center", mb: "30px"}}>{words.join(" ")}</Text>
                <Input placeholder={"Message"}
                       bordered
                       ref={inputRef}
                       fullWidth
                       size={"lg"}
                       onKeyDown={(e) => {if (e.key === "Enter") submit()}}
                       onChange={(e) => setGuess(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Tooltip content={"Give up working..."} css={{zIndex: "100000"}} placement={"bottom"}>
                    <Button auto color={"error"} onPress={onCancel}>Cancel</Button>
                </Tooltip>
                <Button auto onPress={submit}>Submit!</Button>
            </Modal.Footer>
        </>
    )
}

interface TypingProps {
    onPass: (amountLost: number) => void
    onFail: () => void
}

export default Typing
