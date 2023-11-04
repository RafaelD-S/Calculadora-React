import { useEffect, useState } from "react"
import styled, {createGlobalStyle} from "styled-components"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import History from '../assets/history.png'
import Copy from '../assets/copy.png'
import Trophy from '../assets/trofeu.png'


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

    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    flex-direction: column;
    max-width: 24rem;
    max-height: fit-content;
    width: 100%;
    background-color: #201725;
    padding: 2.2rem;
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
        width: 50%;
        border: none;
        font-size: 1.75rem;
        padding: .3rem;
        text-align: center;
        background: rgb(255,255,255);
        background: linear-gradient(131deg, rgba(255,255,255,0.09147408963585435) 19%, rgba(255,255,255,0.2903536414565826) 51%, rgba(255,255,255,0.08307072829131656) 70%);
    }
    input:focus {
       outline: none;
    }
    input:nth-child(2) {
        width: 11.4%;
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
        font-size: 1.5rem;
        flex-grow: 0;
        flex-shrink: 0;
        border-top: .3rem solid rgb(255, 158, 128);
        border-bottom: .5rem solid rgb(219, 58, 0);
        flex-basis: 25%;
        border-inline: 2px solid rgb(162, 43, 0);
        padding: 1rem 0;
        background-color: #ff6347;
        cursor: pointer;
    }
    .resultado {
        color: #030978;
    }
    .apagar {
        color: #aa0000;
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
    top: 11px;
    right: 10px;
    cursor: pointer;
    z-index: +3;

    img {
        width: 17px;
    }
`
const ContainerHistorico = styled.section `

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
    flex-direction: column;

    div:nth-child(1) {
        border: 2px solid gray;
        padding: .5rem;
        width: 90%;
        overflow: hidden scroll;
        height: 77%;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.653) 10%, rgb(25, 25, 25) 98%);
    }
    div::-webkit-scrollbar {
        display: none;
    }
    ul {
        display: flex;
        flex-direction: column-reverse;
        list-style: none;
    }
    ul li {
        color: #fff;
        font-family: "Chakra Petch";
    	overflow-wrap: break-word;
        font-size: 1.25rem;
        padding: .6rem 1rem;
        margin: .2rem 0;
        letter-spacing: 2px;
        background-color: rgba(73, 108, 77, 0.112);
    }
`
const BotaoApagarHistorico = styled.div `
    width: 90%;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    letter-spacing: 2px;
    padding: .35rem;
    cursor: pointer;
    transition: letter-spacing .1s ease;

    &:hover {
        letter-spacing: 2.5px;
    }
`

const BotaoCopiar = styled.div `

    position: absolute;
    top: 5rem;
    right: 2.2rem;
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
    left: 2.2rem;
    right: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: top .15s ease-in-out;

`
const BotaoConquistas = styled.div `

    position: absolute;
    display: flex;
    top: 11px;
    left: 10px;
    cursor: pointer;
    z-index: +3;
    border-radius: 50%;

    img {
        width: 16px;
        height: 16px;
    }

`
const ContainerConquistas = styled.section `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: +2;
    background-color: #201725;
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
	padding: .5rem;
	gap: 8px;
	overflow: hidden;
	display: flex;
	justify-content: flex-end;
	flex-direction: column-reverse;
	background: radial-gradient(circle, rgba(0, 0, 0, 0.653) 10%, rgb(25, 25, 25) 98%);
	}
 ul li {
	color: #fff;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	letter-spacing: 1px;
	border: 1px solid gold;
    box-shadow: inset 0 0 5px rgb(255, 153, 0);
	background-color: #2017255c;
	padding: .5rem 1rem;
	gap: 15px;
	font-family: "Chakra Petch";
    }
 ul img {
	width: 30px;
	height: 30px;
}
`

const AlertConquista = styled.section `

    background-color: rgba(31, 34, 47, 0.868);
    display: flex;
    justify-content: flex-start;
    display: flex;
    color: #fff;
    position: absolute;
    max-width: 27.5rem;
    width: 90%;
    border-radius: 50px;
    margin: auto;
    border: 1px solid rgba(255, 217, 0, 0.802);
    border-inline: 3px solid rgb(255, 153, 0);
    z-index: +4;
    left: 0;
    right: 0;
    padding: .65rem 1rem;
    transform: top .5s ease-in-out;
    box-shadow: 0 0 5px gold;
    transition: top .4s cubic-bezier(0.95, -0.24, 0, 1.25);

    h3 {
        color: rgb(241, 215, 41);
    }
    div {
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
        justify-content: space-around;
    }
    figure, img {
        width: 2.5rem;
        height: 2.5rem;
    }
