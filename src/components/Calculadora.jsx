import { useState } from "react"
import styled, {createGlobalStyle} from "styled-components"
import History from '../assets/history.png'
import Copy from '../assets/copy.png'
import {CopyToClipboard} from 'react-copy-to-clipboard';


// Reset e modificações na body
const GlobalStyle = createGlobalStyle `
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Montserrat";
}
body {
    overflow: hidden;
    flex-direction: column;
    height: 100vh;
    font-family: "Montserrat";
    background-color: rgb(50, 36, 59);
}
`


const ContainerCalculadora = styled.section `

    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 24rem;
    max-height: fit-content;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.365);
    padding: 2rem;
    box-shadow: 0 5px 10px black;
    transition: left 2s ease-in-out;
    border-bottom: 1rem solid rgba(0, 0, 0, 0.659);

    button:active {
        border-bottom: none;
        background-color: rgb(220, 83, 59);
        border-top: .5rem solid rgb(219, 58, 0);
    }
`
const AreaDosInputs = styled.div `

    display: flex;
    z-index: +1;
    justify-content: center;
    background-color: #4786FF;
    border-top: 5px solid #4786FF;

    input {
        width: 40%;
        font-size: 1.75rem;
        border: none;
        padding: .3rem;
        text-align: center;
        background: rgb(255,255,255);
        background: linear-gradient(131deg, rgba(255,255,255,0.09147408963585435) 19%, rgba(255,255,255,0.2903536414565826) 51%, rgba(255,255,255,0.08307072829131656) 70%);
    }
    input:focus {
       outline: none;
    }
    input:nth-child(2) {
        width: 15%;
        background: rgba(255,255,255, 0.1)
    }

`
const AreaResposta = styled.input `

    text-align: center;
    font-family: "Chakra Petch";
    background: radial-gradient(circle, rgba(0, 0, 0, 0.653) 10%, rgb(25, 25, 25) 98%);
    color: lime;
    font-weight: 400;
    letter-spacing: 2px;
    font-size: 1.5rem;
    padding: .75rem 0;
    border: none;

`
const AreaDosBotoes = styled.div `

    display: flex;
    flex-wrap: wrap;

    button {
        flex-grow: 0;
        flex-shrink: 0;
        border-top: .3rem solid rgb(255, 158, 128);
        border-bottom: .5rem solid rgb(219, 58, 0);
        flex-basis: 25%;
        border-inline: 2px solid rgb(162, 43, 0);
        font-size: 1.5rem;;
        padding: 1rem 0;
        background-color: #ff6347;
        cursor: pointer;
    }

`
const BotaoSecreto = styled.div `

    position: absolute;
    padding: .25rem;
    cursor: pointer;
    background-color: black;
    border-radius: 50%;
    bottom: 10px;
    right: 10px;
`
const BotaoHistorico = styled.div `

    position: absolute;
    top: 9px;
    right: 9px;
    cursor: pointer;
    z-index: +3;
    transition: opacity .2s ease;

    img {
        width: 17px;
    }
    &:active {
        opacity: .6;
    }
`
const ContainerHistorico = styled.div `

    position: absolute;
    z-index: +2;
    background-color: #201725;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0%;
    overflow: hidden;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
        width: 90%;
        height: 84%;
        list-style: none;
        border: 2px solid gray;
        display: flex;
        padding: .5rem;
        overflow: hidden;
        justify-content: flex-end;
        flex-direction: column-reverse;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.653) 10%, rgb(25, 25, 25) 98%);
    }
    ul li {
        color: #fff;
        font-family: "Chakra Petch";
        font-size: 1.25rem;
        padding: .6rem 1rem;
        margin: .2rem 0;
        letter-spacing: 2px;
        background-color: rgba(73, 108, 77, 0.112);
    }
`

const BotaoCopiar = styled.div `

    position: absolute;
    top: 5rem;
    right: 2rem;
    height: 3.7rem;
    display: flex;
    align-items: center;
    padding: 0rem .2rem;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .015);

    &:active {
        background-color: rgba(255, 255, 255, .04);
    }
    img {
        width: 17px;
    }
`
const CopiadoComSucesso = styled.div `

    font-family: "Chakra Petch";
    font-size: 1.25rem;
    letter-spacing: 2px;
    background-color: rgba(0, 10, 0, .9);
    color: #fff;
    position: absolute;
    height: 2rem;
    left: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: top .15s ease-in-out;

`

