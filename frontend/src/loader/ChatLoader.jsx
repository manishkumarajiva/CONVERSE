import React from "react";
import { Placeholder } from "react-bootstrap";

const ChatLoader = () => {
  return (
    <React.Fragment>  
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
      <Placeholder as='p' animation="glow"> <Placeholder xs={12} bg='info' className='py-4 rounded-pill'/> </Placeholder>
    </React.Fragment>
  );
};

export default ChatLoader;
