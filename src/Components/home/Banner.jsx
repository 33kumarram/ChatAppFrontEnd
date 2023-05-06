import React from 'react'
import { Box, Typography, styled } from '@mui/material'

export const Banner = () => {
    const Image = styled(Box)`
  background: url(https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1756&q=80) center/120% repeat-x #fff;
  height: 50vh;
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color:#fff;
  `

    const Heading = styled(Typography)`
  font-size: 40px;
  color: inherit;
  line-height:1;
  `
    const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #fff;
  color: #000;
  line-height:1;
  `
    return (
        <Image>
            <Heading>
                Article
            </Heading>
            <SubHeading>
                Put your thoughts here
            </SubHeading>
        </Image>
    )
}