export default function Calculadora() {

    // Hook com map para os botôes da calculadora 
    const [botoes, Setbotoes] = useState([
        {
            caracter: 1,
            tipo: "numero"
        },
        {
            caracter: 2,
            tipo: "numero"
        },
        {
            caracter: 3,
            tipo: "numero"
        },
        {
            caracter: "+",
            tipo: "operador"
        },
        {
            caracter: 4,
            tipo: "numero"
        },
        {
            caracter: 5,
            tipo: "numero"
        },
        {
            caracter: 6,
            tipo: "numero"
        },
        {
            caracter: "-",
            tipo: "operador"
        },
        {
            caracter: 7,
            tipo: "numero"
        },
        {
            caracter: 8,
            tipo: "numero"
        },
        {
            caracter: 9,
            tipo: "numero"
        },
        {
            caracter: "*",
            tipo: "operador"
        },
        {
            caracter: "AC",
            tipo: "apagar"
        },
        {
            caracter: 0,
            tipo: "numero"
        },
        {
            caracter: "/",
            tipo: "operador"
        },
        {
            caracter: "=",
            tipo: "resultado"
        }
    ])
    
    // Hook para a criação de uma página de histórico de cálculos
    const [historico, setHistorico] = useState([])

    // Hooks para, respectivamente: Resposta do cálculo, A operação(+, -, etc.), o primeiro e o segundo valor.
    const[calculo, setCalculo] = useState('')
    const[operador, setOperador] = useState('')
    const[primeiroValor, setPrimeiroValor] = useState('')
    const[segundoValor, setSegundoValor] = useState('')
    
    // Hook para mudança da seleção entre a primeira e a segunda area do cálculo
    const[mudar, setMudar] = useState(true)

    // função chamada por todos os botôes da calculadora
    const aplicar = (e) => { 

    if(mudar && e.target.className == "numero") { // primeiro número
        setPrimeiroValor(primeiroValor + e.target.innerText)
        } 
        else if(mudar == false && e.target.className == "numero") { // segundo número
            setSegundoValor(segundoValor + e.target.innerText)
        }
        else if(e.target.className == "operador") { // operador
            setOperador(e.target.innerText)
            setMudar(false)
        } 
        else if(e.target.className == "apagar") { // apagar
            setOperador('')
            setPrimeiroValor('')
            setSegundoValor('')
            setCalculo('')
            setMudar(true)
        } 
        else if(e.target.className == "virgula") { // Adcionar vírgula
            if(mudar) {
                setPrimeiroValor(primeiroValor + '.')
            } else {
                setSegundoValor(segundoValor + ".")
            }
        }
        else if(e.target.className == "negativo") { // Negativizar um número
            if(mudar) {
                if(primeiroValor.charAt(0) == "-") {
                    setPrimeiroValor(primeiroValor.slice(1))
                } else {
                    setPrimeiroValor("-" + primeiroValor)
                }

            } else {
                if(segundoValor.charAt(0) == "-") {
                    setSegundoValor(segundoValor.slice(1))
                } else {
                    setSegundoValor("-" + segundoValor)
                }
            }
        }

    // Caso pressionarmos o botão de realizar o cálculo
        else if(e.target.className == "resultado") {
            if(primeiroValor == '-' || segundoValor == '-'){
                setCalculo("Ta faltando número")
            }
            else if(operador == "+") { // soma
                setCalculo(+primeiroValor + +segundoValor)
                setHistorico(historico.concat(primeiroValor + " " + operador + " " + segundoValor + " = " + (+primeiroValor + +segundoValor)))
            }
            else if(operador == "-") { // subtração
                setCalculo(+primeiroValor - +segundoValor)
                setHistorico(historico.concat(primeiroValor + " " + operador + " " + segundoValor + " = " + (+primeiroValor - +segundoValor)))
            }
            else if(operador == "*") { // multiplicação
                setCalculo(+primeiroValor * +segundoValor)
                setHistorico(historico.concat(primeiroValor + " " + operador + " " + segundoValor + " = " + (+primeiroValor * +segundoValor)))
            }
            else if(operador == "/") { // divisão
                if(segundoValor == 0) {
                    setCalculo("... Por quê!?")
                } else {
                    setCalculo(+primeiroValor / +segundoValor)
                    setHistorico(historico.concat(primeiroValor + " " + operador + " " + segundoValor + " = " + (+primeiroValor / +segundoValor)))
                }
            }

            // (SEGREDO)
            else if(operador == "^") {
                if((+primeiroValor) ** (+segundoValor) == Infinity) {
                    setCalculo("Pra que isso???")
                } else {
                    setCalculo((+primeiroValor) ** (+segundoValor))
                    setHistorico(historico.concat(primeiroValor + " " + operador + " " + segundoValor + " = " + ((+primeiroValor) ** (+segundoValor))))
                }
            }
            else  {
                setCalculo((+primeiroValor * +segundoValor) / 100)
                setHistorico(historico.concat(primeiroValor + " " + operador + " " + segundoValor + " = " + ((+primeiroValor * +segundoValor) / 100)))
            }
        }
    }
    // Função para quando clicarmos em um dos espaços de cálculo, esse espaço estará ativo para mudanças (mudar == true, mudar == false)
    const focar = (e) => {
        if(e.target.value == primeiroValor) {
            setMudar(true)
        } else {
            setMudar(false)
        }
    }
    
    const [animacao, setAnimacao] = useState('')
    const [modalSecreto, setModalSecreto] = useState(true)
    
    // Funçãp para ativar e desativar o botão secreto dos cálculos complexos
    const funcaoSecreta = () => {
        if(modalSecreto) {
            Setbotoes(botoes.concat(
                {caracter: "^", tipo: "operador"},
                {caracter: "( -1 )", tipo: "negativo"},
                {caracter: ",", tipo: "virgula"},
                {caracter: "%", tipo: "operador"}
                ))
            alert("Parabéns!! você achou o botão secreto!  ||  Agora é possível fazer contas mais complexas!")
            setAnimacao("color 2s infinite linear")
            setModalSecreto(false)
        } 
        else {
            Setbotoes(botoes.slice(0, 16))
            setModalSecreto(true)
            setAnimacao('')
        }
    }

    // Histórico de contas
    const [botaoHistorico, setBotaoHistorico] = useState('100%')
    const [historicoModal, setHistoricoModal] = useState(true)

    const botaoHistoricoClique = () => {
        if(historicoModal == true) {
            setBotaoHistorico('0%')
            setHistoricoModal(false)
        } 
        else {
            setBotaoHistorico('100%')
            setHistoricoModal(true)
        }
    }

    // Aviso para confirmar a cópia do resultado
    const [gavetaCopiado, setGavetaCopiado] = useState('3rem')
    const copia = () => {
        if(calculo != '') {
            setGavetaCopiado('5rem')
            setTimeout(() => {
                setGavetaCopiado('3rem')
            }, 800);
        } 
    }


    return (
        <>
            <GlobalStyle/>
            <ContainerCalculadora style={{animation: animacao}}>
                <BotaoHistorico onClick={botaoHistoricoClique}>
                    <img src={History} alt="" />
                </BotaoHistorico>
                <ContainerHistorico style={{bottom: botaoHistorico}}>
                    <ul>
                        {/* Map para mostrar todas as contas feitas */}
                        {historico.map( (item) => (
                            <li>
                                {item}
                            </li>
                        ))}
                    </ul>
                </ContainerHistorico>
                <AreaDosInputs>
                    <input type="text" value={primeiroValor} onClick={focar} placeholder="0"/>
                    <input type="text" disabled value={operador}/>
                    <input type="text" value={segundoValor} onClick={focar} placeholder="0"/>
                </AreaDosInputs>
            <AreaResposta type="text" value={calculo} placeholder="000" disabled/>
            {/* Propriedade específica para copiar coisas para a area de trabalho */}
                <CopyToClipboard text={calculo}>
                    <BotaoCopiar onClick={copia}>
                        <img src={Copy} alt="" />
                    </BotaoCopiar>
                </CopyToClipboard>
                <CopiadoComSucesso style={{top: gavetaCopiado}}>
                    Copiado com sucesso
                </CopiadoComSucesso>
                <AreaDosBotoes>
                {/* 
                 Map para chamar todos os botões com númeoros, operações, entre outros.
                 Cada botão ativa a função "aplicar" quando clicado, possui uma classe que represente seu tipo (numero, operação, etc.)
                 Mostre no botão o item caracter do array de objeto
                */}
                    {botoes.map((item) => (
                        <button onClick={aplicar} className={item.tipo}>{item.caracter}</button>
                    ))}
                </AreaDosBotoes>
                <BotaoSecreto onClick={funcaoSecreta}/>
            </ContainerCalculadora>
        </>
    )
}