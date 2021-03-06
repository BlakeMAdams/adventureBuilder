import React, { Component } from 'react';
import axios from 'axios';
import EncounterDisplay from './EncounterDisplay/EncounterDisplay';
import AddEncounter from './AddEncounter/AddEncounter';
import AddOption from './AddOption/AddOption';
// import './StoryCreator.css'

export default class StoryCreator extends Component {
    constructor() {
        super();
        this.state = {
            view: '',
            story: {},
            encounter: null
        }

        this.openNewEncounter = this.openNewEncounter.bind(this);
        this.openNewOption = this.openNewOption.bind(this);
        this.resetView = this.resetView.bind(this);
    }


    componentDidMount() {
        axios.get(`/api/storyDetails/${this.props.match.params.id}`).then(resp => {
            this.setState({
                story: resp.data
            });
            if (!resp.data.start_encounter_id) {
                this.setState({
                    view: 'FIRST_ENCOUNTER',
                    encounter: null
                })
            }
        });
    }

    isValid() {
        let finalEncounter = false;
        let hasOptions = true;
        let startEncounter = false;

        if(this.state.story.encounters){
            if(this.state.story.start_encounter_id){
                startEncounter = true;
            }
            this.state.story.encounters.forEach(encounter=> {
                if(parseInt(encounter.final_encounter) === 1){
                    finalEncounter = true;
                }else if(encounter.options.length < 1){
                    hasOptions = false;
                }
            });
        } 
        if(startEncounter && finalEncounter && hasOptions){
            return true;
        }
        return false;
    }

    completeStory(){
        axios.put(`/api/story/${this.state.story.story_id}`).then(_=>{
            this.props.history.push('/tavern');
        })
    }

    reloadStoryDetails() {
        axios.get(`/api/storyDetails/${this.props.match.params.id}`).then(resp => {

            this.setState({
                story: resp.data
            });
            if (!resp.data.start_encounter_id) {
                this.setState({
                    view: 'FIRST_ENCOUNTER',
                    encounter: null
                });
            }
        });
    }

    resetView() {
        this.setState({
            view: '',
            encounter: null
        });
        this.reloadStoryDetails();
    }

    openNewOption(encounter) {
        this.setState({
            view: 'OPTION',
            encounter: encounter
        });
    }

    openNewEncounter() {
        this.setState({
            view: 'ENCOUNTER',
            encounter: null
        });
    }

    render() {
        let encounters = this.state.story.encounters ?
            this.state.story.encounters.map(encounter => (
                <EncounterDisplay
                    encounter={encounter}
                    key={encounter.encounter_id}
                    openNewOption={this.openNewOption}
                />
            ))
            :
            ''
            ;

        let view = 'Click add encounter or option to start editing';
        switch (this.state.view) {
            case 'FIRST_ENCOUNTER':
                view = <AddEncounter
                    resetView={this.resetView}
                    isFirst={true}
                    storyId={this.props.match.params.id} />
                break;

            case 'ENCOUNTER':
                view = <AddEncounter
                    resetView={this.resetView}
                    isFirst={false}
                    storyId={this.props.match.params.id} />
                break;

            case 'OPTION':
                view = <AddOption
                    resetView={this.resetView}
                    encounter={this.state.encounter}
                    storyEncounters={this.state.story.encounters} />
                break;

            default:
                view = 'Click add encounter or option to start editing';
                break;
        }
        return (
            <div>
                <h1>story Creator</h1>
                {this.state.story && this.state.story.story_name}
                <div className='creator_container'>
                    <div className='encounters_display_container'>
                        {encounters}
                        {encounters.length > 0 && <button onClick={this.openNewEncounter}>Add Encounter</button>}
                        {this.isValid() && <button onClick={_=>this.completeStory()}>Complete Story</button>}
                    </div>

                    <div className='creator_display_container'>
                        {view}
                    </div>
                </div>
            </div>

        );
    }
}