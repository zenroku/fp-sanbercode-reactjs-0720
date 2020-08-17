import React, { Component } from 'react'
import { Typography, Container, Paper } from '@material-ui/core'

// ini pake Class Component!!

class NotFound extends Component {
    render() {
        return (
            <Container style={{ minHeight: 600, display: 'flex' }}>
                <Paper style={{ minWidth: 700, minHeight: 500, margin: 'auto', display: 'flex', marginTop: 64, marginBottom: 64 }}>
                    <Typography variant="h3" style={{ textAlign: 'center', margin: 'auto' }}>Page Not Found</Typography>
                </Paper>
            </Container>
        )
    }
}

export default NotFound