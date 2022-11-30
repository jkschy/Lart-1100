import WordScramble from "./WordScramble";
import {Modal} from "@nextui-org/react";
import {useState} from "react";
import Typing from "./Typing";

const RandomMiniGame = ({onPass, onFail, type}: RandomMiniGameProps) => {
    const [open, setOpen] = useState(true);

    const MAXIMUM_LOSS = 80;

    const onSuccess = (amountLost?: number) => {
        setOpen(false);
        onPass(amountLost ? Math.min(amountLost, MAXIMUM_LOSS) : undefined);
    }

    const onFailure = () => {
        setOpen(false);
        onFail();
    }

    return <Modal open={open} blur preventClose>
        {type === "study" && <WordScramble onPass={onSuccess} onFail={onFailure}/>}
        {type === "work" && <Typing onPass={onSuccess} onFail={onFail}/>}
    </Modal>
}
interface RandomMiniGameProps {
    onPass: (amountLost?: number) => void
    onFail: () => void,
    type: "work" | "study",
}

export default RandomMiniGame