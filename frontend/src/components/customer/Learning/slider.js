import React, { Component} from 'react';
import { connect } from 'react-redux';
import { 
    ChangeSlideSearchText,
    ChangeSlideTableData,
    ChangeSlideModalState
} from '../../../actions/chapterAction';


import SliderShow2 from './slidertest';


class SliderShow extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.ChangeSlideTableData(this.props.id);
  }
  
  render() {
    return (
      <SliderShow2 mid={this.props.id}/>
    )
  }
}

const mapStateToProps = state => ({
    chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeSlideSearchText ,
    ChangeSlideTableData,
    ChangeSlideModalState
})(SliderShow);