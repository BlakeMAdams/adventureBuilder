import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class FinalEncounter extends Component {
    render () {
        return (
            <div>
            encounter
            <img src={this.props.encounter.image_src} alt={this.props.encounter.image_name} />
            {this.props.encounter.encounter_name}
            {this.props.encounter.encounter_description}
            {this.props.encounter.encounter_id == 21 ? 
            <div>
                <Link to='/cemetery'><button>Visit your mangeled body in the cemetery!</button></Link>
            </div>
            :
            <div>
                <button onClick={this.props.restartStory}>Restart Story</button>
            <Link to='/storyselection'>Go back to story Selection</Link>
            </div>
            }
            
        </div>
        );
    }
}