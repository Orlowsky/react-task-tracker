import React from 'react'
import PropTypes from 'prop-types'
const Button = (props) => {
    // const onClick = () =>{
    //     console.log("here")
    // }
    // mozna stworzyc tu ale mozna tez przez rodzica przekazac props
    
    return (
        
            <button onClick = {props.onClick} className='btn' style={{backgroundColor: props.color}}>{props.text}</button>
        
    )
}
Button.defaultProps = {
    text:'Add'
}
Button.propTypes = {
    text: PropTypes.string,
    color:PropTypes.string,
    onClick:PropTypes.func,
}

export default Button