`

export default function Calculadora() {

    const [displayBotoesSecretos, setDisplayBotoesSecretos] = useState(false)

    // Hook com os botões extras da calculadora
    const [botoesSecretos, setBotoesSecretos] = useState([
        {
            caracter: "^",
            tipo: "operador",
            displayInicial: displayBotoesSecretos
        },
        {
            caracter: "( -1 )",
            tipo: "negativo",
            displayInicial: displayBotoesSecretos
        },
        {
            caracter: ",", 
            tipo: "virgula",
            displayInicial: displayBotoesSecretos
        },
        {
            caracter: "%", 
            tipo: "operador",
            displayInicial: displayBotoesSecretos
        }
    ])
    // Hook com map para os botôes da calculadora 
    const [botoes, Setbotoes] = useState([
        {
            caracter: 1,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: 2,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: 3,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: "+",
            tipo: "operador",
            displayInicial: true,
        },
        {
            caracter: 4,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: 5,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: 6,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: "-",
            tipo: "operador",
            displayInicial: true,
        },
        {
            caracter: 7,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: 8,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: 9,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: "*",
            tipo: "operador",
            displayInicial: true,
        },
        {
            caracter: "AC",
            tipo: "apagar",
            displayInicial: true,
        },
        {
            caracter: 0,
            tipo: "numero",
            displayInicial: true,
        },
        {
            caracter: "/",
            tipo: "operador",
            displayInicial: true,
        },
        {
            caracter: "=",
            tipo: "resultado",
            displayInicial: true,
        }
    ])
    
    // Conquistas:
    // - Botão secreto            (Segredos secretos)
    // - Dividir por zero         (... Por que!?)
    // - Elevar um número enorme  (Pra que isso???)
    // - Usar o botão de apagar   (Só eu e você... <3)
    // - Abrir o histórico        (Eu nunca esqueço!)
    // - Fazer uma porcentagem    (Porcentagen-ial)
    // - Copie um resultado       (Copia mas também faz igual)

    // Area para a configuração de conquistas:

    const [conquistaAparecer, setConquistaAparecer] = useState('-10rem')

    const [nomeDaConquista, setNomeDaConquista] = useState('')
    const [descricaoDaConquista, setDescricaoDaConquista] = useState('')

    const [conquistasCompletas, setConquistasCompletas] = useState([])
        const [conquistas, setConquistas] = useState([
            '???', '???', '???','???','???','???', '???'
])
    const [efeitoDeConquistaNova, setEfeitoDeConquistaNova] = useState('')

    const completarConquista = (nome, descricao) => {        
        if(conquistasCompletas.indexOf(nome) === -1) {
            setConquistasCompletas(conquistasCompletas.concat(nome))
            setConquistas(conquistas.splice(0, 1))
            setConquistas(conquistas.concat(nome))
            setEfeitoDeConquistaNova('rgba(225,225,0, .35)')
            
            setConquistaAparecer('1.25rem')
            setNomeDaConquista(nome)
            setDescricaoDaConquista(descricao)
            setTimeout(() => {
                setConquistaAparecer('-5rem')
            }, 3000);
        }
    }


   // Hook para a criação de uma sessão de histórico de cálculos
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

    // Número
    if(mudar && e.target.className == "numero") {
        setPrimeiroValor(primeiroValor + e.target.innerText)
        } 
        else if(mudar == false && e.target.className == "numero") {
            setSegundoValor(segundoValor + e.target.innerText)
        }

        // Operador
        else if(e.target.className == "operador") {
            setOperador(e.target.innerText)
            setMudar(false)
        } 

        // Apagar
        else if(e.target.className == "apagar") {
            setOperador('')
            setPrimeiroValor('')
            setSegundoValor('')
            setCalculo('')
            setMudar(true)
            completarConquista('Só eu e você... <3', 'Use o botão de limpar a calculadora')
        } 

        // Adcionar Vírgula
        else if(e.target.className == "virgula" && mudar) {
            setPrimeiroValor(primeiroValor + '.')
        } 
        else if(e.target.className == 'virgula'){
            setSegundoValor(segundoValor + ".")
        }

        // Deixar Números negativos
        else if(e.target.className == "negativo" && mudar && primeiroValor.charAt(0) == '-') {
            setPrimeiroValor(primeiroValor.slice(1))
        }
        else if(e.target.className == 'negativo' && mudar) {
            setPrimeiroValor("-" + primeiroValor)
        }
        else if(e.target.className == 'negativo' && segundoValor.charAt(0) == '-') {
            setSegundoValor(segundoValor.slice(1))
        }
        else if(e.target.className == 'negativo') {
            setSegundoValor("-" + segundoValor)
        }

        // Caso pressionarmos o botão de realizar o cálculo
        else if(e.target.className == "resultado" && primeiroValor == '-' || segundoValor == '-' || primeiroValor == '' || segundoValor == ''){
            setCalculo("Ta faltando número")
        }
        // soma
        else if(e.target.className == "resultado" && operador == "+") {
            setCalculo(+primeiroValor + +segundoValor)
            setHistorico(historico.concat(`${primeiroValor} ${operador} ${segundoValor} = ${+primeiroValor + +segundoValor}`))
        }
         // subtração
        else if(e.target.className == "resultado" && operador == "-") {
            setCalculo(primeiroValor - segundoValor)
            setHistorico(historico.concat(`${primeiroValor} ${operador} ${segundoValor} = ${+primeiroValor - +segundoValor}`))
        }
        // multiplicação
        else if(e.target.className == "resultado" && operador == "*") { 
            setCalculo(+primeiroValor * +segundoValor)
            setHistorico(historico.concat(`${primeiroValor} ${operador} ${segundoValor} = ${+primeiroValor * +segundoValor}`))
        }
        // divisão
        else if(e.target.className == "resultado" && operador == "/" && segundoValor == 0) {
            setCalculo("... Por quê!?")
            completarConquista('... Por quê!?', 'Divida por zero... por algum motivo')
        }
        else if(e.target.className == "resultado" && operador == "/") {
            setCalculo(+primeiroValor / +segundoValor)
            setHistorico(historico.concat(`${primeiroValor} ${operador} ${segundoValor} = ${+primeiroValor / +segundoValor}`))
        }
        // potenciação
        else if(e.target.className == "resultado" && operador == "^" && (+primeiroValor) ** (+segundoValor) == Infinity) { 
            setCalculo("Pra que isso???")
            completarConquista('Pra que isso??', 'Faça uma conta infinitamente grande')
        }
        else if(e.target.className == "resultado" && operador == "^") {
            setCalculo((+primeiroValor) ** (+segundoValor))
            setHistorico(historico.concat(`${primeiroValor} ${operador} ${segundoValor} = ${(+primeiroValor) ** (+segundoValor)}`))
        }
        // porcentagem
        else  {
            setCalculo((+primeiroValor * +segundoValor) / 100)
            setHistorico(historico.concat(`${primeiroValor} ${operador} ${segundoValor} = ${(+primeiroValor * +segundoValor) / 100} `))
            completarConquista('Por cem ta gen-ial', 'Faça um cálculo de porcentagem')
    }
}

    // Quando o calculo for efeituado, mudar o primeiro número para ao resultado
    useEffect(() => {
        if(Number(calculo)) {
            setPrimeiroValor(calculo)
            setSegundoValor('')
        }
    }, [calculo])

    // hook para animar a calculadora
    const [animacao, setAnimacao] = useState('')

    // Quando completar todas as conquistas.
    useEffect(() => {
        if(conquistasCompletas.length == 7) {
            setAnimacao('dourado 2s infinite linear')
            alert("PARABÉNS!! VOCÊ DESBLOQUEOU TODAS AS CONQUISTAS! <3")
        }
    }, [conquistasCompletas])

    // Função para quando clicarmos em um dos espaços de cálculo, esse espaço estará ativo para mudanças (mudar == true, mudar == false)
    const focar = (e) => {
        if(e.target.value == primeiroValor) {
            setMudar(true)
        } else {
            setMudar(false)
        }
    }
    
    const [modalSecreto, setModalSecreto] = useState(true)
    
    // Função para ativar e desativar o botão secreto dos cálculos complexos
    const funcaoSecreta = () => {
        if(modalSecreto) {
            setDisplayBotoesSecretos(true)
            setModalSecreto(false)
            completarConquista("Segredos secretos", "Agora é possível fazer contas mais complexas")
        } 
        else {
            setDisplayBotoesSecretos(false)
            setModalSecreto(true)
        }
    }

    // Histórico de contas
    const [botaoHistorico, setBotaoHistorico] = useState('100%')
    const [historicoModal, setHistoricoModal] = useState(true)

    const botaoHistoricoClique = () => {
        if(historicoModal == true) {
            setBotaoHistorico('0%')
            setHistoricoModal(false)
            completarConquista('Eu nunca esqueço!!', 'Descubra a sessão de histórico')

            setBotaoConquistas('100%')
            setConquistaModal(true)
        } else {
            setBotaoHistorico('100%')
            setHistoricoModal(true)
        }
    }

    // Limpar histórico de contas
    const limparHistorico = () => {
        setHistorico([])
    }
 
    // Abrir e fechar gaveta de conquistas
    const [botaoConquistas, setBotaoConquistas] = useState('100%')
    const [conquistaModal, setConquistaModal] = useState(true)

    const botaoConquistaClique = () => {
        if(conquistaModal == true) {
            setBotaoConquistas('0%')
            setConquistaModal(false)
            setEfeitoDeConquistaNova('')

            setHistoricoModal(true)
            setBotaoHistorico('100%')
        } else {
            setBotaoConquistas('100%')
            setConquistaModal(true)
        }   
    }

    // Aviso para confirmar a cópia do resultado
    const [gavetaCopiado, setGavetaCopiado] = useState('3rem')
    const copia = () => {
        if(calculo != '') {
            completarConquista('Copia e também faz igual', 'Copie um resultado de conta')
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
                <BotaoConquistas onClick={botaoConquistaClique} style={{backgroundColor: efeitoDeConquistaNova}}>
                    <img src={Trophy} alt="" />
                </BotaoConquistas>

                <ContainerConquistas style={{bottom: botaoConquistas}} className="teste">
                    <ul>
                        {/* Map para mostrar todas as contas feitas no historico*/}
                        {conquistas.map( (item) => (
                            <li>
                                <img src={Trophy} alt="" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </ContainerConquistas>


                <ContainerHistorico style={{bottom: botaoHistorico}}>
                <div>
                    <ul>
                        {/* Map para mostrar todas as contas feitas no historico*/}
                        {historico.map( (item) => (
                            <li>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <BotaoApagarHistorico onClick={limparHistorico}>APAGAR HISTÓRICO</BotaoApagarHistorico>
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
                {/* map par achamar os botões extras */}
                    {displayBotoesSecretos && botoesSecretos.map((item) => (
                        <button onClick={aplicar} className={item.tipo}>
                            {item.caracter}
                        </button>
                    ))}
                {/* 
                 Map para chamar todos os botões com números, operações, entre outros.
                 Cada botão ativa a função "aplicar" quando clicado, possui uma classe que represente seu tipo (numero, operação, etc.)
                 Mostre no botão o item caracter do array de objeto
                */}

                    {botoes.map((item) => (
                        <button onClick={aplicar} className={item.tipo} style={{backgroundColor: item.backgroundColor}}>{item.caracter}</button>
                    ))}
                </AreaDosBotoes>

                <BotaoSecreto onClick={funcaoSecreta}/>

            </ContainerCalculadora>

            <AlertConquista className="teste" style={{top: conquistaAparecer}}>
                <figure>
                    <img src={Trophy} alt="" />
                </figure>
                <div>
                <h3>
                    {nomeDaConquista}
                </h3>
                <h5>{descricaoDaConquista}</h5>
                </div>
            </AlertConquista>
        </>
    )
}