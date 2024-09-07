function Location (props){
    return (
        <div> 
            <p> name: {props.name} </p>
            <p> latitude is: {props.latitude} </p>
            <p> longitude is: {props.longitude} </p>
        </div>
    );
}

export default Location