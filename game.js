const textElement = document.getElementById('text');
const optionButtonElement = document.getElementById('option-buttons');

let state= {}; // main state object

const startGame = () => {   
    state = {}
    showTextNode(1); // initializing with one in order to start from the first index
}

const showTextNode = (textNodeIndex)=>{
    const texts = textNodes.find(textNode => textNode.id === textNodeIndex );
    textElement.innerText  = texts.text;

    // removing all the options 
    while(optionButtonElement.firstChild){
        optionButtonElement.removeChild(optionButtonElement.firstChild);
    } // removing the temporary buttons 

    // getting the answer buttons
    texts.options?.forEach(option=>{
        console.log(showOption(option), state);
        if(showOption(option)){ // filtering the answers based on whether there is a setstate present or not 
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', ()=>{
                selectOption(option);
            })
            optionButtonElement.appendChild(button);
        }
    })
}
// returning true or false based on teh required state
const showOption = (option)=>{
    return option.requiredState == null || option.requiredState(state);
}

const selectOption = (option)=>{
    const nextTextNodeId = option.nextText;
    if(nextTextNodeId <=0){
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId); // moves to the next text node
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and see a jar of blue goo near you',
        options:[
            {
                text: 'Take the goo',
                setState: {
                    blueGoo : true
                },
                nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You are a beast',
        options:[
            {
                text:'trade the beast for a good',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3
            },
            {
                
                text:'trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 3
                
            },
            {
                
                text:'Ignore the beast',
                nextText: 3
                
            }
        ]
    },
    {
        id: 3,
        text:'You are tired just leave the world man',
        options: [
            {
                text: 'Find a place where you can drop dead at:',
                nextText: -1
            }
        ]
    }
]

startGame();

