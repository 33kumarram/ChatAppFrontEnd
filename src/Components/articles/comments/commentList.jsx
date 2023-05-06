import React from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { Delete } from '@mui/icons-material'
import { API_URLS } from '../../Services/ApiUrls'

const Component = styled(Box)({
    marginTop: '30px',
    backgroundColor: '#F5F5F5',
    padding: '20px',
    paddingTop: '20px',
    paddingBottom:'0px',
    minHeight:'100px',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px'
})

const Container = styled(Box)({
    display: 'flex',
    alignItems:'center'
})

const Name = styled(Box)({
    fontWeight: '600',
    fontSize: '14px',
    marginRight: '20px',
    color: '#878787',
})

const StyledDate = styled(Typography)({
    color: '#878787',
    fontSize: '14px'
})

const StyledButton = styled(Button)({
    marginLeft: 'auto',
})

export const CommentList = ({ comment, getComments }) => {
    const user = useSelector(state => state.user)

    const deleteComment = async (id) => {
        try {
            const res = await API_URLS.deleteComment(id)
            if (res.isSuccess) {
                //to get updated comments after delete
                getComments()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Component>
            <Box style={{textAlign:'left'}}>
                <Typography>{comment?.comment_text}</Typography>
            </Box>
            <Container>
                <Name>{comment?.commenter_name}</Name>
                <StyledDate>{new Date(comment?.createdAt).toDateString()}</StyledDate>
                {user.id === comment?.commenter_user_id &&
                    <StyledButton onClick={() => deleteComment(comment._id)}>
                        <Delete style={{color:'grey'}}/>
                    </StyledButton>
                }
            </Container>
        </Component>
    )
}
