import WordScramble from "./WordScramble";
import {Modal} from "@nextui-org/react";
import {useState} from "react";

const RandomMiniGame = ({onPass, onFail}: RandomMiniGameProps) => {
    const [open, setOpen] = useState(true);

    const onSuccess = () => {
        setOpen(false);
        onPass();
    }

    const onFailure = () => {
        setOpen(false);
        onFail();
    }

    return <Modal open={open} blur preventClose>
            <WordScramble onPass={onSuccess} onFail={onFailure}/>
    </Modal>
}
interface RandomMiniGameProps {
    onPass: () => void
    onFail: () => void
}

export default RandomMiniGame