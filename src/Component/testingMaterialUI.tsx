import React, { useState, useEffect } from 'react'
import { Button, Menu, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const TestingMaterialUI = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [memberCount, setMemberCount] = useState({ Adults: 0, Childrens: 0 })
    const handleValue = (value: any) => {
        if (value.Adults > 0 || value.Childrens > 0)
            return `Adults: ${value.Adults} and Childrens: ${value.Childrens}`
        else return null
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    return (
        <div>
            <TextField
                placeholder='enter your members count'
                value={handleValue(memberCount)}
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e: any) => handleClick(e)}
                variant="outlined" />
                <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                      }}
                >
                    <FamilyCount 
                    label={"Adults"} 
                    setMemberCount={setMemberCount}
                    memberCount={memberCount}/>
                    <FamilyCount 
                    label={"Childrens"} 
                    setMemberCount={setMemberCount} 
                    memberCount={memberCount}/>
                </Menu>
        </div>
    )
}

function FamilyCount({ label, setMemberCount, memberCount }: any) {
    const [count, setCount] = useState(memberCount[label])
    useEffect(() => {
        memberCount[label] = count
        setMemberCount({ ...memberCount})
    }, [count])
    return (
        <div>
            <Typography>{label}</Typography>
            <Button onClick={() => setCount(count + 1)}>
                <AddIcon />
            </Button>
            <TextField autoFocus={false} disabled value={count} variant="outlined" />
            <Button onClick={() => {
                if (count > 0) setCount(count - 1)
            }}>
                <RemoveIcon />
            </Button>
        </div>
    )
}

export default TestingMaterialUI