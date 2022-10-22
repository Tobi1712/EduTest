import React, { useState } from 'react'
import Slider from 'react-touch-drag-slider'
import { connect } from 'react-redux';
import { SecurePost } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import styled, { createGlobalStyle, css } from 'styled-components/macro'
import { 
    ChangeSlideSearchText,
    ChangeSlideTableData,
    ChangeSlideModalState
} from '../../../actions/chapterAction';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,body {
    padding: 0;
    margin: 0;
  }
`

const AppStyles = styled.main`
  height: 82vh;
  width: 82vw;
`

const Button = styled.button`
  font-size: 2rem;
  z-index: 10;
  position: fixed;
  top: 50%;
  ${(props) =>
    props.right
      ? css`
          right: 0.5rem;
        `
      : css`
          left: 0.5rem;
        `}
`

function SliderShow2(props) {
  console.log('GHJC:',props);
  const [index, setIndex] = useState(0)
  var data2=[];

  console.log("SLIDEtABLEdATA", props.chapter.slideTableData)
  // if (props.chapter.slideTableData.length!==0){
  //   console.log("1")
  //   SecurePost({
  //     url : `${apis.UPDATE_MATERIAL}`,
  //     data : {
  //         _id : props.mid,
  //         flag : false,
  //         testflag : false
  //     }
  //   }) 
  // }
  // else{
  //   console.log("0")
  //   SecurePost({
  //     url : `${apis.UPDATE_MATERIAL}`,
  //     data : {
  //         _id : props.mid,
  //         flag : true,
  //         testflag : false
  //     }
  //   }) 
  // }

  props.chapter.slideTableData.map((d,i)=>{
    data2[i]=(
      {
        image: d.slimage,
        caption: d.slbody
      }
    )//}
  })
  // console.log(data2);
  const increment = () => {
    if (index < data2.length - 1) setIndex(index + 1)
  }
  const decrement = () => {
    if (index > 0) setIndex(index - 1)
  }
  // if(data2[0]!= null){}
    return (
    <>
      <GlobalStyles />
      <AppStyles>
        <Button onClick={decrement} left disabled={index === 0}>
          〈
        </Button>
        <Button
          onClick={increment}
          right
          disabled={index === data2.length - 1}
        >
          〉
        </Button>
        <Slider
          onSlideComplete={setIndex}
          onSlideStart={(i) => {
            console.log('started dragging on slide', i)
          }}
          activeIndex={index}
          threshHold={100}
          transition={0.3}
          scaleOnDrag={true}
        >
          {data2.map(({ image, caption }, index) => (
             <img src={image} key={index} alt={caption}/>
          ))}
        </Slider>
      </AppStyles>
    </>
  )
}
const mapStateToProps = state => ({
    chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeSlideSearchText,
    ChangeSlideTableData,
    ChangeSlideModalState
})(SliderShow2);