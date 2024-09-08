import { IconButton, Typography } from "@mui/material";
import { DeleteIcon } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';

function TodoCard(props)
{
    return (
        <div>
            <div>
                <Typography variant="h4">{props.title}</Typography>
                <Typography variant="subtitle1">{props.description}</Typography>
            </div>
            <div>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
                <div>
                    <IconButton>
                        
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default TodoCard;