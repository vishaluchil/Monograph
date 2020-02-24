import React, { useEffect, useState} from 'react'
import { TextField } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Divider, makeStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { useCookies } from 'react-cookie';
import './library.css'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
    margin: 16
  },
  header: {
    textAlign: 'center',
    spacing: 10,
  },
  list: {
    padding: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function Library() {

  const [books, setBooks] = useState(null);
  const [searchBooks, setSearchBooks] = useState(null)
  const [refresh, setRefresh] = useState(true)
  const [subscribed, setSubscribed] = useState(false)
  const [cookies] = useCookies(['user']);

  const classes = useStyles();

  useEffect(() => {
    fetch(`http://localhost:3000/isSubscribed/${cookies.user}`,{
              method: 'get',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
    })
    .then(res => res.json())
    .then(status => {
      if(status.subscribed){
        setSubscribed(true)
      }})

    fetch('http://localhost:3000/library',{
                method: 'get',
                headers: { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
               },
            })
            .then(res => res.json())
            .then(books => {
              setBooks(books)
              console.log(books)});
            },[refresh])

    function handleChange(e){
      if(e.target.value)
      {
        fetch('http://localhost:3000/librarysearch',{
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchText: e.target.value
        })
      })
      .then(res => res.json())
      .then(books => setSearchBooks(books))
    }else{
      setSearchBooks(null)
      setRefresh(!refresh)
    }
    }

    function subscribe() {
      fetch('http://localhost:3000/subscribe',{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cookies.user
        })
      })
      .then(res => res.json())
    }

    if(!subscribed){
      return (
        <div style={{maxWidth:400, position:'absolute', top:0, left:0, right:0, bottom:0, margin:'auto', height:400}}>
        <Card className={classes.root} width="400px">
          <CardHeader title="Subscribe to the Library" className={classes.header} />
          <Divider variant="middle" />
          <CardContent>
            <Typography variant="h4" align="center">
            ₹ 350
            </Typography>
            <div className={classes.list}>
              <Typography align="center">Get access to all books</Typography>
              <Typography align="center">Download Books</Typography>
              <Typography align="center">Read Anytime, Anywhere</Typography>
            </div>
          </CardContent>
          <Divider variant="middle" />
          <CardActions className={classes.action}>
            <form action='http://localhost:3000/start/payment' method='POST'>
            <Button type="submit" variant="contained" color="secondary" className={classes.button} onClick={subscribe}>
              Buy
            </Button>
            </form>
         </CardActions>
        </Card>
        </div>
      );
    }
    else if ( !books && !searchBooks )
    {
        return null;
    }
    else if(books && !searchBooks){
    return(
        <div className="m-16">
            <div>
                <TextField label="Search Book" placeholder="Type the name of a book" fullWidth variant="outlined" onChange={handleChange}/>
            </div>
            <div>
              <div className="my-8 mt-16 font-semibold">
                Harry Potter
              </div>
              <div className="flex flex-row m-8">
                  {books.map(book => (
                      <div className="m-16 forhover" style={{height: 225, textAlign:"center"}} onClick={()=> window.open(book.path)}>
                          <img src={book.coverImagePath} style={{width: "70%",height:"75%", maxWidth: 350}}/>
                          <div className="m-1" style={{textAlign:"center"}}>{book.title}</div>
                      </div> 
                  ))}
              </div>
            </div>
            <div>
              <div className="my-8 mt-16 font-semibold">
                Harry Potter
              </div>
              <div className="flex flex-row m-8">
                  {books.map(book => (
                      <div className="m-16 forhover" style={{height: 225, textAlign:"center"}} onClick={()=> window.open(book.path)}>
                          <img src={book.coverImagePath} style={{width: "70%",height:"75%", maxWidth: 350}}/>
                          <div className="m-1" style={{textAlign:"center"}}>{book.title}</div>
                      </div> 
                  ))}
              </div>
            </div>
            <div>
              <div className="my-8 mt-16 font-semibold">
                Harry Potter
              </div>
              <div className="flex flex-row m-8">
                  {books.map(book => (
                      <div className="m-16 forhover" style={{height: 225, textAlign:"center"}} onClick={()=> window.open(book.path)}>
                          <img src={book.coverImagePath} style={{width: "70%",height:"75%", maxWidth: 350}}/>
                          <div className="m-1" style={{textAlign:"center"}}>{book.title}</div>
                      </div> 
                  ))}
              </div>
            </div>
            <div>
              <div className="my-8 mt-16 font-semibold">
                Harry Potter
              </div>
              <div className="flex flex-row m-8">
                  {books.map(book => (
                      <div className="m-16 forhover" style={{height: 225, textAlign:"center"}} onClick={()=> window.open(book.path)}>
                          <img src={book.coverImagePath} style={{width: "70%",height:"75%", maxWidth: 350}}/>
                          <div className="m-1" style={{textAlign:"center"}}>{book.title}</div>
                      </div> 
                  ))}
              </div>
            </div>
        </div>
    );
                  }
    else{
      return(
        <div className="m-16">
          <div>
                <TextField label="Search Book" placeholder="Type the name of a book" fullWidth variant="outlined" onChange={handleChange}/>
          </div>
          <div className="flex flex-row m-8">
                {searchBooks.map(book => (
                    <div className="m-16 forhover" style={{height: 225, textAlign:"center"}} onClick={()=> window.open(book.path)}>
                        <img src={book.coverImagePath} style={{width: "70%",height:"75%", maxWidth: 100}}/>
                        <div className="m-1" style={{textAlign:"center"}}>{book.title}</div>
                    </div> 
                ))}
          </div>
        </div>
      );
    }
}

export default Library;