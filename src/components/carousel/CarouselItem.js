import React from 'react';

const CarouselItem = (props) => {

    return (
        <li>
            <img src={props.item.image} />
        </li>
    )



}



export default CarouselItem