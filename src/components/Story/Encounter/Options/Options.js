// Displays the option icon, text, and "Choose Option" Button
// Used by Encounter Component

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Options extends Component {
    constructor() {
        super();
    }

    rollDice() {
        let tempArr = this.props.option.option_odds.split('+');
        let diceArr = String(tempArr.splice(0, 1)).split('d');
        let num = 0;
        for (let i = 0; i < diceArr[0]; i++) {
            num += Math.floor(Math.random() * parseInt(diceArr[1])) + 1;
        }

        for (let i = 0; i < tempArr.length; i++) {
            switch (tempArr[i]) {
                case 'dex':
                    num += this.props.character.dexterity;
                    break;
                case 'str':
                    num += this.props.character.strength;
                    break;
                case 'cha':
                    num += this.props.character.charisma;
                    break;
            }
        }

        return num;
    }

    chooseOption(){
        let num = this.rollDice();
        if(num < this.props.option.options_pass_case){
           //set fail text
           //sets redirect encounter
        }else{
            // sets success text
            //sets redirect encounter
        }
    }
    render() {
        return (
            <div>
                <h3>{this.props.option.option_name}</h3>
                {this.props.option.option_description}
                <button>Do This</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.selectedCharacter
    }
}

export default connect(mapStateToProps)(Options);