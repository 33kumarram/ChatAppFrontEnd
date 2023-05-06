import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Button, styled } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Categories } from '../Config/Categories'
import { Link } from 'react-router-dom'

const StyledTable = styled(Table)`
     border: 1px solid #E0E0E0FF;
    `
const StyledButton = styled(Button)`
    margin: 7.5%;
    width: 85%;
    background: #6495ED;
    color: #FFF;
    `
const StyledLink = styled(Link)`
    text-decoration:none;
    color:inherit;
    `

export const CategoryListDisplay = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    let paramCategory = searchParams.get('category')||'All'

    return (
        <div>
            <StyledButton variant='contained' onClick={() => navigate(`/home/writearticle/?category=${paramCategory||''}`)}>Create Blog</StyledButton>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                                Category List
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Categories.map(category => {
                        return <TableRow key={category.id}>
                            <TableCell> 
                                <StyledLink style={paramCategory===category.type?{fontSize:'18px', fontWeight:'600'}:{}} to={`/home/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </StyledTable>
        </div>
    )
}
