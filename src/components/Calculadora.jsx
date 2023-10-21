import { useState } from "react"
import styled, {createGlobalStyle} from "styled-components"

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
    max-width: 25rem;
    max-height: fit-content;
    width: 95%;
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
const Resposta = styled.input `

    text-align: center;
    font-family: "Chakra Petch";
    background: radial-gradient(circle, rgba(0, 0, 0, 0.653) 10%, rgb(25, 25, 25) 98%);
    color: lime;
    font-weight: 400;
    letter-spacing: 2px;
    font-size: 1.5rem;
    padding: .75rem 0;

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
const BotaoSecreto = styled.button `

    position: absolute;
    padding: .25rem;
    cursor: pointer;
    background-color: black;
    border: none;
    border-radius: 50%;
    bottom: 10px;
    right: 10px;
`

const Segredo = styled.button `

    border-top: .2rem solid rgb(255, 158, 128);
    border-bottom: .4rem solid rgb(219, 58, 0);
    border-inline: 2px solid rgb(162, 43, 0);
    font-size: 1.25rem;
    background-color: #ff6347;
    cursor: pointer;


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

    // Hooks para, respectivamente: Resposta do cálculo, A operação(+, -, etc.), o primeiro e o segundo valor.
    const[calculo, setCalculo] = useState('')
    const[operador, setOperador] = useState('')

    const[primeiroValor, setPrimeiroValor] = useState('')
    const[segundoValor, setSegundoValor] = useState('')
    
    // Hook para mudança da seleção entre a primeira e a segunda area do cálculo
    const[mudar, setMudar] = useState(true)

    // função chamada por todos os botôes da calculadora
    const aplicar = (e) => { 

    // Caso estejamos mudando o primeiro espaço de cálculo (mudar == true) como também o botão que estamos pressionando é um número

    if(mudar == true && e.target.className == "numero") {
        // modifique o primeiro espaço
        setPrimeiroValor(primeiroValor + e.target.innerText)
        } 

    // Caso estejamos mudando o segundo espaço do cálculo (mudar == false) como também o botão que estamos pressionando é um número
        else if(mudar == false && e.target.className == "numero") {
        // modifique o segundo espaço
            setSegundoValor(segundoValor + e.target.innerText)
        }
    // Caso o botão pressionado seja um operador(+, -, etc.)
        else if(e.target.className == "operador") {
            // Coloque o operador no cálculo e selecione o segundo espaço de cálculo
            setOperador(e.target.innerText)
            setMudar(false)
        } 
    // Caso o botão pressionado seja o de apagar(AC)
        else if(e.target.className == "apagar") {
            // Resete todos os valores e selecione o primeiro espaço de cálculo (mudar == true)
            setOperador('')
            setPrimeiroValor('')
            setSegundoValor('')
            setCalculo('')
            setMudar(true)

        } 
    // Caso pressionarmos o botão de realizar o cálculo
        else if(e.target.className == "resultado") {
            // Caso o operador seja de soma
            if(operador == "+") {
                setCalculo(+primeiroValor + +segundoValor)
            }
            // Caso o operador seja de subtração
            else if(operador == "-") {
                setCalculo(+primeiroValor - +segundoValor)
            }
            // Caso o operador seja de multiplicação
            else if(operador == "*") {
                setCalculo(+primeiroValor * +segundoValor)
            }
            // Caso o operador seja de divisão
            else if(operador == "/") {
                setCalculo(+primeiroValor / +segundoValor)
            }

            // (SEGREDO)
            else {
                setCalculo((+primeiroValor) ** (+segundoValor))
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
    
    // TUDO A PARTIR DESTE PONTO É SECRETO, EXPLORE A PÁGINA ANTES DE LER PARA UMA MELHOR EXPERIÊNCIA


    // Hook para o aparecimento e desaparecimento do botão secreto de potência
    const [displayDoBotao, setDisplayDoBotao] = useState("none")
    // Hook para verificar se o botão está aparecendo ou não
    const [modalSecreto, setModalSecreto] = useState(true)

    // Funçãp para ativar e desativar o botão secreto de potência
    const funcaoSecreta = () => {
        // Caso o botão esteja escondido (modalSecreto = true)
        if(modalSecreto) {
            // Alerte, faça o botão aparecer e indique ao código que agora ele está aparecendo (modalSecreto == false)
            alert("Parabens, você achou um easter-egg. || Agora você pode fazer cálculos de potência.")
            setDisplayDoBotao("inline-block")
            setModalSecreto(false)
        } 
        // Caso o botão esteja aparecendo (modalSecreto == false)
        else {
            // Faça desaparecer e avise ao código que está desaparecido (modalSecreto == true)
            setDisplayDoBotao("none")
            setModalSecreto(true)
        }
    }
    // Função para a realização do cálculo de potenciação
    const potencia = (e) => {
        // Mude o operador do cálculo para o de potenciação
        setOperador(e.target.innerText)
        // Mude a seleção para o segundo espaço de cálculo
        setMudar(false)
    }

    return (
        <>
            <GlobalStyle/>
            <ContainerCalculadora>
                <AreaDosInputs>
                    <input type="text" value={primeiroValor} onClick={focar} placeholder="0"/>
                    <input type="text" disabled value={operador}/>
                    <input type="text" value={segundoValor} onClick={focar} placeholder="0"/>
                </AreaDosInputs>
            <Resposta type="text" value={calculo} placeholder="000" disabled/>
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
                <Segredo onClick={potencia} style={{display: displayDoBotao}}>^</Segredo>
                <BotaoSecreto onClick={funcaoSecreta}/>
            </ContainerCalculadora>
        </>
    )
}