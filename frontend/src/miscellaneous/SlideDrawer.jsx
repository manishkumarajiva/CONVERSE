import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SideDrawer({show, drawerHandler}) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useNavigate();

  const searchInputHandler = (e) => {
    setSearch(e.target.value);
  }

  const searchHandler = (e) => {
    e.preventDefault();
    if(!search){
      toast.warning('Please enter something')
    }
  }

  return (
      <Offcanvas show={show} onHide={drawerHandler}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body> 
          <Form onSubmit={searchHandler} className='d-flex'>
          <FormControl
            type="text"
            name='search'
            value={search}
            onChange={searchInputHandler}
            placeholder="search users"
            style={{ width: "300px" }}
            className="rounded-pill border border-primary shadow-none me-2 "
          />
          <Button type='submit' className='rounded-circle border-0 p-2 bg-info'> GO </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
  );
}

export default SideDrawer;