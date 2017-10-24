// Displays the option icon, text, and "Choose Option" Button
// Used by Encounter Component

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeHP } from '../../../../ducks/reducer'

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
            this.props.changeHP(this.props.character.character_id, this.props.character.health_points, this.props.option.health_consequences).then(res => {
                if (this.props.character.alive) {
                    this.props.setResults(this.props.option.failed_text, this.props.option.failed_encounter);
                } else {
                    this.props.setResults(this.props.option.failed_text + ' You dead!', 21)
                }
            })
        }else{
            // sets success text
            //sets redirect encounter
            this.props.setResults(this.props.option.success_text, this.props.option.success_encounter)
        }
    }
    render() {
        return (
            <div className={this.props.id}>
                <h4 className="option-name">{this.props.option.option_name}</h4>
                <p className="option-description">{this.props.option.option_description}</p>
                <button className="btn" onClick={_=>{this.chooseOption()}}>Attempt</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.selectedCharacter
    }
}

export default connect(mapStateToProps, {changeHP})(Options);