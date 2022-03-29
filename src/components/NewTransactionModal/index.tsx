import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState, useContext } from "react";
import { TransactionsContext } from "../../TransactionsContext";

//interface para pegar as props
interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const {createTransaction} = useContext(TransactionsContext)


    //sempre colocar os valores dos estados com o tipo de dados que vai ser ultilizado
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')

    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

       await createTransaction({
            title,
            category,
            amount,
            type,
        })
        //limpando e fechando modal 
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose()

    }

    return (
        <Modal
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
            isOpen={isOpen}//funcao para abrir modal passar o estado de aberto
            onRequestClose={onRequestClose}//funcao de fechar o modal , usando esc e clicando fora 
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>

                <h2>Cadastrar Transacao</h2>

                <input placeholder="Titulo" value={title} onChange={event => setTitle(event.target.value)} />
                <input placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))} />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor='green'

                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)} />

                <button type="submit">
                    Cadastrar Transacao
                </button>

            </Container>
        </Modal>
    )
}