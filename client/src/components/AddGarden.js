import {useState} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    }
    }));

function AddGarden(props) {
     //for material ui select
     const classes = useStyles();

    const [name, setName] = useState({})
    
    const saveNewGarden = () => {
        axios.post('http://localhost:8080/garden/new-garden',
        {
            data: name
          })
          .then(response => {
            
            let success = response.data.success
  
            if (success) {
             //reload display gardens        
            props.updateDisplayGarden(name)
            setName({...name,
              garden_name: ''
             
             })
            } else {
                console.log("did not update")
                }    
            })  
            
    }

    const handleOnChange = (e) => {
        setName({...name,
          [e.target.name]: e.target.value
        })
    }

    return(
        <div>
            <p>create a new garden</p>
            <TextField onChange={handleOnChange} name="garden_name" value={name.garden_name} id="standard-search" label="Garden" type="text" />
            <button onClick={saveNewGarden}>Save</button>
    
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateDisplayGarden: (name) => dispatch({type: "UPDATE_GARDEN", payload: name})
    }

}


export default connect(null, mapDispatchToProps)(AddGarden)